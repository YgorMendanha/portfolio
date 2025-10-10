import React from "react";
import Image from "next/image";
import type { Metadata } from "next";
import { FiShoppingCart, FiTrendingUp, FiSmartphone } from "react-icons/fi";
import { Button } from "@/components/partials/ui/button";
import { CardChangeImg } from "./components/card";
import { Contact } from "@/components";
import { getDictionary } from "@/utils/functions/getDictionary";
import { ProjectsDetails } from "@/utils/functions/getProjectsDetails";
import { cookies } from "next/headers";
import { ScrollReveal } from "@/components/partials/ScrollAnimate";
import { SectionsForPageShopDetails } from "@/utils/functions/getSectionsForPageShop";

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
    title: `${dict.projects} - E‑commerce`,
    description: dict.understandStoreQuickly,
    openGraph: {
      title: `${dict.projects} - E‑commerce`,
      description: dict.understandStoreQuickly,
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
      description: dict.understandStoreQuickly,
      creator: "@YgorMendanha",
      title: `${dict.projects} - E‑commerce`,
    },
  };
}

export default async function StoreDocWithIllustrations({
  params,
}: {
  params: Promise<{ lang: "en" | "pt" }>;
}) {
  const { lang } = await params;
  const dict = getDictionary(lang);
  const Projects = ProjectsDetails({ lang });
  const SectionsProjects = SectionsForPageShopDetails({ lang });

  return (
    <div className="bg-light-gray text-black-purple">
      <section className="pt-20 md:pt-20 container mx-auto pb-10 p-5 lg:py-28 min-h-screen flex items-center">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <ScrollReveal reverse speed={"slow"} direction="bottom">
            <p className="inline-block px-3 py-1 bg-purple-bright/10 text-black-purple rounded-full text-sm font-medium">
              E‑commerce
            </p>
            <h1 className="mt-4 text-3xl font-extrabold">
              {dict.understandStoreQuickly}
            </h1>
            <p className="mt-4 text-black">{dict.focusOnSales}</p>

            <div className="mt-6 flex gap-3 flex-wrap">
              <Button
                target="_blank"
                className="w-full sm:w-auto"
                href={Projects.find((p) => p.id === "ecommerce")?.link}
              >
                {dict.openStoreDemo}
              </Button>
              <Button
                className="w-full sm:w-auto"
                href="#contact"
                variant="ghost"
              >
                {dict.requestReview}
              </Button>
            </div>
          </ScrollReveal>

          <ScrollReveal
            reverse
            speed={"slow"}
            direction="top"
            className="rounded-2xl overflow-hidden shadow-lg bg-white p-4"
          >
            <Image
              src={"/finesse-store.png"}
              alt="Ilustração páginas"
              width={520}
              height={320}
              className="w-full h-auto object-cover"
            />
          </ScrollReveal>
        </div>
      </section>

      <div className="container mx-auto px-5 py-6 space-y-8 overflow-hidden">
        <ScrollReveal
          direction="top"
          speed={"slow"}
          className="bg-white p-6 rounded-2xl shadow-sm"
          mobileConfig={{ direction: "right" }}
        >
          <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-4 bg-light-gray rounded-lg text-center">
              <FiShoppingCart className="mx-auto w-6 h-6 text-indigo-600" />
              <div className="mt-2 font-semibold">{dict.clearPages}</div>
              <div className="text-sm text-black">
                {dict.easyHomeProductCheckout}
              </div>
            </div>

            <div className="p-4 bg-light-gray rounded-lg text-center">
              <FiSmartphone className="mx-auto w-6 h-6 text-indigo-600" />
              <div className="mt-2 font-semibold">{dict.worksOnMobile}</div>
              <div className="text-sm text-black">
                {dict.touchFriendlyLayoutCheckout}
              </div>
            </div>

            <div className="p-4 bg-light-gray rounded-lg text-center">
              <FiTrendingUp className="mx-auto w-6 h-6 text-indigo-600" />
              <div className="mt-2 font-semibold">{dict.measurement}</div>
              <div className="text-sm text-black">
                {dict.trackVisitsAndSales}
              </div>
            </div>
          </div>
        </ScrollReveal>

        {SectionsProjects.map((sec, idx) => {
          const isReverse = idx % 2 === 0;
          return (
            <ScrollReveal key={sec.id} direction={isReverse ? "left" : "right"}>
              <CardChangeImg item={sec} index={idx + 1} />
            </ScrollReveal>
          );
        })}
      </div>
      <Contact lang={lang} title={dict.contact.call} text={dict.contact.text} />
    </div>
  );
}
