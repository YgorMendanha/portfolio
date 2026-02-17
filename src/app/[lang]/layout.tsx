import { Layout } from "@/components";
import "@/app/globals.css";
import type { Metadata, Viewport } from "next";
import { Nunito } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { GoogleAnalytics } from "@/utils/lib/analytics";
import { ProfilePage, WithContext, Organization } from "schema-dts";
import Script from "next/script";
import { Providers } from "../providers";
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
  const pathname = cookieStore.get("pathname")?.value ?? "/";
  const urlsite = (process.env.NEXT_PUBLIC_NEXT_SITE_URL ?? "").replace(
    /\/+$/,
    ""
  );

  const path = pathname === "/" ? "/" : pathname.replace(/\/+$/, "");
  const segments = path.split("/").filter(Boolean);
  const first = segments[0];
  const hasLangPrefix = first === "en" || first === "pt";
  const lang = first === "en" ? "en" : "pt";

  const getURL = () => {
    const parts = hasLangPrefix ? segments.slice(1) : segments;
    return parts.join("/");
  };

  const canonicalPath =
    lang === "en"
      ? `/en${getURL() ? `/${getURL()}` : ""}`
      : `/pt${getURL() ? `/${getURL()}` : ""}`;

  const canonicalURL = `${urlsite}${canonicalPath}`;

  // metatags inline (pt / en)
  const metatags =
    lang === "pt"
      ? {
          title: "Ygor Mendanha - YM Desenvolvimento",
          description:
            "Especialista em soluções digitais: e-commerce, apps personalizados e sistemas ERP para empresas que buscam vender mais e otimizar processos.",
        }
      : {
          title: "Ygor Mendanha - YM Development",
          description:
            "Specialist in digital solutions: e-commerce, custom apps and ERP systems for companies looking to increase sales and optimize processes.",
        };

  return {
    metadataBase: new URL(`${urlsite}`),
    title: {
      absolute: metatags.title,
      template: `%s - ${metatags.title}`,
      default: metatags.title,
    },
    description: metatags.description,
    openGraph: {
      url: canonicalURL,
      title: metatags.title,
      description: metatags.description,
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
      description: metatags.description,
      creator: "@YgorMendanha",
      title: metatags.title,
    },
    alternates: {
      canonical: canonicalURL,
      languages: {
        "pt-br": `${urlsite}/pt${getURL() ? `/${getURL()}` : ""}`,
        en: `${urlsite}/en${getURL() ? `/${getURL()}` : ""}`,
        "x-default": `${urlsite}/pt${getURL() ? `/${getURL()}` : ""}`,
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

      <Providers>
        <body className={nunito.className}>
          <Layout>{children}</Layout>

          <Analytics />
          <GoogleAnalytics />
        </body>
      </Providers>
    </html>
  );
}
