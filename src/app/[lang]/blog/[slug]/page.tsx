import { Post } from "@/components/blog/post";
import { getPostMarkdownBySlug } from "@/lib/notion";
import { Metadata } from "next";
import { cookies } from "next/headers";
import { notFound } from "next/navigation";
import Script from "next/script";
import React from "react";
import { WithContext, BlogPosting } from "schema-dts";

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
