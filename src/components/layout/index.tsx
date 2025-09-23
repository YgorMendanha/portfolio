"use client";

import { Header } from "./header";
import { Footer } from "./footer";
import { Toaster } from "react-hot-toast";
import { BsWhatsapp } from "react-icons/bs";
import Link from "next/link";
import { customEvent } from "@/utils/lib/customEvent";

export function Layout({ children }: { children: React.ReactNode }) {
  const WhatsappButton = () => {
    return (
      <Link
        onClick={() =>
          customEvent({
            eventName: "click_whatsapp",
            linkText: "WhatsApp",
          })
        }
        href="https://wa.me/5592982832103"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-5 right-3 bg-green-500 hover:bg-green-600 text-white rounded-full p-3 shadow-lg flex items-center justify-center transition-colors"
      >
        <BsWhatsapp size={30} />
      </Link>
    );
  };

  return (
    <>
      <main>
        <Header />
        {children}
        <Footer />
        <WhatsappButton />
        <Toaster position="bottom-center" reverseOrder={false} />
      </main>
    </>
  );
}
