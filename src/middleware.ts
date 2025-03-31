import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'
import { i18n } from './i18n/config'

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname

  // Check if the pathname already has a locale
  const pathnameHasLocale = i18n.locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  )

  if (pathnameHasLocale) return

  // Redirect if there is no locale
  const locale = request.cookies.get('NEXT_LOCALE')?.value || i18n.defaultLocale
  request.nextUrl.pathname = `/${locale}${pathname}`
  return NextResponse.redirect(request.nextUrl)
}

export const config = {
  matcher: [
    // Skip all internal paths (_next)
    '/((?!api|_next/static|_next/image|images|manifest.json|favicon.ico|icon0.svg|icon1.png|robots.txt|sitemap.xml).*)',
  ],
}
