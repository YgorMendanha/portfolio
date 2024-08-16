"use client";

import { getDictionary } from "@/utils/functions/getDictionary";
import { toast } from "react-hot-toast";
import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { BsTelephoneForwardFill } from "react-icons/bs";
import { MdEmail } from "react-icons/md";
import Link from "next/link";

type Inputs = {
  name: string;
  contact: string;
  msg: string;
};

export function Contact({ lang }: { lang: "pt" | "en" }) {
  const dict = getDictionary(lang ?? "pt");
  const [loading, setLoading] = useState<boolean>(false);

  const MailchimpToken = process.env.NEXT_PUBLIC_TOKEN_MAIL;

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = async (dataForm) => {
    setLoading(true);
    try {
      const response = await fetch(
        "https://mandrillapp.com/api/1.0/messages/send",
        {
          method: "POST",
          body: JSON.stringify({
            message: {
              from_email: "contato@ygormendanha.com.br",
              subject: "Contato Portfolio",
              text: `Nome:${dataForm.name} || Contato: ${dataForm.contact} || Msg:${dataForm.msg}`,
              to: [
                {
                  email: "contato@ygormendanha.com.br",
                  type: "to",
                },
              ],
            },
            key: MailchimpToken,
          }),
        }
      );
      const data = await response.json();

      if (data[0].status !== "sent") {
        toast.error(dict.errorEmail);
        setLoading(false);
        reset();
        return;
      }

      toast.success(dict.successEmail);
    } catch (error) {
      console.error(error);
    }
    reset();
    setLoading(false);
  };

  return (
    <section
      id="contact"
      className="flex min-h-[400px] text-black flex-col container mx-auto mt-10 pb-10 backdrop-blur-sm  rounded-lg p-5"
    >
      <section className="w-1/2 text-4xl font-bold underline-offset-4 mb-16 underline text-purple decoration-purple">
        {dict.contact.call}
      </section>
      <div className="flex flex-col lg:flex-row h-[100%] w-full items-center mt-4">
        <div className="w-1/1 lg:w-1/2 my-2 lg:mx-2 flex flex-col">
          <p className="mb-auto text-lg">{dict.contact.text}</p>
          <div className="flex mt-5 my-2">
            <BsTelephoneForwardFill className="mr-4" size={24} />
            <p>‪+55 (92) 98158‑8155‬</p>
          </div>
          <div className="flex my-2">
            <MdEmail className="mr-4" size={24} />
            <p>contato@ygormendanha.com.br</p>
          </div>
        </div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-[100%] lg:w-1/2 my-2 lg:mx-2 flex flex-col"
        >
          <input
            {...register("name", { required: true })}
            className="my-2 bg-white rounded h-10 p-3  border-4 border-blueLight focus:outline-none focus:border-blue"
            placeholder="Nome"
          />
          <input
            {...register("contact", { required: true })}
            className="my-2 bg-white rounded h-10 p-3  border-4 border-blueLight focus:outline-none focus:border-blue"
            placeholder="Email/Telefone"
          />
          <textarea
            {...register("msg", { required: true })}
            className="my-2 bg-white rounded  p-3  border-4 border-blueLight focus:outline-none focus:border-blue"
            placeholder="Mensagem"
          />
          <button
            type="submit"
            className="py-2 px-5 my-2 text-white bg-blue rounded-md flex items-center space-x-1.5 justify-center hover:bg-purple"
          >
            {loading && (
              <div aria-label="Loading..." role="status">
                <svg
                  width="24"
                  height="24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="1.5"
                  viewBox="0 0 24 24"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  xmlns="http://www.w3.org/2000/svg"
                  className="animate-spin w-6 h-6 stroke-white"
                >
                  <path d="M12 3v3m6.366-.366-2.12 2.12M21 12h-3m.366 6.366-2.12-2.12M12 21v-3m-6.366.366 2.12-2.12M3 12h3m-.366-6.366 2.12 2.12"></path>
                </svg>
              </div>
            )}
            <span>{loading ? dict.sendingEmail : dict.toSend}</span>
          </button>
          <Link
            type="button"
            href="https://wa.me/message/YQXEGG4GZBDDG1"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Whatsapp"
            className="py-2 text-white w-[100%] px-5 my-2 text-center bg-blueLight hover:bg-purple rounded-md"
          >
            {dict.speakWhatsapp}
          </Link>
        </form>
      </div>
    </section>
  );
}
