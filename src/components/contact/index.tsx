"use client";

import { getDictionary } from "@/utils/functions/getDictionary";
import { toast } from "react-hot-toast";
import { ReactNode, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { BsTelephoneForwardFill } from "react-icons/bs";
import { MdEmail } from "react-icons/md";
import { sendEventGA } from "@/utils/lib/customEvent";
import { Button } from "../partials/ui/button";
import { ScrollReveal } from "../partials/ScrollAnimate";

type Inputs = {
  name: string;
  contact: string;
  msg: string;
};

export function Contact({
  lang,
  text,
  title,
}: {
  lang: "pt" | "en";
  title: string;
  text: ReactNode;
}) {
  const dict = getDictionary(lang ?? "pt");
  const [loading, setLoading] = useState<boolean>(false);

  const { register, handleSubmit, reset } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = async (dataForm) => {
    setLoading(true);
    try {
      sendEventGA({
        name: "click_email",
        params: { linkText: "E-mail" },
      });
      const response = await fetch("/api/sendEmail", {
        method: "POST",
        body: JSON.stringify({
          subject: "Novo Contato",
          html: `
          <p>Nome:${dataForm.name}</p> 
          <p>Contato: ${dataForm.contact} </p> 
          <p>Msg:${dataForm.msg}</p>
          `,
        }),
      });

      if (response.status !== 200) {
        toast.error(dict.errorEmail);
        setLoading(false);
        return;
      }

      reset();
      toast.success(dict.successEmail);
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  };

  return (
    <ScrollReveal direction="top" className="bg-gray-lightest">
      <section
        id="contact"
        className="flex min-h-[400px] text-black-purple py-10 flex-col container mx-auto pb-10 backdrop-blur-sm rounded-lg p-5"
      >
        <ScrollReveal
          direction="top"
          className="w-full  text-4xl font-bold underline-offset-4 "
        >
          {title}
        </ScrollReveal>
        <ScrollReveal
          direction="bottom"
          className="flex flex-col lg:flex-row h-[100%] w-full items-center gap-4"
        >
          <div className="w-1/1 lg:w-1/2 lg:mx-2 flex flex-col gap-4">
            <div className="mb-auto text-lg">{text}</div>
            <div className="flex">
              <BsTelephoneForwardFill className="mr-4" size={24} />
              <p>‪+55 (92) 98283‑2103‬</p>
            </div>
            <div className="flex">
              <MdEmail className="mr-4" size={25} />
              <p>contato@ygormendanha.com</p>
            </div>
          </div>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="w-[100%] lg:w-1/2  lg:mx-2 flex flex-col  gap-3"
          >
            <input
              {...register("name", { required: true })}
              className=" bg-white rounded h-10 p-3  border-4 border-purple-bright focus:outline-none focus:border-cyan-light"
              placeholder={dict.labelName}
            />
            <input
              {...register("contact", { required: true })}
              className=" bg-white rounded h-10 p-3  border-4 border-purple-bright focus:outline-none focus:border-cyan-light"
              placeholder={dict.labelcontactForm}
            />
            <textarea
              {...register("msg", { required: true })}
              className=" bg-white rounded  p-3  border-4 border-purple-bright focus:outline-none focus:border-cyan-light"
              placeholder={dict.labelmessage}
            />
            <Button type="submit">
              {loading && (
                <div aria-label="Loading..." role="status">
                  <svg
                    width="24"
                    height="24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    viewBox="0 0 24 24"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    xmlns="http://www.w3.org/2000/svg"
                    className="animate-spin w-6 h-6 stroke-white"
                  >
                    <path d="M12 3v3m6.366-.366-2.12 2.12M21 12h-3m.366 6.366-2.12-2.12M12 21v-3m-6.366.366 2.12-2.12M3 12h3m-.366-6.366 2.12 2.12"></path>
                  </svg>
                </div>
              )}
              <span>{loading ? dict.sendingEmail : dict.toSend}</span>
            </Button>
            <Button
              onClick={() =>
                sendEventGA({
                  name: "click_whatsapp",
                  params: { linkText: "E-WhatsApp" },
                })
              }
              href="https://wa.me/5592982832103"
              target="_blank"
              aria-label="Whatsapp"
              variant="ghost"
              className="text-center"
            >
              {dict.speakWhatsapp}
            </Button>
          </form>
        </ScrollReveal>
      </section>
    </ScrollReveal>
  );
}
