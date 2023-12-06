import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://www.ygormendanha.com.br",
      lastModified: new Date(),
      hreflang = "de",
      priority: 1,
    },
    {
      url: "https://www.ygormendanha.com.br/en",
      lastModified: new Date(),
      priority: 1,
    },
    {
      url: "https://www.ygormendanha.com.br/pt",
      lastModified: new Date(),
      priority: 1,
    },
  ];
}
