"use client";

import { useParams } from "next/navigation";
import { getDictionary } from "@/utils/functions/getDictionary";
import Lottie from "react-lottie";
import animationData from "@/lotties/contactMe.json";
import Link from "next/link";
import { FaGithub, FaLinkedinIn } from "react-icons/fa";
import { BsWhatsapp } from "react-icons/bs";
import { useWindowSize } from "@/hooks/useWindowSize";
import { useEffect, useState } from "react";
import { customEvent } from "@/utils/lib/customEvent";

export function IntroSection() {
  const { lang }: { lang?: "pt" | "en" } = useParams();
  const dict = getDictionary(lang ?? "pt");

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  const { width } = useWindowSize();
  const [size, setSize] = useState<number>(250);

  useEffect(() => {
    if (width) {
      if (width > 500) {
        setSize(500);
      }
      if (width < 768) {
        setSize(350);
      }
      if (width < 640) {
        setSize(250);
      }
    }
  }, [width]);

  return (
    <section className="flex flex-col py-28 sm:py-36  lg:min-h-[700px] lg:h-screen  bg-black-purple">
      <div className="container px-5 mx-auto flex h-full flex-col lg:flex-row  items-center justify-center  ">
        <div className="w-full lg:w-1/2 mb-0 z-10 flex flex-col gap-4 justify-center">
          <h2 className="text-4xl md:text-6xl text-white">
            {dict.digitalIdeasIntoResults}
          </h2>
          <h4 className="text-xl md:text-3xl text-light-gray ">
            {dict.ecommerceErpExpert}
          </h4>

          <div className="flex">
            <Link
              href={"#contact"}
              className="bg-cyan-light/80 flex text-center hover:bg-cyan-light text-gray-lightest hover:text-gray-lightest hover:scale-105 rounded-2xl mr-7 px-2 sm:px-3 md:px-6 py-1 md:py-3"
            >
              {dict.letsTalk}
            </Link>

            <nav className="flex items-center [&_a]:mr-7 text-xl md:text-4xl ">
              <Link
                href="https://github.com/YgorMendanha"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Github"
              >
                <FaGithub />
              </Link>
              <Link
                href="https://www.linkedin.com/in/ygormendanha"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedinIn"
              >
                <FaLinkedinIn />
              </Link>
              <Link
                onClick={() =>
                  customEvent({
                    eventName: "click_whatsapp",
                    linkText: "WhatsApp",
                  })
                }
                href="https://wa.me/5592982832103"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Whatsapp"
              >
                <BsWhatsapp />
              </Link>
            </nav>
          </div>
        </div>

        <div className="w-full lg:w-1/2 absolute top-24 lg:static opacity-30 lg:opacity-100 ">
          <Lottie options={defaultOptions} height={size} width={size} />
        </div>
      </div>
    </section>
  );
}
