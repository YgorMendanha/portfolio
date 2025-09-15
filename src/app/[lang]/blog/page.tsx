import { RenderGrid } from "@/components/blog/card";
import { listPosts } from "@/lib/notion";
import { getDictionary } from "@/utils/functions/getDictionary";
import { Metadata } from "next";
import { cookies } from "next/headers";

export async function generateMetadata(): Promise<Metadata> {
  const cookieStore = await cookies();
  const pathname = cookieStore.get("pathname");

  const path = pathname?.value || "/";
  const lang = path.startsWith("/en") ? "en" : "pt";

  const dict = getDictionary(lang ?? "pt");

  return {
    title: "Blog",
    description: dict.subTitleBlog,
  };
}

export default async function blogPage({
  params,
}: {
  params: Promise<{ lang: "en" | "pt" }>;
}) {
  const { lang } = await params;
  const list = await listPosts({ lang });
  const dict = getDictionary(lang ?? "pt");

  return (
    <main className="mx-auto container px-4 py-8 min-h-[calc(100vh-70px)]">
      <div className="flex flex-col h-60 items-center justify-center text-center mb-4">
        <h1 className="text-5xl font-bold text-white mb-2">Blog</h1>
        <p className="text-sm text-gray-300 max-w-2xl">{dict.subTitleBlog}</p>
      </div>

      <section className="mb-12 overflow-auto pt-5">
        <RenderGrid posts={list} lang={lang} />
      </section>
    </main>
  );
}
