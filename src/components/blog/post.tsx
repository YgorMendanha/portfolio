"use client";

import { getPostMarkdownBySlug } from "@/lib/notion";
import { NotionPostFomat } from "@/types/notion";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export function Post() {
  const { lang, slug } = useParams<{ slug: string; lang: string }>();

  const [post, setPost] = useState<NotionPostFomat | null>(null);

  useEffect(() => {
    getPost();
  }, [lang, slug]);

  async function getPost() {
    const post = await getPostMarkdownBySlug(slug, lang);
    setPost(post);
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

  if (post) {
    return (
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
    );
  } else {
    <>loadins</>;
  }
}
