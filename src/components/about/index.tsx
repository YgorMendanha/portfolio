"use client";

import { CustomLink } from "@/components";
import { useWindowSize } from "@/hooks/useWindowSize";
import { getDictionary } from "@/utils/functions/getDictionary";
import { useState } from "react";
import { BsLink45Deg } from "react-icons/bs";

export function About({ lang }: { lang: "pt" | "en" }) {
  const dict = getDictionary(lang ?? "pt");
  const WindowSize = useWindowSize();
  const [show, setShow] = useState<boolean>(false);

  return (
    <section
      id="about"
      className="my-10 w-full flex flex-col justify-center text-justify container mx-auto p-5 backdrop-blur-sm bg-violet-900/40 rounded-lg [&_p]:my-3"
    >
      <h2 className="text-2xl mx-auto">
        <b>{dict.about}</b>
      </h2>
      <p>{dict.about1}</p>
      <p>{dict.about2}</p>
      {show && WindowSize.width && WindowSize.width < 400 && (
        <>
          <p>{dict.about3}</p>
          <p>{dict.about4}</p>
          <p>{dict.about5}</p>
          <p>{dict.about6}</p>
        </>
      )}
      {!WindowSize.width || WindowSize.width > 400 ? (
        <>
          <p>{dict.about3}</p>
          <p>{dict.about4}</p>
          <p>{dict.about5}</p>
          <p>{dict.about6}</p>
        </>
      ) : (
        <small className="mb-4 underline" onClick={() => setShow(!show)}>
          {!show ? dict.readMore : dict.readLess}
        </small>
      )}

      <p className="flex items-center ">
        <CustomLink className="text-purple-400 underline" href={"#contact"}>
          <b>{dict.about7}</b>
        </CustomLink>
        <BsLink45Deg className="ml-2 text-xl" />
      </p>
    </section>
  );
}
