"use client";

import { useParams } from "next/navigation";
import Lottie from "react-lottie";
import animationData from "@/lotties/contactMe.json";
import Link from "next/link";
import { FaGithub, FaLinkedinIn } from "react-icons/fa";
import { BsWhatsapp, BsArrowDown } from "react-icons/bs";
import { sendEventGA } from "@/utils/lib/customEvent";
import { ScrollReveal } from "../partials/ScrollAnimate";
import { Button } from "../partials/ui/button";
import { usePostHog } from "posthog-js/react";

export function IntroSection() {
  const { lang }: { lang?: "pt" | "en" } = useParams();
  const posthog = usePostHog();

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <section
      id="intro"
      className="relative min-h-screen flex items-center justify-center pt-20 pb-10 bg-black-purple overflow-hidden"
    >
      {/* Efeitos de Luz de Fundo */}
      <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-purple-bright/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-cyan-light/10 rounded-full blur-[100px] pointer-events-none" />

      {/* ANIMAÇÃO LOTTIE NO FUNDO */}
      <div className="absolute inset-0 z-0 flex items-center justify-center opacity-20 pointer-events-none">
        <div className="w-full max-w-[600px] lg:max-w-[800px]">
          <Lottie options={defaultOptions} isClickToPauseDisabled={true} />
        </div>
      </div>

      {/* CONTEÚDO CENTRALIZADO */}
      <div className="container px-5 mx-auto relative z-10 flex flex-col items-center text-center">
        <ScrollReveal
          reverse
          speed={"slow"}
          direction="bottom"
          className="flex flex-col gap-8 items-center max-w-4xl"
        >
          {/* Título e Subtítulo */}
          <div className="space-y-6">
            {/* Título Pequeno */}
            <span className="text-cyan-light font-bold tracking-wider uppercase text-sm md:text-base">
              {lang === "pt"
                ? "Engenharia de Software de Alto Impacto"
                : "High-Impact Software Engineering"}
            </span>

            {/* Headline Principal */}
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white leading-tight">
              {lang === "pt" ? (
                <>
                  Arquitetura de Sistemas Sob Medida para{" "}
                  <span className="text-yellow">Escalar</span> seu Negócio.
                </>
              ) : (
                <>
                  Custom System Architecture to{" "}
                  <span className="text-yellow">Scale</span> Your Business.
                </>
              )}
            </h2>

            {/* Descrição */}
            <h4 className="text-lg md:text-xl lg:text-2xl text-gray-300 font-light max-w-3xl mx-auto leading-relaxed">
              {lang === "pt" ? (
                <>
                  Transformamos operações complexas em fluxos digitais eficientes. 
                  Criamos plataformas personalizadas e integrações que garantem segurança, 
                  escala e rentabilidade para o seu negócio.
                </>
              ) : (
                <>
                  We transform complex operations into efficient digital workflows. 
                  We build custom platforms and integrations that ensure security, 
                  scale, and profitability for your business.
                </>
              )}
            </h4>
          </div>

          {/* Botão e Redes Sociais EMPILHADOS */}
          <div className="flex flex-col items-center gap-6 mt-4">
            {/* CTA */}
            <Button
              href={"#contact"}
              className="bg-purple-bright hover:bg-cyan-light hover:text-black-purple text-white px-8 py-6 text-lg rounded-full transition-all duration-300 shadow-[0_0_20px_rgba(63,32,186,0.5)] hover:shadow-[0_0_25px_rgba(0,194,255,0.6)]"
            >
              {lang === "pt" ? (
                <>Agende uma Consultoria Técnica</>
              ) : (
                <>Schedule a Technical Consultation</>
              )}
            </Button>

            {/* Redes Sociais */}
            <nav className="flex items-center gap-4">
              <Link
                href="https://github.com/YgorMendanha"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Github"
                className="text-gray-400 hover:text-white hover:scale-110 transition-transform duration-300 bg-white/5 p-3 rounded-full border border-white/5 hover:border-cyan-light/50"
              >
                <FaGithub size={24} />
              </Link>
              <Link
                href="https://www.linkedin.com/in/ygormendanha"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Linkedin"
                className="text-gray-400 hover:text-white hover:scale-110 transition-transform duration-300 bg-white/5 p-3 rounded-full border border-white/5 hover:border-cyan-light/50"
              >
                <FaLinkedinIn size={24} />
              </Link>
              <Link
                onClick={() => {
                  sendEventGA({
                    name: "click_whatsapp",
                    params: { linkText: "WhatsApp" },
                  });
                  posthog.capture("click_whatsapp");
                }}
                href="https://wa.me/5592982832103"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Whatsapp"
                className="text-gray-400 hover:text-white hover:scale-110 transition-transform duration-300 bg-white/5 p-3 rounded-full border border-white/5 hover:border-cyan-light/50"
              >
                <BsWhatsapp size={24} />
              </Link>
            </nav>
          </div>
        </ScrollReveal>
      </div>

      {/* Indicador de Scroll Down Animado */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce hidden md:block">
        <BsArrowDown className="text-gray-500 text-2xl" />
      </div>
    </section>
  );
}