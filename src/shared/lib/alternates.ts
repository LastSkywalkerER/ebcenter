import type { Locale } from '@/shared/i18n/config'
import { i18n } from '@/shared/i18n/config'
import { getLocalePath } from './localePath'

/**
 * Build SEO alternates (canonical + hreflang) for a given path.
 * Includes x-default for self-referential hreflang (required by Google).
 */
export function buildAlternates(baseUrl: string, locale: Locale, path: string) {
  if (!baseUrl) return undefined

  const defaultLocalePath = getLocalePath(i18n.defaultLocale, path)
  const defaultUrl = `${baseUrl}${defaultLocalePath === '/' ? '' : defaultLocalePath}`

  const languages: Record<string, string> = {
    'x-default': defaultUrl,
    ...Object.fromEntries(
      i18n.locales.map((loc) => {
        const locPath = getLocalePath(loc, path)
        return [loc, `${baseUrl}${locPath === '/' ? '' : locPath}`]
      })
    ),
  }

  const canonicalPath = getLocalePath(locale, path)
  const canonical = `${baseUrl}${canonicalPath === '/' ? '' : canonicalPath}`

  return {
    canonical,
    languages,
  }
}
