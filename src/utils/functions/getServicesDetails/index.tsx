import { JSX } from "react";
import {
  FiShoppingCart,
  FiCode,
  FiBarChart2,
  FiSearch,
  FiPieChart,
  FiLayout,
  FiShield,
  FiFeather,
} from "react-icons/fi";

export type ServiceCard = {
  id: string;
  title: string;
  short: string;
  bullets: string[];
  icon?: JSX.Element;
  url?: string;
};

export function ServicesForPage({ lang }: { lang: "en" | "pt" }) {
  const mainServices: ServiceCard[] = [
    {
      id: "ecommerce",
      title:
        lang === "pt"
          ? "Criação de Lojas E-commerce"
          : "E-commerce Store Creation",
      short:
        lang === "pt"
          ? "Lojas responsivas, otimizadas para conversão e SEO — prontas para vender desde o primeiro dia."
          : "Responsive stores optimized for conversion and SEO — ready to sell from day one.",
      bullets:
        lang === "pt"
          ? [
              "Design sob medida e mobile-first",
              "Checkout otimizado e melhores práticas de UX",
              "Integração com gateways de pagamento e ERPs",
              "Loja de exemplo e prints de performance para validar resultados",
              "Suporte pós-entrega e planos de manutenção",
            ]
          : [
              "Custom design and mobile-first approach",
              "Optimized checkout and UX best practices",
              "Integration with payment gateways and ERPs",
              "Example store and performance screenshots to validate results",
              "Post-delivery support and maintenance plans",
            ],
      icon: <FiShoppingCart className="w-6 h-6" aria-hidden />,
      url: "/services/shop",
    },
    {
      id: "custom-apps",
      title:
        lang === "pt"
          ? "Projeto Sob Encomenda (Apps Personalizados)"
          : "Custom Project (Personalized Apps)",
      short:
        lang === "pt"
          ? "Apps feitos conforme a sua necessidade: do entendimento ao protótipo e entrega escalável."
          : "Apps built around your needs: from discovery to prototype and scalable delivery.",
      bullets:
        lang === "pt"
          ? [
              "Descoberta profunda com stakeholders e usuários",
              "Protótipos testáveis em 1–2 semanas",
              "Arquitetura escalável e código documentado",
              "Entregas iterativas com validação e foco em métricas",
              "Suporte pós-entrega: correções, monitoramento e melhorias contínuas",
            ]
          : [
              "Deep discovery with stakeholders and users",
              "Testable prototypes in 1–2 weeks",
              "Scalable architecture and well-documented code",
              "Iterative deliveries with validation and metric-driven focus",
              "Post-delivery support: fixes, monitoring and continuous improvements",
            ],
      icon: <FiCode className="w-6 h-6" aria-hidden />,
      url: "/services/custom",
    },
  ];

  const complementaryServices: ServiceCard[] = [
    {
      id: "cro",
      title:
        lang === "pt"
          ? "CRO & Otimização de Conversão"
          : "CRO & Conversion Optimization",
      short:
        lang === "pt"
          ? "Testes A/B, melhorias de UX e copywriting focados em aumentar vendas."
          : "A/B testing, UX improvements and conversion-focused copywriting.",
      bullets:
        lang === "pt"
          ? [
              "Mapeamento da jornada do usuário",
              "Testes de hipóteses e experimentação",
              "Relatórios com métricas acionáveis",
            ]
          : [
              "User journey mapping",
              "Hypothesis testing and experimentation",
              "Reports with actionable metrics",
            ],
      icon: <FiBarChart2 className="w-6 h-6" aria-hidden />,
    },
    {
      id: "seo",
      title:
        lang === "pt"
          ? "SEO Técnico & Conteúdo"
          : "Technical SEO & Content",
      short:
        lang === "pt"
          ? "Auditoria técnica, otimização on-page e estratégia de conteúdo para ganhar visibilidade no orgânico."
          : "Technical audit, on-page optimization and content strategy to grow organic visibility.",
      bullets:
        lang === "pt"
          ? [
              "Auditoria técnica completa",
              "Clusterização e estratégia de conteúdo",
              "Melhorias de performance e Core Web Vitals",
            ]
          : [
              "Full technical audit",
              "Content clustering and strategy",
              "Performance improvements and Core Web Vitals optimization",
            ],
      icon: <FiSearch className="w-6 h-6" aria-hidden />,
    },
    {
      id: "analytics",
      title:
        lang === "pt"
          ? "Analytics, GA4 & Tag Manager"
          : "Analytics, GA4 & Tag Manager",
      short:
        lang === "pt"
          ? "Implementação e configuração de eventos, funis e dashboards para decisões baseadas em dados."
          : "Implementation and setup of events, funnels and dashboards for data-driven decisions.",
      bullets:
        lang === "pt"
          ? [
              "Eventos customizados",
              "Funis de conversão",
              "Dashboards em tempo real",
            ]
          : [
              "Custom events",
              "Conversion funnels",
              "Real-time dashboards",
            ],
      icon: <FiPieChart className="w-6 h-6" aria-hidden />,
    },
    {
      id: "integrations",
      title:
        lang === "pt"
          ? "Integrações & Migração"
          : "Integrations & Migration",
      short:
        lang === "pt"
          ? "Conectar sistemas, migrar catálogos e dados com segurança e sem interrupções."
          : "Connect systems and migrate catalogs and data securely with no downtime.",
      bullets:
        lang === "pt"
          ? [
              "Migrações sem perda de dados",
              "Integração via APIs e webhooks",
              "Sincronização com ERPs e CRMs",
            ]
          : [
              "Migrations with no data loss",
              "API and webhook integrations",
              "Synchronization with ERPs and CRMs",
            ],
      icon: <FiLayout className="w-6 h-6" aria-hidden />,
    },
    {
      id: "maintenance",
      title:
        lang === "pt"
          ? "Manutenção & Suporte Pós-Entrega"
          : "Maintenance & Post-Delivery Support",
      short:
        lang === "pt"
          ? "Planos de suporte, correções e melhorias contínuas para manter seu projeto saudável."
          : "Support plans, fixes and continuous improvements to keep your project healthy.",
      bullets:
        lang === "pt"
          ? [
              "SLAs de resposta garantida",
              "Correções e pequenas evoluções",
              "Monitoramento e alertas",
            ]
          : [
              "Guaranteed response SLAs",
              "Fixes and small feature improvements",
              "Monitoring and alerts",
            ],
      icon: <FiShield className="w-6 h-6" aria-hidden />,
    },
    {
      id: "ux",
      title:
        lang === "pt"
          ? "UX/UI & Prototipagem"
          : "UX/UI & Prototyping",
      short:
        lang === "pt"
          ? "Design centrado no usuário, com protótipos testáveis e entregáveis claros para desenvolvimento."
          : "User-centered design with testable prototypes and clear handoffs for development.",
      bullets:
        lang === "pt"
          ? [
              "User flows e wireframes",
              "Design system modular",
              "Testes de usabilidade",
            ]
          : [
              "User flows and wireframes",
              "Modular design system",
              "Usability testing",
            ],
      icon: <FiFeather className="w-6 h-6" aria-hidden />,
    },
  ];

  return { mainServices, complementaryServices };
}
