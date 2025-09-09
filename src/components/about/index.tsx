"use client";

import { getDictionary } from "@/utils/functions/getDictionary";
import { BsCartFill, BsFillGearFill, BsFillPinAngleFill } from "react-icons/bs";

export function About({ lang }: { lang: "pt" | "en" }) {
  const dict = getDictionary(lang ?? "pt");

  return (
    <section id="about" className="bg-gray-lightest border-light-gray pt-20">
      <div className="container mx-auto px-5">
        {/* Novo título da seção */}
        <h2 className="text-3xl sm:text-4xl font-extrabold text-center text-black-purple mb-8">
          {dict.turningIdeasIntoResults}
        </h2>
        <h3 className="text-black-purple text-2xl text-center mx-auto">
          {dict.introYgor}
          <br className="hidden sm:block" />
          {dict.recentExperience}
          <br className="hidden sm:block" />
          {dict.servicesSummary}
        </h3>

        <div className="flex flex-col sm:flex-row gap-6 justify-center items-stretch mt-20">
          <div className="flex-1 group bg-white hover:scale-105 transition-transform duration-400 rounded-2xl p-6 shadow-xl flex flex-col">
            <p className="text-black-purple text-xl mb-4 flex items-center gap-3">
              <BsCartFill
                size={40}
                className="text-purple-bright group-hover:text-cyan-light"
              />{" "}
              {dict.ecommerceTitle}
            </p>
            <p className="text-dark flex-1">{dict.ecommerceDescription}</p>
          </div>

          <div className="flex-1 group bg-white hover:scale-105 transition-transform duration-400 rounded-2xl p-6 shadow-xl flex flex-col">
            <p className="text-black-purple text-xl mb-4 flex items-center gap-3">
              <BsFillGearFill
                size={40}
                className="text-purple-bright group-hover:text-cyan-light"
              />{" "}
              {dict.erpAutomationTitle}
            </p>
            <p className="text-dark flex-1">{dict.erpAutomationDescription}</p>
          </div>

          <div className="flex-1 group bg-white hover:scale-105 transition-transform duration-400 rounded-2xl p-6 shadow-xl flex flex-col">
            <p className="text-black-purple text-xl mb-4 flex items-center gap-3">
              <BsFillPinAngleFill
                size={40}
                className="text-purple-bright group-hover:text-cyan-light"
              />{" "}
              {dict.landingPagesTitle}
            </p>
            <p className="text-dark flex-1">{dict.landingPagesDescription}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
