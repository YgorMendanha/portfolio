"use client";
import Image from "next/image";
import ShopImg from "~/public/finesse-store.png";
import NotesImg from "~/public/notes.png";
import BlogImg from "~/public/blog.png";
import { BiLinkExternal } from "react-icons/bi";
import { getDictionary } from "@/utils/functions/getDictionary";
import Link from "next/link";
import { twMerge } from "tailwind-merge";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

export function MyProjects({ lang }: { lang: "pt" | "en" }) {
  const dict = getDictionary(lang ?? "pt");

  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1280 },
      items: 3,
      slidesToSlide: 3,
    },
    tablet: {
      breakpoint: { max: 1280, min: 768 },
      items: 2,
      slidesToSlide: 2,
    },
    mobile: {
      breakpoint: { max: 768, min: 0 },
      items: 1,
      slidesToSlide: 1,
    },
  };

  const dataSlider = [
    {
      img: ShopImg,
      title: "Finesse Store",
      details: dict.shopDetails,
      link: "https://finesse-store.vercel.app",
    },
    {
      img: BlogImg,
      title: "Blog",
      details: dict.blogDetails,
      link: "https://blogymdevelopment.vercel.app",
    },
    {
      img: NotesImg,
      title: "Notes",
      details: dict.notesDetails,
      link: "https://notes-ym.vercel.app",
    },
  ];

  return (
    <section className="bg-black-purple py-20">
      <section id="project" className="container p-5 mx-auto flex flex-col ">
        <section className="w-1/2 text-4xl font-bold underline-offset-4 mb-16 ">
          {dict.projects}
        </section>
        <Carousel
          showDots={true}
          responsive={responsive}
          ssr
          autoPlaySpeed={3000}
          keyBoardControl={true}
          customTransition="all .5"
          transitionDuration={500}
        >
          {dataSlider.map((data) => {
            return (
              <div
                key={data.title}
                className={twMerge(
                  `flex group flex-col mx-2 justify-center items-center`
                )}
              >
                <Image
                  alt="banner Finesses store"
                  src={data.img}
                  width={500}
                  height={500}
                  className="rounded-lg"
                />
                <div className="flex invisible absolute h-[90%] w-[90%] max-h-[450px] max-w-[450px] group-hover:visible flex-col p-2 backdrop-blur-sm bg-purple rounded-lg transition-all">
                  <h3 className="text-4xl">
                    <b>{data.title}</b>
                  </h3>
                  <p>{data.details}</p>
                  <Link
                    target="_blank"
                    className="mt-auto text-lg underline font-bold flex items-center"
                    href={data.link}
                  >
                    {dict.toView} <BiLinkExternal className="ml-2" />
                  </Link>
                </div>
              </div>
            );
          })}
        </Carousel>
      </section>
    </section>
  );
}
