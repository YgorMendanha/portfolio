import Image from "next/image";
import ShopImg from "~/public/finesse-store.png";
import NotesImg from "~/public/notes.png";
import BlogImg from "~/public/blog.png";
import { BiLinkExternal } from "react-icons/bi";
import { getDictionary } from "@/utils/functions/getDictionary";
import Link from "next/link";

export function MyProjects({ lang }: { lang: "pt" | "en" }) {
  const dict = getDictionary(lang ?? "pt");
  return (
    <section id="project" className="container my-10 mx-auto flex flex-col">
      <h2 className="mx-auto text-2xl">
        <b>{dict.projects}</b>
      </h2>
      <div className="flex my-10">
        <Image
          alt="banner Finesses store"
          src={ShopImg}
          width={585}
          height={302}
        />
        <div className="ml-10 flex flex-col backdrop-blur-sm p-2 bg-violet-900/40 rounded-lg">
          <h3 className="text-4xl">
            <b>Finesse Store</b>
          </h3>
          <p>{dict.shopDetails}</p>
          <Link
            target="_blank"
            className="mt-auto text-lg underline font-bold flex items-center"
            href={"https://finesse-store.vercel.app"}
          >
            {dict.toView} <BiLinkExternal className="ml-2" />
          </Link>
        </div>
      </div>
      <div className="flex my-10">
        <div className="mr-10 flex flex-col backdrop-blur-sm p-2 bg-violet-900/40 rounded-lg ">
          <h3 className="text-4xl">
            <b>Blog</b>
          </h3>
          <p>{dict.blogDetails}</p>
          <Link
            target="_blank"
            className="mt-auto text-lg underline font-bold flex items-center"
            href={"https://blogymdevelopment.vercel.app"}
          >
            {dict.toView} <BiLinkExternal className="ml-2" />
          </Link>
        </div>
        <Image alt="banner blog" src={BlogImg} width={585} height={302} />
      </div>
      <div className="flex my-10">
        <Image alt="banner notes" src={NotesImg} width={585} height={302} />
        <div className="ml-10 flex flex-col backdrop-blur-sm p-2 bg-violet-900/40 rounded-lg">
          <h3 className="text-4xl">
            <b>Notes</b>
          </h3>
          <p>{dict.notesDetails}</p>
          <Link
            target="_blank"
            className="mt-auto text-lg underline font-bold flex items-center"
            href={"https://notes-ym.vercel.app"}
          >
            {dict.toView} <BiLinkExternal className="ml-2" />
          </Link>
        </div>
      </div>
    </section>
  );
}
