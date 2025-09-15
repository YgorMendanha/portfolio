"use client";

import { NotionPostFomat } from "@/types/notion";
import dayjs from "dayjs";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { colorMap } from "./card";

export function Post({ initialPost }: { initialPost: NotionPostFomat }) {
  const { lang, slug } = useParams<{ slug: string; lang: string }>();

  const [post, setPost] = useState<NotionPostFomat>(initialPost);

  useEffect(() => {
    getPostDetails();
  }, [lang, slug]);

  async function getPostDetails() {
    const response = await fetch(`/api/getPost?slug=${slug}&lang=${lang}`, {
      method: "GET",
    });

    const data = await response.json();
    setPost(data);
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

  const Header = ({ post }: { post: NotionPostFomat }) => {
    const date = dayjs(post.date).format("DD/MM/YYYY");
    const tags = post?.tags ?? [];

    function readingTime(text: string) {
      const words = text ? text.trim().split(/\s+/).length : 0;
      const minutes = Math.max(1, Math.ceil(words / 200));
      return `${minutes} min`;
    }
    const time = readingTime(post?.markdown ?? "");

    return (
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
    );
  };

  if (post?.id && post.markdown) {
    return (
      <>
        <Header post={post} />
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
      </>
    );
  } else if (post?.id && !post.markdown) {
    return (
      <>
        <Header post={post} />
        <div className="flex flex-col items-center gap-6 w-full h-40">
          <div className="w-full space-y-3 mt-6 gap-3">
            <div className="h-8 rounded bg-white/30 animate-pulse w-3/4 mb-10"></div>
            <div className="h-4 rounded bg-white/30 animate-pulse w-6/6"></div>
            <div className="h-4 rounded bg-white/30 animate-pulse w-6/6"></div>
            <div className="h-4 rounded bg-white/30 animate-pulse w-6/6"></div>
            <div className="h-4 rounded bg-white/30 animate-pulse w-6/6"></div>
            <div className="h-4 rounded bg-white/30 animate-pulse w-6/6"></div>
            <div className="h-4 rounded bg-white/30 animate-pulse w-6/6"></div>
            <div className="h-4 rounded bg-white/30 animate-pulse w-6/6"></div>
            <div className="h-4 rounded bg-white/30 animate-pulse w-6/6"></div>
            <div className="h-4 rounded bg-white/30 animate-pulse w-6/6"></div>
            <div className="h-4 rounded bg-white/30 animate-pulse w-6/6"></div>
            <div className="h-4 rounded bg-white/30 animate-pulse w-6/6"></div>
            <div className="h-4 rounded bg-white/30 animate-pulse w-6/6"></div>
            <div className="h-4 rounded bg-white/30 animate-pulse w-6/6"></div>
            <div className="h-4 rounded bg-white/30 animate-pulse w-6/6"></div>
            <div className="h-4 rounded bg-white/30 animate-pulse w-6/6"></div>
          </div>
        </div>
      </>
    );
  }
}
