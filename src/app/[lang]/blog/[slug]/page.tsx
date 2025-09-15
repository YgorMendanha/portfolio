import { colorMap } from "@/components/blog/card";
import { Post } from "@/components/blog/post";
import { getPostMarkdownBySlug, listPosts } from "@/lib/notion";
import dayjs from "dayjs";
import { Metadata } from "next";
import { cookies } from "next/headers";
import { notFound } from "next/navigation";
import Script from "next/script";
import React from "react";
import { WithContext, BlogPosting } from "schema-dts";

export const revalidate = 60;

export async function generateStaticParams() {
  const langs = ["en", "pt"] as const;

  const params: Array<{ slug: string; lang: (typeof langs)[number] }> = [];

  for (const lang of langs) {
    const posts = await listPosts({ lang });
    if (!posts) {
      return;
    }
    for (const p of posts) {
      if (p?.slug) {
        params.push({ slug: p.slug, lang });
      }
    }
  }

  const dedup = new Map<string, { slug: string; lang: string }>();
  for (const p of params) {
    dedup.set(`${p.lang}::${p.slug}`, p);
  }

  return Array.from(dedup.values());
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string; lang: "en" | "pt" }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostMarkdownBySlug({ slug });

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
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default async function blogPage({
  params,
}: {
  params: Promise<{ slug: string; lang: "en" | "pt" }>;
}) {
  const { slug, lang } = await params;

  const post = await getPostMarkdownBySlug({ slug, lang });

  if (!post) {
    return notFound();
  }

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
