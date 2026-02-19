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
      <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-purple-bright/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-cyan-light/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="container px-5 mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
        {/* Coluna de Texto */}
        <ScrollReveal
          reverse
          speed={"slow"}
          direction="left"
          className="flex flex-col gap-6 text-center lg:text-left order-2 lg:order-1"
        >
          <div className="space-y-2">
            <span className="text-cyan-light font-bold tracking-wider uppercase text-sm md:text-base">
              {lang === "pt"
                ? "Sites e sistemas que dão resultado"
                : "Websites and systems that deliver results"}
            </span>

            <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight">
              {lang === "pt" ? (
                <>
                  Crio soluções para{" "}
                  <span className="text-yellow">vender mais</span> e{" "}
                  <span className="text-yellow">escalar</span> seu negócio.
                </>
              ) : (
                <>
                  I build solutions to{" "}
                  <span className="text-yellow">sell more</span> and{" "}
                  <span className="text-yellow">scale</span> your business.
                </>
              )}
            </h2>
          </div>

          <h4 className="text-lg md:text-2xl text-gray-300 font-light max-w-xl mx-auto lg:mx-0 leading-relaxed">
            {lang === "pt" ? (
              <>
                Especialista em e-commerce, sistemas ERP e soluções sob medida
                para empresas que querem vender mais e gerenciar melhor.
              </>
            ) : (
              <>
                Specialist in e-commerce, ERP systems, and custom solutions for
                companies looking to sell more and manage better.
              </>
            )}
          </h4>

          <div className="flex flex-col sm:flex-row items-center gap-6 mt-4 justify-center lg:justify-start">
            <Button
              href={"#contact"}
              className="bg-purple-bright hover:bg-cyan-light hover:text-black-purple text-white px-8 py-6 text-lg rounded-full transition-all duration-300 shadow-[0_0_20px_rgba(63,32,186,0.5)] hover:shadow-[0_0_25px_rgba(0,194,255,0.6)]"
            >
              {lang === "pt" ? <>Vamos conversar</> : <>Let's talk</>}
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

        {/* Coluna da Animação */}
        <ScrollReveal
          reverse
          speed={"slow"}
          direction="right"
          className="order-1 lg:order-2 flex justify-center lg:justify-end relative"
        >
          <div className="w-full max-w-[350px] lg:max-w-[500px] relative">
            <div className="absolute inset-0 bg-gradient-to-tr from-cyan-light/20 to-purple-bright/20 rounded-full blur-3xl -z-10 animate-pulse" />

            <Lottie options={defaultOptions} isClickToPauseDisabled={true} />
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
