import React from "react";
import Image from "next/image";
import type { Metadata } from "next";
import { FiExternalLink, FiLink } from "react-icons/fi";
import { Contact } from "@/components";
import { getDictionary } from "@/utils/functions/getDictionary";
import { ScrollReveal } from "@/components/partials/ScrollAnimate";
import { Button } from "@/components/partials/ui/button";
import { ProjectsDetails } from "@/utils/functions/getProjectsDetails";
import { cookies } from "next/headers";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: "en" | "pt" }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const cookieStore = await cookies();
  const pathname = cookieStore.get("pathname");
  const dict = getDictionary(lang);

  const path = pathname?.value || "/";

  return {
    title: dict.projects,
    description: dict.exploreProjects,
    openGraph: {
      title: dict.projects,
      description: dict.exploreProjects,
      url: path,
      images: [
        {
          url: "https://myymbucket.s3.sa-east-1.amazonaws.com/imagens/Logo.png",
          width: 800,
          height: 600,
        },
      ],
    },
    twitter: {
      site: "@site",
      card: "summary",
      description: dict.exploreProjects,
      creator: "@YgorMendanha",
      title: dict.projects,
    },
  };
}

export default async function ProjectsPage({
  params,
}: {
  params: Promise<{ lang: "en" | "pt" }>;
}) {
  const { lang } = await params;
  const dict = getDictionary(lang);
  const Projects = ProjectsDetails({ lang }) ?? [];

  return (
    <div className="bg-black-purple text-white">
      <section className="container mx-auto pt-20 md:pt-30 px-5 py-30 min-h-screen gap-20 flex flex-col">
        <ScrollReveal
          speed={"slow"}
          direction="left"
          reverse
          className="flex flex-col sm:flex-row sm:items-center sm:justify-between"
        >
          <div>
            <h1 className="text-3xl font-extrabold">{dict.projects}</h1>
            <p className="mt-2 light-gray">{dict.workShowcaseDescription}</p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch ">
          {Projects.map((project, idx) => (
            <article
              key={idx}
              className="group flex flex-col h-full p-6 rounded-2xl bg-white shadow-sm hover:shadow-lg transition-all transform-gpu hover:-translate-y-0.5 duration-300 focus-within:shadow-lg outline-none"
              tabIndex={0}
              aria-labelledby={`project-title-${project.title}`}
              role="article"
            >
              <div className="rounded-lg overflow-hidden h-44 lg:h-56 relative">
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
              </div>

              <div className="mt-4">
                <h3
                  id={`project-title-${project.title}`}
                  className="text-xl text-dark font-semibold"
                >
                  {project.title}
                </h3>

                {project.tags && project.tags.length > 0 && (
                  <div
                    className="mt-3 flex flex-wrap gap-2"
                    aria-label="Tags do projeto"
                  >
                    {project.tags.map((t) => (
                      <span
                        key={t}
                        className="text-xs px-2 py-1 bg-purple-bright/10 text-black-purple rounded-full border border-purple-bright/20"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                )}

                <p className="text-sm text-dark mt-2 md:h-full max-h-[200px] overflow-y-auto whitespace-pre-wrap">
                  {project.details}
                </p>
              </div>

              <div className="flex-1" />

              <footer className="mt-4 pt-4 border-t w-full border-slate-100 flex items-center justify-between gap-3">
                <div className="flex items-center w-full gap-2 flex-wrap">
                  {project.internalLink && (
                    <Button
                      className="w-full"
                      href={project.internalLink}
                      aria-label={`${lang === "pt" ? "Ver" : "View"} ${
                        project.title
                      }`}
                    >
                      {dict.moreDetails}
                      <FiLink size={25} className="ml-1" />
                    </Button>
                  )}
                  <Button
                    className="w-full"
                    target={project.link ? "_blank" : undefined}
                    rel={project.link ? "noopener noreferrer" : undefined}
                    href={project.link ?? "#contact"}
                    aria-label={`${lang === "pt" ? "Ver" : "View"} ${
                      project.title
                    }`}
                  >
                    {dict.toView ?? (lang === "pt" ? "Ver" : "View")}{" "}
                    <FiExternalLink size={25} className="ml-1" />
                  </Button>
                </div>
              </footer>
            </article>
          ))}
        </div>
        <ScrollReveal
          direction="bottom"
          className="flex w-full flex-col items-center justify-between"
        >
          <Button
            href="/services"
            variant="ghost"
            aria-label={`${dict.seeMore} ${dict.services}`}
          >
            {`${dict.seeMore} ${dict.services}`}
          </Button>
        </ScrollReveal>
      </section>
      <Contact lang={lang} title={dict.contact.call} text={dict.contact.text} />
    </div>
  );
}
