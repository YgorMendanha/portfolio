import { getDictionary } from "../getDictionary";

export interface ProjectsDetails {
  id: string;
  title: string;
  tags: string[];
  image: string;
  link: string;
  details: string;
  internalLink?: string;
  favorite: boolean;
}

export function ProjectsDetails({
  lang,
}: {
  lang: "en" | "pt";
}): ProjectsDetails[] {
  const dict = getDictionary(lang);
  return [
    {
      id: "ecommerce",
      title: dict.titleFinesse,

      tags: [dict.eCommerce, dict.checkout, dict.cro],
      image: "/finesse-store.png",
      link: "https://store.ygormendanha.com",
      internalLink: "/projects/shop",
      details: dict.store,
      favorite: true,
    },
    {
      id: "telegram-bot",
      title: dict.titleBot,

      tags: [dict.automation, dict.bot],
      image: "/bot_telegram.png",
      link: "https://t.me/financial_life_bot",
      details: dict.descBot,
      favorite: true,
    },
    {
      id: "blog",
      title: dict.titleBlog,
      tags: [dict.content, dict.seo],
      image: "/blog.png",
      link: "/blog",
      details: dict.descriptionBlog,
      favorite: true,
    },
  ];
}
