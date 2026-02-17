export function MenuDetails({
  lang,
  pathname,
}: {
  lang: "en" | "pt";
  pathname: string;
}) {
  const noRedirectProject =
    pathname === "/" || pathname === "/pt" || pathname === "/en";

  const inBlog =
    pathname === "/blog" || pathname === "/pt/blog" || pathname === "/en/blog";

  const inPolicyOrTerms =
    pathname === "/termos-de-uso" ||
    pathname === "/pt/termos-de-uso" ||
    pathname === "/en/termos-de-uso" ||
    pathname === "/politica-de-privacidade" ||
    pathname === "/pt/politica-de-privacidade" ||
    pathname === "/en/politica-de-privacidade";

  const inHome = pathname === "/" || pathname === "/pt" || pathname === "/en";

  return [
    {
      href: inHome ? "#intro" : "/#intro",
      label: lang === "pt" ? "Início" : "Home",
    },
    {
      href: inHome ? "#about" : "/#about",
      label: lang === "pt" ? "Sobre" : "About",
    },
    {
      href: noRedirectProject ? "#projects" : "/projects",
      label: lang === "pt" ? "Projetos" : "Projects",
    },
    {
      href: "/services",
      label: lang === "pt" ? "Serviços" : "Services",
    },
    {
      href: "/blog",
      label: "Blog",
    },
    {
      href: inBlog || inPolicyOrTerms ? "/#contact" : "#contact",
      label: lang === "pt" ? "Contato" : "Contact",
    },
  ];
}
