import { FaGithub, FaLinkedinIn } from "react-icons/fa";
import { BsWhatsapp } from "react-icons/bs";
import { CustomLink } from "@/components";
import { useParams } from "next/navigation";
import { getDictionary } from "@/utils/functions/getDictionary";
import Link from "next/link";

export function Footer() {
  const iconSize = 25;

  const { lang }: { lang?: "pt" | "en" } = useParams();
  const dict = getDictionary(lang ?? "pt");

  return (
    <footer className={`bg-violet-900`}>
      <div className="container mx-auto flex">
        <nav className="mr-auto flex items-center [&_a]:mr-3 [&_a]:my-2 [&_a]:text-lg">
          {dict.YM}
        </nav>

        <nav className="ml-auto flex items-center [&_a]:mr-3 [&_a]:my-2 [&_a]:text-lg">
          <Link
            href="https://github.com/YgorMendanha"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaGithub size={iconSize} />
          </Link>
          <Link
            href="https://www.linkedin.com/in/ygormendanha"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaLinkedinIn size={iconSize} />
          </Link>
          <Link
            href="https://wa.me/5592982145233"
            target="_blank"
            rel="noopener noreferrer"
          >
            <BsWhatsapp size={iconSize} />
          </Link>
        </nav>
      </div>
    </footer>
  );
}
