import { useState } from "react";
import { AiOutlineMenuUnfold } from "react-icons/ai";
import { CustomLink } from "@/components";
import { useParams, usePathname } from "next/navigation";
import { getDictionary } from "@/utils/functions/getDictionary";
import { HeaderMenu } from "./partials/menu";
import { SelectLang } from "./partials/selectLang";
import { MenuDetails } from "@/utils/functions/getMenuDetails";

export function Header() {
  const { lang }: { lang: "pt" | "en" } = useParams();
  const dict = getDictionary(lang ?? "pt");

  const pathname = usePathname();

  const [showMenu, setShowMenu] = useState<boolean>(false);

  const OptiosMenu = MenuDetails({ lang, pathname });

  return (
    <header
      className={`bg-gray-lightest top-0 fixed w-screen z-50 h-14 flex items-center`}
    >
      <div className="container px-5 text-black font-bold mx-auto flex items-center ">
        <CustomLink
          href={"/"}
          className="mr-auto text-base sm:text-xl md:text-3xl  "
        >
          YM {dict.stepDevelopmentTitle}
        </CustomLink>

        <nav className="ml-auto  items-center flex sm:[&_a]:text-base  md:[&_a]:text-lg underline-offset-4  ">
          {OptiosMenu.map((link, idx) => (
            <CustomLink
              key={idx}
              className="mr-3 hover:underline hidden lg:flex hover:decoration-cyan-light"
              style={{ textDecorationThickness: "3px" }}
              href={link.href}
            >
              {link.label}
            </CustomLink>
          ))}
          <SelectLang className="bg-white mr-2 mlg:mr-0" />
        </nav>
        <AiOutlineMenuUnfold
          className=" text-black-cyan-light  lg:hidden"
          size={30}
          onClick={() => setShowMenu(true)}
        />
      </div>
      <HeaderMenu show={showMenu} onCLose={() => setShowMenu(false)} />
    </header>
  );
}
