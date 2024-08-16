"use client";

import { getDictionary } from "@/utils/functions/getDictionary";
import { HorizontalTimeline } from "@/components/partials/timeline";
import dayjs from "dayjs";

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
    <section id={"about"} className="container mx-auto px-5 py-20 ">
      <section className="flex mb-20 flex-col 2xl:flex-row text-black">
        <section className="w-full 2xl:w-1/2 mb-20 text-4xl font-bold underline-offset-4  underline text-purple decoration-purple">
          {dict.about}
        </section>
        <section className="w-full 2xl:w-1/2 text-xl">{dict.aboutText}</section>
      </section>
      <section className="flex flex-col text-black">
        <section className="font-bold underline-offset-4 text-4xl underline text-purple decoration-purple">
          {dict.professionalExperience.name}
        </section>
        <section className="flex h-full flex-col 2xl:flex-row text-black ">
          <section className="w-full 2xl:w-1/2 text-4xl flex flex-col justify-evenly ">
            <section className="m-auto my-20 2xl:m-0">
              <HorizontalTimeline
                lastTitle={dict.currently}
                events={[
                  {
                    title: "Yonix",
                    description: "Dev. Full Stack",
                    startDate: "2022-03-01",
                    endDate: "2022-06-30",
                  },
                  {
                    title: "I9 Store",
                    description: "Dev. Frontend",
                    startDate: "2022-06-01",
                    endDate: dayjs().format("YYYY-MM-DD"),
                  },
                  {
                    title: dict.currently,
                    description: "",
                    startDate: dayjs().format("YYYY-MM-DD"),
                    endDate: dayjs().format("YYYY-MM-DD"),
                  },
                ]}
              />
            </section>
          </section>
          <section className="h-full w-full 2xl:w-1/2 text-xl flex flex-col justify-evenly ">
            <section className="mb-8">
              <section className="text-2xl underline text-purple decoration-purple">
                <b>Yonix</b>
              </section>
              <section>{dict.professionalExperience.yonix}</section>
            </section>
            <section>
              <section className="text-2xl underline text-purple decoration-purple">
                <b>I9 Store</b>
              </section>
              <section>{dict.professionalExperience.i9}</section>
            </section>
          </section>
        </section>
      </section>
    </section>
  );
}
