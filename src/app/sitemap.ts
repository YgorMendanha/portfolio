import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://www.ygormendanha.com",
      lastModified: new Date(),
      priority: 1,
    },
    {
      url: "https://www.ygormendanha.com/en",
      lastModified: new Date(),
      priority: 1,
    },
    {
      url: "https://www.ygormendanha.com/pt",
      lastModified: new Date(),
      priority: 1,
    },
  ];
}
