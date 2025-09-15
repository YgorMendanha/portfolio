"use client";
import { setCookie } from "cookies-next";
import { useParams, usePathname, useRouter } from "next/navigation";

export function SelectLang({ className = "" }: { className?: string }) {
  const { lang }: { lang?: "pt" | "en" } = useParams();
  const router = useRouter();
  const pathname = usePathname();
  const newPathname = pathname.replace(/^\/(pt|en)/, "");

  return (
    <label>
      <select
        onChange={(e) => {
          if (e.target.value === "pt-BR") {
            setCookie("lang", "pt");
            router.push(`/pt${newPathname}`);
            return;
          }
          setCookie("lang", "en");
          return router.push(`/en${newPathname}`);
        }}
        value={lang === "en" ? "en-US" : "pt-BR"}
        className={`ml-2 text-xs border-2 text-end appearance-none rounded outline-10 outline-none cursor-pointer p-1 ${className}`}
      >
        <option value="pt-BR">pt-BR</option>
        <option value="en-US">en-US</option>
      </select>
    </label>
  );
}
