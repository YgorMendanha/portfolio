import React from "react";
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import {
  FiShoppingCart,
  FiBarChart2,
  FiSearch,
  FiShield,
  FiClock,
  FiTrendingUp,
} from "react-icons/fi";
import { Contact } from "@/components";
import { getDictionary } from "@/utils/functions/getDictionary";
import { FaCheckCircle } from "react-icons/fa";
import { Button } from "@/components/partials/ui/button";
import { ProjectsDetails } from "@/utils/functions/getProjectsDetails";
import { ScrollReveal } from "@/components/partials/ScrollAnimate";
import { cookies } from "next/headers";

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
    title: dict.storeCreationConsulting,
    description: dict.ecommerceStoreDescription,
    openGraph: {
      title: dict.storeCreationConsulting,
      description: dict.ecommerceStoreDescription,
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
      description: dict.ecommerceStoreDescription,
      creator: "@YgorMendanha",
      title: dict.storeCreationConsulting,
    },
  };
}

type Feature = { title: string; desc: string; icon: React.ReactNode };

export default async function ShopService({
  params,
}: {
  params: Promise<{ lang: "en" | "pt" }>;
}) {
  const { lang } = await params;
  const dict = getDictionary(lang);
  const Projects = ProjectsDetails({ lang });

  const features: Feature[] = [
    {
      title: dict.shopFeatureCreationTitle,
      desc: dict.shopFeatureCreationDesc,
      icon: <FiShoppingCart className="w-6 h-6" aria-hidden />,
    },
    {
      title: dict.shopFeatureConsultingTitle,
      desc: dict.shopFeatureConsultingDesc,
      icon: <FiBarChart2 className="w-6 h-6" aria-hidden />,
    },
    {
      title: dict.shopFeatureSeoTitle,
      desc: dict.shopFeatureSeoDesc,
      icon: <FiSearch className="w-6 h-6" aria-hidden />,
    },
  ];

  const images = {
    shop: {
      img: "/finesse-store.png",
      ulr: Projects.find((p) => p.id === "ecommerce")?.link ?? "#",
    },
    shopMetrics: {
      img: "/metrics/metric_shop.png",
      ulr: "https://pagespeed.web.dev/analysis/https-store-ygormendanha-com-pt/7tg64xawqn?form_factor=desktop",
    },
    shopSingleProduct: { img: "", ulr: "" },
    shopSingleProductMetrics: {
      img: "/metrics/metric_shop_page_product.png",
      ulr: "https://pagespeed.web.dev/analysis/https-store-ygormendanha-com-pt-shop-1/py6hh4og95?form_factor=desktop",
    },
  };
  return (
    <div className="bg-light-gray text-black-purple flex flex-col gap-16">
      <section className="pt-25 md:pt-20 container mx-auto p-5  items-center flex min-h-screen  overflow-hidden">
        <div className="grid grid-cols-1 h-full lg:grid-cols-2 gap-10 items-center">
          <ScrollReveal
            speed={"slow"}
            direction="left"
            reverse
            mobileConfig={{ direction: "top" }}
          >
            <div className="relative w-full animate-float-balloon flex items-center flex-col justify-center">
              <Link
                href={images.shop.ulr}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-2xl overflow-hidden shadow-2xl "
              >
                <Image
                  src={images.shop.img}
                  alt={dict.shopPreviewAlt}
                  width={600}
                  height={600}
                  className="object-cover"
                  priority
                />
              </Link>

              <div className="mt-4 text-sm text-slate-500">
                {dict.viewExampleStore} • {dict.shopPreviewAlt}
              </div>
            </div>
          </ScrollReveal>

          <div className="flex flex-col gap-3">
            <ScrollReveal
              reverse
              speed={"slow"}
              direction="top"
              mobileConfig={{ opacityFrom: 1 }}
            >
              <>
                <p className="inline-block px-3 py-1 bg-purple-bright/20 text-black-purple rounded-full font-medium">
                  {dict.shopBadge}
                </p>

                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-tight">
                  {dict.shopHeading}
                </h1>

                <p className="text-lg text-black max-w-xl">{dict.shopIntro}</p>
              </>
            </ScrollReveal>

            <ScrollReveal
              reverse
              speed={"slow"}
              direction="right"
              className="flex flex-col sm:flex-row gap-3"
              mobileConfig={{
                direction: "right",
                reverse: false,
              }}
            >
              <Button
                href="#example-store"
                aria-label={dict.openExampleBtn}
                className="w-full sm:w-auto"
              >
                {dict.viewExampleStore}
              </Button>

              <Button
                variant="ghost"
                href="#contact"
                aria-label={dict.requestConsulting}
                className="w-full sm:w-auto"
              >
                {dict.requestConsulting}
              </Button>
            </ScrollReveal>

            <div className="mb-6 grid grid-cols-1 sm:grid-cols-3 gap-3">
              <ScrollReveal
                reverse
                speed={"slow"}
                direction="bottom"
                mobileConfig={{ reverse: false }}
                className="bg-white p-4 rounded-lg shadow-sm flex items-center gap-3"
              >
                <FiShield className="w-6 h-6 text-purple-bright" />
                <div>
                  <div className="text-sm text-slate-500">
                    {dict.cardSecurityTitle}
                  </div>
                  <div className="font-semibold">
                    {dict.cardSecuritySubtitle}
                  </div>
                </div>
              </ScrollReveal>

              <ScrollReveal
                reverse
                speed={"slow"}
                direction="bottom"
                mobileConfig={{ reverse: false }}
                className="bg-white p-4 rounded-lg shadow-sm flex items-center gap-3"
              >
                <FiClock className="w-6 h-6 text-purple-bright" />
                <div>
                  <div className="text-sm text-slate-500">
                    {dict.cardDeliveryTitle}
                  </div>
                  <div className="font-semibold">
                    {dict.cardDeliverySubtitle}
                  </div>
                </div>
              </ScrollReveal>

              <ScrollReveal
                reverse
                speed={"slow"}
                direction="bottom"
                mobileConfig={{ reverse: false }}
                className="bg-white p-4 rounded-lg shadow-sm flex items-center gap-3"
              >
                <FiTrendingUp className="w-6 h-6 text-purple-bright" />
                <div>
                  <div className="text-sm text-slate-500">
                    {dict.cardResultsTitle}
                  </div>
                  <div className="font-semibold">
                    {dict.cardResultsSubtitle}
                  </div>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-gray-lightest py-14 overflow-hidden">
        <div className="container mx-auto px-5">
          <ScrollReveal direction="top">
            <h2 className="text-2xl font-bold mb-6 animate-wiggle motion-reduce:animate-none">
              {dict.whatIDeliverTitle}
            </h2>
          </ScrollReveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f, idx) => {
              const isReverse = idx % 2 === 0;
              const direction: "top" | "left" | "right" | "bottom" = isReverse
                ? "left"
                : "right";
              return (
                <ScrollReveal
                  direction={isReverse ? "bottom" : "top"}
                  mobileConfig={{ direction }}
                  key={f.title}
                  className="p-6 bg-slate-50 rounded-2xl shadow-sm hover:-translate-y-1 transition-transform motion-reduce:transition-none group"
                >
                  <div className="flex items-center gap-4">
                    <div className="p-3 rounded-lg shadow bg-purple-bright/10 text-black-purple group-hover:text-cyan-light">
                      {f.icon}
                    </div>
                    <div>
                      <h3 className="font-semibold">{f.title}</h3>
                      <p className="text-sm text-black mt-1">{f.desc}</p>
                    </div>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      <section id="proof" className="container mx-auto px-5">
        <ScrollReveal direction="top">
          <h2 className="text-2xl font-bold mb-1  motion-reduce:animate-none">
            {dict.proofsTitle}
          </h2>
        </ScrollReveal>
        <ScrollReveal direction="bottom">
          <p className="text-black mb-1">{dict.proofsIntro}</p>
          <div className="bg-black/20 w-full h-[2px] mb-10" />
        </ScrollReveal>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <ScrollReveal direction="bottom">
            <Link
              target="_blank"
              rel="noopener noreferrer"
              href={images.shopMetrics.ulr}
              className="shadow-sm hover:scale-101 active:scale-95 transition-all duration-100"
            >
              <Image
                src={images.shopMetrics.img}
                alt={dict.shopMetricsAlt}
                width={500}
                height={500}
                className=" object-cover rounded-xl"
              />
            </Link>
          </ScrollReveal>
          <ScrollReveal direction="bottom">
            <Link
              target="_blank"
              rel="noopener noreferrer"
              href={images.shopSingleProductMetrics.ulr}
              className="shadow-sm"
            >
              <Image
                src={images.shopSingleProductMetrics.img}
                alt={dict.shopSingleProductMetricsAlt}
                width={800}
                height={800}
                className="object-cover rounded-xl"
              />
            </Link>
          </ScrollReveal>
        </div>
      </section>

      <section id="example-store" className="overflow-hidden">
        <div className="container mx-auto px-5">
          <ScrollReveal direction="bottom">
            <h2 className="text-3xl font-bold">{dict.demoStoreTitle}</h2>
            <div className="bg-black/20 w-full h-[2px] mb-10" />
          </ScrollReveal>

          <div className="grid lg:grid-cols-2 gap-8 items-center ">
            <ScrollReveal
              direction="left"
              className="bg-gray-lightest rounded-2xl p-6"
            >
              <p className="text-black mt-2">{dict.demoStoreIntro}</p>

              <ul className="mt-4 space-y-2">
                <li className="flex items-center gap-3 group">
                  <span className="inline-block p-2  rounded-md shadow-sm group-hover:text-cyan-light bg-purple-bright/10 text-black-purple">
                    <FiShoppingCart className="w-5 h-5" aria-hidden />
                  </span>
                  <span className="text-sm">{dict.demoFeatureCheckout}</span>
                </li>
                <li className="flex items-center gap-3 group">
                  <span className="inline-block p-2  rounded-md shadow-sm group-hover:text-cyan-light bg-purple-bright/10 text-black-purple">
                    <FiBarChart2 className="w-5 h-5" aria-hidden />
                  </span>
                  <span className="text-sm">{dict.demoFeatureSeo}</span>
                </li>
              </ul>

              <div className="mt-6 flex gap-3 flex-wrap">
                <Button
                  href={Projects.find((p: any) => p.id === "ecommerce")?.link}
                  target="_blank"
                  aria-label={dict.openExampleBtn}
                  className="w-full md:w-auto"
                >
                  {dict.openExampleBtn}
                </Button>

                <Button
                  href="#contact"
                  className="w-full md:w-auto"
                  variant="ghost"
                >
                  {dict.iWantConversionBtn}
                </Button>
              </div>
            </ScrollReveal>

            <ScrollReveal direction="right">
              <Link
                href={
                  Projects.find((p: any) => p.id === "ecommerce")?.link ?? "#"
                }
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-2xl overflow-hidden shadow hover:scale-101 active:scale-95 transition-all duration-100"
              >
                <Image
                  src={images.shop.img}
                  alt={dict.shopPreviewAlt}
                  width={900}
                  height={600}
                  className="w-full h-auto object-cover"
                />
              </Link>
            </ScrollReveal>
          </div>
        </div>
      </section>

      <Contact
        lang={lang}
        title="Quer que eu crie ou otimize sua loja?"
        text={
          <>
            <p className="mt-2">
              Envie detalhes da sua loja atual ou fale sobre o projeto que
              imagina. Vou analisar e responder com um plano e orçamento.
            </p>

            <ul className="mt-4 text-sm flex gap-2 flex-col">
              <li className="flex gap-2">
                <FaCheckCircle size={24} /> Brief rápido — sem compromisso
              </li>
              <li className="flex gap-2">
                <FaCheckCircle size={24} /> Plano de melhorias realista
              </li>
              <li className="flex gap-2">
                <FaCheckCircle size={24} /> Preço inicial aproximado
              </li>
            </ul>
          </>
        }
      />
    </div>
  );
}
