"use client";

import { FaGithub, FaLinkedinIn } from "react-icons/fa";
import { BsWhatsapp } from "react-icons/bs";
import { useParams } from "next/navigation";
import Link from "next/link";
import { sendEventGA } from "@/utils/lib/customEvent";
import { usePostHog } from "posthog-js/react";
import { Code2 } from "lucide-react";

export function Footer() {
  const { lang }: { lang?: "pt" | "en" } = useParams();
  const posthog = usePostHog();

  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-black-purple border-t border-white/5 pt-10 pb-6">
      <div className="container mx-auto px-5">
        {/* Seção Principal */}
        <div className="flex flex-col md:flex-row justify-between items-center md:items-start gap-8 mb-8">
          {/* Marca */}
          <div className="text-center md:text-left">
            <h3 className="text-2xl font-bold text-white mb-2 tracking-tight">
              <span className="text-cyan-light">YM</span>{" "}
              {lang === "pt" ? "Desenvolvimento" : "Development"}
            </h3>

            <p className="text-sm text-gray-400 max-w-xs mx-auto md:mx-0">
              {lang === "pt"
                ? "Transformando ideias em experiências digitais de alta performance."
                : "Transforming ideas into high-performance digital experiences."}
            </p>
          </div>

          {/* Links + Social */}
          <div className="flex flex-col items-center md:items-end gap-4">
            <nav className="flex flex-wrap justify-center gap-6 text-sm font-medium text-gray-300">
              <Link
                href="/politica-de-privacidade"
                className="hover:text-cyan-light transition-colors duration-300 relative group"
              >
                {lang === "pt" ? "Política de Privacidade" : "Privacy Policy"}
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-cyan-light transition-all duration-300 group-hover:w-full"></span>
              </Link>

              <span className="hidden sm:inline text-gray-600">|</span>

              <Link
                href="/termos-de-uso"
                className="hover:text-cyan-light transition-colors duration-300 relative group"
              >
                {lang === "pt" ? "Termos de Uso" : "Terms of Use"}
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-cyan-light transition-all duration-300 group-hover:w-full"></span>
              </Link>

              <span className="hidden sm:inline text-gray-600">|</span>

              <Link
                href="/services"
                className="hover:text-cyan-light transition-colors duration-300"
              >
                {lang === "pt" ? "Serviços" : "Services"}
              </Link>
            </nav>

            {/* Redes Sociais */}
            <div className="flex items-center gap-4 mt-2">
              <Link
                href="https://github.com/YgorMendanha"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Github"
                className="bg-white/5 p-2 rounded-full text-white hover:bg-cyan-light hover:text-black-purple transition-all duration-300 hover:-translate-y-1"
              >
                <FaGithub size={18} />
              </Link>

              <Link
                href="https://www.linkedin.com/in/ygormendanha"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Linkedin"
                className="bg-white/5 p-2 rounded-full text-white hover:bg-cyan-light hover:text-black-purple transition-all duration-300 hover:-translate-y-1"
              >
                <FaLinkedinIn size={18} />
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
                className="bg-white/5 p-2 rounded-full text-white hover:bg-cyan-light hover:text-black-purple transition-all duration-300 hover:-translate-y-1"
              >
                <BsWhatsapp size={18} />
              </Link>
            </div>
          </div>
        </div>

        {/* Separator */}
        <div className="w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent my-6"></div>

        {/* Parte Inferior */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-gray-500">
          <p>
            &copy; {currentYear} YM Desenvolvimento.{" "}
            {lang === "pt"
              ? "Todos os direitos reservados."
              : "All rights reserved."}
          </p>

          <Link
            href={"/"}
            className="flex items-center gap-3 bg-white/5 px-4 py-2 rounded-full border border-purple-bright/30 hover:border-cyan-light/50 transition-colors group cursor-pointer"
          >
            <Code2 className="w-4 h-4 text-cyan-light" />
            <span className="text-white/80 text-xs">
              {lang === "pt" ? "Desenvolvido por " : "Developed by "}
              <strong className="text-white group-hover:text-cyan-light transition-colors">
                YM Desenvolvimento
              </strong>
            </span>
          </Link>
        </div>
      </div>
    </footer>
  );
}
