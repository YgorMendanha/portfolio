import { getDictionary } from "../getDictionary";

export function MenuDetails({
  lang,
  pathname,
}: {
  lang: "en" | "pt";
  pathname: string;
}) {
  const dict = getDictionary(lang);
  return [
    { href: "/#intro", label: dict.home },
    { href: "/#about", label: dict.about },
    {
      href: pathname === "/" ? "/#project" : "/projects",
      label: dict.projects,
    },
    { href: "/services", label: dict.services },
    { href: "/blog", label: "Blog" },
    { href: "/#contact", label: dict.contact.title },
  ];
}
