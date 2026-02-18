import {
  FiBox,
  FiFeather,
  FiLayers,
  FiClock,
  FiCheckCircle,
} from "react-icons/fi";
import { Contact } from "@/components";
import { Button } from "@/components/partials/ui/button";
import { ScrollReveal } from "@/components/partials/ScrollAnimate";
import { Metadata } from "next";
import { cookies } from "next/headers";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: "en" | "pt" }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const cookieStore = await cookies();
  const pathname = cookieStore.get("pathname");

  const path = pathname?.value || "/";

  const titles = {
    pt: "App sob encomenda — Criação de apps personalizados",
    en: "Custom App — Creation of personalized apps",
  };

  const descriptions = {
    pt: "Desenvolvo apps sob medida, alinhados às suas metas e processos, com protótipos rápidos, validação com usuários e entregas iterativas que geram valor real para o seu negócio.",
    en: "I develop custom apps tailored to your goals and processes, with rapid prototypes, user validation, and iterative deliveries that generate real value for your business.",
  };

  return {
    title: titles[lang] || titles.pt,
    description: descriptions[lang] || descriptions.pt,
    openGraph: {
      title: titles[lang] || titles.pt,
      description: descriptions[lang] || descriptions.pt,
      url: path,
      images: [
        {
          url: "https://myymbucket.s3.sa-east-1.amazonaws.com/imagens/Logo.png",
          width: 800,
          height: 600,
        },
      ],
    },
    twitter: {
      site: "@site",
      card: "summary",
      description: descriptions[lang] || descriptions.pt,
      creator: "@YgorMendanha",
      title: titles[lang] || titles.pt,
    },
  };
}

