import { useState } from "react";
import { AiOutlineMenuUnfold } from "react-icons/ai";
import { CustomLink } from "@/components";
import { useParams } from "next/navigation";
import { getDictionary } from "@/utils/functions/getDictionary";
import { HeaderMenu } from "./partials/menu";
import { SelectLang } from "./partials/selectLang";

export function Header() {
  const { lang }: { lang?: "pt" | "en" } = useParams();
  const dict = getDictionary(lang ?? "pt");

  const [showMenu, setShowMenu] = useState<boolean>(false);

  return (
    <header
      className={`bg-neutral-50 top-0 fixed w-screen z-50 h-14 flex items-center`}
    >
      <div className="container px-5 text-black font-bold mx-auto flex items-center ">
        <CustomLink
          href={"/"}
          className="mr-auto text-base sm:text-xl md:text-3xl  "
        >
          YM {dict.developer}
        </CustomLink>

        <nav className="ml-auto  items-center hidden sm:flex sm:[&_a]:text-base  md:[&_a]:text-lg underline-offset-4  ">
          <CustomLink
            className="mr-3 hover:underline hover:decoration-purple"
            style={{
              textDecorationThickness: "3px",
            }}
            href="#intro"
          >
            {dict.home}
          </CustomLink>
          <CustomLink
            className="mr-3 hover:underline hover:decoration-purple"
            style={{
              textDecorationThickness: "3px",
            }}
            href="#about"
          >
            {dict.about}
          </CustomLink>
          <CustomLink
            className="mr-3 hover:underline hover:decoration-purple"
            style={{
              textDecorationThickness: "3px",
            }}
            href="#project"
          >
            {dict.projects}
          </CustomLink>
          <CustomLink
            className="mr-3 hover:underline hover:decoration-purple"
            style={{
              textDecorationThickness: "3px",
            }}
            href="/blog"
          >
            Blog
          </CustomLink>
          <CustomLink
            className="mr-3 hover:underline hover:decoration-purple"
            style={{
              textDecorationThickness: "3px",
            }}
            href="#contact"
          >
            {dict.contact.title}
          </CustomLink>
          <SelectLang className="bg-white" />
        </nav>
        <AiOutlineMenuUnfold
          className=" text-black-purple  sm:hidden"
          size={30}
          onClick={() => setShowMenu(true)}
        />
      </div>
      <HeaderMenu show={showMenu} onCLose={() => setShowMenu(false)} />
    </header>
  );
}
