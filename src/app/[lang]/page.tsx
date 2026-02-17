import { About, Contact, IntroSection, MyProjects, Steps } from "@/components";

export default async function App({
  params,
}: {
  params: Promise<{ lang: "en" | "pt" }>;
}) {
  const { lang } = await params;

  return (
    <div className="flex flex-col pb-20 overflow-x-hidden">
      {/* 1. Impacto Inicial */}
      <IntroSection />

      {/* 2. Quem é o profissional (Storytelling) */}
      <section id="about" className="scroll-mt-20">
        <About lang={lang} />
      </section>

      {/* 3. Como funciona o processo (Autoridade) */}
      <section id="steps" className="scroll-mt-20 py-10 bg-white/[0.02]">
        <Steps lang={lang} />
      </section>

      {/* 4. Prova de competência (Resultados) */}
      <section id="projects" className="scroll-mt-20">
        <MyProjects lang={lang} />
      </section>

      {/* 5. Conversão (CTA Final) */}
      <section id="contact" className="scroll-mt-20">
        <Contact lang={lang} />
      </section>
    </div>
  );
}
