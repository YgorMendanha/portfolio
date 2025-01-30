import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      disallow: "/",
      allow: ["/en/", "/pt/"],
    },
    sitemap: "https://www.ygormendanha.com/sitemap.xml",
  };
}
