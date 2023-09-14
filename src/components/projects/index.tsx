import Image from "next/image";
import Link from "next/link";

export function MyProjects() {
  return (
    <section id="project" className="container my-10 mx-auto flex flex-col">
      <h2 className="mx-auto text-2xl">
        <b>Projetos</b>
      </h2>
      <div className="flex my-10">
        <Image
          alt="banner Finesses store"
          src={"/finesse-store.png"}
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
          <Link className="mt-auto" href={"/"}>
            Visualizar
          </Link>
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
          <Link className="mt-auto" href={"/"}>
            Visualizar
          </Link>
        </div>
        <Image alt="banner blog" src={"/blog.png"} width={585} height={302} />
      </div>
      <div className="flex my-10">
        <Image
          alt="banner Finesses store"
          src={"/notes.png"}
          width={585}
          height={302}
        />
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
          <Link className="mt-auto" href={"/"}>
            Visualizar
          </Link>
        </div>
      </div>
    </section>
  );
}
