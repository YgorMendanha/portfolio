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

  return [
    { href: "/#intro", label: dict.home },
    { href: "/#about", label: dict.about },
    {
      href: noRedirectProject ? "#project" : "/projects",
      label: dict.projects,
    },
    { href: "/services", label: dict.services },
    { href: "/blog", label: "Blog" },
    { href: inBlog ? "/#contact" : "#contact", label: dict.contact.title },
  ];
}
