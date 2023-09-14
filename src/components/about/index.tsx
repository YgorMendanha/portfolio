import { CustomLink } from "@/components";

export function About() {
  return (
    <section
      id="about"
      className="my-10 w-full flex flex-col justify-center text-justify container mx-auto p-5 backdrop-blur-sm bg-violet-900/40 rounded-lg [&_p]:my-3"
    >
      <h2 className="text-2xl mx-auto">
        <b>Sobre</b>
      </h2>
      <p>
        Olá, eu sou um desenvolvedor apaixonado por tecnologia e inovação, com
        24 anos de idade e dois anos de experiência sólida em desenvolvimento de
        software. Minha jornada profissional me levou a mergulhar profundamente
        no mundo do comércio eletrônico, onde pude vivenciar desafios
        emocionantes e oportunidades de crescimento.
      </p>

      <p>
        Minha trajetória no e-commerce me ensinou a importância de criar
        experiências digitais excepcionais para os clientes. Trabalhei
        intensamente para otimizar a performance de websites, tornando a
        navegação suave e eficiente. Além disso, integrei sistemas de pagamento
        seguros, garantindo transações online tranquilas e confiáveis.
      </p>

      <p>
        Atualmente, estou comprometido em aprimorar meus conhecimentos e
        habilidades, buscando uma graduação em Análise de Sistemas. Essa
        formação acadêmica amplia minha visão e me mantém atualizado com as mais
        recentes tendências tecnológicas.
      </p>

      <p>
        Se você procura um desenvolvedor apaixonado, dedicado e orientado para
        resultados, estou aqui para ajudar. Minha paixão por desafios
        tecnológicos e meu comprometimento com a excelência fazem de mim um
        recurso valioso para qualquer projeto de desenvolvimento de software.
      </p>

      <p>
        Entre em{" "}
        <CustomLink className="text-purple-400 underline" href={"#contact"}>
          <b>contato</b>
        </CustomLink>{" "}
        e vamos explorar como posso contribuir para o sucesso da sua equipe e
        dos seus projetos. Juntos, podemos transformar ideias em realidade
        digital.
      </p>
    </section>
  );
}
