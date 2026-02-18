import { Metadata } from "next";
import { LandingPageClinicCore } from "./components/page";
import { cookies } from "next/headers";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: "en" | "pt" }>;
}): Promise<Metadata> {
  const cookieStore = await cookies();
  const pathname = cookieStore.get("pathname");

  const path = pathname?.value || "/";

  const title = "Clinic Core - Sistema de Gestão para Clínicas";

  const description =
    "Organize sua clínica e pare de perder dinheiro com o Clinic Core. Sistema de gestão completo com IA, automação de WhatsApp, prontuário e financeiro centralizados. Coloque sua clínica no piloto automático, elimine custos invisíveis e aumente seus lucros. Inscreva-se na lista de espera.";

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: path,
      images: [
        {
          url: "https://myymbucket.s3.sa-east-1.amazonaws.com/imagens/LogoClinicCore.png",
          width: 800,
          height: 600,
        },
      ],
    },
    twitter: {
      site: "@site",
      card: "summary",
      description,
      creator: "@YgorMendanha",
      title,
    },
  };
}

export default async function LandingPage() {
  return <LandingPageClinicCore />;
}
