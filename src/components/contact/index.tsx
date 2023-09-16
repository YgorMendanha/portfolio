import { CustomInput, CustomTextArea } from "@/components";
import { getDictionary } from "@/utils/functions/getDictionary";
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
      <div className="flex flex-col md:flex-row w-full ">
        <p className="w-auto md:w-1/2 ">{dict.contactText}</p>
        <form className="w-auto md:w-1/2 m-5 flex flex-col">
          <CustomInput label={dict.labelName} id="name" />
          <CustomInput label={dict.labelcontactForm} id="email" />
          <CustomTextArea label={dict.labelmessage} id="messagem" />
          <div className="flex justify-between flex-wrap">
            <Link
              href="https://wa.me/5592982145233"
              target="_blank"
              rel="noopener noreferrer"
            >
              <button type="button" className="mt-auto py-1 px-3 m-2 bg-[#25D366] text-black rounded-lg">
                <b>{dict.callWhatsapp}</b>
              </button>
            </Link>

            <button type="submit" className="mt-auto py-1 px-3 m-2 bg-violet-700 rounded-lg">
              {dict.toSend}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
