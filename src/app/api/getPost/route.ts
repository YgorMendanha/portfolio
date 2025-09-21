import { NextResponse } from "next/server";
import { Redis } from "@upstash/redis";
import { getPostMarkdownBySlug } from "@/lib/notion";
import type { NotionPostFomat } from "@/types/notion";

const UPSTASH_URL = process.env.UPSTASH_REDIS_REST_URL;
const UPSTASH_TOKEN = process.env.UPSTASH_REDIS_REST_TOKEN;
const redis =
  UPSTASH_URL && UPSTASH_TOKEN
    ? new Redis({ url: UPSTASH_URL, token: UPSTASH_TOKEN })
    : null;


const FRESH_TTL_SECONDS = 15 * 60; // 15 minutos (fresh)
const STALE_TTL_SECONDS = 30 * 24 * 3600; // 30 dias (stale window)
const LOCK_TTL_SECONDS = 10; // lock anti-stampede (segundos)

function now() {
  return Date.now();
}

type CacheWrapper = {
  data: NotionPostFomat;
  meta: {
    updatedAt: number;
    freshUntil: number;
    staleUntil: number;
  };
};

async function saveToCache(key: string, response: NotionPostFomat) {
  if (!redis) return;
  const t = now();
  const wrapper: CacheWrapper = {
    data: response,
    meta: {
      updatedAt: t,
      freshUntil: t + FRESH_TTL_SECONDS * 1000,
      staleUntil: t + STALE_TTL_SECONDS * 1000,
    },
  };
  try {
    await redis.set(key, JSON.stringify(wrapper), { ex: STALE_TTL_SECONDS });
    console.log(
      `[cache] saved ${key} (fresh ${FRESH_TTL_SECONDS}s, stale ${STALE_TTL_SECONDS}s)`
    );
  } catch (err) {
    console.error("Upstash SET error:", err);
  }
}

async function tryAcquireLock(lockKey: string) {
  if (!redis) return false;
  try {
    const ok = await redis.set(lockKey, "1", {
      nx: true,
      ex: LOCK_TTL_SECONDS,
    });
    return !!ok;
  } catch (err) {
    console.error("Upstash LOCK error:", err);
    return false;
  }
}

async function releaseLock(lockKey: string) {
  if (!redis) return;
  try {
    await redis.del(lockKey);
  } catch (err) {
    console.error("Upstash DEL lock error:", err);
  }
}

async function refreshCacheIfNeeded(
  key: string,
  lockKey: string,
  slug: string,
  lang: "pt" | "en"
) {
  if (!redis) {
    return;
  }

  const gotLock = await tryAcquireLock(lockKey);
  if (!gotLock) {
    console.log(`[lock] refresh skipped, another worker updating ${lockKey}`);
    return;
  }

  try {
    console.log(`[lock] acquired for background refresh ${lockKey}`);
    const post = await getPostMarkdownBySlug({ slug, lang, content: true });
    if (!post) {
      console.warn(`[refresh] post not found for slug=${slug}`);
      return;
    }
    const response: NotionPostFomat = {
      markdown: post.markdown,
      title: post.title,
      date: post.date,
      tags: post.tags ?? [],
      id: post.id ?? null,
      description: post.description,
      slug: post.slug ?? slug,
    };
    await saveToCache(key, response);
    console.log(`[refresh] cache updated for ${key}`);
  } catch (err) {
    console.error("[refresh] error fetching/updating:", err);
  } finally {
    await releaseLock(lockKey);
  }
}

