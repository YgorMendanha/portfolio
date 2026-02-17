"use client";

import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
import { FaGithub, FaLinkedinIn } from "react-icons/fa";
import { GrClose } from "react-icons/gr";
import { BsWhatsapp } from "react-icons/bs";
import { MenuDetails } from "@/utils/functions/getMenuDetails";
import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function HeaderMenu({
  show,
  onCLose,
}: {
  show: boolean;
  onCLose: () => void;
}) {
  const iconSize = 28;
  const { lang }: { lang: "pt" | "en" } = useParams();
  const pathname = usePathname();
  const OptiosMenu = MenuDetails({ lang, pathname });

  // Bloquear Scroll
  useEffect(() => {
    if (show) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [show]);

  // Variantes de Animação (Framer Motion)
  const containerVars = {
    initial: { opacity: 0 },
    animate: {
      opacity: 1,
      transition: {
        duration: 0.3,
        staggerChildren: 0.1, // Efeito cascata nos links
        delayChildren: 0.1,
      },
    },
    exit: {
      opacity: 0,
      transition: {
        duration: 0.3,
        staggerChildren: 0.05,
        staggerDirection: -1,
      },
    },
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="fullscreen-menu"
          variants={containerVars}
          initial="initial"
          animate="animate"
          exit="exit"
          className="fixed inset-0 z-[999] bg-[#19092e] flex flex-col"
        >
          {/* Fundo decorativo (opcional, brilho suave) */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#3f20ba] rounded-full mix-blend-screen filter blur-[100px] opacity-20 pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#00c2ff] rounded-full mix-blend-screen filter blur-[100px] opacity-20 pointer-events-none" />

          {/* Cabeçalho do Menu (Botão Fechar) */}
          <div className="flex justify-end p-6 z-10">
            <button
              onClick={onCLose}
              className="p-3 text-white hover:text-[#00c2ff] hover:bg-white/10 rounded-full transition-all duration-300 transform hover:rotate-90"
            >
              <GrClose className="w-8 h-8 text-current" />
            </button>
          </div>

          {/* Conteúdo Centralizado */}
          <nav className="flex-1 flex flex-col items-center justify-center gap-6 z-10">
            {OptiosMenu.map((o, idx) => {
              const isActive = pathname === o.href;
              return (
                <motion.div
                  key={idx}
                  variants={{
                    initial: { y: 30, opacity: 0 },
                    animate: {
                      y: 0,
                      opacity: 1,
                      transition: {
                        type: "spring",
                        stiffness: 200,
                        damping: 20,
                      },
                    },
                    exit: { y: 20, opacity: 0 },
                  }}
                  className="w-full text-center"
                >
                  <Link
                    onClick={onCLose}
                    href={o.href}
                    className={`text-4xl md:text-5xl font-bold tracking-tight transition-all duration-300 hover:tracking-widest ${
                      isActive
                        ? "text-[#00c2ff]" // Ativo
                        : "text-white/60 hover:text-white" // Inativo
                    }`}
                  >
                    {o.label}
                  </Link>
                </motion.div>
              );
            })}
          </nav>

          {/* Rodapé (Social) */}
          <motion.div
            variants={{
              initial: { y: 30, opacity: 0 },
              animate: {
                y: 0,
                opacity: 1,
                transition: { type: "spring", stiffness: 200, damping: 20 },
              },
              exit: { y: 20, opacity: 0 },
            }}
            className="p-10 flex flex-col items-center z-10"
          >
            <div className="w-16 h-1 bg-white/10 rounded-full mb-6"></div>
            <div className="flex gap-8">
              <Link
                href="https://github.com/YgorMendanha"
                target="_blank"
                className="text-gray-400 hover:text-[#00c2ff] hover:scale-125 transition-all duration-300"
              >
                <FaGithub size={iconSize} />
              </Link>
              <Link
                href="https://www.linkedin.com/in/ygormendanha"
                target="_blank"
                className="text-gray-400 hover:text-[#00c2ff] hover:scale-125 transition-all duration-300"
              >
                <FaLinkedinIn size={iconSize} />
              </Link>
              <Link
                href="https://wa.me/5592982832103"
                target="_blank"
                className="text-gray-400 hover:text-[#00c2ff] hover:scale-125 transition-all duration-300"
              >
                <BsWhatsapp size={iconSize} />
              </Link>
            </div>
            <p className="text-white/20 text-xs mt-4 tracking-widest uppercase">
              YM Desenvolvimento © {new Date().getFullYear()}
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
