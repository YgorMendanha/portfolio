import { getDictionary } from "../getDictionary";

export function MenuDetails({
  lang,
  pathname,
}: {
  lang: "en" | "pt";
  pathname: string;
}) {
  const dict = getDictionary(lang);
  const noRedirectProject =
    pathname === "/" || pathname === "/pt" || pathname === "/en";

  const inBlog =
    pathname === "/blog" || pathname === "/pt/blog" || pathname === "/en/blog";

  const inHome = pathname === "/" || pathname === "/pt" || pathname === "/en";

  return [
    { href: inHome ? "#intro" : "/#intro", label: dict.home },
    { href: inHome ? "#about" : "/#about", label: dict.about },
    {
      href: noRedirectProject ? "#project" : "/projects",
      label: dict.projects,
    },
    { href: "/services", label: dict.services },
    { href: "/blog", label: "Blog" },
    { href: inBlog ? "/#contact" : "#contact", label: dict.contact.title },
  ];
}
