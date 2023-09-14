"use client";

import { Header } from "./header";
import Particles from "react-tsparticles";
import { loadSlim } from "tsparticles-slim";
import options from "@/lib/particles";
import { useEffect, useState } from "react";
import { Footer } from "./footer";

export function Layout({ children }: { children: React.ReactNode }) {
  const op = options();
  const [loaded, setLoaded] = useState<boolean>(false);
  useEffect(() => {
    setLoaded(true);
  }, []);

  return (
    <>
      <main className={!loaded ? "bg-violet-950" : ""}>
        <Header />
        {children}
        <Footer />
      </main>
      <Particles
        id="tsparticles"
        init={async (engine) => {
          await loadSlim(engine);
        }}
        options={op}
      />
    </>
  );
}
