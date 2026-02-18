import Image from "next/image";
import { FiExternalLink, FiLink, FiStar } from "react-icons/fi";
import { Contact } from "@/components";
import { ScrollReveal } from "@/components/partials/ScrollAnimate";
import { Button } from "@/components/partials/ui/button";
import { ProjectsDetails } from "@/utils/functions/getProjectsDetails";
import { cookies } from "next/headers";
import { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: "en" | "pt" }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const cookieStore = await cookies();
  const pathname = cookieStore.get("pathname");

  const path = pathname?.value || "/";

  const titles = {
    pt: "Projetos",
    en: "Projects",
  };

  const descriptions = {
    pt: "Explore my technology and web development projects, with practical solutions, experiences as a programmer, and innovative case studies.",
    en: "Explore meus projetos de tecnologia e desenvolvimento web, com soluções práticas, experiências como programador e cases inovadores.",
  };

  return {
    title: titles[lang] || titles.pt,
    description: descriptions[lang] || descriptions.pt,
    openGraph: {
      title: titles[lang] || titles.pt,
      description: descriptions[lang] || descriptions.pt,
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
      description: descriptions[lang] || descriptions.pt,
      creator: "@YgorMendanha",
      title: titles[lang] || titles.pt,
    },
  };
}

export default async function ProjectsPage({
  params,
}: {
  params: Promise<{ lang: "en" | "pt" }>;
}) {
  const { lang } = await params;
  const Projects = ProjectsDetails({ lang }) ?? [];

  const texts =
    lang === "pt"
      ? {
          projects: "Projetos",
          workShowcaseDescription:
            "Desenvolvimento de lojas, aplicativos e sistemas — veja meus projetos realizados e peça um orçamento.",
          moreDetails: "Mais detalhes",
          toView: "Visualizar",
          contactCall: "Fale Comigo",
          contactText:
            "Fale comigo pelo WhatsApp ou e-mail. Vou entender sua ideia, propor soluções criativas e transformar sua necessidade em um app sob medida. O próximo passo para o seu projeto começa agora.",
          ctaTitle: "Busca uma solução exclusiva?",
          ctaButton: "Conhecer meus Serviços",
        }
      : {
          projects: "Projects",
          workShowcaseDescription:
            "Development of stores, apps and systems — see my completed projects and request a quote.",
          moreDetails: "More details",
          toView: "View",
          contactCall: "Contact",
          contactText:
            "Chat with me via WhatsApp or email. I'll understand your idea, propose creative solutions and turn your need into a custom app. The next step for your project starts now.",
          ctaTitle: "Looking for a unique solution?",
          ctaButton: "Explore my Services",
        };

  return (
    <div className="bg-black-purple text-white pt-10">
      <section className="container mx-auto px-5 py-24 min-h-screen flex flex-col gap-16">
        {/* Header da Página com sotaque Amarelo */}
        <ScrollReveal direction="left" className="max-w-3xl">
          <div className="flex items-center gap-3 mb-4">
            <span className="w-12 h-1 bg-yellow rounded-full" />
            <span className="text-yellow uppercase tracking-widest text-xs font-black">
              Showcase
            </span>
          </div>

          <h1 className="text-4xl md:text-7xl font-black mb-6 tracking-tight">
            {texts.projects}
            <span className="text-yellow">.</span>
          </h1>

          <p className="text-xl text-gray-400 leading-relaxed">
            {texts.workShowcaseDescription}
          </p>
        </ScrollReveal>

        {/* Grid de Projetos */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {Projects.map((project, idx) => {
            const isFavorite = Boolean(project.favorite);

            return (
              <article
                key={idx}
                className="group flex flex-col h-full bg-white/[0.02] border border-white/5 rounded-[2rem] overflow-hidden transition-all duration-500 hover:border-yellow/30 hover:bg-white/[0.04] hover:-translate-y-3 shadow-2xl relative"
                role="article"
              >
                {/* Badge de Destaque Amarelo */}
                {isFavorite && (
                  <div className="absolute top-4 right-4 z-20 bg-yellow text-black-purple p-2 rounded-xl shadow-lg">
                    <FiStar fill="currentColor" size={16} />
                  </div>
                )}

                {/* Container da Imagem com Zoom Profundo */}
                <div className="h-64 relative overflow-hidden">
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
                  <div className="absolute inset-0 bg-gradient-to-t from-black-purple via-transparent to-transparent opacity-60" />
                </div>

                {/* Conteúdo */}
                <div className="p-8 flex flex-col flex-1">
                  <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-yellow transition-colors duration-300">
                    {project.title}
                  </h3>

                  {/* Tags Reativas */}
                  {project.tags && project.tags.length > 0 && (
                    <div className="mb-6 flex flex-wrap gap-2">
                      {project.tags.map((t) => (
                        <span
                          key={t}
                          className="text-[10px] uppercase font-black tracking-tighter px-2.5 py-1 bg-cyan-light/10 text-cyan-light border border-cyan-light/20 rounded-md group-hover:border-yellow/50 group-hover:text-yellow transition-all duration-500"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  )}

                  <p className="text-gray-400 text-sm leading-relaxed mb-8 line-clamp-3">
                    {project.details}
                  </p>

                  {/* Ações com hierarquia de cores */}
                  <div className="mt-auto pt-6 border-t border-white/5 flex flex-col gap-3">
                    {project.internalLink && (
                      <Button
                        href={project.internalLink}
                        variant="ghost"
                        className="w-full border-white/10 hover:border-white/20 text-white py-4"
                      >
                        {texts.moreDetails}
                        <FiLink size={18} className="ml-2" />
                      </Button>
                    )}

                    {project.link && (
                      <Button
                        href={project.link ?? "#contact"}
                        target={project.link ? "_blank" : undefined}
                        className="w-full bg-cyan-light hover:bg-yellow text-black-purple font-black py-4 transition-all duration-300"
                      >
                        {texts.toView}
                        <FiExternalLink size={18} className="ml-2" />
                      </Button>
                    )}
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        {/* Footer com CTA Amarelo */}
        <ScrollReveal
          direction="top"
          className="flex flex-col items-center gap-6 mt-20 py-16 border-t border-white/5 relative"
        >
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-40 h-px bg-gradient-to-r from-transparent via-yellow to-transparent" />

          <p className="text-gray-400 font-medium">{texts.ctaTitle}</p>

          <Button
            href="/services"
            className="bg-transparent border-2 border-yellow text-yellow hover:bg-yellow hover:text-black-purple px-12 py-4 rounded-2xl font-black transition-all duration-300 shadow-[0_0_20px_rgba(255,204,0,0.1)]"
          >
            {texts.ctaButton}
          </Button>
        </ScrollReveal>
      </section>

      <Contact lang={lang} />
    </div>
  );
}