export default async function CustomService({
  params,
}: {
  params: Promise<{ lang: "en" | "pt" }>;
}) {
  const { lang } = await params;

  const steps = [
    {
      title: lang === "pt" ? "Descoberta" : "Discovery",
      desc:
        lang === "pt"
          ? "Entendimento profundo do negócio, usuários e métricas desejadas."
          : "Deep understanding of the business, users, and desired metrics.",
      icon: <FiFeather size={24} />,
      color: "text-yellow",
    },
    {
      title: lang === "pt" ? "Proposta & Protótipo" : "Proposal & Prototype",
      desc:
        lang === "pt"
          ? "Wireframes e protótipos rápidos para validar ideias antes de construir."
          : "Wireframes and fast prototypes to validate ideas before building.",
      icon: <FiLayers size={24} />,
      color: "text-cyan-light",
    },
    {
      title: lang === "pt" ? "Desenvolvimento" : "Development",
      desc:
        lang === "pt"
          ? "Arquitetura escalável, código limpo e entregas iterativas com revisões constantes."
          : "Scalable architecture, clean code, and iterative deliveries with constant reviews.",
      icon: <FiBox size={24} />,
      color: "text-purple-bright",
    },
    {
      title: lang === "pt" ? "Lançamento & Crescimento" : "Launch & Growth",
      desc:
        lang === "pt"
          ? "Deploy, monitoramento, otimizações de performance e suporte contínuo."
          : "Deployment, monitoring, performance optimizations, and ongoing support.",
      icon: <FiClock size={24} />,
      color: "text-yellow",
    },
  ];

  const highlights =
    lang === "pt"
      ? [
          "Conversamos com você e seus usuários para entender necessidades reais e criar um app que faz sentido para o seu negócio.",
          "Protótipos funcionais em 1-2 semanas, para validar ideias rapidamente e reduzir riscos.",
          "Estrutura do app projetada para escalar conforme seu negócio evolui, sem perder performance.",
          "Monitoramos o desempenho do app e otimizamos continuamente para gerar resultados reais.",
        ]
      : [
          "We talk to you and your users to understand real needs and build an app that truly fits your business.",
          "Functional prototypes in 1–2 weeks to validate ideas quickly and reduce risks.",
          "App structure designed to scale as your business grows, without losing performance.",
          "We monitor app performance and continuously optimize for real results.",
        ];

  const whyHireBullets =
    lang === "pt"
      ? [
          "Experiência em transformar requisitos vagos em soluções executáveis.",
          "Entregas iterativas com foco em métricas reais (retenção, conversão, LTV).",
          "Habilidade para prototipar rápido e validar com usuários reais.",
          "Compromisso com código limpo, documentação e transferibilidade.",
          "Suporte pós-entrega: acompanhamento, correções e pequenas melhorias para garantir resultados.",
        ]
      : [
          "Experience turning vague requirements into executable solutions.",
          "Iterative deliveries focused on real metrics (retention, conversion, LTV).",
          "Ability to prototype fast and validate with real users.",
          "Commitment to clean code, documentation, and transferability.",
          "Post-delivery support: monitoring, fixes, and small improvements to ensure results.",
        ];

  return (
    <div className="bg-black-purple text-white min-h-screen pb-20">
      {/* Hero */}
      <section className="container mx-auto px-5 pt-32 pb-20 flex flex-col lg:flex-row items-center gap-16">
        <ScrollReveal
          direction="left"
          className="w-full lg:w-1/2 flex justify-center"
        >
          <div className="w-[300px] h-[300px] md:w-[450px] md:h-[450px] relative animate-float-balloon">
            <svg viewBox="0 0 360 360" className="w-full h-full" />
          </div>
        </ScrollReveal>

        <div className="w-full lg:w-1/2 space-y-8">
          <ScrollReveal direction="right">
            <span className="inline-block px-4 py-1.5 bg-cyan-light/10 text-cyan-light border border-cyan-light/20 rounded-full text-xs font-bold uppercase tracking-widest mb-4">
              {lang === "pt" ? "App personalizado" : "Custom App"}
            </span>

            <h1 className="text-4xl md:text-6xl font-black leading-tight">
              {lang === "pt"
                ? "Eu crio apps sob medida — alinhados ao seu processo e às suas metas."
                : "I build custom apps — aligned with your process and goals."}
            </h1>

            <p className="text-xl text-gray-400 leading-relaxed max-w-xl">
              {lang === "pt"
                ? "Não é só código: é entender o problema, propor soluções criativas e entregar um produto que realmente gera valor. Trabalho com protótipos rápidos, validação com usuários e entregas iterativas."
                : "It's not just code: it's understanding the problem, proposing creative solutions, and delivering a product that truly generates value. I work with fast prototypes, user validation, and iterative deliveries."}
            </p>

            <div className="flex flex-wrap gap-4 pt-4">
              <Button
                href="#process"
                className="bg-cyan-light text-black-purple"
              >
                {lang === "pt" ? "Como funciona" : "How it works"}
              </Button>

              <Button href="#contact" variant="ghost">
                {lang === "pt" ? "Quero conversar" : "I want to talk"}
              </Button>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-6">
            {highlights.map((h, idx) => (
              <ScrollReveal
                key={idx}
                direction="bottom"
                className="flex items-start gap-3 p-4 bg-white/5 border border-white/10 rounded-2xl hover:border-yellow/30 transition-colors"
              >
                <FiCheckCircle
                  className="text-yellow shrink-0 mt-1"
                  size={20}
                />
                <span className="text-sm text-gray-300">{h}</span>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Processo */}
      <section
        id="process"
        className="py-24 bg-white/[0.02] border-y border-white/5"
      >
        <div className="container mx-auto px-5">
          <ScrollReveal direction="top" className="mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              {lang === "pt" ? "Processo" : "Process"}
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl">
              {lang === "pt"
                ? "Um fluxo claro para transformar uma ideia em produto real — com checkpoints de validação em cada etapa."
                : "A clear flow to turn an idea into a real product — with validation checkpoints at every stage."}
            </p>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((s, idx) => (
              <ScrollReveal
                key={idx}
                direction="bottom"
                className="group p-8 bg-black-purple border border-white/10 rounded-3xl hover:border-cyan-light/40 transition-all hover:-translate-y-2"
              >
                <div
                  className={`w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center mb-6 ${s.color}`}
                >
                  {s.icon}
                </div>
                <h3 className="text-xl font-bold mb-3">{s.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  {s.desc}
                </p>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Why Hire */}
      <section className="py-24 container mx-auto px-5">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <ScrollReveal direction="left">
            <h2 className="text-3xl md:text-5xl font-bold mb-8">
              {lang === "pt" ? "Por que me contratar?" : "Why hire me?"}
            </h2>

            <ul className="space-y-6">
              {whyHireBullets.map((li, i) => (
                <li key={i} className="flex items-start gap-4 group">
                  <span className="w-6 h-6 rounded-full bg-cyan-light/10 text-cyan-light flex items-center justify-center text-xs font-bold group-hover:bg-cyan-light group-hover:text-black-purple transition-all">
                    {i + 1}
                  </span>
                  <span className="text-gray-300 group-hover:text-white transition-colors">
                    {li}
                  </span>
                </li>
              ))}
            </ul>
          </ScrollReveal>
        </div>
      </section>

      <Contact lang={lang} />
    </div>
  );
}
