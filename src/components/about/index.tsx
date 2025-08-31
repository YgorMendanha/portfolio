"use client";

import { getDictionary } from "@/utils/functions/getDictionary";
import { HorizontalTimeline } from "@/components/partials/timeline";
import dayjs from "dayjs";

export function About({ lang }: { lang: "pt" | "en" }) {
  const dict = getDictionary(lang ?? "pt");

  return (
    <section id={"about"} className="container mx-auto px-5 py-20 ">
      <section className="flex mb-20 flex-col 2xl:flex-row text-black">
        <section className="w-full 2xl:w-1/2 mb-20 text-4xl font-bold underline-offset-4  text-purple">
          {dict.about}
        </section>
        <section className="w-full 2xl:w-1/2 text-xl" style={{ whiteSpace: "pre-line" }}>{dict.aboutText}</section>
      </section>
      <section className="flex flex-col text-black">
        <section className="font-bold underline-offset-4 text-4xl text-purple">
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
              <section className="text-2xl text-purple">
                <b>Yonix</b>
              </section>
              <section style={{ whiteSpace: "pre-line" }}>{dict.professionalExperience.yonix}</section>
            </section>
            <section>
              <section className="text-2xl text-purple">
                <b>I9 Store</b>
              </section>
              <section style={{ whiteSpace: "pre-line" }}>{dict.professionalExperience.i9}</section>
            </section>
          </section>
        </section>
      </section>
    </section>
  );
}
