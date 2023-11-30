import { FaGithub, FaLinkedinIn } from "react-icons/fa";
import { BsWhatsapp } from "react-icons/bs";
import { useParams } from "next/navigation";
import { getDictionary } from "@/utils/functions/getDictionary";
import Link from "next/link";

export function Footer() {
  const { lang }: { lang?: "pt" | "en" } = useParams();
  const dict = getDictionary(lang ?? "pt");

  return (
    <footer className={`bg-violet-900 px-5`}>
      <div className="container mx-auto flex flex-col sm:flex-row items-center py-3">
        <nav className="text-center mb-2 sm:mb-0 mr-0 sm:mr-auto text-sm sm:text-lg flex items-center [&_a]:mr-3">
          {dict.YM}
        </nav>

        <nav className="ml-0 sm:ml-auto text-lg sm:text-2xl flex items-center [&_a]:mr-3">
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
            href="https://wa.me/message/YQXEGG4GZBDDG1"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Whatsapp"
          >
            <BsWhatsapp />
          </Link>
        </nav>
      </div>
    </footer>
  );
}
