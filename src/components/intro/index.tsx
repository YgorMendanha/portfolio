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
import { sendEventGA } from "@/utils/lib/customEvent";
import { ScrollReveal } from "../partials/ScrollAnimate";
import { Button } from "../partials/ui/button";
import { usePostHog } from "posthog-js/react";

export function IntroSection() {
  const { lang }: { lang?: "pt" | "en" } = useParams();
  const dict = getDictionary(lang ?? "pt");

  const posthog = usePostHog();

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
    <section className="flex flex-col py-28 sm:py-36 mt-10 h-screen  bg-black-purple overflow-x-hidden max-w-full">
      <div className="container px-5 mx-auto flex h-full flex-col lg:flex-row  items-center justify-center  ">
        <ScrollReveal
          reverse
          speed={"slow"}
          direction="top"
          className="w-full lg:w-1/2 mb-0 z-10 flex flex-col gap-4 justify-center"
        >
          <h2 className="text-4xl md:text-6xl text-white">
            {dict.digitalIdeasIntoResults}
          </h2>
          <h4 className="text-xl md:text-3xl text-light-gray ">
            {dict.ecommerceErpExpert}
          </h4>

          <div className="flex flex-wrap gap-4">
            <Button href={"#contact"} variant="ghost">
              {dict.letsTalk}
            </Button>

            <nav className="flex items-center gap-4 text-xl md:text-4xl ">
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
                onClick={() => {
                  sendEventGA({
                    name: "click_whatsapp",
                    params: { linkText: "WhatsApp" },
                  });
                  posthog.capture("click_whatsapp");
                }}
                href="https://wa.me/5592982832103"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Whatsapp"
              >
                <BsWhatsapp />
              </Link>
            </nav>
          </div>
        </ScrollReveal>

        <ScrollReveal
          reverse
          speed={"normal"}
          direction="bottom"
          mobileConfig={{ opacityTo: 0.4 }}
          className="w-full lg:w-1/2 absolute  lg:static opacity-30 lg:opacity-100 "
        >
          <Lottie options={defaultOptions} height={size} width={size} />
        </ScrollReveal>
      </div>
    </section>
  );
}
