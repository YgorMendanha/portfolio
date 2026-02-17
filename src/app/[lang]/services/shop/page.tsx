"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  FiShoppingCart,
  FiBarChart2,
  FiSearch,
  FiShield,
  FiClock,
  FiTrendingUp,
} from "react-icons/fi";
import { Contact } from "@/components";
import { FaCheckCircle } from "react-icons/fa";
import { Button } from "@/components/partials/ui/button";
import { ProjectsDetails } from "@/utils/functions/getProjectsDetails";
import { ScrollReveal } from "@/components/partials/ScrollAnimate";

export default function ShopService({
  params,
}: {
  params: Promise<{ lang: "en" | "pt" }>;
}) {
  const { lang } = React.use(params);
  const Projects = ProjectsDetails({ lang });

  const content = {
    pt: {
      badge: "Loja pronta + consultoria",
      heading:
        "Crio lojas que vendem — e consultorias que fazem elas crescerem.",
      sub: "Desenvolvimento sob medida, otimização de conversão e SEO técnico focado em resultados reais.",
      proofs: "Performance comprovada",
      proofsSub:
        "Não é apenas design; é engenharia focada em velocidade e conversão.",
      ctaTitle: "Quer que eu crie ou otimize sua loja?",
      ctaPoints: [
        "Brief rápido — sem compromisso",
        "Plano de melhorias realista",
        "Preço inicial aproximado",
      ],
    },
    en: {
      badge: "Ready Store + Consulting",
      heading:
        "I build stores that sell — and consulting that makes them grow.",
      sub: "Bespoke development, conversion optimization, and technical SEO focused on real results.",
      proofs: "Proven Performance",
      proofsSub:
        "It's not just design; it's engineering focused on speed and conversion.",
      ctaTitle: "Want me to build or optimize your store?",
      ctaPoints: [
        "Quick brief — no commitment",
        "Realistic improvement plan",
        "Approximate starting price",
      ],
    },
  };

  const t = content[lang] || content.pt;

  const features = [
    {
      title:
        lang === "pt" ? "Criação de lojas sob medida" : "Custom Store Creation",
      desc:
        lang === "pt"
          ? "Loja otimizada, responsiva e alinhada à identidade da sua marca — pronta para vender desde o primeiro dia."
          : "Optimized, responsive store aligned with your brand identity — ready to sell from day one.",
      icon: <FiShoppingCart className="w-6 h-6" />,
      color: "border-cyan-light/20",
    },
    {
      title:
        lang === "pt"
          ? "Consultoria de vendas & CRO"
          : "Sales Consulting & CRO",
      desc:
        lang === "pt"
          ? "Aumentamos a taxa de conversão com testes A/B, copy que converte e jornadas de compra eficientes."
          : "We increase conversion rates with A/B testing, high-converting copy and efficient purchase journeys.",
      icon: <FiBarChart2 className="w-6 h-6" />,
      color: "border-yellow/20",
    },
    {
      title: lang === "pt" ? "SEO & Performance" : "SEO & Performance",
      desc:
        lang === "pt"
          ? "Ranqueamento técnico e conteúdo estratégico para trazer tráfego orgânico qualificado."
          : "Technical ranking and strategic content to drive qualified organic traffic.",
      icon: <FiSearch className="w-6 h-6" />,
      color: "border-purple-bright/20",
    },
  ];

  const images = {
    shop: {
      img: "/finesse-store.png",
      url: Projects.find((p) => p.id === "ecommerce")?.link ?? "#",
    },
    shopMetrics: "/metrics/metric_shop.png",
    shopProductMetrics: "/metrics/metric_shop_page_product.png",
  };

  return (
    <div className="bg-black-purple text-white flex flex-col gap-24 pb-20">
      {/* Hero Section */}
      <section className="relative pt-32 min-h-screen flex items-center overflow-hidden">
        <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-purple-bright/10 rounded-full blur-[120px] pointer-events-none" />

        <div className="container mx-auto px-5 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <ScrollReveal direction="left">
            <span className="inline-block px-4 py-1.5 bg-yellow/10 text-yellow border border-yellow/20 rounded-full text-xs font-bold uppercase tracking-widest mb-6">
              {t.badge}
            </span>

            <h1 className="text-4xl md:text-6xl font-black mb-6 leading-tight">
              {t.heading}
            </h1>

            <p className="text-xl text-gray-400 mb-10 leading-relaxed">
              {t.sub}
            </p>

            <div className="flex flex-wrap gap-4 mb-12">
              <Button
                href="#example-store"
                className="bg-cyan-light text-black-purple"
              >
                {lang === "pt" ? "Ver loja de exemplo" : "View example store"}
              </Button>

              <Button href="#contact" variant="ghost">
                {lang === "pt" ? "Solicitar consultoria" : "Request consulting"}
              </Button>
            </div>

            {/* Quick Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[
                {
                  label: lang === "pt" ? "Segurança" : "Security",
                  sub: lang === "pt" ? "Pagamentos seguros" : "Secure payments",
                  icon: <FiShield />,
                  color: "text-green-400",
                },
                {
                  label: lang === "pt" ? "Entrega" : "Delivery",
                  sub:
                    lang === "pt"
                      ? "Ritmo ágil e previsível"
                      : "Agile and predictable pace",
                  icon: <FiClock />,
                  color: "text-cyan-light",
                },
                {
                  label: lang === "pt" ? "Resultados" : "Results",
                  sub:
                    lang === "pt" ? "Foco em conversão" : "Conversion-focused",
                  icon: <FiTrendingUp />,
                  color: "text-yellow",
                },
              ].map((card, i) => (
                <div
                  key={i}
                  className="bg-white/5 border border-white/10 p-4 rounded-2xl"
                >
                  <div className={`mb-2 ${card.color}`}>{card.icon}</div>
                  <div className="text-[10px] text-gray-500 uppercase font-bold">
                    {card.label}
                  </div>
                  <div className="text-sm font-bold text-white">{card.sub}</div>
                </div>
              ))}
            </div>
          </ScrollReveal>

          <ScrollReveal direction="right" className="relative group">
            <Link
              href={images.shop.url}
              target="_blank"
              className="block relative z-10 rounded-3xl overflow-hidden border border-white/10 shadow-2xl"
            >
              <Image
                src={images.shop.img}
                alt={lang === "pt" ? "Preview da loja" : "Store preview"}
                width={700}
                height={500}
                className="transition-transform duration-700 group-hover:scale-105"
              />
            </Link>
            <div className="absolute -inset-4 bg-yellow/5 blur-2xl -z-10 group-hover:bg-yellow/10 transition-all" />
          </ScrollReveal>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-white/[0.02] py-24 border-y border-white/5">
        <div className="container mx-auto px-5">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((f, i) => (
              <ScrollReveal
                key={i}
                direction="bottom"
                className={`p-8 bg-black-purple border ${f.color} rounded-3xl group hover:-translate-y-2 transition-all`}
              >
                <div className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center mb-6 group-hover:text-white transition-colors">
                  {f.icon}
                </div>
                <h3 className="text-xl font-bold mb-4">{f.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  {f.desc}
                </p>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Proofs Section */}
      <section className="container mx-auto px-5">
        <ScrollReveal direction="top" className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">{t.proofs}</h2>
          <p className="text-gray-400 text-lg">{t.proofsSub}</p>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {[images.shopMetrics, images.shopProductMetrics].map((img, i) => (
            <ScrollReveal
              key={i}
              direction="bottom"
              className="rounded-3xl overflow-hidden border border-white/10 hover:border-cyan-light/50 transition-colors bg-white/5 p-2"
            >
              <Image
                src={img}
                alt={lang === "pt" ? "Métricas" : "Metrics"}
                width={600}
                height={400}
                className="rounded-2xl"
              />
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* Contact Section Overlay */}
      <Contact lang={lang} />
    </div>
  );
}
