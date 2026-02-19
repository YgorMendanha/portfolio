import { listPosts } from "@/lib/notion";

export async function GET() {
  const siteUrl = "www.ygormendanha.com";
  const langs = ["pt", "en"];
  const defaultLang = "pt";
  const EXTRA_PAGES: string[] = [
    "projects",
    "projects/shop",
    "projects/orbe",
    "services",
    "services/custom",
    "services/shop",
  ];

  const [postsPT, postsEN] = await Promise.all([
    listPosts({ lang: "pt" }),
    listPosts({ lang: "en" }),
  ]);

  const postsPTMap = new Map(postsPT.map((p) => [p.slug, p]));
  const postsENMap = new Map(postsEN.map((p) => [p.slug, p]));

  const encodePath = (rawPath: string) =>
    rawPath
      .split("/")
      .filter(Boolean)
      .map((segment) => encodeURIComponent(segment))
      .join("/");

  const homeUrls = langs
    .map((lang) => {
      const loc = `https://${siteUrl}/${lang}`;
      const lastmod = new Date().toISOString();
      const alternates = [
        `  <xhtml:link rel="alternate" hreflang="pt" href="https://${siteUrl}/pt" />`,
        `  <xhtml:link rel="alternate" hreflang="en" href="https://${siteUrl}/en" />`,
        `  <xhtml:link rel="alternate" hreflang="x-default" href="https://${siteUrl}/${defaultLang}" />`,
      ].join("\n");
      return `
            <url>
              <loc>${loc}</loc>
              <lastmod>${lastmod}</lastmod>
              <changefreq>daily</changefreq>
              <priority>0.8</priority>
          ${alternates}
            </url>`;
    })
    .join("\n");

  const extraPagesUrls = EXTRA_PAGES.map((pagePath) => {
    const cleanPath = String(pagePath).replace(/^\/+|\/+$/g, "");
    return langs
      .map((lang) => {
        const loc = cleanPath
          ? `https://${siteUrl}/${lang}/${encodePath(cleanPath)}`
          : `https://${siteUrl}/${lang}`;
        const alternatesArr = [
          `  <xhtml:link rel="alternate" hreflang="pt" href="${
            cleanPath
              ? `https://${siteUrl}/pt/${encodePath(cleanPath)}`
              : `https://${siteUrl}/pt`
          }" />`,
          `  <xhtml:link rel="alternate" hreflang="en" href="${
            cleanPath
              ? `https://${siteUrl}/en/${encodePath(cleanPath)}`
              : `https://${siteUrl}/en`
          }" />`,
          `  <xhtml:link rel="alternate" hreflang="x-default" href="${
            cleanPath
              ? `https://${siteUrl}/${defaultLang}/${encodePath(
                  cleanPath
                )}`
              : `https://${siteUrl}/${defaultLang}`
          }" />`,
        ].join("\n");
        const lastmod = new Date().toISOString();
        return `
          <url>
            <loc>${loc}</loc>
            <lastmod>${lastmod}</lastmod>
            <changefreq>weekly</changefreq>
            <priority>0.6</priority>
        ${alternatesArr}
          </url>`;
      })
      .join("\n");
  }).join("\n");

  const slugsSet = new Set([
    ...postsPT.map((p) => p.slug),
    ...postsEN.map((p) => p.slug),
  ]);

  const postsUrls = Array.from(slugsSet)
    .map((slug) => {
      const entries = [];
      const hasPT = postsPTMap.has(slug);
      const hasEN = postsENMap.has(slug);
      const alternatesArr = [];
      if (hasPT) {
        alternatesArr.push(
          `  <xhtml:link rel="alternate" hreflang="pt" href="https://${siteUrl}/pt/blog/${encodePath(
            slug
          )}" />`
        );
      }
      if (hasEN) {
        alternatesArr.push(
          `  <xhtml:link rel="alternate" hreflang="en" href="https://${siteUrl}/en/blog/${encodePath(
            slug
          )}" />`
        );
      }
      const xDefaultHref = hasPT
        ? `https://${siteUrl}/pt/blog/${encodePath(slug)}`
        : hasEN
        ? `https://${siteUrl}/en/blog/${encodePath(slug)}`
        : null;
      if (xDefaultHref) {
        alternatesArr.push(
          `  <xhtml:link rel="alternate" hreflang="x-default" href="${xDefaultHref}" />`
        );
      }
      const alternates = alternatesArr.join("\n");
      if (hasPT) {
        const post = postsPTMap.get(slug);
        const lastmod = post?.date ?? post?.date ?? new Date().toISOString();
        entries.push(`
          <url>
            <loc>https://${siteUrl}/pt/blog/${encodePath(slug)}</loc>
            <lastmod>${lastmod}</lastmod>
            <changefreq>weekly</changefreq>
            <priority>0.6</priority>
        ${alternates}
          </url>`);
      }
      if (hasEN) {
        const post = postsENMap.get(slug);
        const lastmod = post?.date ?? post?.date ?? new Date().toISOString();
        entries.push(`
          <url>
            <loc>https://${siteUrl}/en/blog/${encodePath(slug)}</loc>
            <lastmod>${lastmod}</lastmod>
            <changefreq>weekly</changefreq>
            <priority>0.6</priority>
        ${alternates}
          </url>`);
      }
      return entries.join("\n");
    })
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
      <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xmlns:xhtml="http://www.w3.org/1999/xhtml"
        xsi:schemaLocation="
          http://www.sitemaps.org/schemas/sitemap/0.9
          http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">

      ${homeUrls}

    ${extraPagesUrls}

      ${postsUrls}
      </urlset>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}
