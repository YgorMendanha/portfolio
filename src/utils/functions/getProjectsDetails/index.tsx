import { ReactElement } from "react";
import { Activity } from "lucide-react";

export interface ProjectsDetails {
  id: string;
  title: string;
  tags: string[];
  image?: string;
  link?: string;
  details: string;
  internalLink?: string;
  favorite: boolean;
  logo?: React.ReactElement;
}

export function ProjectsDetails({
  lang,
}: {
  lang: "en" | "pt";
}): ProjectsDetails[] {
  return [
    {
      id: "erp",
      title: "Clinic Core",
      tags: ["Med", "ERP", "SaaS"],
      logo: (
        <div className="flex-1 w-full h-full bg-aqua flex items-center justify-center">
          <div className="flex items-center gap-3 group cursor-pointer select-none">
            <div className="relative flex items-center justify-center w-20 h-20 rounded-xl bg-gradient-to-br from-purple-bright to-black-purple border border-white/10 group-hover:border-cyan-light/50 shadow-lg group-hover:shadow-[0_0_20px_rgba(0,194,255,0.25)] transition-all duration-500">
              <Activity
                className="text-cyan-light transition-transform duration-500 group-hover:scale-110 "
                size={50}
              />
            </div>
            <div className="flex flex-col justify-center h-full">
              <span className="text-xl font-bold tracking-tighter text-white leading-none group-hover:text-cyan-light transition-colors duration-300">
                CLINIC CORE
              </span>
              <span className="text-[10px] font-bold tracking-[0.3em] text-light-gray/40 uppercase leading-none mt-1 group-hover:text-white transition-colors duration-300">
                System
              </span>
            </div>
          </div>
        </div>
      ),
      internalLink: "/projects/cliniccore",
      details:
        lang === "pt"
          ? "Plataforma SaaS modular para clínicas médicas com automação via WhatsApp e IA Copiloto, focada em eficiência, organização e produtividade."
          : "Modular SaaS platform for medical clinics with WhatsApp-based automation and an AI Copilot, focused on efficiency, organization, and productivity.",
      favorite: true,
    },
    {
      id: "ecommerce",
      title: "Finesse Store – E-commerce",
      tags:
        lang === "pt"
          ? ["E-commerce", "Checkout", "CRO"]
          : ["E-commerce", "Checkout", "CRO"],
      image: "/finesse-store.png",
      link: "https://store.ygormendanha.com",
      internalLink: "/projects/shop",
      details:
        lang === "pt"
          ? "Uma loja online rápida, segura e fácil de usar é o que transforma visitantes em clientes.\nNesta demo, mostro como estruturo e-commerces modernos com foco em velocidade, confiança e experiência do usuário — tudo pensado para aumentar conversões e facilitar o crescimento do negócio."
          : "A fast, secure, and easy-to-use online store is what turns visitors into customers.\nIn this demo, I show how I structure modern e-commerces with a focus on speed, trust, and user experience — all designed to increase conversions and make business growth easier.",
      favorite: true,
    },
    {
      id: "telegram-bot",
      title:
        lang === "pt"
          ? "Bot Financeiro – Telegram"
          : "Financial Bot – Telegram",
      tags: lang === "pt" ? ["Automação", "Bot"] : ["Automation", "Bot"],
      image: "/bot_telegram.png",
      link: "https://t.me/financial_life_bot",
      details:
        lang === "pt"
          ? "Bot para Telegram desenvolvido em Python com banco de dados integrado.\nPermite registrar despesas, definir metas e gerar relatórios automáticos.\nUma solução simples e acessível para facilitar o controle financeiro em qualquer dispositivo."
          : "Telegram bot developed in Python with integrated database.\nAllows users to register expenses, set goals, and generate automatic reports.\nA simple and accessible solution to manage finances on any device.",
      favorite: false,
    },
    {
      id: "blog",
      title: lang === "pt" ? "Blog" : "Blog",
      tags: lang === "pt" ? ["Conteúdo", "SEO"] : ["Content", "SEO"],
      image: "/blog.png",
      link: "/blog",
      details:
        lang === "pt"
          ? "Artigos sobre tecnologia e desenvolvimento web.\nCompartilho experiências como programador, insights e aprendizados práticos para inspirar e ajudar outros profissionais."
          : "Articles about technology and web development.\nI share experiences as a programmer, insights and practical learnings to inspire and help other professionals.",
      favorite: false,
    },
  ];
}
