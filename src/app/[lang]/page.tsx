import { About, Contact, IntroSection, MyProjects } from "@/components";

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
      <MyProjects lang={lang} />
      <Contact lang={lang} />
    </main>
  );
}
