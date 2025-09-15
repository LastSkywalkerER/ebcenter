import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'
import { i18n } from './shared/i18n/config'

// Простая проверка формата JWT токена без декодирования
function hasValidTokenFormat(token: string): boolean {
  // JWT токен должен состоять из 3 частей, разделенных точками
  const parts = token.split('.')
  return parts.length === 3 && parts.every((part) => part.length > 0)
}

const PUBLIC_FILE = /\.(.*)$/

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname

  if (request.nextUrl.pathname.startsWith('/_next') || PUBLIC_FILE.test(request.nextUrl.pathname)) {
    return
  }

  if (pathname.startsWith('/api/')) {
    if (pathname === '/api/auth/login' || pathname === '/api/auth/logout') {
      return
    }

    const token = request.cookies.get('auth-token')?.value
    if (!token || !hasValidTokenFormat(token)) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 })
    }
    return
  }

  // Проверяем авторизацию для admin routes
  if (pathname.includes('/admin')) {
    const token = request.cookies.get('auth-token')?.value
    console.log('Admin route access attempt:', {
      pathname,
      hasToken: !!token,
      tokenStart: token?.substring(0, 20) + '...',
    })

    if (!token) {
      console.log('Redirecting to login - no token')
      const locale = request.cookies.get('NEXT_LOCALE')?.value || i18n.defaultLocale
      return NextResponse.redirect(new URL(`/${locale}/login`, request.url))
    }

    const hasValidFormat = hasValidTokenFormat(token)
    console.log('Token format validation result:', hasValidFormat)

    if (!hasValidFormat) {
      console.log('Redirecting to login - invalid token format')
      const locale = request.cookies.get('NEXT_LOCALE')?.value || i18n.defaultLocale
      return NextResponse.redirect(new URL(`/${locale}/login`, request.url))
    }

    console.log('Admin access granted')
  }

  // Если пользователь авторизован и заходит на страницу логина, редиректим на админку
  if (pathname.includes('/login')) {
    const token = request.cookies.get('auth-token')?.value
    if (token && hasValidTokenFormat(token)) {
      const locale = request.cookies.get('NEXT_LOCALE')?.value || i18n.defaultLocale
      return NextResponse.redirect(new URL(`/${locale}/admin`, request.url))
    }
  }

  const pathnameHasLocale = i18n.locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  )

  if (pathnameHasLocale) return

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
