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
      className={`relative inline-block hover:scale-105 active:scale-95 cursor-pointer text-purple-bright hover:text-cyan-light transition-all duration-100 ${className}`}
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
        className="flex items-center gap-2 px-2 py-1 border-purple-bright border-2 rounded text-xs"
      >
        <CiGlobe className="text-base" />
        <span className=" text-center">
          {lang === "en" ? "en-US" : "pt-BR"}
        </span>
      </button>

      {open && (
        <div
          role="listbox"
          aria-label="Selecionar idioma"
          className="absolute mt-1 rounded shadow bg-white z-50"
        >
          <button
            className="w-full text-center text-xs px-2 py-1 hover:bg-gray-100"
            onClick={() => changeLang("pt")}
          >
            pt-BR
          </button>

          <button
            className="w-full text-center text-xs px-2 py-1 hover:bg-gray-100"
            onClick={() => changeLang("en")}
          >
            en-US
          </button>
        </div>
      )}
    </div>
  );
}
