import { Redis } from "@upstash/redis";
import { getPostMarkdownBySlug } from "@/lib/notion";
import type { NotionPostFomat } from "@/types/notion";
import { notFound } from "next/navigation";
import crypto from "crypto";
import { Metadata } from "next";
import { cookies } from "next/headers";
import Script from "next/script";
import { Post } from "@/components/blog/post";
import { BlogPosting, WithContext } from "schema-dts";

const UPSTASH_URL = process.env.UPSTASH_REDIS_REST_URL;
const UPSTASH_TOKEN = process.env.UPSTASH_REDIS_REST_TOKEN;
const redis =
  UPSTASH_URL && UPSTASH_TOKEN
    ? new Redis({ url: UPSTASH_URL, token: UPSTASH_TOKEN })
    : null;

const FRESH_TTL_SECONDS = 3600; // 1 hora
const STALE_TTL_SECONDS = 30 * 24 * 3600; // 30 dias
const LOCK_TTL_SECONDS = 30;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string; lang: "en" | "pt" }>;
}): Promise<Metadata> {
  const { slug, lang } = await params;
  const post = await getPostMarkdownBySlug({ slug, lang });

  const cookieStore = await cookies();
  const pathname = cookieStore.get("pathname");

  const path = pathname?.value || "/";

  const description = post?.description.join(" ");

  return {
    title: post?.title ?? "Post",
    description: description || undefined,
    openGraph: {
      title: post?.title ?? "Post",
      description: description || undefined,
      url: path,
    },
    alternates: {
      canonical: `${lang === "pt" ? "/pt" : "/en"}/blog/${post?.slug}`,
      languages: {
        en: `/en/blog/${post?.slug}`,
        pt: `/pt/blog/${post?.slug}`,
        "x-default": `/blog/${post?.slug}`,
      },
    },
  };
}

export default async function blogPage({
  params,
}: {
  params: Promise<{ slug: string; lang: "en" | "pt" }>;
}) {
  const { slug, lang: rawLang } = await params;
  const lang = rawLang === "en" ? "en" : "pt";

  const key = `post:${slug}:${lang}:json`;
  const lockKey = `lock:${key}`;

  const now = Date.now();

  let cached: any = null;
  if (redis) {
    try {
      const raw = await redis.get(key);
      if (raw) {
        const parsed = typeof raw === "string" ? JSON.parse(raw) : raw;
        if (parsed?.meta && parsed.meta.staleUntil > now) {
          cached = parsed;
        }
      }
    } catch (err) {
      console.warn("[cache] get error, ignore:", err);
    }
  }

  if (cached) {
    const nowMs = now;
    if (nowMs < cached.meta.freshUntil) {
      console.log(`[cache] FRESH hit for ${key}`);
      return renderPost(cached.data);
    } else {
      console.log(`[cache] STALE hit for ${key}, refresh in background`);
      if (redis)
        acquireLockAndRefresh(lockKey, key, slug, lang).catch(console.error);
      return renderPost(cached.data);
    }
  }

  let lockToken: string | null = null;
  if (redis) {
    lockToken = crypto.randomUUID?.() ?? `${Date.now()}:${Math.random()}`;
    try {
      const ok = await redis.set(lockKey, lockToken, {
        nx: true,
        ex: LOCK_TTL_SECONDS,
      });
      if (!ok) lockToken = null;
    } catch {
      lockToken = null;
    }
  }

  if (!lockToken && cached) return renderPost(cached.data);
  const post = await getPostMarkdownBySlug({ slug, lang, content: true });
  if (!post) return notFound();

  const response: NotionPostFomat = {
    markdown: post.markdown,
    title: post.title,
    date: post.date,
    tags: post.tags ?? [],
    id: post.id ?? null,
    description: post.description,
    slug: post.slug ?? slug,
  };

  if (lockToken && redis) {
    try {
      const wrapper: any = {
        data: response,
        meta: {
          updatedAt: now,
          freshUntil: now + FRESH_TTL_SECONDS * 1000,
          staleUntil: now + STALE_TTL_SECONDS * 1000,
        },
      };
      await redis.set(key, JSON.stringify(wrapper), { ex: STALE_TTL_SECONDS });
    } finally {
      await releaseLock(lockKey, lockToken);
    }
  } else if (redis) {
    (async () => {
      const wrapper: any = {
        data: response,
        meta: {
          updatedAt: now,
          freshUntil: now + FRESH_TTL_SECONDS * 1000,
          staleUntil: now + STALE_TTL_SECONDS * 1000,
        },
      };
      try {
        await redis.set(key, JSON.stringify(wrapper), {
          ex: STALE_TTL_SECONDS,
        });
      } catch {}
    })();
  }

  return renderPost(response);
}

async function acquireLockAndRefresh(
  lockKey: string,
  key: string,
  slug: string,
  lang: "pt" | "en"
) {
  if (!redis) return;
  const token = crypto.randomUUID?.() ?? `${Date.now()}:${Math.random()}`;
  const ok = await redis.set(lockKey, token, {
    nx: true,
    ex: LOCK_TTL_SECONDS,
  });
  if (!ok) return;

  try {
    const post = await getPostMarkdownBySlug({ slug, lang, content: true });
    if (!post) return;
    const wrapper: any = {
      data: {
        markdown: post.markdown,
        title: post.title,
        date: post.date,
        tags: post.tags ?? [],
        id: post.id ?? null,
        description: post.description,
        slug: post.slug ?? slug,
      },
      meta: {
        updatedAt: Date.now(),
        freshUntil: Date.now() + FRESH_TTL_SECONDS * 1000,
        staleUntil: Date.now() + STALE_TTL_SECONDS * 1000,
      },
    };
    await redis.set(key, JSON.stringify(wrapper), { ex: STALE_TTL_SECONDS });
  } finally {
    await releaseLock(lockKey, token);
  }
}

async function releaseLock(lockKey: string, token: string) {
  if (!redis || !token) return;
  try {
    const script = `
      if redis.call("get", KEYS[1]) == ARGV[1] then
        return redis.call("del", KEYS[1])
      else
        return 0
      end
    `;
    await redis.eval(script, [lockKey], [token]);
  } catch {}
}

// --- render ---
function renderPost(post: NotionPostFomat) {
  const jsonLdBlogPost: WithContext<BlogPosting> = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    author: [
      {
        "@id": "#main-author",
        "@type": "Person",
        name: "Ygor Mendanha",
      },
    ],
  };

  return (
    <main className="mx-auto container px-4 py-8 min-h-[calc(100vh-70px)]">
      <Script
        id="jsonLdPerson"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdBlogPost) }}
      />
      <Post initialPost={post} />
    </main>
  );
}