export async function GET(request: Request) {
  const startAll = now();
  try {
    const url = new URL(request.url);
    const slug = url.searchParams.get("slug");
    const lang = (url.searchParams.get("lang") ?? "pt") as "pt" | "en";

    if (!slug)
      return NextResponse.json({ error: "slug is required" }, { status: 400 });

    const key = `post:${slug}:${lang}:json`;
    const lockKey = `lock:${key}`;

    if (redis) {
      try {
        const t0 = now();
        const cachedRaw = await redis.get(key);
        const t1 = now();
        console.log(`[cache] redis.get ${key} took ${t1 - t0}ms`);

        if (cachedRaw) {
          const wrapper: CacheWrapper =
            typeof cachedRaw === "string"
              ? JSON.parse(cachedRaw)
              : (cachedRaw as any);
          const nowMs = now();

          if (nowMs < wrapper.meta.freshUntil) {
            console.log(`[cache] FRESH hit for ${key}`);
            return NextResponse.json(wrapper.data, {
              headers: {
                "Cache-Control": `public, s-maxage=${FRESH_TTL_SECONDS}, stale-while-revalidate=${STALE_TTL_SECONDS}`,
              },
            });
          }

          if (nowMs < wrapper.meta.staleUntil) {
            console.log(
              `[cache] STALE hit for ${key} — serving stale and refreshing in background`
            );

            refreshCacheIfNeeded(key, lockKey, slug, lang).catch((err) =>
              console.error("[background refresh] error:", err)
            );

            return NextResponse.json(wrapper.data, {
              headers: {
                "Cache-Control": `public, s-maxage=${FRESH_TTL_SECONDS}, stale-while-revalidate=${STALE_TTL_SECONDS}`,
              },
            });
          }

          console.log(`[cache] EXPIRED (beyond stale) for ${key}`);
        }
      } catch (err) {
        console.error("Upstash GET error:", err);
      }
    }

    let gotLock = false;
    if (redis) {
      gotLock = await tryAcquireLock(lockKey);
      console.log(`[lock] attempt for ${lockKey} => ${gotLock}`);
    }

    if (!gotLock && redis) {
      try {
        const reread = await redis.get(key);
        if (reread) {
          const wrapper: CacheWrapper =
            typeof reread === "string" ? JSON.parse(reread) : (reread as any);
          const nowMs = now();
          if (nowMs < wrapper.meta.staleUntil) {
            console.log(
              `[cache] another worker filled cache for ${key} (re-read)`
            );
            return NextResponse.json(wrapper.data, {
              headers: {
                "Cache-Control": `public, s-maxage=${FRESH_TTL_SECONDS}, stale-while-revalidate=${STALE_TTL_SECONDS}`,
              },
            });
          }
        }
      } catch (err) {
        console.error("Upstash re-read error:", err);
      }

      console.log(
        `[lock] no lock and no cache — will fetch directly (fallback) for ${key}`
      );
    }

    const t0Notion = now();
    const post = await getPostMarkdownBySlug({ slug, lang, content: true });
    const t1Notion = now();
    console.log(`[notion] fetch took ${t1Notion - t0Notion}ms`);

    if (!post) {
      if (gotLock && redis) await releaseLock(lockKey);
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }

    const response: NotionPostFomat = {
      markdown: post.markdown,
      title: post.title,
      date: post.date,
      tags: post.tags ?? [],
      id: post.id ?? null,
      description: post.description,
      slug: post.slug ?? slug,
    };

    if (gotLock && redis) {
      try {
        await saveToCache(key, response);
      } catch (err) {
        console.error("Upstash SET error:", err);
      } finally {
        await releaseLock(lockKey);
      }
    } else {
      if (redis) {
        saveToCache(key, response).catch((err) =>
          console.error("[background save fallback] error:", err)
        );
      }
    }

    console.log(`[response] total ${now() - startAll}ms`);
    return NextResponse.json(response, {
      headers: {
        "Cache-Control": `public, s-maxage=${FRESH_TTL_SECONDS}, stale-while-revalidate=${STALE_TTL_SECONDS}`,
      },
    });
  } catch (err: any) {
    console.error("API /api/post error:", err);
    return NextResponse.json(
      { error: "server error", detail: err?.message ?? null },
      { status: 500 }
    );
  }
}
