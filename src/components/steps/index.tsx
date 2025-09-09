"use client";
import { getDictionary } from "@/utils/functions/getDictionary";
import Link from "next/link";
import React from "react";
import { BsArrowRight } from "react-icons/bs";
import { FaCode } from "react-icons/fa";
import { FiPackage } from "react-icons/fi";
import { HiOutlineDocumentText } from "react-icons/hi";
import { MdOutlineExplore } from "react-icons/md";

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

  return (
    <div className="bg-gray-lightest">
      <section
        aria-labelledby="processo-title"
        className="container mx-auto px-5 flex flex-col items-center text-center py-20 text-black-purple"
      >
        <h2
          id="processo-title"
          className="text-3xl sm:text-4xl font-extrabold mb-2"
        >
          {dict.developmentProcessTitle}
        </h2>
        <p className="sm:text-base text-3xl text-dark mb-8 max-w-2xl mx-auto">
          {dict.developmentProcessDescription}
        </p>

        <div className="flex flex-col lg:flex-row items-stretch justify-between gap-8">
          {steps.map((step, idx) => {
            const isLast = idx === steps.length - 1;

            return (
              <React.Fragment key={step.title}>
                <div className="flex flex-col items-center justify-between rounded-2xl bg-white shadow-xl p-6 sm:flex-1 hover:scale-105 transition-transform duration-300 group ">
                  <div className="mb-2">{step.icon}</div>
                  <h3 className="font-semibold text-lg mb-2">{step.title}</h3>
                  <p className="text-sm text-gray-600 text-center flex-1 flex items-center justify-center">
                    {step.description}
                  </p>
                </div>

                {!isLast && (
                  <div className="hidden lg:flex items-center mx-2">
                    <BsArrowRight
                      size={28}
                      className="text-cyan-light"
                      aria-hidden
                    />
                  </div>
                )}

                {!isLast && (
                  <div className="flex lg:hidden items-center justify-center my-2">
                    <BsArrowRight
                      size={24}
                      className="rotate-90 text-cyan-light"
                      aria-hidden
                    />
                  </div>
                )}
              </React.Fragment>
            );
          })}
        </div>

        <div className="mt-20">
          <Link
            href={"#contact"}
            className="bg-purple-bright hover:bg-cyan-light hover:scale-105 text-white px-8 py-4 rounded-2xl font-semibold transition-transform duration-200 cursor-pointer"
          >
            {dict.letsTalk}
          </Link>
        </div>
      </section>
    </div>
  );
}
