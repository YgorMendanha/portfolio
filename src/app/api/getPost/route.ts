import { getPostMarkdownBySlug } from "@/lib/notion";
import { NotionPostFomat } from "@/types/notion";
import { NextResponse } from "next/server"; 

export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const slug = url.searchParams.get("slug");
    const lang = (url.searchParams.get("lang") ?? "pt") as "pt" | "en";

    if (!slug) {
      return NextResponse.json({ error: "slug is required" }, { status: 400 });
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
      id: post.id,
      description: post.description,
      slug: post.slug,
    };

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
