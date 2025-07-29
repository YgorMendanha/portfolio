export async function GET() {
  const now = new Date().toISOString();

  const content = `
User-agent: *
Disallow: /
Allow: /en
Allow: /pt

Sitemap: https://www.ygormendanha.com/sitemap.xml

# Last updated: ${now}
`.trim();

  return new Response(content, {
    status: 200,
    headers: {
      "Content-Type": "text/plain",
      "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=59",
    },
  });
}
