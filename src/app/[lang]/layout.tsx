import { Layout } from "@/components";
import "./globals.css";
import type { Metadata, Viewport } from "next";
import { Nunito } from "next/font/google";
import { getDictionary } from "@/utils/functions/getDictionary";
import { Analytics } from "@vercel/analytics/react";
import { GoogleAnalytics } from "@/utils/lib/analytics";
import { ProfilePage, WithContext, Organization } from "schema-dts";
import Script from "next/script";

const jsonLdPerson: WithContext<ProfilePage> = {
  "@context": "https://schema.org",
  "@type": "ProfilePage",
  mainEntity: {
    "@id": "#main-author",
    "@type": "Person",
    name: "Ygor Mendanha",
  },
  alternateName: "YM Desenvolvimento",
};

const jsonLdOrganization: WithContext<Organization> = {
  "@context": "https://schema.org",
  "@type": "Organization",
  url: "https://www.ygormendanha.com.br",
  logo: "https://myymbucket.s3.sa-east-1.amazonaws.com/imagens/Logo.png",
  name: "YM Desenvolvimento",
};

const nunito = Nunito({ subsets: ["latin"] });

type Props = {
  params: { lang: "pt" | "en" };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const dict = getDictionary(params.lang ?? "pt");

  return {
    metadataBase: new URL("https://www.ygormendanha.com.br"),
    title: dict.metatags.title,
    description: dict.metatags.description,
    openGraph: {
      url: "https://myymbucket.s3.sa-east-1.amazonaws.com/imagens/Logo.png",
      title: dict.metatags.title,
      description: dict.metatags.description,
      siteName: "Ygor Mendanha",
      images: [
        {
          url: "https://myymbucket.s3.sa-east-1.amazonaws.com/imagens/Logo.png",
          width: 800,
          height: 600,
        },
      ],
    },
    authors: [
      { name: "Ygor Mendanha", url: "https://www.ygormendanha.com.br" },
    ],
    creator: "Ygor Mendanha",
    keywords: [
      "Next.js",
      "React",
      "JavaScript",
      "Ygor Mendanha",
      "YM Desenvolvimento",
      "YM Development",
      "Ygor Guimarães",
      "Phyton",
      "Desenvolvedor",
      "Developer",
      "Portfolio",
    ],
    twitter: {
      site: "@site",
      card: "summary",
      description: dict.metatags.description,
      creator: "@YgorMendanha",
      title: dict.metatags.title,
    },
    alternates: {
      canonical: params?.lang === "en" ? "/en" : "/pt",
      languages: {
        en: "/en",
        "pt": "/pt",
        "x-default": "/",
      },
    },
  };
}

export function generateViewport({ params }: Props): Viewport {
  return {
    colorScheme: "dark",
    themeColor: "#2e1065",
  };
}

export default function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { lang: "en" | "pt" };
}) {
  let lang: "pt-BR" | "en-US" = "pt-BR";
  if (params.lang === "en") {
    lang = "en-US";
  } else if (params.lang === "pt") {
    lang = "pt-BR";
  }

  return (
    <html lang={lang}>
      <Script
        id="jsonLdPerson"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdPerson) }}
      />
      <Script
        id="jsonLdOrganization"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdOrganization) }}
      />
      <body className={nunito.className}>
        <Layout>{children}</Layout>

        <Analytics />
        <GoogleAnalytics />
      </body>
    </html>
  );
}
