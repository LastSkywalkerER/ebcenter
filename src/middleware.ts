import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'
import { i18n } from './shared/i18n/config'

const PUBLIC_FILE = /\.(.*)$/

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname

  if (request.nextUrl.pathname.startsWith('/_next') || PUBLIC_FILE.test(request.nextUrl.pathname)) {
    return
  }

  if (pathname.startsWith('/api/')) {
    // Public API routes
    if (pathname.startsWith('/api/contact')) {
      return
    }
    // Payload CMS API has its own auth - allow through
    if (
      pathname.startsWith('/api/users') ||
      pathname.startsWith('/api/media') ||
      pathname.startsWith('/api/services') ||
      pathname.startsWith('/api/courses') ||
      pathname.startsWith('/api/pages') ||
      pathname.startsWith('/api/globals')
    ) {
      return
    }
  }

  const pathnameHasLocale = i18n.locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  )

  if (pathnameHasLocale) return

  // Payload CMS admin at /admin - no locale prefix
  if (pathname.startsWith('/admin')) return

  const locale = request.cookies.get('NEXT_LOCALE')?.value || i18n.defaultLocale
  request.nextUrl.pathname = `/${locale}${pathname}`
  return NextResponse.redirect(request.nextUrl)
}

export const config = {
  matcher: [
    // Skip internal paths and Payload admin
    '/((?!api|admin|_next/static|_next/image|images|manifest.json|favicon.ico|icon0.svg|icon1.png|robots.txt|sitemap.xml).*)',
  ],
}
