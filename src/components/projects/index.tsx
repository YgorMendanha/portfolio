"use client";
import Image from "next/image";
import { getDictionary } from "@/utils/functions/getDictionary";
import { ProjectsDetails } from "@/utils/functions/getProjectsDetails";
import { Button } from "../partials/ui/button";
import { ScrollReveal } from "../partials/ScrollAnimate";
import { FiExternalLink } from "react-icons/fi";

export function MyProjects({ lang }: { lang: "pt" | "en" }) {
  const dict = getDictionary(lang ?? "pt");
  const Projects = ProjectsDetails({ lang }) ?? [];

  const favorites = Projects.filter((p: any) => Boolean(p.favorite));

  return (
    <section className="bg-black-purple py-20 overflow-hidden">
      <section id="project" className="container px-5 mx-auto flex flex-col">
        <ScrollReveal direction="top">
          <h2 className="text-3xl sm:text-4xl font-bold underline-offset-4 mb-8 text-white">
            {dict.projects}
          </h2>
          <p className="mt-2 light-gray">{dict.workShowcaseDescription}</p>
        </ScrollReveal>

        {favorites.length > 0 &&
          favorites.map((project, idx) => {
            const flexDirection =
              idx % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse";

            const isReverse = idx % 2 === 0;

            return (
              <ScrollReveal
                speed={"slow"}
                direction={isReverse ? "left" : "right"}
                key={project.title}
                className={`flex flex-col ${flexDirection} my-10 gap-6 justify-center items-center p-6 rounded-2xl bg-white group hover:-translate-y-0.5 duration-300 transition-all`}
                aria-labelledby={`project-${idx}-title`}
              >
                <div className="w-full lg:w-1/2 ">
                  <div className="rounded-lg overflow-hidden h-44 lg:h-[400px] relative">
                    <>
                      <Image
                        src={project.image}
                        alt={project.title}
                        width={1200}
                        height={800}
                        className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                        priority={idx === 0}
                      />

                      <div
                        aria-hidden
                        className="absolute left-0 top-0 w-full h-full bg-gradient-to-t from-black/20 to-transparent pointer-events-none"
                      />
                    </>
                  </div>
                </div>
                <div className="flex flex-col text-black-purplerounded-lg text-black-purple w-full lg:w-1/2  transition-transform duration-300">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3
                        id={`project-${idx}-title`}
                        className="text-2xl sm:text-3xl font-bold mb-2"
                      >
                        {project.title}
                      </h3>
                      <div className="flex gap-2 flex-wrap mb-3">
                        {project.tags?.map((t: string) => (
                          <span
                            key={t}
                            className="text-xs px-2 py-1 bg-purple-bright/10 text-black-purple rounded-full border border-purple-bright/20"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <p className="text-base sm:text-lg mb-4 text-dark overflow-y-auto whitespace-pre-wrap">
                    {project.details}
                  </p>

                  <div className="mt-auto pt-4 border-t border-gray-200 flex items-center justify-between gap-4 flex-wrap">
                    <Button
                      target={project.link ? "_blank" : undefined}
                      rel={project.link ? "noopener noreferrer" : undefined}
                      href={project.link ?? "#contact"}
                      aria-label={`${lang === "pt" ? "Ver" : "View"} ${
                        project.title
                      }`}
                    >
                      {dict.toView ?? (lang === "pt" ? "Ver" : "View")}{" "}
                      {project.title}
                      <FiExternalLink size={25} className="ml-1" />
                    </Button>
                  </div>
                </div>
              </ScrollReveal>
            );
          })}

        <ScrollReveal
          speed={"fast"}
          direction="bottom"
          className="mt-6 flex justify-center"
        >
          <Button href="/projects" variant="ghost" aria-label={dict.seeMore}>
            {dict.seeMore}
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              aria-hidden
            >
              <path
                d="M5 12h14"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M12 5l7 7-7 7"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Button>
        </ScrollReveal>
      </section>
    </section>
  );
}
