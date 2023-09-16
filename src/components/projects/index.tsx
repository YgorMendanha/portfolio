"use client";
import Image from "next/image";
import ShopImg from "~/public/finesse-store.png";
import NotesImg from "~/public/notes.png";
import BlogImg from "~/public/blog.png";
import { BiLinkExternal } from "react-icons/bi";
import { getDictionary } from "@/utils/functions/getDictionary";
import Link from "next/link";
import { useState } from "react";
import { useWindowSize } from "@/hooks/useWindowSize";

export function MyProjects({ lang }: { lang: "pt" | "en" }) {
  const dict = getDictionary(lang ?? "pt");

  const WindowSize = useWindowSize();
  const [showDetails, setShowDetails] = useState<{
    shop: boolean;
    blog: boolean;
    notes: boolean;
  }>({ blog: false, notes: false, shop: false });

  const formatText = (text: string, show: boolean) => {
    return show
      ? text
      : text.length > 300
      ? text.substring(0, 300) + "..."
      : text;
  };

  return (
    <section
      id="project"
      className="container px-2 my-10 mx-auto flex flex-col"
    >
      <h2 className="mx-auto text-2xl">
        <b>{dict.projects}</b>
      </h2>

      <div className="flex flex-col xl:flex-row my-10 items-center">
        <Image
          alt="banner Finesses store"
          src={ShopImg}
          width={585}
          height={302}
          className="object-contain"
        />
        <div className="mt-10 ml-0 xl:ml-10 xl:mt-0 flex flex-col backdrop-blur-sm p-2 bg-violet-900/40 rounded-lg">
          <h3 className="text-4xl">
            <b>Finesse Store</b>
          </h3>
          <p className="">
            {!WindowSize.width || WindowSize.width > 400
              ? dict.shopDetails
              : formatText(dict.shopDetails, showDetails.shop)}
          </p>
          {WindowSize.width && WindowSize.width < 400 && (
            <small
              className="mb-4 underline"
              onClick={() =>
                setShowDetails({ ...showDetails, shop: !showDetails.shop })
              }
            >
              {!showDetails.shop ? dict.readMore : dict.readLess}
            </small>
          )}

          <Link
            target="_blank"
            className="mt-auto text-lg underline font-bold flex items-center"
            href={"https://finesse-store.vercel.app"}
          >
            {dict.toView} <BiLinkExternal className="ml-2" />
          </Link>
        </div>
      </div>

      <div className="flex flex-col-reverse items-center xl:flex-row my-10">
        <div className="mt-10 mr-0 xl:mr-10 xl:mt-0  flex flex-col backdrop-blur-sm p-2 bg-violet-900/40 rounded-lg ">
          <h3 className="text-4xl">
            <b>Blog</b>
          </h3>
          <p>
            {!WindowSize.width || WindowSize.width > 400
              ? dict.blogDetails
              : formatText(dict.blogDetails, showDetails.blog)}
          </p>
          {WindowSize.width && WindowSize.width < 400 && (
            <small
              className="mb-4 underline"
              onClick={() =>
                setShowDetails({ ...showDetails, blog: !showDetails.blog })
              }
            >
              {!showDetails.blog ? dict.readMore : dict.readLess}
            </small>
          )}

          <Link
            target="_blank"
            className="mt-auto text-lg underline font-bold flex items-center"
            href={"https://blogymdevelopment.vercel.app"}
          >
            {dict.toView} <BiLinkExternal className="ml-2" />
          </Link>
        </div>
        <Image
          alt="banner blog"
          src={BlogImg}
          width={585}
          height={302}
          className="object-contain"
        />
      </div>

      <div className="flex flex-col xl:flex-row items-center my-10">
        <Image
          alt="banner notes"
          src={NotesImg}
          width={585}
          height={302}
          className="object-contain"
        />
        <div className="mt-10 ml-0 xl:ml-10 xl:mt-0 flex flex-col backdrop-blur-sm p-2 bg-violet-900/40 rounded-lg">
          <h3 className="text-4xl">
            <b>Notes</b>
          </h3>
          <p>
            {!WindowSize.width || WindowSize.width > 400
              ? dict.notesDetails
              : formatText(dict.notesDetails, showDetails.notes)}
          </p>

          {WindowSize.width && WindowSize.width < 400 && (
            <small
              className="mb-4 underline"
              onClick={() =>
                setShowDetails({ ...showDetails, notes: !showDetails.notes })
              }
            >
              {!showDetails.notes ? dict.readMore : dict.readLess}
            </small>
          )}
          <Link
            target="_blank"
            className="mt-auto text-lg underline font-bold flex items-center"
            href={"https://notes-ym.vercel.app"}
          >
            {dict.toView} <BiLinkExternal className="ml-2" />
          </Link>
        </div>
      </div>
    </section>
  );
}
