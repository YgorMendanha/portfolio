"use client";

import { CustomLink } from "@/components";
import { useWindowSize } from "@/hooks/useWindowSize";
import { getDictionary } from "@/utils/functions/getDictionary";
import { useState } from "react";
import { BsLink45Deg } from "react-icons/bs";

export function About({ lang }: { lang: "pt" | "en" }) {
  const dict = getDictionary(lang ?? "pt");

  const skills = [
    {
      id: 1,
      name: "React / Next / TypeScript / JavaScript / Node / Git",
      size: "w-[90%]",
      percentage: "90",
    },
    {
      id: 2,
      name: "AWS",
      size: "w-[75%]",
      percentage: "75",
    },
    {
      id: 3,
      name: "SEO",
      size: "w-[75%]",
      percentage: "75",
    },
    {
      id: 4,
      name: "UX/UI",
      size: "w-[60%]",
      percentage: "60",
    },
    {
      id: 5,
      name: "Python",
      size: "w-[50%]",
      percentage: "50",
    },
  ];

  return (
    <section className="flex container mx-auto flex-col lg:flex-row">
      <section className="my-10 w-auto lg:w-1/2 flex flex-col justify-between text-justify container mx-5 p-5 backdrop-blur-sm bg-violet-900/80 rounded-lg [&_p]:my-3">
        <h2 className="text-2xl mx-auto mb-5">
          <b id="about">{dict.about}</b>
        </h2>
        <p id={"main-author"}>{dict.aboutText}</p>

        <p className="flex items-center mt-auto ">
          <CustomLink className="text-purple-400 underline" href={"#contact"}>
            <b>{dict.aboutLink}</b>
          </CustomLink>
          <BsLink45Deg className="ml-2 text-xl" />
        </p>
      </section>
      <section className="my-10 w-auto lg:w-1/2 flex flex-col justify-center text-justify container mx-5 p-5 backdrop-blur-sm bg-violet-900/80 rounded-lg [&_p]:my-3">
        <h2 className="text-2xl mx-auto mb-5">
          <b>{dict.skills}</b>
        </h2>
        <div className="flex flex-col">
          {skills.map((s) => (
            <div key={s.id}>
              <p>
                <b>{s.name}</b>
              </p>
              <div className="w-full h-2 bg-indigo-200 rounded-full">
                <div
                  className={`${s.size}  h-full text-center text-xs text-white bg-indigo-600 rounded-full`}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </section>
  );
}
