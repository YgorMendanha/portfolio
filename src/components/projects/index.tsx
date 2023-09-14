import Image from "next/image";
import ShopImg from "~/public/finesse-store.png";
import NotesImg from "~/public/notes.png";
import BlogImg from "~/public/blog.png";

import { CustomLink } from "@/components";

export function MyProjects() {
  return (
    <section id="project" className="container my-10 mx-auto flex flex-col">
      <h2 className="mx-auto text-2xl">
        <b>Projetos</b>
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
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Corrupti
            minima, eos eaque consequatur vitae voluptates ut numquam sapiente
            accusantium consequuntur adipisci iste voluptatem, ea molestiae!
            Ducimus similique quaerat illo in!
          </p>
          <CustomLink className="mt-auto" href={"/"}>
            Visualizar
          </CustomLink>
        </div>
      </div>
      <div className="flex my-10">
        <div className="mr-10 flex flex-col backdrop-blur-sm p-2 bg-violet-900/40 rounded-lg ">
          <h3 className="text-4xl">
            <b>Blog</b>
          </h3>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Corrupti
            minima, eos eaque consequatur vitae voluptates ut numquam sapiente
            accusantium consequuntur adipisci iste voluptatem, ea molestiae!
            Ducimus similique quaerat illo in!
          </p>
          <CustomLink className="mt-auto" href={"/"}>
            Visualizar
          </CustomLink>
        </div>
        <Image alt="banner blog" src={BlogImg} width={585} height={302} />
      </div>
      <div className="flex my-10">
        <Image alt="banner notes" src={NotesImg} width={585} height={302} />
        <div className="ml-10 flex flex-col backdrop-blur-sm p-2 bg-violet-900/40 rounded-lg">
          <h3 className="text-4xl">
            <b>Notes</b>
          </h3>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Corrupti
            minima, eos eaque consequatur vitae voluptates ut numquam sapiente
            accusantium consequuntur adipisci iste voluptatem, ea molestiae!
            Ducimus similique quaerat illo in!
          </p>
          <CustomLink className="mt-auto" href={"/"}>
            Visualizar
          </CustomLink>
        </div>
      </div>
    </section>
  );
}
