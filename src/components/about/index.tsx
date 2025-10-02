"use client";

import { getDictionary } from "@/utils/functions/getDictionary";
import { BsCartFill, BsFillGearFill, BsFillPinAngleFill } from "react-icons/bs";
import { ScrollReveal } from "../partials/ScrollAnimate";

export function About({ lang }: { lang: "pt" | "en" }) {
  const dict = getDictionary(lang ?? "pt");

  return (
    <section
      id="about"
      className="bg-gray-lightest border-light-gray py-20 overflow-x-hidden"
    >
      <div className="container mx-auto px-5">
        <ScrollReveal speed={"slow"} direction="top">
          <>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-center text-black-purple mb-8">
              {dict.turningIdeasIntoResults}
            </h2>
            <h3 className="text-black-purple sm:text-2xl text-base text-center mx-auto">
              {dict.introYgor}
              <br className="hidden sm:block" />
              {dict.recentExperience}
              <br className="hidden sm:block" />
            </h3>
          </>
        </ScrollReveal>

        <div className="flex flex-col sm:flex-row gap-6 justify-center flex-wrap mt-20">
          <ScrollReveal
            direction="left"
            className="flex-1 group bg-white hover:scale-105 transition-transform duration-400 rounded-2xl p-6 shadow-xl flex flex-col"
          >
            <p className="text-black-purple text-xl mb-4 flex items-center gap-3">
              <span className="rounded-lg p-3 bg-purple-bright/10 text-purple-bright group-hover:text-cyan-light group-hover:bg-cyan-light/10">
                <BsCartFill
                  size={40}
                  className="text-purple-bright group-hover:text-cyan-light"
                />
              </span>
              {dict.ecommerceTitle}
            </p>
            <p className="text-dark flex-1">{dict.ecommerceDescription}</p>
          </ScrollReveal>

          <ScrollReveal
            direction="bottom"
            className="flex-1 group bg-white hover:scale-105 transition-transform duration-400 rounded-2xl p-6 shadow-xl flex flex-col"
          >
            <p className="text-black-purple text-xl mb-4 flex items-center gap-3">
              <span className="rounded-lg p-3 bg-purple-bright/10 text-purple-bright group-hover:text-cyan-light group-hover:bg-cyan-light/10">
                <BsFillGearFill
                  size={40}
                  className="text-purple-bright group-hover:text-cyan-light"
                />
              </span>
              {dict.erpAutomationTitle}
            </p>
            <p className="text-dark flex-1">{dict.erpAutomationDescription}</p>
          </ScrollReveal>

          <ScrollReveal
            direction="right"
            className="flex-1 group bg-white hover:scale-105 transition-transform duration-400 rounded-2xl p-6 shadow-xl flex flex-col"
          >
            <p className="text-black-purple text-xl mb-4 flex items-center gap-3">
              <span className="rounded-lg p-3 bg-purple-bright/10 text-purple-bright group-hover:text-cyan-light group-hover:bg-cyan-light/10">
                <BsFillPinAngleFill size={40} />
              </span>
              {dict.landingPagesTitle}
            </p>
            <p className="text-dark flex-1">{dict.landingPagesDescription}</p>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
