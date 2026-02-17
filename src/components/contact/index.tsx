"use client";

import { toast } from "react-hot-toast";
import { ReactNode, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { BsTelephoneForwardFill, BsWhatsapp } from "react-icons/bs";
import { MdEmail } from "react-icons/md";
import { sendEventGA } from "@/utils/lib/customEvent";
import { Button } from "../partials/ui/button";
import { ScrollReveal } from "../partials/ScrollAnimate";
import { usePostHog } from "posthog-js/react";
import Link from "next/link"; // Adicionado para o link interno

type Inputs = {
  name: string;
  contact: string;
  msg: string;
};

export function Contact({ lang }: { lang: "pt" | "en" }) {
  const labelName = lang === "pt" ? "Nome" : "Full name";
  const labelContactForm = lang === "pt" ? "Forma de Contato" : "Contact method";
  const labelMessage = lang === "pt" ? "Mensagem" : "Message";

  const errorEmail = lang === "pt" ? "Houve um erro no envio 😢" : "There was an error sending.";
  const successEmail = lang === "pt" ? "Obrigado pelo contato" : "Thanks for getting in touch";

  const [loading, setLoading] = useState<boolean>(false);
  const posthog = usePostHog();

  const { register, handleSubmit, reset } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async (dataForm) => {
    setLoading(true);
    try {
      sendEventGA({ name: "click_email", params: { linkText: "E-mail" } });
      posthog.capture("click_email");

      const response = await fetch("/api/sendEmail", {
        method: "POST",
        body: JSON.stringify({
          subject: "Novo Contato - Portfólio",
          html: `<p><b>Nome:</b> ${dataForm.name}</p> 
                 <p><b>Contato:</b> ${dataForm.contact}</p> 
                 <p><b>Mensagem:</b> ${dataForm.msg}</p>`,
        }),
      });

      if (response.status !== 200) {
        toast.error(errorEmail);
      } else {
        reset();
        toast.success(successEmail);
      }
    } catch (error) {
      console.error(error);
      toast.error(lang === "pt" ? "Erro ao enviar." : "Error sending.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="bg-black-purple py-24 relative overflow-hidden">
      {/* Glows de fundo em Amarelo e Ciano */}
      <div className="absolute -bottom-24 -right-24 w-[500px] h-[500px] bg-yellow/5 blur-[120px] pointer-events-none" />
      <div className="absolute -top-24 -left-24 w-[400px] h-[400px] bg-cyan-light/5 blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-5 relative z-10">
        <div className="flex flex-col lg:flex-row gap-16 items-start">
          {/* Lado Esquerdo: Texto e Infos */}
          <div className="w-full lg:w-1/2 flex flex-col gap-8">
            <ScrollReveal direction="left">
              <div className="flex items-center gap-3 mb-6">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-yellow opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-yellow"></span>
                </span>
                <span className="text-yellow text-xs font-black uppercase tracking-[0.2em]">
                  {lang === "pt" ? "Disponível para novos projetos" : "Available for new projects"}
                </span>
              </div>

              <h2 className="text-4xl md:text-6xl font-black text-white mb-8 leading-tight">
                {lang === "pt" ? "Contato" : "Contact"}
              </h2>

              <div className="text-gray-400 text-lg leading-relaxed mb-10 space-y-4">
                {lang === "pt"
                  ? "Fale comigo pelo WhatsApp ou e-mail. Vou entender sua ideia, propor soluções criativas e transformar sua necessidade em um app sob medida."
                  : "Talk to me via WhatsApp or email. I’ll understand your idea, propose creative solutions, and turn your needs into a custom-built app."}
              </div>

              <div className="space-y-6">
                <div className="flex items-center group cursor-pointer">
                  <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-yellow mr-4 group-hover:bg-yellow group-hover:text-black-purple transition-all duration-300">
                    <BsTelephoneForwardFill size={20} />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 uppercase font-bold tracking-widest">
                      {lang === "pt" ? "Telefone" : "Phone"}
                    </p>
                    <p className="text-white font-bold text-lg">‪+55 (92) 98283-2103‬</p>
                  </div>
                </div>

                <div className="flex items-center group cursor-pointer">
                  <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-cyan-light mr-4 group-hover:bg-cyan-light group-hover:text-black-purple transition-all duration-300">
                    <MdEmail size={22} />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 uppercase font-bold tracking-widest">E-mail</p>
                    <p className="text-white font-bold text-lg">contato@ygormendanha.com</p>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>

          {/* Lado Direito: Formulário */}
          <div className="w-full lg:w-1/2">
            <ScrollReveal direction="right" className="bg-white/[0.02] border border-white/10 p-8 md:p-12 rounded-[2.5rem] shadow-2xl relative overflow-hidden">
              <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6 relative z-10">
                <div className="space-y-4">
                  <input
                    {...register("name", { required: true })}
                    className="w-full bg-black-purple/40 border border-white/10 rounded-2xl h-16 p-5 text-white placeholder:text-gray-600 focus:outline-none focus:border-yellow/50 focus:bg-yellow/5 transition-all"
                    placeholder={labelName}
                  />

                  <input
                    {...register("contact", { required: true })}
                    className="w-full bg-black-purple/40 border border-white/10 rounded-2xl h-16 p-5 text-white placeholder:text-gray-600 focus:outline-none focus:border-yellow/50 focus:bg-yellow/5 transition-all"
                    placeholder={labelContactForm}
                  />

                  <textarea
                    {...register("msg", { required: true })}
                    rows={4}
                    className="w-full bg-black-purple/40 border border-white/10 rounded-2xl p-5 text-white placeholder:text-gray-600 focus:outline-none focus:border-yellow/50 focus:bg-yellow/5 transition-all resize-none"
                    placeholder={labelMessage}
                  />
                </div>

                <div className="space-y-4 text-center">
                  <Button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-yellow hover:bg-white text-black-purple font-black h-16 rounded-2xl transition-all duration-300 flex items-center justify-center gap-3 shadow-[0_10px_20px_rgba(255,204,0,0.15)]"
                  >
                    {loading ? (
                      <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-black-purple"></div>
                    ) : lang === "pt" ? (
                      "Iniciar Projeto"
                    ) : (
                      "Start Project"
                    )}
                  </Button>

                  {/* Texto de Consentimento LGPD */}
                  <p className="text-[10px] text-gray-500 leading-tight px-4">
                    {lang === "pt" ? (
                      <>
                        Ao enviar, você concorda com nossa{" "}
                        <Link href={`/politica-de-privacidade`} className="text-yellow hover:underline">
                          Política de Privacidade
                        </Link>.
                      </>
                    ) : (
                      <>
                        By sending, you agree to our{" "}
                        <Link href={`/politica-de-privacidade`} className="text-yellow hover:underline">
                          Privacy Policy
                        </Link>.
                      </>
                    )}
                  </p>
                </div>

                <div className="relative py-2">
                  <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t border-white/5"></span>
                  </div>
                  <div className="relative flex justify-center text-[10px] font-black uppercase tracking-widest">
                    <span className="bg-black-purple/80 px-4 text-gray-500">
                      {lang === "pt" ? "Ou prefira" : "Or prefer"}
                    </span>
                  </div>
                </div>

                <Button
                  onClick={() => {
                    sendEventGA({ name: "click_whatsapp", params: { linkText: "WhatsApp" } });
                    posthog.capture("click_whatsapp");
                  }}
                  href="https://wa.me/5592982832103"
                  target="_blank"
                  variant="ghost"
                  className="w-full border border-white/10 text-white hover:bg-white/5 hover:border-white/20 h-16 rounded-2xl flex items-center justify-center gap-3 font-bold"
                >
                  <BsWhatsapp className="text-green-500 text-xl" />
                  {lang === "pt" ? "WhatsApp" : "WhatsApp"}
                </Button>
              </form>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
}