import { useEffect, useState } from "react";
import { FaGithub, FaLinkedinIn } from "react-icons/fa";
import { BsWhatsapp } from "react-icons/bs";
import { AiOutlineMenuUnfold } from "react-icons/ai";
import Link from "next/link";
import { CustomLink } from "@/components";
import { useParams } from "next/navigation";
import { getDictionary } from "@/utils/functions/getDictionary";
import { useWindowSize } from "@/hooks/useWindowSize";
import { HeaderMenu } from "./partials/menu";

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
      <div className="container px-5  mx-auto flex">
        <nav className="mr-auto flex items-center [&_a]:mr-3 [&_a]:my-2 [&_a]:text-lg">
          <Link
            id="iconGit"
            href="https://github.com/YgorMendanha"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaGithub size={iconSize} />
          </Link>
          <Link
            id="iconLin"
            href="https://www.linkedin.com/in/ygormendanha"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaLinkedinIn size={iconSize} />
          </Link>
          <Link
            id="iconWhats"
            href="https://wa.me/5592982145233"
            target="_blank"
            rel="noopener noreferrer"
          >
            <BsWhatsapp size={iconSize} />
          </Link>
        </nav>

        <nav className="ml-auto flex items-center  [&_a]:my-2 [&_a]:text-lg">
          <CustomLink className="mr-3" href="#intro">
            {dict.home}
          </CustomLink>
          <CustomLink className="mr-3" href="#about">
            {dict.about}
          </CustomLink>
          <CustomLink className="mr-3" href="#project">
            {dict.projects}
          </CustomLink>
          <CustomLink
            href="#contact"
            className="bg-violet-700 py-1 px-3 rounded-lg"
          >
            {dict.contact}
          </CustomLink>
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
