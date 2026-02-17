import { RenderGrid } from "@/components/blog/card";
import { listPosts } from "@/lib/notion";
import { Metadata } from "next";
import { cookies } from "next/headers";
import { ScrollReveal } from "@/components/partials/ScrollAnimate";

export const revalidate = 10;

export async function generateMetadata(): Promise<Metadata> {
  const cookieStore = await cookies();
  const pathname = cookieStore.get("pathname");
  const path = pathname?.value || "/";
  const lang = path.startsWith("/en") ? "en" : "pt";

  return {
    title: `Blog | Ygor Mendanha`,
    description:
      lang === "pt"
        ? "Um registro do processo de criação dos meus projetos."
        : "A record of the creation process of my projects.",
  };
}

export default async function blogPage({
  params,
}: {
  params: Promise<{ lang: "en" | "pt" }>;
}) {
  const { lang } = await params;
  const list = await listPosts({ lang });

  const blogDescription =
    lang === "pt"
      ? "Um registro do processo de criação dos meus projetos."
      : "A record of the creation process of my projects.";

  return (
    <main className="bg-black-purple min-h-screen pt-20">
      <header className="relative flex flex-col h-[400px] items-center justify-center text-center px-4 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-yellow/10 rounded-full blur-[100px] pointer-events-none" />

        <ScrollReveal direction="bottom" className="z-10">
          <div className="inline-block px-3 py-1 rounded-full border border-yellow/30 text-yellow text-xs font-bold uppercase tracking-widest mb-6">
            {lang === "pt"
              ? "Um registro do processo de criação dos meus projetos."
              : "A record of the creation process of my projects."}
          </div>

          <h1 className="text-5xl md:text-7xl font-black text-white mb-6 tracking-tight">
            Blog<span className="text-yellow">.</span>
          </h1>

          <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
            {blogDescription}
          </p>
        </ScrollReveal>

        <div className="absolute bottom-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      </header>

      <section className="container mx-auto px-5 py-20">
        <RenderGrid posts={list} lang={lang} />
      </section>
    </main>
  );
}
