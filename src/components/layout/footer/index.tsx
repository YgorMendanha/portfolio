import { FaGithub, FaLinkedinIn } from "react-icons/fa";
import { BsWhatsapp } from "react-icons/bs";
import { CustomLink } from "@/components";

export function Footer() {
  const iconSize = 25;

  return (
    <footer className={`bg-violet-900`}>
      <div className="container mx-auto flex">
        <nav className="mr-auto flex items-center [&_a]:mr-3 [&_a]:my-2 [&_a]:text-lg">
          Y.M. Desenvolvimento © 2023. Todos os direitos reservados.
        </nav>

        <nav className="ml-auto flex items-center [&_a]:mr-3 [&_a]:my-2 [&_a]:text-lg">
          <CustomLink
            id="iconGit"
            href="https://github.com/YgorMendanha"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaGithub size={iconSize} />
          </CustomLink>
          <CustomLink
            id="iconLin"
            href="https://www.linkedin.com/in/ygormendanha"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaLinkedinIn size={iconSize} />
          </CustomLink>
          <CustomLink
            id="iconWhats"
            href="https://wa.me/5592982145233"
            target="_blank"
            rel="noopener noreferrer"
          >
            <BsWhatsapp size={iconSize} />
          </CustomLink>
        </nav>
      </div>
    </footer>
  );
}
