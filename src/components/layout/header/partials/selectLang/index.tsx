"use client";
import { useState, useRef } from "react";
import { setCookie } from "cookies-next";
import { useParams, usePathname, useRouter } from "next/navigation";
import { CiGlobe } from "react-icons/ci";

export function SelectLang({ className = "" }: { className?: string }) {
  const { lang }: { lang?: "pt" | "en" } = useParams();
  const router = useRouter();
  const pathname = usePathname();
  const newPathname = pathname?.replace(/^\/(pt|en)/, "") ?? "";

  const [open, setOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement | null>(null);

  const changeLang = (value: "pt" | "en") => {
    setCookie("lang", value);
    const prefix = value === "pt" ? "/pt" : "/en";
    router.push(`${prefix}${newPathname}`);
    setOpen(false);
  };

  return (
    <div
      ref={wrapperRef}
      // Alteração Visual: Texto light-gray por padrão, hover ciano
      className={`relative inline-block hover:scale-105 active:scale-95 cursor-pointer text-light-gray hover:text-cyan-light transition-all duration-300 ${className}`}
      tabIndex={0}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node)) setOpen(false);
      }}
    >
      <button
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        // Alteração Visual: Borda roxa, sem fundo fixo, texto ajustável
        className="flex items-center gap-2 px-3 py-1 border border-purple-bright rounded-md text-xs font-medium tracking-wide hover:border-cyan-light transition-colors"
      >
        <CiGlobe className="text-base" />
        <span className="text-center uppercase">
          {lang === "en" ? "en-US" : "pt-BR"}
        </span>
      </button>

      {open && (
        <div
          role="listbox"
          aria-label="Selecionar idioma"
          // Alteração Visual: Dropdown escuro (black-purple) com borda subtil
          className="absolute mt-2 right-0 w-24 rounded-md shadow-xl bg-black-purple border border-purple-bright/30 z-50 overflow-hidden"
        >
          <button
            className="w-full text-center text-xs px-2 py-2 text-light-gray hover:bg-purple-bright hover:text-white transition-colors"
            onClick={() => changeLang("pt")}
          >
            pt-BR
          </button>

          <button
            className="w-full text-center text-xs px-2 py-2 text-light-gray hover:bg-purple-bright hover:text-white transition-colors"
            onClick={() => changeLang("en")}
          >
            en-US
          </button>
        </div>
      )}
    </div>
  );
}