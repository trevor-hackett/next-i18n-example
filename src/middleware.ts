import { match } from "@formatjs/intl-localematcher";
import Negotiator from "negotiator";
import { NextRequest, NextResponse } from "next/server";

let headers = { "accept-language": "en-US,en;q=0.5" };
let languages = new Negotiator({ headers }).languages();
export const defaultLocale = "en";

// -> 'en-US'

let locales = ["en", "de", "fr", "es"];

// Get the preferred locale, similar to above or using a library
function getLocale(request: NextRequest) {
  const languageHeader = request.headers.get("accept-language") || "";
  let languages = new Negotiator({
    headers: { "accept-language": languageHeader },
  }).languages();
  return match(languages, locales, defaultLocale);
}

export function middleware(request: NextRequest) {
  const locale = getLocale(request);
  console.log(locale);
  const pathname = request.nextUrl.pathname;

  // Set custom headers
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-url", request.url);

  // Check if there is any supported locale in the pathname
  const pathnameIsMissingLocale = locales.every(
    (locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
  );

  // Redirect if there is no locale
  if (pathnameIsMissingLocale) {
    // e.g. incoming request is /products
    // The new URL is now /en-US/products
    return NextResponse.redirect(
      new URL(`/${locale}/${pathname}`, request.url),
      { headers: requestHeaders }
    );
  }

  // Redirect "/" to "/home"
  if (pathname === `/${locale}`) {
    return NextResponse.redirect(new URL(`/${locale}/home`, request.url), {
      headers: requestHeaders,
    });
  }

  // Return a response with the modified headers ('x-url')
  return NextResponse.next({
    headers: requestHeaders,
  });
}

export const config = {
  matcher: [
    // Skip all internal paths (_next)
    "/((?!_next).*)",
    // Optional: only run on root (/) URL
    // '/'
  ],
};
