"use client";

import React from "react";
import Image from "next/image";
import { FiShoppingCart, FiTrendingUp, FiSmartphone } from "react-icons/fi";
import { Button } from "@/components/partials/ui/button";
import { CardChangeImg } from "./components/card";
import { Contact } from "@/components";
import { ProjectsDetails } from "@/utils/functions/getProjectsDetails";
import { ScrollReveal } from "@/components/partials/ScrollAnimate";
import { SectionsForPageShopDetails } from "@/utils/functions/getSectionsForPageShop";

export default function StoreDocWithIllustrations({
  params,
}: {
  params: Promise<{ lang: "en" | "pt" }>;
}) {
  const { lang } = React.use(params);

  const Projects = ProjectsDetails({ lang });
  const SectionsProjects = SectionsForPageShopDetails({ lang });

  const texts =
    lang === "pt"
      ? {
          understandStoreQuickly: "Uma loja que se explica sozinha",
          focusOnSales:
            "Ser encontrado, ser entendido e permitir a compra sem fricção — é nisso que focamos para gerar vendas reais.",
          openStoreDemo: "Abrir loja (demo)",
          requestReview: "Pedir avaliação",
          clearPages: "Páginas claras",
          easyHomeProductCheckout: "Home, produto e checkout fáceis",
          worksOnMobile: "Funciona no celular",
          touchFriendlyLayoutCheckout: "Layout e checkout pensados para toque",
          measurement: "Medição",
          trackVisitsAndSales: "Acompanhe visitas e vendas",
          contactCall: "Fale Comigo",
          contactText:
            "Fale comigo pelo WhatsApp ou e-mail. Vou entender sua ideia, propor soluções criativas e transformar sua necessidade em um app sob medida. O próximo passo para o seu projeto começa agora.",
        }
      : {
          understandStoreQuickly: "A store that explains itself",
          focusOnSales:
            "Being found, being understood and enabling frictionless purchase — that's what we focus on to generate real sales.",
          openStoreDemo: "Open demo store",
          requestReview: "Request review",
          clearPages: "Clear pages",
          easyHomeProductCheckout: "Easy home, product and checkout",
          worksOnMobile: "Works on mobile",
          touchFriendlyLayoutCheckout: "Touch-friendly layout and checkout",
          measurement: "Measurement",
          trackVisitsAndSales: "Track visits and sales",
          contactCall: "Contact",
          contactText:
            "Talk to me via WhatsApp or email. I'll understand your idea, propose creative solutions and turn your need into a custom app. The next step for your project starts now.",
        };

  return (
    <div className="bg-black-purple text-white min-h-screen">
      {/* Hero */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-yellow/5 rounded-full blur-[120px] pointer-events-none" />

        <div className="container mx-auto px-5 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <ScrollReveal direction="left">
              <span className="inline-block px-4 py-1.5 bg-yellow/10 text-yellow border border-yellow/20 rounded-full text-xs font-bold uppercase tracking-widest mb-6">
                E-commerce Case
              </span>

              <h1 className="text-4xl md:text-6xl font-extrabold leading-tight mb-6">
                {texts.understandStoreQuickly}
              </h1>

              <p className="text-xl text-gray-400 leading-relaxed mb-10">
                {texts.focusOnSales}
              </p>

              <div className="flex flex-wrap gap-4">
                <Button
                  target="_blank"
                  variant="primary"
                  className="px-8"
                  href={Projects.find((p) => p.id === "ecommerce")?.link}
                >
                  {texts.openStoreDemo}
                </Button>

                <Button href="#contact" variant="ghost" className="px-8">
                  {texts.requestReview}
                </Button>
              </div>
            </ScrollReveal>

            <ScrollReveal direction="right" className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-yellow/30 to-cyan-light/30 rounded-3xl blur opacity-30 group-hover:opacity-50 transition duration-1000"></div>
              <div className="relative rounded-2xl overflow-hidden border border-white/10 bg-black-purple shadow-2xl">
                <Image
                  src="/finesse-store.png"
                  alt="E-commerce Showcase"
                  width={600}
                  height={400}
                  className="w-full h-auto object-cover transform transition-transform duration-700 group-hover:scale-105"
                />
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Benefícios */}
      <section className="py-20 bg-white/[0.02] border-y border-white/5">
        <div className="container mx-auto px-5">
          <ScrollReveal
            direction="bottom"
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            <div className="group p-8 bg-white/[0.03] border border-white/5 rounded-3xl hover:border-yellow/30 transition-all">
              <div className="w-12 h-12 bg-yellow/10 text-yellow rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <FiShoppingCart size={24} />
              </div>
              <h3 className="text-xl font-bold mb-3">{texts.clearPages}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                {texts.easyHomeProductCheckout}
              </p>
            </div>

            <div className="group p-8 bg-white/[0.03] border border-white/5 rounded-3xl hover:border-cyan-light/30 transition-all">
              <div className="w-12 h-12 bg-cyan-light/10 text-cyan-light rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <FiSmartphone size={24} />
              </div>
              <h3 className="text-xl font-bold mb-3">{texts.worksOnMobile}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                {texts.touchFriendlyLayoutCheckout}
              </p>
            </div>

            <div className="group p-8 bg-white/[0.03] border border-white/5 rounded-3xl hover:border-purple-bright/30 transition-all">
              <div className="w-12 h-12 bg-purple-bright/10 text-purple-bright rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <FiTrendingUp size={24} />
              </div>
              <h3 className="text-xl font-bold mb-3">{texts.measurement}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                {texts.trackVisitsAndSales}
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Seções */}
      <section className="py-24 container mx-auto px-5 space-y-32">
        {SectionsProjects.map((sec, idx) => (
          <ScrollReveal
            key={sec.id}
            direction={idx % 2 === 0 ? "left" : "right"}
          >
            <CardChangeImg item={sec} index={idx + 1} />
          </ScrollReveal>
        ))}
      </section>

      {/* CTA Final */}
      <div className="mt-20 border-t border-white/5">
        <Contact lang={lang} />
      </div>
    </div>
  );
}
