import { About, Contact, IntroSection, MyProjects } from "@/components";

const App = ({ params }: { params: { lang: "en" | "pt" } }) => {
  return (
    <main className="px-5">
      <IntroSection />
      <About lang={params.lang} />
      <MyProjects lang={params.lang} />
      <Contact lang={params.lang} />
    </main>
  );
};
export default App;
