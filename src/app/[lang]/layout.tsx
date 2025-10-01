import { Layout } from "@/components";
import "@/app/globals.css";
import type { Metadata, Viewport } from "next";
import { Nunito } from "next/font/google";
import { getDictionary } from "@/utils/functions/getDictionary";
import { Analytics } from "@vercel/analytics/next";
import { GoogleAnalytics } from "@/utils/lib/analytics";
import { ProfilePage, WithContext, Organization } from "schema-dts";
import Script from "next/script";
import { CSPostHogProvider } from "../providers";
import { cookies } from "next/headers";

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
  url: "https://www.ygormendanha.com",
  logo: "https://myymbucket.s3.sa-east-1.amazonaws.com/imagens/Logo.png",
  name: "YM Desenvolvimento",
};

const nunito = Nunito({ subsets: ["latin"] });

export async function generateMetadata(): Promise<Metadata> {
  const cookieStore = await cookies();
  const pathname = cookieStore.get("pathname");
  const urlsite = process.env.NEXT_PUBLIC_NEXT_SITE_URL ?? "";

  const path = pathname?.value || "/";
  const lang = path.startsWith("/en") ? "en" : "pt";

  const dict = getDictionary(lang ?? "pt");

  const url = lang === "en" ? `${urlsite}${path}/` : `${urlsite}/br${path}`;

  const getURL = () =>
    lang === "en"
      ? path.split("/").slice(2).join("/")
      : path.split("/").slice(1).join("/");

  return {
    metadataBase: new URL(`${urlsite}`),
    title: {
      absolute: dict.metatags.title,
      template: `%s - ${dict.metatags.title}`,
      default: dict.metatags.title,
    },
    description: dict.metatags.description,
    openGraph: {
      url: path,
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
    authors: [{ name: "Ygor Mendanha", url: `${urlsite}` }],
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
      canonical: url,
      languages: {
        "pt-br": `${urlsite}/br/${getURL()}`,
        en: `${urlsite}/usa/${getURL()}`,
        "x-default": `${urlsite}/br/${getURL()}`,
      },
    },
  };
}

export function generateViewport(): Viewport {
  return {
    colorScheme: "dark",
    themeColor: "#19092e",
  };
}

export default async function RootLayout({
  children,
  params,
}: LayoutProps<"/[lang]">) {
  const paramsPage = await params;
  const cookieStore = await cookies();
  const pathname = cookieStore.get("pathname");

  const path = pathname?.value || "/";
  const unblockUrl = path.startsWith("/en") || path.startsWith("/pt");

  let lang: "pt-BR" | "en-US" = "pt-BR";
  if (paramsPage.lang === "en") {
    lang = "en-US";
  } else if (paramsPage.lang === "pt") {
    lang = "pt-BR";
  }

  return (
    <html lang={lang}>
      {!unblockUrl && <meta name="robots" content="noindex, nofollow"></meta>}
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

      <CSPostHogProvider>
        <body className={nunito.className}>
          <Layout>{children}</Layout>

          <Analytics />
          <GoogleAnalytics />
        </body>
      </CSPostHogProvider>
    </html>
  );
}
