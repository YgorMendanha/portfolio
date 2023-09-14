import { useEffect, useState } from "react";
import { FaGithub, FaLinkedinIn } from "react-icons/fa";
import { BsWhatsapp } from "react-icons/bs";
import { SlSocialInstagram } from "react-icons/sl";
import Link from "next/link";
import { CustomLink } from "@/components";
import { useParams } from "next/navigation";
import { getDictionary } from "@/utils/functions/getDictionary";

export function Header() {
  const iconSize = 25;

  const { lang }: { lang?: "pt" | "en" } = useParams();
  const dict = getDictionary(lang ?? "pt");

  const [show, setShow] = useState<boolean>(false);

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

  return (
    <header
      className={`bg-violet-900 fixed w-screen transition-all ease-in duration-500 z-10 ${
        show ? "top-0" : "-top-14 opacity-0"
      }`}
    >
      <div className="container mx-auto flex">
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

        <nav className="ml-auto flex items-center [&_a]:mr-3 [&_a]:my-2 [&_a]:text-lg">
          <CustomLink href="#intro">{dict.home}</CustomLink>
          <CustomLink href="#about">{dict.about}</CustomLink>
          <CustomLink href="#project">{dict.projects}</CustomLink>
          <CustomLink
            href="#contact"
            className="bg-violet-700 py-1 px-3 rounded-lg"
          >
            {dict.contact}
          </CustomLink>
        </nav>
      </div>
    </header>
  );
}
