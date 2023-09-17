"use client";

import { getDictionary } from "@/utils/functions/getDictionary";
import { GAEvent } from "@/utils/lib/analytics";
import Link from "next/link";

export function Contact({ lang }: { lang: "pt" | "en" }) {
  const dict = getDictionary(lang ?? "pt");

  return (
    <section
      id="contact"
      className="flex flex-col container mx-auto my-10 backdrop-blur-sm bg-violet-900/40 rounded-lg p-5"
    >
      <h3 className="mx-auto text-2xl">
        <b>{dict.contact}</b>
      </h3>
      <div className="flex flex-col md:flex-col w-full items-center mt-4">
        <p className="w-auto text-2xl mb-4">{dict.callWhatsapp}</p>
        <Link
          href="https://wa.me/5592982145233"
          target="_blank"
          rel="noopener noreferrer"
        >
          <button
            type="button"
            onClick={() => GAEvent({ action: "click", label: "whatsapp" })}
            className="mt-auto  py-1 px-3 m-2 bg-[#25D366]  text-2xl text-black rounded-lg"
          >
            <b>WhatsApp</b>
          </button>
        </Link>
      </div>
    </section>
  );
}
