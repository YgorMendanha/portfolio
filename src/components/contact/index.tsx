import { CustomInput, CustomTextArea } from "@/components";

export function Contact() {
  return (
    <section
      id="contact"
      className="flex flex-col container mx-auto my-10 backdrop-blur-sm bg-violet-900/40 rounded-lg p-5"
    >
      <h3 className="mx-auto  text-2xl">
        <b>Contato</b>
      </h3>
      <div className="flex w-full ">
        <p className="w-1/2 m-5">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere
          doloribus dicta quasi earum nam explicabo repellendus necessitatibus,
          doloremque ea ipsam, exercitationem in architecto cupiditate quo
          ducimus. Numquam repellendus iure ab.
        </p>
        <form className="w-1/2 m-5 flex flex-col">
          <CustomInput label="Nome" />
          <CustomInput label="Forma de Contat." />
          <CustomTextArea label="Mensagem" />
          <button className="ml-auto mt-auto py-1 px-3 bg-violet-700 rounded-lg">
            Enviar
          </button>
        </form>
      </div>
    </section>
  );
}
