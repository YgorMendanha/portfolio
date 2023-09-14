import { CustomLink } from "@/components";
import { getDictionary } from "@/utils/functions/getDictionary";

export function About({ lang }: { lang: "pt" | "en" }) {
  const dict = getDictionary(lang ?? "pt");
  return (
    <section
      id="about"
      className="my-10 w-full flex flex-col justify-center text-justify container mx-auto p-5 backdrop-blur-sm bg-violet-900/40 rounded-lg [&_p]:my-3"
    >
      <h2 className="text-2xl mx-auto">
        <b>{dict.about}</b>
      </h2>
      <p>{dict.about1}</p>
      <p>{dict.about2}</p>
      <p>{dict.about3}</p>
      <p>{dict.about4}</p>
      <p>{dict.about5}</p>
      <p>{dict.about6}</p>
      <p>
        <CustomLink className="text-purple-400 underline" href={"#contact"}>
          <b>{dict.about7}</b>
        </CustomLink>
      </p>
    </section>
  );
}
