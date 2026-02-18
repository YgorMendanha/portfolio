import React from "react";
import { Contact } from "@/components";
import { Button } from "@/components/partials/ui/button";
import { ScrollReveal } from "@/components/partials/ScrollAnimate";
import {
  ServiceCard,
  ServicesForPage,
} from "@/utils/functions/getServicesDetails";
import { Metadata } from "next";
import { cookies } from "next/headers";

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
    pt: "Serviços",
    en: "Services",
  };

  const descriptions = {
    pt: "Oferecemos soluções digitais completas: criação de lojas e-commerce, apps personalizados, otimização de conversão, SEO, analytics, integrações, manutenção e design UX/UI, tudo pensado para gerar resultados e crescimento para o seu negócio",
    en: "We offer complete digital solutions: e-commerce store creation, custom apps, conversion optimization, SEO, analytics, integrations, maintenance, and UX/UI design, all designed to deliver results and growth for your business",
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

export default async function ServicesPage({
  params,
}: {
  params: Promise<{ lang: "en" | "pt" }>;
}) {
  const { lang } = await params;
  const { complementaryServices, mainServices } = ServicesForPage({ lang });

  const Card = ({
    s,
    isMain = false,
  }: {
    s: ServiceCard;
    isMain?: boolean;
  }) => {
    return (
      <article
       
        className={`group relative flex flex-col h-full p-6 md:p-8 rounded-3xl border transition-all duration-500 overflow-hidden hover:-translate-y-2 ${
          isMain
            ? "bg-white/[0.04] border-white/10 hover:border-yellow/40 shadow-2xl"
            : "bg-white/[0.02] border-white/5 hover:border-cyan-light/30"
        }`}
      >
        <div
          className={`absolute left-0 top-1/4 w-1 h-1/2 scale-y-0 group-hover:scale-y-100 transition-transform duration-500 rounded-r-full ${
            isMain
              ? "bg-yellow shadow-[0_0_15px_#ffcc00]"
              : "bg-cyan-light shadow-[0_0_15px_#22d3ee]"
          }`}
        />

        <div
          className={`absolute -inset-1 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-3xl -z-10 ${
            isMain ? "bg-yellow/10" : "bg-cyan-light/10"
          }`}
        />

        <header className="mb-6 flex items-start justify-between">
          <div
            className={`p-4 rounded-2xl transition-all duration-300 ${
              isMain
                ? "bg-yellow/10 text-yellow group-hover:bg-yellow group-hover:text-black-purple"
                : "bg-cyan-light/10 text-cyan-light group-hover:bg-cyan-light group-hover:text-black-purple"
            }`}
          >
            {s.icon}
          </div>
        </header>

        <div className="flex-1 flex flex-col">
          <h3
            className={`text-2xl font-bold text-white mb-4 transition-colors duration-300 ${
              isMain ? "group-hover:text-yellow" : "group-hover:text-cyan-light"
            }`}
          >
            {s.title}
          </h3>

          <p className="text-gray-400 leading-relaxed mb-6">{s.short}</p>

          <ul className="space-y-3 mb-8">
            {s.bullets?.map((b, i) => (
              <li
                key={i}
                className="flex items-start gap-3 text-sm text-gray-300"
              >
                <span
                  className={`mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0 ${
                    isMain
                      ? "bg-yellow shadow-[0_0_8px_#ffcc00]"
                      : "bg-cyan-light"
                  }`}
                />
                {b}
              </li>
            ))}
          </ul>

          <div className="mt-auto flex flex-col sm:flex-row gap-3 w-full">
            <Button
              href="#contact"
            
              className={`w-full sm:w-auto ${
                isMain
                  ? "bg-yellow text-black-purple hover:bg-white"
                  : "bg-cyan-light text-black-purple hover:bg-white"
              }`}
            >
              {lang === "pt" ? "Solicitar" : "Request"}
            </Button>

            {s.url && (
              <Button
                variant="ghost"
                href={s.url}
                className="border-white/10 text-white hover:bg-white/5 w-full sm:w-auto"
              >
                {lang === "pt" ? "Mais detalhes" : "More details"}
              </Button>
            )}
          </div>
        </div>
      </article>
    );
  };

  return (
    
    <div className="min-h-screen bg-black-purple text-white pt-32 pb-20 overflow-x-hidden w-full">
      {/* Intro da Página */}
      <header className="container px-5 mx-auto mb-20">
        <ScrollReveal direction="bottom">
          <div className="max-w-3xl">
            <div className="flex items-center gap-3 mb-4">
              <span className="w-12 h-1 bg-yellow rounded-full" />
              <span className="text-yellow uppercase tracking-widest text-xs font-black">
                {lang === "pt" ? "Expertise" : "Expertise"}
              </span>
            </div>
            
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-black mb-6 tracking-tight break-words">
              {lang === "pt" ? "Serviços" : "Services"}
              <span className="text-yellow">.</span>
            </h1>
            <p className="text-xl text-gray-400 leading-relaxed">
              {lang === "pt"
                ? "Soluções digitais focadas em resolver problemas complexos e gerar lucro real."
                : "Digital solutions focused on solving complex problems and generating real profit."}
            </p>
          </div>
        </ScrollReveal>
      </header>

      {/* Serviços Principais */}
      <div className="container px-5 mx-auto mb-24">
        <ScrollReveal direction="left" className="mb-10">
          <div className="flex items-center gap-4">
            <h2 className="text-2xl md:text-3xl font-black text-white">
              {lang === "pt" ? "Principais" : "Main Services"}
            </h2>
            <div className="flex-1 h-px bg-yellow/20"></div>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {mainServices.map((s) => (
            <Card s={s} key={s.id} isMain={true} />
          ))}
        </div>
      </div>

      {/* Outros Serviços */}
      <div className="container px-5 mx-auto mb-32">
        <ScrollReveal direction="right" className="mb-10">
          <div className="flex items-center gap-4">
            <h2 className="text-2xl md:text-3xl font-black text-gray-400">
              {lang === "pt" ? "Especialidades" : "Specialties"}
            </h2>
            <div className="flex-1 h-px bg-cyan-light/20"></div>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {complementaryServices.map((s) => (
            <Card s={s} key={s.id} />
          ))}
        </div>
      </div>

      <div className="border-t border-white/5 pt-10">
        <Contact lang={lang} />
      </div>
    </div>
  );
}