"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { Button } from "@/components/partials/ui/button";
import { ScrollReveal } from "@/components/partials/ScrollAnimate";
import { FiHome, FiArrowLeft } from "react-icons/fi";

export default function NotFound() {
  const { lang }: { lang?: "pt" | "en" } = useParams();

  return (
    <main className="min-h-screen bg-black-purple flex items-center justify-center p-5 overflow-hidden relative">

      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-yellow/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute -bottom-20 -left-20 w-[300px] h-[300px] bg-purple-bright/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="container max-w-2xl mx-auto text-center relative z-10">
        <ScrollReveal direction="top">
          <h1 className="text-[120px] md:text-[180px] font-black leading-none text-yellow opacity-20 select-none">
            404
          </h1>
        </ScrollReveal>

        <ScrollReveal direction="bottom">
          <div className="mt-[-40px] md:mt-[-60px]">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
              {lang === "pt" ? "Página não encontrada" : "Page not found"}
            </h2>
            <p className="text-gray-400 text-lg md:text-xl mb-10 max-w-md mx-auto leading-relaxed">
              {lang === "pt"
                ? "Parece que você seguiu um link quebrado ou digitou um endereço que não existe mais."
                : "It seems you followed a broken link or entered an address that no longer exists."}
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button
                href={`/${lang ?? "pt"}`}
                variant="primary"
                className="w-full sm:w-auto px-8 py-4 gap-3"
              >
                <FiHome size={20} />
                {lang === "pt" ? "Voltar ao Início" : "Back to Home"}
              </Button>

              <button
                onClick={() => window.history.back()}
                className="w-full sm:w-auto flex items-center justify-center gap-2 text-gray-400 hover:text-yellow transition-colors font-semibold px-6 py-3"
              >
                <FiArrowLeft size={20} />
                {lang === "pt" ? "Voltar atrás" : "Go back"}
              </button>
            </div>
          </div>
        </ScrollReveal>

        {/* Detalhe de Código "Tech" Decorativo */}
        <ScrollReveal direction="top" className="mt-20">
          <code className="text-xs text-purple-bright font-mono">
            Error_Code: 0x404_PAGE_NOT_FOUND_INSIGHT
          </code>
        </ScrollReveal>
      </div>
    </main>
  );
}
