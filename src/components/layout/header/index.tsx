import { useState } from "react";
import { AiOutlineMenuUnfold } from "react-icons/ai";

import { useParams, usePathname } from "next/navigation";
import { HeaderMenu } from "./partials/menu";
import { SelectLang } from "./partials/selectLang";
import { MenuDetails } from "@/utils/functions/getMenuDetails";
import Link from "next/link";

export function Header() {
  const { lang }: { lang: "pt" | "en" } = useParams();

  const pathname = usePathname();

  const [showMenu, setShowMenu] = useState<boolean>(false);

  const OptiosMenu = MenuDetails({ lang, pathname });

  return (
    <>
      {" "}
      <header
        className={`fixed top-0 w-full z-40 h-16 flex items-center transition-all duration-300 bg-black-purple/90 backdrop-blur-md border-b border-white/5`}
      >
        <div className="container px-5 mx-auto flex items-center justify-between">
          {/* Logo Area */}
          <Link
            href={"/"}
            className="text-lg sm:text-xl md:text-2xl font-bold text-white tracking-tight hover:opacity-80 transition-opacity"
          >
            <span className="text-cyan-light">YM</span>{" "}
            {lang === "pt" ? "Desenvolvimento" : "Development"}
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            {OptiosMenu.map((link, idx) => (
              <Link
                key={idx}
                className="text-sm font-medium text-light-gray hover:text-cyan-light relative group transition-colors duration-300"
                href={link.href}
              >
                {link.label}
                {/* Efeito de sublinhado animado */}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-cyan-light transition-all duration-300 group-hover:w-full"></span>
              </Link>
            ))}
            <div className="w-px h-6 bg-white/20 mx-2"></div> {/* Separator */}
            <SelectLang className="ml-2" />
          </nav>

          {/* Mobile Actions */}
          <div className="flex items-center gap-4 lg:hidden">
            <SelectLang />

            <button
              onClick={() => setShowMenu(true)}
              className="text-cyan-light hover:text-white transition-colors"
              aria-label="Abrir menu"
            >
              <AiOutlineMenuUnfold size={28} />
            </button>
          </div>
        </div>
      </header>
      <HeaderMenu show={showMenu} onCLose={() => setShowMenu(false)} />
    </>
  );
}
