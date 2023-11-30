import { useEffect, useState } from "react";
import { BsWhatsapp } from "react-icons/bs";
import { AiOutlineMenuUnfold } from "react-icons/ai";
import Link from "next/link";
import { CustomLink } from "@/components";
import { useParams } from "next/navigation";
import { getDictionary } from "@/utils/functions/getDictionary";
import { useWindowSize } from "@/hooks/useWindowSize";
import { HeaderMenu } from "./partials/menu";
import { SelectLang } from "./partials/selectLang";
import Image from "next/image";
import logo from "~/public/logo.png";

export function Header() {
  const iconSize = 25;

  const { lang }: { lang?: "pt" | "en" } = useParams();
  const dict = getDictionary(lang ?? "pt");

  const [show, setShow] = useState<boolean>(false);
  const [showMenu, setShowMenu] = useState<boolean>(false);

  const WindowSize = useWindowSize();

  useEffect(() => {
    window.addEventListener("scroll", changeShowState);
    return () => {
      window.removeEventListener("scroll", changeShowState);
    };
  }, []);

  function changeShowState() {
    const refHeader = document.body;
    if (!refHeader) return null;
    const posicoes = refHeader?.getBoundingClientRect();
    const fim = posicoes.y;
    fim > -10 ? setShow(false) : setShow(true);
  }

  return WindowSize.width && WindowSize.width > 450 ? (
    <header
      className={`bg-violet-900 fixed w-screen transition-[top,opacity] ease-in duration-500 z-10 ${
        show ? "top-0" : "-top-14 opacity-0"
      }`}
    >
      <div className="container px-5  mx-auto flex items-center ">
        <div className="mr-auto">
          <Image alt="logo" src={logo} width={70} height={60} />
        </div>

        <nav className="ml-auto flex items-center  [&_a]:text-lg">
          <CustomLink className="mr-3" href="#intro">
            {dict.home}
          </CustomLink>
          <CustomLink className="mr-3" href="#about">
            {dict.about}
          </CustomLink>
          <CustomLink className="mr-3" href="#project">
            {dict.projects}
          </CustomLink>
          <CustomLink className="mr-3" href="#contact">
            {dict.contact.title}
          </CustomLink>
          <SelectLang />
        </nav>
      </div>
    </header>
  ) : (
    <>
      <header
        className={`bg-violet-200 w-10 h-10 fixed flex top-5 rounded-full transition-[right,opacity] ease-in duration-300 z-10 ${
          show && !showMenu ? "right-5" : "-right-5 opacity-0"
        }`}
      >
        <AiOutlineMenuUnfold
          className="m-auto text-violet-950"
          size={30}
          onClick={() => setShowMenu(true)}
        />
      </header>
      <HeaderMenu show={showMenu} onCLose={() => setShowMenu(false)} />
    </>
  );
}
