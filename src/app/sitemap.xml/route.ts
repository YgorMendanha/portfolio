import { listPosts } from "@/lib/notion";

export async function GET() {
  const siteUrl = "www.ygormendanha.com";

  const [postsPT, postsEN] = await Promise.all([
    listPosts({ lang: "pt" }),
    listPosts({ lang: "en" }),
  ]);

  const postsENMap = new Map(postsEN.map((p) => [p.slug, p]));

  const blogUrls = postsPT
    .map((post) => {
      const lastmod = post.date ?? new Date().toISOString();
      const postEN = postsENMap.get(post.slug);

      return `
      <url>
        <loc>https://${siteUrl}/pt/blog/${post.slug}</loc>
        <lastmod>${lastmod}</lastmod>
        <changefreq>weekly</changefreq>
        <priority>0.6</priority>
        <xhtml:link rel="alternate" hreflang="pt" href="https://${siteUrl}/pt/blog/${
        post.slug
      }" />
        ${
          postEN
            ? `<xhtml:link rel="alternate" hreflang="en" href="https://${siteUrl}/en/blog/${postEN.slug}" />`
            : ""
        }
      </url>`;
    })
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
  xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
  xmlns:xhtml="http://www.w3.org/1999/xhtml"
  xsi:schemaLocation="
    http://www.sitemaps.org/schemas/sitemap/0.9
    http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd
    http://www.w3.org/2002/08/xhtml/xhtml1-strict.xsd">

   <url>
      <loc>https://${siteUrl}</loc>
      <lastmod>${new Date().toISOString()}</lastmod>
      <changefreq>daily</changefreq>
      <priority>0.7</priority>
      <xhtml:link rel="alternate" hreflang="pt" href="https://${siteUrl}/pt" />
      <xhtml:link rel="alternate" hreflang="en" href="https://${siteUrl}/en" />
    </url>

    ${blogUrls}
</urlset>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml",
      "Cache-Control": "stale-while-revalidate, s-maxage=3600",
    },
  });
}
