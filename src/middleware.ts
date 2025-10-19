import { geolocation } from "@vercel/functions";
import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const cookieLocale = request.cookies.get("locale")?.value;
  const cookieLang = request.cookies.get("lang")?.value;

  const hasBRPrefix = pathname.startsWith("/pt");
  const hasUSAPrefix = pathname.startsWith("/en");

  // 1) Sem prefixo e sem cookie: usa geolocation
  if (!hasBRPrefix && !hasUSAPrefix && !cookieLocale) {
    const { country = "BR" } = geolocation(request);
    const isBrazil = country === "BR";

    if (isBrazil) {
      const newUrl = request.nextUrl.clone();
      newUrl.pathname = `/pt${pathname}`;
      const response = NextResponse.rewrite(newUrl);
      response.cookies.set("locale", "BR");
      response.cookies.set("lang", "pt");
      response.cookies.set("pathname", pathname);
      return response;
    }

    const newUrl = request.nextUrl.clone();
    newUrl.pathname = `/en${pathname}`;
    const response = NextResponse.redirect(newUrl);
    response.cookies.set("locale", "USA");
    response.cookies.set("lang", "en");
    response.cookies.set("pathname", pathname);
    return response;
  }

  // 2) Sem prefixo e com cookie: redireciona conforme cookieLocale
  if (!hasBRPrefix && !hasUSAPrefix && cookieLocale) {
    if (cookieLocale === "BR") {
      const newUrl = request.nextUrl.clone();
      newUrl.pathname = `/pt${pathname}`;
      const response = NextResponse.redirect(newUrl);
      response.cookies.set("pathname", pathname);
      !cookieLang && response.cookies.set("lang", "pt");
      return response;
    }

    const newUrl = request.nextUrl.clone();
    newUrl.pathname = `/en${pathname}`;
    const response = NextResponse.redirect(newUrl);
    response.cookies.set("pathname", pathname);
    !cookieLang && response.cookies.set("lang", "en");
    return response;
  }

  // 3) Já tem /pt no início
  if (hasBRPrefix) {
    const newPathname = pathname || "/";
    const newUrl = request.nextUrl.clone();
    newUrl.pathname = newPathname;
    const response = NextResponse.rewrite(newUrl);
    response.cookies.set("locale", "BR");
    response.cookies.set("lang", "pt");
    response.cookies.set("pathname", pathname);
    return response;
  }

  // 3) Já tem /en no início
  if (hasUSAPrefix) {
    const newPathname = pathname || "/";
    const newUrl = request.nextUrl.clone();
    newUrl.pathname = newPathname;
    const response = NextResponse.rewrite(newUrl);
    response.cookies.set("locale", "BR");
    response.cookies.set("lang", "en");
    response.cookies.set("pathname", pathname);
    return response;
  }

  // 4) Se tiver /usa ou for API/estático, cai aqui:
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap\\.xml$|sitemap-.*\\.xml$|robots.txt|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico)$).*)",
  ],
};
