import type { Locale } from '@/shared/i18n/config'
import { i18n } from '@/shared/i18n/config'

/**
 * Build locale-aware path for links.
 * Default locale: no prefix (/ , /services).
 * Other locales: prefix (/en, /en/services).
 */
export function getLocalePath(locale: Locale, path: string): string {
  const normalizedPath = path.startsWith('/') ? path : `/${path}`
  if (locale === i18n.defaultLocale) {
    return normalizedPath || '/'
  }
  return `/${locale}${normalizedPath}`
}
