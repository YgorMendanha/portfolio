import { geolocation } from "@vercel/edge";
import { NextRequest, NextResponse } from "next/server";
import countries from "@/utils/lib/countries.json";

const i18n = {
  defaultLocale: "pt",
  locales: ["en", "pt"],
} as const;

function getLocale(request: NextRequest) {
  const { country } = geolocation(request);
  console.info({ country });
  return countries.find(
    (x) => x.id["ISO-3166-1-ALPHA-2"] === (country ?? "BR")
  )!;
}

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const pathnameIsMissingLocale = i18n.locales.every(
    (locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
  );

  if (pathnameIsMissingLocale) {
    const locale = getLocale(request);
    if (locale.id["ISO-3166-1-ALPHA-2"] === "BR") {
      return NextResponse.redirect(new URL(`/${"pt"}/${pathname}`, request.url))
    }
    return NextResponse.redirect(new URL(`/${"en"}/${pathname}`, request.url));
  }
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
  ],
};
