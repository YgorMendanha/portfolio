import { FileText, ArrowLeft, Mail, Globe, Phone } from "lucide-react";
import Link from "next/link";
import { ScrollReveal } from "@/components/partials/ScrollAnimate";
import { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: "en" | "pt" }>;
}): Promise<Metadata> {
  const { lang } = await params;

  const titles = {
    pt: "Termos de Uso",
    en: "Terms of Use",
  };

  const descriptions = {
    pt: "Consulte os termos e condições de uso do site da YM Desenvolvimento.",
    en: "Check the terms and conditions of use for the YM Development website.",
  };

  return {
    title: titles[lang] || titles.pt,
    description: descriptions[lang] || descriptions.pt,
    robots: "noindex, follow",
  };
}

export default async function TermsPage({
  params,
}: {
  params: Promise<{ lang: "en" | "pt" }>;
}) {
  const { lang } = await params;

  const content = {
    pt: {
      title: "TERMOS DE USO",
      subtitle: "YM Desenvolvimento",
      effectiveDate: "Vigência: 16 de fevereiro de 2026",
      intro:
        "Estes Termos de Uso regulam o acesso e a utilização do site www.ygormendanha.com, mantido pela YM Desenvolvimento.",
      sections: [
        {
          title: "1. Aceitação",
          text: "Ao acessar este site, o usuário concorda com estes Termos. Caso não concorde, deve interromper a navegação imediatamente.",
        },
        {
          title: "2. Finalidade do site",
          text: "O site tem caráter informativo, apresentando portfólio, serviços de desenvolvimento e canais de contato oficiais.",
        },
        {
          title: "3. Uso adequado",
          text: "O usuário compromete-se a utilizar o site de forma lícita, ética e respeitosa, sem violar direitos de terceiros ou a legislação aplicável.",
        },
        {
          title: "4. Propriedade intelectual",
          text: "Todo o conteúdo do site (textos, imagens, layout, marcas e códigos) é protegido por direitos autorais e pertence à YM Desenvolvimento.",
        },
        {
          title: "5. Conteúdos enviados",
          text: "Informações e materiais enviados pelo usuário serão utilizados exclusivamente para fins de comunicação e análise de solicitações de serviços.",
        },
        {
          title: "6. Limitação de responsabilidade",
          text: "O site é disponibilizado “como está”. A YM Desenvolvimento não se responsabiliza por danos decorrentes do uso ou indisponibilidade temporária do site.",
        },
        {
          title: "7. Modificações",
          text: "Estes Termos podem ser alterados a qualquer momento. É responsabilidade do usuário consultá-los periodicamente nesta página.",
        },
        {
          title: "8. Legislação aplicável",
          text: "Estes Termos são regidos pelas leis brasileiras, aplicando-se o foro competente conforme a legislação vigente.",
        },
        {
          title: "9. Contato",
          text: "Para dúvidas relacionadas a estes Termos de Uso:",
        },
      ],
      back: "Voltar ao site",
    },
    en: {
      title: "TERMS OF USE",
      subtitle: "YM Development",
      effectiveDate: "Effective Date: February 16, 2026",
      intro:
        "These Terms of Use govern the access and use of the website www.ygormendanha.com, maintained by YM Development.",
      sections: [
        {
          title: "1. Acceptance",
          text: "By accessing this site, the user agrees to these Terms. If you do not agree, you must stop browsing immediately.",
        },
        {
          title: "2. Website Purpose",
          text: "The website is informative, featuring a portfolio, development services, and official contact channels.",
        },
        {
          title: "3. Proper Use",
          text: "The user commits to using the site in a lawful, ethical, and respectful manner, without violating third-party rights or applicable laws.",
        },
        {
          title: "4. Intellectual Property",
          text: "All website content (texts, images, layout, brands, and codes) is protected by copyright and belongs to YM Development.",
        },
        {
          title: "5. Submitted Content",
          text: "Information and materials sent by the user will be used exclusively for communication purposes and analysis of service requests.",
        },
        {
          title: "6. Limitation of Liability",
          text: "The site is provided 'as is'. YM Development is not responsible for damages resulting from the use or temporary unavailability of the site.",
        },
        {
          title: "7. Modifications",
          text: "These Terms may be changed at any time. It is the user's responsibility to consult them periodically on this page.",
        },
        {
          title: "8. Applicable Law",
          text: "These Terms are governed by Brazilian laws, applying the competent jurisdiction according to current legislation.",
        },
        {
          title: "9. Contact",
          text: "For questions related to these Terms of Use:",
        },
      ],
      back: "Back to website",
    },
  };

  const t = content[lang] || content.pt;

  return (
    <div className="min-h-screen bg-black-purple text-white pb-20">
      {/* Header Minimalista (Igual ao de Privacidade) */}
      <header className="border-b border-white/5 bg-black-purple/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-6 h-20 flex items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-2 text-gray-400 hover:text-purple-bright transition-colors group"
          >
            <ArrowLeft
              size={18}
              className="group-hover:-translate-x-1 transition-transform"
            />
            <span className="text-xs font-bold uppercase tracking-widest">
              {t.back}
            </span>
          </Link>
          <FileText className="text-purple-bright" size={24} />
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-6 pt-16">
        <ScrollReveal direction="bottom">
          <div className="mb-12">
            <h1 className="text-3xl md:text-5xl font-black mb-4 tracking-tight">
              {t.title}
            </h1>
            <p className="text-purple-bright font-bold text-lg mb-1">
              {t.subtitle}
            </p>
            <p className="text-gray-500 text-sm">{t.effectiveDate}</p>
          </div>

          <div className="p-8 bg-white/[0.02] border border-white/5 rounded-[2.5rem] mb-12">
            <p className="text-gray-300 leading-relaxed italic">{t.intro}</p>
          </div>

          <div className="space-y-12">
            {t.sections.map((section, idx) => (
              <div key={idx} className="group">
                <h2 className="text-xl font-bold text-white mb-4 group-hover:text-cyan-light transition-colors flex items-center gap-3">
                  <span className="w-1.5 h-6 bg-cyan-light rounded-full hidden md:block" />
                  {section.title}
                </h2>
                <p className="text-gray-400 leading-relaxed pl-0 md:pl-5">
                  {section.text}
                </p>

                {/* Info de Contato na última seção */}
                {idx === 8 && (
                  <div className="mt-6 pl-0 md:pl-5 space-y-3">
                    <div className="flex items-center gap-3 text-sm text-gray-300">
                      <Globe size={16} className="text-purple-bright" />{" "}
                      <a
                        href="https://www.ygormendanha.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-cyan-light transition-colors underline underline-offset-4"
                      >
                        www.ygormendanha.com
                      </a>
                    </div>
                    <div className="flex items-center gap-3 text-sm text-gray-300">
                      <Mail size={16} className="text-purple-bright" />{" "}
                      contato@ygormendanha.com
                    </div>
                    <div className="flex items-center gap-3 text-sm text-gray-300">
                      <Phone size={16} className="text-purple-bright" /> +55 92
                      98283-2103
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </ScrollReveal>
      </main>

      <footer className="mt-20 text-center border-t border-white/5 pt-10 opacity-30 text-[10px] tracking-[0.5em] font-bold uppercase">
        YM Development Legal Compliance
      </footer>
    </div>
  );
}
