"use client";

import React from "react";
import Link from "next/link";
import { BsArrowRight } from "react-icons/bs";
import { FaCode } from "react-icons/fa";
import { FiPackage } from "react-icons/fi";
import { HiOutlineDocumentText } from "react-icons/hi";
import { MdOutlineExplore } from "react-icons/md";
import { ScrollReveal } from "../partials/ScrollAnimate";
import clsx from "clsx";

export function Steps({ lang }: { lang: "pt" | "en" }) {
  const content = {
    pt: {
      title: "Processo de desenvolvimento",
      description:
        "Um fluxo claro e transparente — da descoberta à entrega — para garantir resultado e confiança em cada etapa.",
      btn: "Vamos conversar",
      items: [
        {
          icon: <MdOutlineExplore size={40} />,
          title: "Descoberta",
          desc: "Entendemos juntos suas necessidades",
        },
        {
          icon: <HiOutlineDocumentText size={40} />,
          title: "Planejamento",
          desc: "Defino a solução mais eficiente para seu caso",
        },
        {
          icon: <FaCode size={40} />,
          title: "Desenvolvimento",
          desc: "Criação ágil, transparente e personalizada",
        },
        {
          icon: <FiPackage size={40} />,
          title: "Entrega e suporte",
          desc: "Você recebe a solução pronta, com acompanhamento para garantir resultados",
        },
      ],
    },
    en: {
      title: "Development Process",
      description:
        "A clear and transparent workflow — from discovery to delivery — to ensure results and trust at every stage.",
      btn: "Let's Talk",
      items: [
        {
          icon: <MdOutlineExplore size={40} />,
          title: "Discovery",
          desc: "We understand your needs together",
        },
        {
          icon: <HiOutlineDocumentText size={40} />,
          title: "Planning",
          desc: "I define the most efficient solution for your case",
        },
        {
          icon: <FaCode size={40} />,
          title: "Development",
          desc: "Agile, transparent, and personalized creation",
        },
        {
          icon: <FiPackage size={40} />,
          title: "Delivery & Support",
          desc: "You receive the ready solution, with follow-up to ensure results",
        },
      ],
    },
  };

  const t = content[lang] || content.pt;

  return (
    <section
      id="steps"
      className="bg-black-purple py-24 relative overflow-hidden"
    >
      {/* Detalhe de fundo decorativo */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[300px] bg-purple-bright/5 blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-5 relative z-10">
        {/* Header da Seção */}
        <ScrollReveal direction="bottom" className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
            {t.title}
          </h2>
          <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
            {t.description}
          </p>
        </ScrollReveal>

        {/* Grade de Processos */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 relative">
          {t.items.map((step, idx) => {
            const isLast = idx === t.items.length - 1;

            return (
              <React.Fragment key={idx}>
                <ScrollReveal
                  direction="bottom"
                  className="relative group h-full"
                >
                  <div
                    className={clsx(
                      "h-full flex flex-col items-center text-center p-8 rounded-3xl bg-white/5 border transition-all duration-300 relative overflow-hidden",
                      isLast
                        ? "border-yellow/20 hover:border-yellow/50 group-hover:shadow-[0_0_20px_rgba(255,204,0,0.05)]"
                        : "border-white/10 hover:border-cyan-light/30",
                    )}
                  >
                    {/* Número da etapa */}
                    <span
                      className={clsx(
                        "absolute top-4 right-6 font-black text-4xl opacity-10 transition-colors",
                        isLast ? "text-yellow" : "text-white",
                      )}
                    >
                      0{idx + 1}
                    </span>

                    {/* Ícone com Amarelo no último item */}
                    <div
                      className={clsx(
                        "mb-6 transition-all duration-300 transform group-hover:scale-110",
                        isLast
                          ? "text-yellow shadow-yellow"
                          : "text-cyan-light",
                      )}
                    >
                      {step.icon}
                    </div>

                    <h3
                      className={clsx(
                        "text-xl font-bold mb-3 transition-colors",
                        isLast
                          ? "group-hover:text-yellow text-white"
                          : "text-white",
                      )}
                    >
                      {step.title}
                    </h3>

                    <p className="text-gray-400 text-sm leading-relaxed">
                      {step.desc}
                    </p>
                  </div>

                  {/* Seta Decorativa Desktop - Amarela na transição para o último */}
                  {!isLast && (
                    <div className="hidden lg:block absolute top-1/2 -right-6 -translate-y-1/2 z-20">
                      <BsArrowRight
                        className={clsx(
                          "text-2xl animate-pulse",
                          idx === 2 ? "text-yellow" : "text-purple-bright",
                        )}
                      />
                    </div>
                  )}
                </ScrollReveal>
              </React.Fragment>
            );
          })}
        </div>

        {/* CTA Final */}
        <ScrollReveal direction="top" className="mt-20 text-center">
          <Link
            href="#contact"
            className="inline-block bg-cyan-light hover:bg-yellow text-black-purple px-10 py-4 rounded-full font-bold text-lg transition-all duration-300 hover:shadow-[0_0_20px_rgba(255,204,0,0.4)] transform hover:-translate-y-1"
          >
            {t.btn}
          </Link>
        </ScrollReveal>
      </div>
    </section>
  );
}
