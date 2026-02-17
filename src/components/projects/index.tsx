"use client";
import Image from "next/image";
import { ProjectsDetails } from "@/utils/functions/getProjectsDetails";
import { Button } from "../partials/ui/button";
import { ScrollReveal } from "../partials/ScrollAnimate";
import { FiExternalLink, FiLink } from "react-icons/fi";
import clsx from "clsx";
import Link from "next/link";
import { BsArrowRight } from "react-icons/bs";

export function MyProjects({ lang }: { lang: "pt" | "en" }) {
  const projects = ProjectsDetails({ lang }) ?? [];
  const favorites = projects.filter((p: any) => Boolean(p.favorite));

  const content = {
    pt: {
      title: "Projetos em Destaque",
      desc: "Soluções reais que entregam performance e escala. Cada projeto é um registro de evolução técnica e foco no usuário.",
      seeMore: "Explorar portfólio completo",
      view: "Visualizar",
      moreDetails: "Mais detalhes",
    },
    en: {
      title: "Featured Projects",
      desc: "Real solutions that deliver performance and scale. Each project is a record of technical evolution and user focus.",
      seeMore: "Explore full portfolio",
      view: "View",
      moreDetails: "Mais detalhes",
    },
  };

  const t = content[lang] || content.pt;

  return (
    <section id="projects" className="bg-black-purple py-24 overflow-hidden">
      <div className="container px-5 mx-auto flex flex-col">
        {/* Header da Seção */}
        <ScrollReveal direction="bottom" className="mb-20">
          <div className="flex items-center gap-4 mb-4">
            <span className="w-12 h-1 bg-yellow rounded-full" />
            <span className="text-yellow uppercase tracking-[0.3em] text-xs font-black">
              Portfolio
            </span>
          </div>
          <h2 className="text-4xl md:text-6xl font-black text-white mb-6 tracking-tight">
            {t.title}
            <span className="text-cyan-light">.</span>
          </h2>
          <p className="text-gray-400 text-lg md:text-xl max-w-2xl leading-relaxed">
            {t.desc}
          </p>
        </ScrollReveal>

        <div className="flex flex-col gap-24 md:gap-32">
          {favorites.length > 0 &&
            favorites.map((project, idx) => {
              const isEven = idx % 2 === 0;

              return (
                <ScrollReveal
                  direction={isEven ? "left" : "right"}
                  key={project.title}
                  className={clsx(
                    "flex flex-col gap-10 lg:gap-20 items-center",
                    isEven ? "lg:flex-row" : "lg:flex-row-reverse",
                  )}
                >
                  {/* Lado da Imagem com Moldura Glass */}
                  <div className="w-full lg:w-3/5 group relative">
                    <div className="relative rounded-[2rem] overflow-hidden border border-white/10 bg-white/5 p-2 transition-all duration-500 group-hover:border-yellow/30 shadow-2xl">
                      <div className="relative overflow-hidden rounded-[1.5rem] aspect-video">
                        {project.image && (
                          <Image
                            src={project.image}
                            alt={project.title}
                            width={1200}
                            height={800}
                            className="w-full h-full object-cover object-top transition-transform duration-1000 group-hover:scale-105"
                            priority={idx === 0}
                          />
                        )}
                        {project.logo && project.logo}
                        <div className="absolute inset-0 bg-gradient-to-t from-black-purple/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      </div>
                    </div>
                  </div>

                  {/* Lado do Conteúdo */}
                  <div className="w-full lg:w-2/5 flex flex-col items-start">
                    <div className="flex flex-wrap gap-2 mb-6">
                      {project.tags?.map((tag: string, tagIdx: number) => (
                        <span
                          key={tagIdx}
                          className="text-[10px] uppercase tracking-widest font-black px-3 py-1  rounded-md group-hover:border-yellow/90 group-hover:text-yellow transition-all duration-500 bg-cyan-light/10 text-cyan-light border border-cyan-light/20"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <h3 className="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight">
                      {project.title}
                    </h3>

                    <p className="text-gray-400 text-lg leading-relaxed mb-10">
                      {project.details}
                    </p>

                    <div className="flex gap-2">
                      {project.internalLink && (
                        <Button
                          href={project.internalLink}
                          variant="ghost"
                          className="group/btn bg-transparent hover:bg-yellow text-white hover:text-black-purple border-2 border-white/10 hover:border-yellow transition-all duration-500 px-8 py-4 rounded-2xl flex items-center gap-3 font-black"
                        >
                          {t.moreDetails}
                          <FiLink size={18} className="ml-2" />
                        </Button>
                      )}

                      {project.link && (
                        <Button
                          target={project.link ? "_blank" : undefined}
                          rel={project.link ? "noopener noreferrer" : undefined}
                          href={project.link ?? "#contact"}
                          className="group/btn bg-transparent hover:bg-yellow text-white hover:text-black-purple border-2 border-white/10 hover:border-yellow transition-all duration-500 px-8 py-4 rounded-2xl flex items-center gap-3 font-black"
                        >
                          {t.view}
                          <FiExternalLink className="group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform" />
                        </Button>
                      )}
                    </div>
                  </div>
                </ScrollReveal>
              );
            })}
        </div>

        {/* Link para portfólio completo */}
        <ScrollReveal direction="top" className="mt-32 flex justify-center">
          <Link
            href="/projects"
            className="group flex items-center gap-4 text-gray-400 hover:text-yellow transition-all duration-300"
          >
            <span className="text-lg font-bold tracking-tight border-b border-transparent group-hover:border-yellow pb-1">
              {t.seeMore}
            </span>
            <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center group-hover:border-yellow group-hover:bg-yellow group-hover:text-black-purple transition-all duration-300">
              <BsArrowRight className="text-xl" />
            </div>
          </Link>
        </ScrollReveal>
      </div>
    </section>
  );
}
