"use client";
import Image from "next/image";
import ShopImg from "~/public/finesse-store.png";
import NotesImg from "~/public/notes.png";
import BlogImg from "~/public/blog.png";
import BotImg from "~/public/bot_telegram.png";
import { BiLinkExternal } from "react-icons/bi";
import { getDictionary } from "@/utils/functions/getDictionary";
import Link from "next/link";
import "react-multi-carousel/lib/styles.css";

export function MyProjects({ lang }: { lang: "pt" | "en" }) {
  const dict = getDictionary(lang ?? "pt");

  const dataSlider = [
    {
      img: ShopImg,
      title: dict.titleFinesse,
      details: dict.descFinesse,
      link: "https://finesse-store.vercel.app",
    },
    {
      img: BlogImg,
      title: dict.titleBlog,
      details: dict.descriptionBlog,
      link: "/blog",
    },
    {
      img: NotesImg,
      title: dict.titleNotes,
      details: dict.descNotes,
      link: "https://notes-ym.vercel.app",
    },
    {
      img: BotImg,
      title: dict.titleBot,
      details: dict.descBot,
      link: "https://t.me/financial_life_bot",
    },
  ];

  return (
    <section className="bg-black-purple py-20">
      <section id="project" className="container px-5 mx-auto flex flex-col">
        <h2 className="text-3xl sm:text-4xl font-bold underline-offset-4 mb-16 text-white">
          {dict.projects}
        </h2>

        {dataSlider.map((data, idx) => {
          const flexDirection =
            idx % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse";

          return (
            <div
              key={data.title}
              className={`flex flex-col ${flexDirection} my-10 gap-6 justify-center items-center`}
            >
              <Image
                alt={data.title}
                src={data.img}
                width={400}
                height={400}
                className="rounded-lg border-2 border-light-gray w-full lg:w-1/2 object-cover"
              />
              <div className="flex text-black-purple bg-gray-lightest shadow-xl flex-col p-6 rounded-lg w-full lg:w-1/2 min-h-[300px] hover:scale-105 transition-transform duration-300">
                <h3 className="text-2xl sm:text-3xl font-bold mb-3">
                  {data.title}
                </h3>
                <p className="text-base sm:text-lg mb-4 whitespace-pre-line">
                  {data.details}
                </p>
                <Link
                  target="_blank"
                  className="mt-auto text-lg underline font-bold flex items-center"
                  href={data.link}
                >
                  {dict.toView} {data.title} <BiLinkExternal className="ml-2" />
                </Link>
              </div>
            </div>
          );
        })}
      </section>
    </section>
  );
}
