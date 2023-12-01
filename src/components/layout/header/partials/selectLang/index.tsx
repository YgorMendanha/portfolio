"use client";
import {
  useParams,
  usePathname,
  useRouter,
  useSearchParams,
} from "next/navigation";

export function SelectLang() {
  const { lang }: { lang?: "pt" | "en" } = useParams();
  const router = useRouter();

  const pathname = usePathname();

  return (
    <label>
      <select
        onChange={(e) => {
          if (e.target.value === "pt-BR") {
            return router.push(`/pt`);
          }
          return router.push(`/en`);
        }}
        value={lang === "en" ? "en-US" : "pt-BR"}
        className="ml-2 text-xs border-2 text-end appearance-none rounded outline-10 outline-none cursor-pointer p-1"
      >
        <option value="pt-BR">pt-BR</option>
        <option value="en-US">en-US</option>
      </select>
    </label>
  );
}
