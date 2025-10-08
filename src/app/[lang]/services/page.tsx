import React from "react";
import type { Metadata } from "next";
import { getDictionary } from "@/utils/functions/getDictionary";
import { Contact } from "@/components";
import { Button } from "@/components/partials/ui/button";
import { ScrollReveal } from "@/components/partials/ScrollAnimate";
import { cookies } from "next/headers";
import {
  ServiceCard,
  ServicesForPage,
} from "@/utils/functions/getServicesDetails";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: "en" | "pt" }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const cookieStore = await cookies();
  const pathname = cookieStore.get("pathname");
  const dict = getDictionary(lang);

  const path = pathname?.value || "/";

  return {
    title: dict.services,
    description: dict.digitalSolutionsOverview,
    openGraph: {
      title: dict.services,
      description: dict.digitalSolutionsOverview,
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
      description: dict.digitalSolutionsOverview,
      creator: "@YgorMendanha",
      title: dict.services,
    },
  };
}

export default async function ServicesPage({
  params,
}: {
  params: Promise<{ lang: "en" | "pt" }>;
}) {
  const { lang } = await params;

  const dict = getDictionary(lang);
  const { complementaryServices, mainServices } = ServicesForPage({ lang });

  const Card = ({ s }: { s: ServiceCard }) => {
    return (
      <article
        className="group bg-gray-lightest border rounded-2xl p-5 lg:p-6 shadow-sm hover:shadow-lg transform-gpu transition-all duration-200 hover:-translate-y-0.5 focus-within:shadow-lg outline-none flex flex-col lg:flex-row gap-4"
        aria-labelledby={`service-title-${s.id}`}
        role="article"
        tabIndex={0}
      >
        <div className="flex-shrink-0 flex items-center justify-center w-full lg:w-auto lg:mr-2 lg:hidden">
          <div
            aria-hidden={!s.icon ? undefined : false}
            className="rounded-lg p-4 sm:p-3 bg-purple-bright/10 text-black-purple group-hover:text-cyan-light group-hover:bg-cyan-light/10 flex items-center justify-center"
          >
            {s.icon ? (
              <span
                className="w-8 h-8 sm:w-6 sm:h-6 flex items-center justify-center"
                aria-hidden
              >
                {s.icon}
              </span>
            ) : (
              <span className="sr-only">Ícone do serviço</span>
            )}
          </div>
        </div>

        <div className="flex-1 flex flex-col min-h-0">
          <div className="flex items-center gap-3">
            {s.icon && (
              <div className="hidden lg:flex items-center justify-center rounded-md p-2 bg-purple-bright/10 text-black-purple group-hover:text-cyan-light group-hover:bg-cyan-light/10">
                <span
                  className="w-6 h-6 flex items-center justify-center"
                  aria-hidden
                >
                  {s.icon}
                </span>
              </div>
            )}

            <h3
              id={`service-title-${s.id}`}
              className="text-lg sm:text-xl text-black-purple font-semibold"
            >
              {s.title}
            </h3>
          </div>
          {s.short && (
            <p className="text-sm sm:text-base text-dark mt-2">{s.short}</p>
          )}

          {s.bullets && s.bullets.length > 0 && (
            <ul className="mt-3 text-sm text-dark list-disc list-inside space-y-1">
              {s.bullets.map((b) => (
                <li key={b} className="break-words">
                  {b}
                </li>
              ))}
            </ul>
          )}
          <div className="flex-1" />
          <footer className="mt-4 pt-2 flex flex-col sm:flex-row gap-3 sm:gap-2">
            <Button
              href="#contact"
              aria-label={`${dict.request} ${s.title}`}
              className="w-full sm:w-auto"
            >
              {dict.request}
            </Button>

            {s.url && (
              <Button
                variant="ghost"
                href={s.url}
                aria-label={`${dict.moreDetails} ${s.title}`}
                className="w-full sm:w-auto"
              >
                {dict.moreDetails}
              </Button>
            )}
          </footer>
        </div>
      </article>
    );
  };

  return (
    <div className="min-h-screen pt-25 bg-black-purple text-white">
      <header className="container px-5 mx-auto mb-8">
        <ScrollReveal reverse direction="left">
          <>
            <h1 className="text-3xl font-extrabold">{dict.services}</h1>
            <p className="mt-2 text-white">{dict.servicesOverview}</p>
          </>
        </ScrollReveal>
      </header>

      <div className="container px-5  mx-auto flex flex-col gap-4">
        <ScrollReveal reverse direction="bottom">
          <h3 className="text-2xl font-extrabold">{dict.main}</h3>
        </ScrollReveal>
        <div
          id="catalog"
          className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 container mb-10"
        >
          {mainServices.map((s) => (
            <Card s={s} key={s.id} />
          ))}
        </div>
      </div>

      <div className="container px-5 pb-20 mx-auto flex flex-col gap-4">
        <ScrollReveal direction="top">
          <h3 className="text-2xl font-extrabold">{dict.others}</h3>
        </ScrollReveal>
        <div
          id="catalog"
          className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 container mb-10"
        >
          {complementaryServices.map((s) => (
            <Card s={s} key={s.id} />
          ))}
        </div>
      </div>

      <Contact lang={lang} title={dict.contact.call} text={dict.contact.text} />
    </div>
  );
}
