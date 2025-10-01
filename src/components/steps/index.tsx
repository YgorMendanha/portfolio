"use client";
import { getDictionary } from "@/utils/functions/getDictionary";
import Link from "next/link";
import React from "react";
import { BsArrowRight } from "react-icons/bs";
import { FaCode } from "react-icons/fa";
import { FiPackage } from "react-icons/fi";
import { HiOutlineDocumentText } from "react-icons/hi";
import { MdOutlineExplore } from "react-icons/md";
import { ScrollReveal } from "../partials/ScrollAnimate";
import { useWindowSize } from "@/hooks/useWindowSize";

export function Steps({ lang }: { lang: "pt" | "en" }) {
  const dict = getDictionary(lang ?? "pt");

  const steps = [
    {
      icon: (
        <MdOutlineExplore
          size={48}
          className="text-purple-bright group-hover:text-cyan-light"
          aria-hidden
        />
      ),
      title: dict.stepDiscoveryTitle,
      description: dict.stepDiscoveryDescription,
    },
    {
      icon: (
        <HiOutlineDocumentText
          size={48}
          className="text-purple-bright group-hover:text-cyan-light"
          aria-hidden
        />
      ),
      title: dict.stepPlanningTitle,
      description: dict.stepPlanningDescription,
    },
    {
      icon: (
        <FaCode
          size={48}
          className="text-purple-bright group-hover:text-cyan-light"
          aria-hidden
        />
      ),
      title: dict.stepDevelopmentTitle,
      description: dict.stepDevelopmentDescription,
    },
    {
      icon: (
        <FiPackage
          size={48}
          className="text-purple-bright group-hover:text-cyan-light"
          aria-hidden
        />
      ),
      title: dict.stepDeliveryTitle,
      description: dict.stepDeliveryDescription,
    },
  ];

  const { width } = useWindowSize();

  type mov = "left" | "right" | "top" | "bottom";

  const isMobile = width ? width <= 900 : true;
  const fistMov: mov = isMobile ? "right" : "bottom";
  const secMov: mov = isMobile ? "left" : "top";

  return (
    <div className="bg-gray-lightest overflow-hidden">
      <section
        aria-labelledby="processo-title"
        className="container mx-auto px-5 flex flex-col items-center text-center pb-20 text-black-purple"
      >
        <ScrollReveal direction="bottom">
          <h2
            id="processo-title"
            className="text-3xl sm:text-4xl font-extrabold mb-2"
          >
            {dict.developmentProcessTitle}
          </h2>
          <p className="sm:text-2xl text-base text-dark mb-8 max-w-2xl mx-auto">
            {dict.developmentProcessDescription}
          </p>
        </ScrollReveal>

        <div className="flex flex-col lg:flex-row items-stretch justify-between gap-8">
          {steps.map((step, idx) => {
            const isLast = idx === steps.length - 1;

            const isReverse = idx % 2 === 0;

            return (
              <React.Fragment key={step.title}>
                <ScrollReveal
                  speed={"slow"}
                  direction={isReverse ? secMov : fistMov}
                  className="flex flex-col items-center justify-between rounded-2xl bg-white shadow-xl p-6 sm:flex-1 hover:scale-105 transition-transform duration-300 group "
                >
                  <div className="mb-2">{step.icon}</div>
                  <h3 className="font-semibold text-lg mb-2">{step.title}</h3>
                  <p className="text-sm text-gray-600 text-center flex-1 flex items-center justify-center">
                    {step.description}
                  </p>
                </ScrollReveal>

                {!isLast && (
                  <ScrollReveal
                    distance={0}
                    className="hidden lg:flex items-center mx-2"
                  >
                    <BsArrowRight
                      size={28}
                      className="text-cyan-light"
                      aria-hidden
                    />
                  </ScrollReveal>
                )}

                {!isLast && (
                  <ScrollReveal
                    distance={0}
                    speed={"slow"}
                    direction={isReverse ? secMov : fistMov}
                    className="flex lg:hidden items-center justify-center my-2"
                  >
                    <BsArrowRight
                      size={24}
                      className="rotate-90 text-cyan-light"
                      aria-hidden
                    />
                  </ScrollReveal>
                )}
              </React.Fragment>
            );
          })}
        </div>

        <ScrollReveal direction="bottom" className="mt-20">
          <Link
            href={"#contact"}
            className="bg-purple-bright hover:bg-cyan-light hover:scale-105 text-white px-8 py-4 rounded-2xl font-semibold transition-transform duration-200 cursor-pointer"
          >
            {dict.letsTalk}
          </Link>
        </ScrollReveal>
      </section>
    </div>
  );
}
