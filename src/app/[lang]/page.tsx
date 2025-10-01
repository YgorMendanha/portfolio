import { About, Contact, IntroSection, MyProjects, Steps } from "@/components";
import { getDictionary } from "@/utils/functions/getDictionary";

export default async function App({
  params,
}: {
  params: Promise<{ lang: "en" | "pt" }>;
}) {
  const { lang } = await params;

  const dict = getDictionary(lang);

  return (
    <div className="">
      <IntroSection />
      <About lang={lang} />
      <Steps lang={lang} />
      <MyProjects lang={lang} />
      <Contact lang={lang} title={dict.contact.call} text={dict.contact.text} />
    </div>
  );
}
