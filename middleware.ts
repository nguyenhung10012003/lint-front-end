import { getLocale, locales } from "@/utils/locale";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  let { pathname } = request.nextUrl;
  let needRedirect = false;
  const user = request.cookies.get("userId")?.value;
  const token = request.cookies.get("token")?.value;

  //Redirect if user is not logged in
  const checkPath = /sign-(in|up)/;
  if (!checkPath.test(request.nextUrl.pathname) && (!user || !token)) {
    needRedirect = true;
    pathname = "/sign-in";
  }

  const pathnameHasLocale = locales.some(
    (locale) =>
      pathname.startsWith(`/${locale.key}/`) || pathname === `/${locale.key}`
  );

  // Redirect if there is no locale
  if (!pathnameHasLocale) {
    needRedirect = true;
    const locale = getLocale(request);
    pathname = `/${locale}${pathname}`;
  }

  if (needRedirect) {
    request.nextUrl.pathname = pathname;
    return Response.redirect(request.nextUrl);
  } else return;
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
