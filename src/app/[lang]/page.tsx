import { About, Contact, IntroSection, MyProjects, Steps } from "@/components";

export default async function App({
  params,
}: {
  params: Promise<{ lang: "en" | "pt" }>;
}) {
  const { lang } = await params;
  return (
    <main className="">
      <IntroSection />
      <About lang={lang} />
      <Steps lang={lang} />
      <MyProjects lang={lang} />
      <Contact lang={lang} />
    </main>
  );
}
