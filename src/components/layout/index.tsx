"use client";

import { Header } from "./header";
import { Footer } from "./footer";
import { Toaster } from "react-hot-toast";
import { BsWhatsapp } from "react-icons/bs";
import Link from "next/link";
import { sendEventGA } from "@/utils/lib/customEvent";
import { usePostHog } from "posthog-js/react";
import { use } from "react";
import { usePathname } from "next/navigation";

export function Layout({ children }: { children: React.ReactNode }) {
  const posthog = usePostHog();

  const pathname = usePathname();

  const isClinicCore = pathname.includes("projects/cliniccore");

  

  const WhatsappButton = () => {
    return (
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
        aria-label="Falar no WhatsApp"
        // Alteração Visual: Mudamos de bg-green-500 para as cores da paleta
        // Usamos cyan-light para destaque máximo sobre o fundo roxo escuro
        className="fixed z-50 bottom-6 right-4 md:bottom-8 md:right-8 
                   bg-cyan-light hover:bg-white text-black-purple 
                   rounded-full p-3 md:p-4 shadow-[0_0_15px_rgba(0,194,255,0.4)] 
                   hover:shadow-[0_0_25px_rgba(0,194,255,0.6)] 
                   flex items-center justify-center transition-all duration-300 
                   transform hover:-translate-y-1 hover:scale-105"
      >
        <BsWhatsapp className="w-6 h-6 md:w-8 md:h-8" />
      </Link>
    );
  };

  return (
    // Estrutura flex-col min-h-screen garante que o footer fique sempre em baixo
    <div className="flex flex-col min-h-screen bg-black-purple text-light-gray font-sans selection:bg-cyan-light selection:text-black-purple">
      {!isClinicCore && <Header />}

      {/* Main expande (flex-1) para ocupar o espaço vazio, empurrando o footer */}
      <main className="flex-1 w-full flex flex-col relative z-0">
        {children}
      </main>

      {!isClinicCore && <Footer />}

      <WhatsappButton />

      <Toaster
        position="bottom-center"
        reverseOrder={false}
        toastOptions={{
          style: {
            background: "#222",
            color: "#fff",
            border: "1px solid #3f20ba",
          },
        }}
      />
    </div>
  );
}
