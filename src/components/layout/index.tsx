"use client";

import { Header } from "./header";
import { Footer } from "./footer";
import { Toaster } from "react-hot-toast";

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <main>
        <Header />
        {children}
        <Footer />
        <Toaster position="bottom-center" reverseOrder={false} />
      </main>
    </>
  );
}
