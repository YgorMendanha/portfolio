"use client";

import { NotionPostFomat } from "@/types/notion";
import dayjs from "dayjs";
import Link from "next/link";
import { ScrollReveal } from "../partials/ScrollAnimate";

export const colorMap: Record<string, string> = {
  red: "bg-red-500/20 text-red-400 border-red-500/30",
  pink: "bg-pink-500/20 text-pink-400 border-pink-500/30",
  yellow: "bg-yellow/10 text-yellow border-yellow/20",
  blue: "bg-cyan-light/10 text-cyan-light border-cyan-light/20",
  purple: "bg-purple-bright/10 text-purple-bright border-purple-bright/20",
};

export const RenderGrid = ({
  posts,
  lang,
}: {
  posts: NotionPostFomat[];
  lang: "pt" | "en";
}) => {

  if (!posts || posts.length === 0) {
    return (
      <p className="text-center text-lg text-gray-500 py-20">
        {lang === "pt" ? "Nenhum post encontrado" : "No posts found"}
      </p>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
      {posts.map((p) => {
        const date = dayjs(p.date).format("DD . MM . YYYY");

        return (
          <ScrollReveal key={p.id} direction="bottom">
            <article className="group relative h-full bg-white/[0.03] border border-white/10 rounded-2xl p-8 transition-all duration-300 hover:bg-white/[0.06] hover:border-yellow/30 hover:-translate-y-2 flex flex-col">

              <div className="absolute left-0 top-1/4 w-1 h-1/2 bg-yellow scale-y-0 group-hover:scale-y-100 transition-transform duration-500 rounded-r-full shadow-[0_0_15px_#ffcc00]" />

              <Link
                href={`/blog/${p.slug}`}
                className="flex flex-col h-full no-underline"
              >
                <div className="text-[10px] font-black uppercase tracking-[0.2em] text-yellow mb-4 opacity-80">
                  {date}
                </div>

                <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-yellow transition-colors duration-300 leading-tight">
                  {p.title || (lang === "pt" ? "Sem título" : "Untitled")}
                </h3>

                <p className="text-gray-400 text-sm leading-relaxed mb-6 line-clamp-3">
                  {p.description}
                </p>

                <div className="flex flex-wrap gap-2 mb-8">
                  {p.tags.map((tag) => (
                    <div
                      key={tag.name}
                      className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded border ${
                        colorMap[tag.color] ||
                        "bg-white/5 text-gray-400 border-white/10"
                      }`}
                    >
                      {tag.name}
                    </div>
                  ))}
                </div>

                <div className="mt-auto pt-6 border-t border-white/5 flex items-center justify-between group/link">
                  <span className="text-xs font-bold uppercase tracking-widest text-white group-hover/link:text-yellow transition-colors">
                    {lang === "pt" ? "Ler Post" : "Read Post"}
                  </span>
                  <span className="text-yellow transform group-hover/link:translate-x-2 transition-transform duration-300">
                    →
                  </span>
                </div>
              </Link>
            </article>
          </ScrollReveal>
        );
      })}
    </div>
  );
};
