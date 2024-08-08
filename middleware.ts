import { getLocale, locales } from "@/utils/locale";
import { NextResponse, type NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  let url = request.nextUrl;
  let needRedirect = false;
  const user = request.cookies.get("userId")?.value;
  const token = request.cookies.get("token")?.value;

  // Redirect when user logs in with OAuth
  if (url.pathname.startsWith("/oauth")) {
    const tokenData = JSON.parse(
      decodeURIComponent(url.searchParams.get("token") || "")
    );
    const response = NextResponse.redirect(new URL("/", request.url));
    response.cookies.set("userId", tokenData.userId);
    response.cookies.set("token", tokenData.token);
    response.cookies.set("refreshToken", tokenData.refreshToken);
    url.searchParams.delete("token");
    return response;
  }

  // Redirect if user is not logged in
  const checkPath = /sign-(in|up)/;
  if (!checkPath.test(request.nextUrl.pathname) && (!user || !token)) {
    return NextResponse.redirect(new URL("/sign-in", request.url));
  }

  const pathnameHasLocale = locales.some(
    (locale) =>
      url.pathname.startsWith(`/${locale.key}/`) ||
      url.pathname === `/${locale.key}`
  );

  // Redirect if there is no locale
  if (!pathnameHasLocale) {
    const locale = getLocale(request);
    url.pathname = `/${locale}${url.pathname}`;
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
