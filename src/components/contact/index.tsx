import { CustomInput, CustomTextArea } from "@/components";
import { getDictionary } from "@/utils/functions/getDictionary";

export function Contact({ lang }: { lang: "pt" | "en" }) {
  const dict = getDictionary(lang ?? "pt");
  return (
    <section
      id="contact"
      className="flex flex-col container mx-auto my-10 backdrop-blur-sm bg-violet-900/40 rounded-lg p-5"
    >
      <h3 className="mx-auto  text-2xl">
        <b>{dict.contact}</b>
      </h3>
      <div className="flex w-full ">
        <p className="w-1/2 m-5">{dict.contactText}</p>
        <form className="w-1/2 m-5 flex flex-col">
          <CustomInput label={dict.labelName} />
          <CustomInput label={dict.labelcontactForm} />
          <CustomTextArea label={dict.labelmessage} />
          <button className="ml-auto mt-auto py-1 px-3 bg-violet-700 rounded-lg">
            {dict.toSend}
          </button>
        </form>
      </div>
    </section>
  );
}
