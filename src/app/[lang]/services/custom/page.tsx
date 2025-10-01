import React from "react";
import type { Metadata } from "next";
import {
  FiBox,
  FiFeather,
  FiLayers,
  FiClock,
  FiCheckCircle,
} from "react-icons/fi";
import { getDictionary } from "@/utils/functions/getDictionary";
import { Contact } from "@/components";
import { Button } from "@/components/partials/ui/button";
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
    title: dict.customAppCreation,
    description: dict.customAppDescription,
    openGraph: {
      title: dict.customAppCreation,
      description: dict.customAppDescription,
      url: path,
    },
    twitter: {
      site: "@site",
      card: "summary",
      description: dict.customAppDescription,
      creator: "@YgorMendanha",
      title: dict.customAppCreation,
    },
  };
}

type Step = { title: string; desc: string; icon: React.ReactNode };

export default async function CustomService({
  params,
}: {
  params: Promise<{ lang: "en" | "pt" }>;
}) {
  const { lang } = await params;
  const dict = getDictionary(lang);

  const steps: Step[] = [
    {
      title: dict.stepDiscoveryTitle,
      desc: dict.stepDiscoveryDesc,
      icon: <FiFeather size={24} aria-hidden />,
    },
    {
      title: dict.stepProposalTitle,
      desc: dict.stepProposalDesc,
      icon: <FiLayers size={24} aria-hidden />,
    },
    {
      title: dict.stepDevelopmentTitle,
      desc: dict.stepDevelopmentDesc,
      icon: <FiBox size={24} aria-hidden />,
    },
    {
      title: dict.stepLaunchTitle,
      desc: dict.stepLaunchDesc,
      icon: <FiClock size={24} aria-hidden />,
    },
  ];

  const highlights: string[] = Array.isArray(dict.customAppHighlights)
    ? dict.customAppHighlights
    : [];

  return (
    <div className=" bg-light-gray text-black-purple">
      <section className="container mx-auto px-5 py-20 lg:py-28 min-h-screen flex justify-center items-center ">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 h-full items-center">
          <ScrollReveal direction="top" speed={"slow"} reverse>
            <div className="flex justify-center ">
              <div className="w-[360px] h-[360px] relative animate-float-balloon soft-drop-shadow motion-reduce:animate-none">
                <svg
                  viewBox="0 0 360 360"
                  className="w-full h-full"
                  role="img"
                  aria-label="Ilustração de app sob encomenda"
                >
                  <defs>
                    <linearGradient id="g1" x1="0" x2="1">
                      <stop offset="0%" stopColor="#7C3AED" />
                      <stop offset="100%" stopColor="#06B6D4" />
                    </linearGradient>
                  </defs>

                  <rect
                    x="0"
                    y="0"
                    width="360"
                    height="360"
                    rx="28"
                    fill="url(#g1)"
                    opacity="0.12"
                  />

                  <g transform="translate(40,40)">
                    <rect
                      width="280"
                      height="220"
                      rx="18"
                      fill="#fff"
                      opacity="0.98"
                    />

                    <circle
                      cx="44"
                      cy="44"
                      r="26"
                      fill="#7C3AED"
                      opacity="0.95"
                    />
                    <rect
                      x="84"
                      y="30"
                      width="160"
                      height="16"
                      rx="8"
                      fill="#0F172A"
                      opacity="0.9"
                    />

                    <rect
                      x="20"
                      y="90"
                      width="240"
                      height="12"
                      rx="6"
                      fill="#E6EEF5"
                    />
                    <rect
                      x="20"
                      y="110"
                      width="160"
                      height="12"
                      rx="6"
                      fill="#E6EEF5"
                    />
                    <rect
                      x="20"
                      y="130"
                      width="200"
                      height="12"
                      rx="6"
                      fill="#E6EEF5"
                    />
                  </g>

                  <circle
                    cx="300"
                    cy="60"
                    r="10"
                    fill="#00c2ff"
                    opacity="0.95"
                  />
                  <circle
                    cx="320"
                    cy="120"
                    r="6"
                    fill="#7C3AED"
                    opacity="0.9"
                  />
                </svg>
              </div>
            </div>
          </ScrollReveal>

          <div className="space-y-6 overflow-hidden">
            <ScrollReveal
              speed={"slow"}
              direction="right"
              reverse
              mobileConfig={{
                direction: "bottom",
                distance: 0,
                opacityFrom: 1,
              }}
              className="space-y-6"
            >
              <p className="inline-block px-3 py-1 bg-purple-bright/10 text-black-purple rounded-full font-medium ">
                {dict.customAppBadge}
              </p>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-tight ">
                {dict.customAppHeading}
              </h1>

              <p className="text-lg text-black-purple max-w-xl ">
                {dict.customAppIntro}
              </p>

              <div className="flex gap-3 mt-4 flex-wrap">
                <Button href="#process" className="w-full lg:w-auto">
                  {dict.howItWorks}
                </Button>
                <Button
                  href="#contact"
                  className="w-full lg:w-auto"
                  variant="ghost"
                >
                  {dict.iWantToTalk}
                </Button>
              </div>
            </ScrollReveal>

            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-3 overflow-hidden">
              {highlights.map((h, idx) => {
                const isReverse = idx % 2 === 0;
                const direction: "top" | "left" | "right" | "bottom" = isReverse
                  ? "left"
                  : "right";

                return (
                  <ScrollReveal
                    speed={"slow"}
                    direction={"right"}
                    reverse
                    mobileConfig={{ reverse: false, direction }}
                    key={h}
                    className="flex items-start gap-3 bg-white p-3 rounded-lg shadow-sm"
                  >
                    <FiCheckCircle
                      size={24}
                      className=" w-[24px] h-[24px] min-w-[24px] min-h-[24px] text-purple-bright mt-1"
                      aria-hidden
                    />
                    <div className="text-sm text-dark">{h}</div>
                  </ScrollReveal>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <div className="bg-gray-lightest">
        <section
          id="process"
          className="container mx-auto px-5 py-12 overflow-hidden "
        >
          <ScrollReveal direction="top">
            <h2 className="text-2xl font-bold mb-6 ">{dict.processTitle}</h2>
            <p className="text-black mb-6">{dict.processIntro}</p>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((s, idx) => {
              const isReverse = idx % 2 === 0;
              let direction: "top" | "left" | "right" | "bottom" = isReverse
                ? "left"
                : "right";

              if (idx === 0) {
                direction = "bottom";
              }
              return (
                <ScrollReveal
                  direction={isReverse ? "top" : "bottom"}
                  mobileConfig={{ direction }}
                  key={s.title}
                  className="p-5 bg-white rounded-2xl shadow-sm group  hover:scale-101"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-3 rounded-lg bg-purple-bright/10 text-black-purple group-hover:text-cyan-light">
                      {s.icon}
                    </div>
                    <div>
                      <h3 className="font-semibold">{s.title}</h3>
                      <p className="text-sm text-black mt-1">{s.desc}</p>
                    </div>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </section>
      </div>

      <section className="py-12">
        <div className="container mx-auto px-5 grid lg:grid-cols-2 gap-8 items-center">
          <div>
            <ScrollReveal direction={"left"}>
              <h3 className="text-2xl font-bold ">{dict.whyHireTitle}</h3>
            </ScrollReveal>
            <ul className="mt-4 space-y-3 text-black">
              {Array.isArray(dict.whyHireBullets) &&
                dict.whyHireBullets.map((li: string, i: number) => (
                  <ScrollReveal speed={"fast"} direction={"bottom"} key={i}>
                    <li>• {li}</li>
                  </ScrollReveal>
                ))}
            </ul>
          </div>

          <ScrollReveal direction={"right"}>
            <div className="rounded-2xl bg-purple-bright/10 text-black-purple p-6">
              <p className="">{dict.noPublicExamplesText}</p>

              <div className="mt-4 flex gap-3">
                <Button href="#contact">{dict.iWantToTalk}</Button>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <Contact lang={lang} title={dict.contact.call} text={dict.contact.text} />
    </div>
  );
}
