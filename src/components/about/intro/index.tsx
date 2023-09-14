"use client";

import { Typewriter } from "react-simple-typewriter";
import { BsArrowRight, BsWhatsapp } from "react-icons/bs";

export function IntroSection() {
  return (
    <section className="flex flex-col h-screen">
      <main className="m-auto">
        <h1 className="text-9xl">
          <b>Ygor Mendanha</b>
        </h1>
        <div className="flex mt-2 text-4xl">
          Desenvolvedor
          <span className="ml-2">
            <Typewriter
              words={["Front-end", "Back-End", "Full-Stack"]}
              loop={0}
              cursor
              cursorStyle="_"
              typeSpeed={100}
              deleteSpeed={70}
              delaySpeed={1100}
            />
          </span>
        </div>
      </main>

      <section className="animate-bounce text-lg absolute rotate-90 flex left-0 items-center bottom-8 ">
        <div className="rotate-90 flex items-center ">
          Scroll <BsArrowRight className="ml-2" />
        </div>
      </section>
      <section className="animate-bounce text-lg absolute rotate-90 flex right-0 items-center bottom-8 ">
        <div className="rotate-90 flex items-center ">
          Scroll <BsArrowRight className="ml-2" />
        </div>
      </section>
    </section>
  );
}
