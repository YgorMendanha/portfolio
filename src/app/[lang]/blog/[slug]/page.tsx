import { colorMap } from "@/components/blog/card";
import { getPostMarkdownBySlug, listPosts } from "@/lib/notion";
import dayjs from "dayjs";
import { Metadata } from "next";
import { cookies } from "next/headers";
import { notFound } from "next/navigation";
import Script from "next/script";
import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { WithContext, BlogPosting } from "schema-dts";


export const revalidate = 60;


export async function generateStaticParams() {

  const langs = ["en", "pt"] as const;

  const params: Array<{ slug: string; lang: (typeof langs)[number] }> = [];

  for (const lang of langs) {
    const posts = await listPosts({ lang }); 
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
  const post = await getPostMarkdownBySlug(slug);

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

function CodeBlock({
  className,
  children,
}: {
  inline?: boolean;
  className?: string;
  children: React.ReactNode;
}) {
  const language = className ? className.replace(/language-/, "") : "";
  const codeString = String(children).replace(/\n$/, "");

  return (
    <div className="my-6">
      <div className="flex items-center justify-between rounded-t-xl bg-gray-900/60 px-3 py-1 text-xs text-gray-300">
        <span className="font-medium">{language || "code"}</span>
        <span className="text-gray-400 text-xs"></span>
      </div>

      <pre className="overflow-x-auto rounded-b-xl bg-[#353c44] p-4 text-sm leading-6">
        <code className={`language-${language} block whitespace-pre`}>
          {codeString}
        </code>
      </pre>
    </div>
  );
}

export default async function blogPage({
  params,
}: {
  params: Promise<{ slug: string; lang: "en" | "pt" }>;
}) {
  const { slug, lang } = await params;

  const post = await getPostMarkdownBySlug(slug, lang);

  if (!post) {
    return notFound();
  }

  const date = dayjs(post.date).format("DD/MM/YYYY");
  const tags = post?.tags ?? [];

  function readingTime(text: string) {
    const words = text ? text.trim().split(/\s+/).length : 0;
    const minutes = Math.max(1, Math.ceil(words / 200));
    return `${minutes} min`;
  }

  const time = readingTime(post?.markdown ?? "");

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
      <div className="flex flex-col h-60 items-center justify-center text-center mb-8">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-3">
          {post.title}
        </h1>

        <div className="flex gap-3 items-center text-sm text-gray-400">
          <span>{date}</span>
          <span className="text-gray-600">•</span>
          <span>{time}</span>
        </div>

        <div className="flex gap-2 mt-4 flex-wrap justify-center">
          {tags.map((tag) => (
            <span
              key={tag.name}
              className={`rounded-xl py-1 px-3 text-sm bg-white/3 ${
                colorMap[tag.color ?? "red"] ?? "bg-gray-700"
              } bg-opacity-50`}
            >
              {tag.name}
            </span>
          ))}
        </div>
      </div>

      <article className="prose prose-invert prose-headings:font-semibold max-w-none lg:prose-lg">
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          components={{
            code: ({ className, children }) => (
              <CodeBlock className={className}>
                {children as React.ReactNode}
              </CodeBlock>
            ),
            p: ({ children }) => <div>{children}</div>,
            div: ({ children }) => <div>{children}</div>,
          }}
        >
          {post.markdown}
        </ReactMarkdown>
      </article>
    </main>
  );
}
