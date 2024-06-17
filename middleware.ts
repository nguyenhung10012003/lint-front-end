import type {NextRequest} from 'next/server'
import {getLocale, locales} from "@/utils/locale";


export function middleware(request: NextRequest) {
  let {pathname} = request.nextUrl;
  let needRedirect = false;
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale.key}/`) || pathname === `/${locale.key}`
  )

  // Redirect if there is no locale
  if (!pathnameHasLocale) {
    needRedirect = true;
    const locale = getLocale(request)
    pathname = `/${locale}${pathname}`;
  }
  const user = request.cookies.get('user')?.value;
  const token = request.cookies.get('token')?.value;

  // Redirect if user is not logged in
  // if (!request.nextUrl.pathname.includes('/sign-in') && (!user || !token)) {
  //   needRedirect = true;
  //   pathname += '/sign-in';
  // }

  // Redirect if user profile is not complete

  if (needRedirect) {
    request.nextUrl.pathname = pathname;
    return Response.redirect(request.nextUrl);
  } else return;

}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
}