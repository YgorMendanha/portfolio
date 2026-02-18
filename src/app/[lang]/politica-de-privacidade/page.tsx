import { ShieldCheck, ArrowLeft, Mail, Globe, Phone } from "lucide-react";
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
    pt: "Política de Privacidade | YM Desenvolvimento",
    en: "Privacy Policy | YM Development",
  };

  const descriptions = {
    pt: "Leia a Política de Privacidade da YM Desenvolvimento e saiba como protegemos os seus dados.",
    en: "Read the YM Development Privacy Policy and learn how we protect your data.",
  };

  return {
    title: titles[lang] || titles.pt,
    description: descriptions[lang] || descriptions.pt,
    robots: "noindex, follow",
  };
}

export default async function PrivacyPage({
  params,
}: {
  params: Promise<{ lang: "en" | "pt" }>;
}) {
  const { lang } = await params;

  const content = {
    pt: {
      title: "POLÍTICA DE PRIVACIDADE",
      subtitle: "YM Desenvolvimento",
      effectiveDate: "Vigência: 16 de fevereiro de 2026",
      intro:
        "Esta Política de Privacidade descreve como a YM Desenvolvimento coleta, utiliza e protege os dados pessoais fornecidos pelos usuários ao acessar o site www.ygormendanha.com.",
      sections: [
        {
          title: "1. Coleta de dados",
          text: "Coletamos apenas informações necessárias para comunicação e funcionamento do site, incluindo: Nome, E-mail, Telefone/celular, Mensagens enviadas por formulários e informações técnicas de navegação (IP, navegador) de forma anonimizada.",
        },
        {
          title: "2. Uso das informações",
          text: "Os dados coletados são utilizados para: Responder solicitações, realizar contatos comerciais, melhorar a experiência do site e cumprir obrigações legais.",
        },
        {
          title: "3. Base legal",
          text: "O tratamento de dados ocorre com base no consentimento do usuário, no interesse legítimo do controlador e no cumprimento de obrigações legais.",
        },
        {
          title: "4. Compartilhamento",
          text: "Os dados poderão ser compartilhados apenas com prestadores de serviços essenciais ao funcionamento do site, sob confidencialidade, ou quando exigido por lei.",
        },
        {
          title: "5. Armazenamento e segurança",
          text: "Os dados são armazenados pelo tempo necessário. Adotamos medidas técnicas razoáveis para proteger as informações contra acesso não autorizado.",
        },
        {
          title: "6. Direitos do titular",
          text: "O usuário pode solicitar acesso, correção ou exclusão de seus dados pessoais a qualquer momento através dos nossos canais de contato.",
        },
        {
          title: "7. Cookies",
          text: "Utilizamos cookies para melhorar a navegação. O usuário pode gerenciar cookies diretamente nas configurações do seu navegador.",
        },
        {
          title: "8. Alterações",
          text: "Esta Política pode ser atualizada periodicamente. A versão vigente estará sempre disponível neste site.",
        },
        {
          title: "9. Contato",
          text: "Para dúvidas ou solicitações relacionadas a dados pessoais:",
        },
      ],
      back: "Voltar ao site",
    },
    en: {
      title: "PRIVACY POLICY",
      subtitle: "YM Development",
      effectiveDate: "Effective Date: February 16, 2026",
      intro:
        "This Privacy Policy describes how YM Development collects, uses, and protects personal data provided by users when accessing the website www.ygormendanha.com.",
      sections: [
        {
          title: "1. Data Collection",
          text: "We collect only information necessary for communication and website operation, including: Name, E-mail, Phone/mobile, Messages sent via forms, and technical navigation information (IP, browser) in anonymized form.",
        },
        {
          title: "2. Use of Information",
          text: "The collected data is used to: Respond to requests, perform commercial contacts, improve website experience, and comply with legal obligations.",
        },
        {
          title: "3. Legal Basis",
          text: "Data processing occurs based on user consent, the controller's legitimate interest, and compliance with legal obligations.",
        },
        {
          title: "4. Sharing",
          text: "Data may be shared only with service providers essential to the website's operation, under confidentiality, or when required by law.",
        },
        {
          title: "5. Storage and Security",
          text: "Data is stored for the necessary time. We adopt reasonable technical measures to protect information against unauthorized access.",
        },
        {
          title: "6. Holder Rights",
          text: "Users can request access, correction, or deletion of their personal data at any time through our contact channels.",
        },
        {
          title: "7. Cookies",
          text: "We use cookies to improve navigation. Users can manage cookies directly in their browser settings.",
        },
        {
          title: "8. Changes",
          text: "This Policy may be updated periodically. The current version will always be available on this website.",
        },
        {
          title: "9. Contact",
          text: "For questions or requests related to personal data:",
        },
      ],
      back: "Back to website",
    },
  };

  const t = content[lang] || content.pt;

  return (
    <div className="min-h-screen bg-black-purple text-white pb-20">
      {/* Header Minimalista */}
      <header className="border-b border-white/5 bg-black-purple/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-6 h-20 flex items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-2 text-gray-400 hover:text-cyan-light transition-colors group"
          >
            <ArrowLeft
              size={18}
              className="group-hover:-translate-x-1 transition-transform"
            />
            <span className="text-xs font-bold uppercase tracking-widest">
              {t.back}
            </span>
          </Link>
          <ShieldCheck className="text-cyan-light" size={24} />
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-6 pt-16">
        <ScrollReveal direction="bottom">
          <div className="mb-12">
            <h1 className="text-3xl md:text-5xl font-black mb-4 tracking-tight">
              {t.title}
            </h1>
            <p className="text-cyan-light font-bold text-lg mb-1">
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
                <h2 className="text-xl font-bold text-white mb-4 group-hover:text-yellow transition-colors flex items-center gap-3">
                  <span className="w-1.5 h-6 bg-yellow rounded-full hidden md:block" />
                  {section.title}
                </h2>
                <p className="text-gray-400 leading-relaxed pl-0 md:pl-5">
                  {section.text}
                </p>

                {/* Detalhes de contato na última seção */}
                {idx === 8 && (
                  <div className="mt-6 pl-0 md:pl-5 space-y-3">
                    <div className="flex items-center gap-3 text-sm text-gray-300">
                      <Globe size={16} className="text-cyan-light" />{" "}
                      <a
                        href="https://www.ygormendanha.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-yellow transition-colors underline underline-offset-4"
                      >
                        www.ygormendanha.com
                      </a>
                    </div>
                    <div className="flex items-center gap-3 text-sm text-gray-300">
                      <Mail size={16} className="text-cyan-light" />{" "}
                      contato@ygormendanha.com
                    </div>
                    <div className="flex items-center gap-3 text-sm text-gray-300">
                      <Phone size={16} className="text-cyan-light" /> +55 92
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
        YM Development Legal Department
      </footer>
    </div>
  );
}
