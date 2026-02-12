import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
import { FaGithub, FaLinkedinIn } from "react-icons/fa";
import { GrClose } from "react-icons/gr";

import { BsWhatsapp } from "react-icons/bs";
import { MenuDetails } from "@/utils/functions/getMenuDetails";

export function HeaderMenu({
  show,
  onCLose,
}: {
  show: boolean;
  onCLose: () => void;
}) {
  const iconSize = 25;
  const { lang }: { lang: "pt" | "en" } = useParams();

  const pathname = usePathname();
  const OptiosMenu = MenuDetails({ lang, pathname });

  return (
    <>
      <div
        className={`w-full h-full left-0 fixed top-0 transition-all duration-500 ${
          show ? "z-20 bg-[#000000bd] " : "invisible opacity-0"
        } `}
      />

      <div
        className={`max-w-[500px] w-full h-full fixed top-0 transition-all duration-500  ${
          show ? "z-30 bg-black-purple left-0 " : "-left-32 invisible opacity-0"
        } `}
      >
        <section
          className={`m-auto mt-2 w-[95%] p-5  rounded-xl transition-all duration-500  ${
            show ? "z-400 bg-purple-bright left-0" : "-left-32 opacity-0 "
          }`}
        >
          <section
            className="bg-violet-200 w-10 h-10 right-6 absolute flex top-5 rounded-full transition-[right,opacity] ease-in duration-300 z-10"
            onClick={onCLose}
          >
            <GrClose className="m-auto bg-purple-bright/10 text-black-purple" />
          </section>
          <nav className="container px-5  mx-auto flex flex-col gap-2">
            {OptiosMenu.map((o, idx) => (
              <Link key={idx} onClick={onCLose} href={o.href}>
                {o.label}
              </Link>
            ))}

            <nav className="flex items-center [&_a]:mr-3 [&_a]:my-2 [&_a]:text-lg">
              <Link
                onClick={onCLose}
                id="iconGit"
                href="https://github.com/YgorMendanha"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaGithub size={iconSize} />
              </Link>
              <Link
                onClick={onCLose}
                id="iconLin"
                href="https://www.linkedin.com/in/ygormendanha"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaLinkedinIn size={iconSize} />
              </Link>
              <Link
                onClick={onCLose}
                id="iconWhats"
                href="https://wa.me/5592982832103"
                target="_blank"
                rel="noopener noreferrer"
              >
                <BsWhatsapp size={iconSize} />
              </Link>
            </nav>
          </nav>
        </section>
      </div>
    </>
  );
}
