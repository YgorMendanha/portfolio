"use client";

import { BsCartFill, BsFillGearFill, BsFillPinAngleFill } from "react-icons/bs";
import { ScrollReveal } from "../partials/ScrollAnimate";

export function About({ lang }: { lang: "pt" | "en" }) {
  const content = {
    pt: {
      title: "Transformando Ideias em Resultados",
      subtitle:
        "Sou Ygor Mendanha, desenvolvedor com experiência em e-commerce, ERP e projetos sob medida. Nos últimos anos, colaborei com diversos setores criando soluções que aumentam vendas e otimizam processos.",
      cards: [
        {
          title: "E-commerce que vende",
          desc: "Crio lojas online rápidas, seguras e otimizadas para transformar visitantes em clientes, com foco total em conversão.",
        },
        {
          title: "Sistemas ERP e Automação",
          desc: "Desenvolvo soluções sob medida que automatizam processos, facilitam a gestão do seu negócio e aumentam a produtividade.",
        },
        {
          title: "Landing Pages de Impacto",
          desc: "Páginas impactantes criadas para atrair, engajar e gerar resultados reais em campanhas, eventos ou lançamentos.",
        },
      ],
    },
    en: {
      title: "Turning Ideas into Results",
      subtitle:
        "I'm Ygor Mendanha, a developer with experience in e-commerce, ERP, and bespoke projects. In recent years, I've collaborated with various sectors creating solutions that boost sales and optimize processes.",
      cards: [
        {
          title: "E-commerce that sells",
          desc: "I build fast, secure, and optimized online stores to turn visitors into customers, with a total focus on conversion.",
        },
        {
          title: "ERP Systems & Automation",
          desc: "I develop custom solutions that automate processes, simplify your business management, and increase productivity.",
        },
        {
          title: "High-Impact Landing Pages",
          desc: "Impactful pages created to attract, engage, and deliver real results for campaigns, events, or product launches.",
        },
      ],
    },
  };

  const t = content[lang] || content.pt;

  return (
    <section id="about" className="bg-black-purple py-24 overflow-x-hidden">
      <div className="container mx-auto px-5">
        {/* Header da Seção */}
        <ScrollReveal direction="top">
          <div className="max-w-4xl mx-auto text-center mb-20">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
              {t.title}
            </h2>
            <p className="text-gray-400 text-lg md:text-xl leading-relaxed">
              {t.subtitle}
            </p>
          </div>
        </ScrollReveal>

        {/* Grade de Serviços */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Card 1 - E-commerce (Ciano) */}
          <ScrollReveal direction="left">
            <div className="group h-full bg-white/5 border border-white/10 hover:border-cyan-light/50 p-8 rounded-3xl transition-all duration-500 hover:-translate-y-2 relative overflow-hidden">
              <div className="relative z-10">
                <div className="w-14 h-14 bg-cyan-light/10 text-cyan-light rounded-2xl flex items-center justify-center mb-6">
                  <BsCartFill size={28} />
                </div>
                <h3 className="text-white text-xl font-bold mb-4">{t.cards[0].title}</h3>
                <p className="text-gray-400 text-sm md:text-base leading-relaxed">{t.cards[0].desc}</p>
              </div>
            </div>
          </ScrollReveal>

          {/* Card 2 - ERP (Roxo Ajustado para Visibilidade) */}
          <ScrollReveal direction="bottom">
            <div className="group h-full bg-white/5 border border-white/10 hover:border-purple-bright/60 p-8 rounded-3xl transition-all duration-500 hover:-translate-y-2 relative overflow-hidden">
              {/* Efeito de brilho roxo ao fundo para visibilidade */}
              <div className="absolute -inset-24 bg-purple-bright/5 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10" />
              
              <div className="relative z-10">
                {/* Ícone com roxo mais vibrante */}
                <div className="w-14 h-14 bg-purple-bright/20 text-purple-bright rounded-2xl flex items-center justify-center mb-6 shadow-[0_0_15px_rgba(63,32,186,0.3)]">
                  <BsFillGearFill size={28} />
                </div>
                <h3 className="text-white text-xl font-bold mb-4">{t.cards[1].title}</h3>
                <p className="text-gray-400 text-sm md:text-base leading-relaxed">{t.cards[1].desc}</p>
              </div>
            </div>
          </ScrollReveal>

          {/* Card 3 - Landing Pages (Amarelo) */}
          <ScrollReveal direction="right">
            <div className="group h-full bg-white/5 border border-white/10 hover:border-yellow/50 p-8 rounded-3xl transition-all duration-500 hover:-translate-y-2 relative overflow-hidden">
              <div className="relative z-10">
                <div className="w-14 h-14 bg-yellow/10 text-yellow rounded-2xl flex items-center justify-center mb-6">
                  <BsFillPinAngleFill size={28} />
                </div>
                <h3 className="text-white text-xl font-bold mb-4">{t.cards[2].title}</h3>
                <p className="text-gray-400 text-sm md:text-base leading-relaxed">{t.cards[2].desc}</p>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}