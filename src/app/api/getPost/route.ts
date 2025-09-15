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

const DEFAULT_TTL_SECONDS = 60 * 60;

export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const slug = url.searchParams.get("slug");
    const lang = (url.searchParams.get("lang") ?? "pt") as "pt" | "en";

    if (!slug) {
      return NextResponse.json({ error: "slug is required" }, { status: 400 });
    }

    const key = `post:${slug}:${lang}:json`;

    if (redis) {
      try {
        const cached = await redis.get(key);
        if (cached) {
          const parsed =
            typeof cached === "string" ? JSON.parse(cached) : cached;
          return NextResponse.json(parsed, {
            headers: {
              "Cache-Control":
                "public, s-maxage=60, stale-while-revalidate=300",
            },
          });
        }
      } catch (err) {
        console.error("Upstash GET error:", err);
      }
    }

    const post = await getPostMarkdownBySlug({
      slug,
      lang,
      content: true,
    });

    if (!post) {
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

    if (redis) {
      try {
        await redis.set(key, JSON.stringify(response), {
          ex: DEFAULT_TTL_SECONDS,
        });
      } catch (err) {
        console.error("Upstash SET error:", err);
      }
    }

    return NextResponse.json(response, {
      headers: {
        "Cache-Control": "public, s-maxage=60, stale-while-revalidate=300",
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
