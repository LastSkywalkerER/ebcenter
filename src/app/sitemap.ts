import { env } from '@/shared/config/env'
import { getPayload } from 'payload'
import config from '@payload-config'
import { i18n } from '@/shared/i18n/config'
import { getLocalePath } from '@/shared/lib/localePath'
import type { MetadataRoute } from 'next'

type Locale = (typeof i18n)['locales'][number]

function localeUrl(baseUrl: string, locale: Locale, path: string): string {
  return `${baseUrl}${getLocalePath(locale, path)}`
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = env.BASE_URL
  if (!baseUrl) {
    throw new Error('NEXT_PUBLIC_BASE_URL environment variable is not set')
  }

  const routes = ['', '/services', '/training', '/contacts']

  const sitemapEntries: MetadataRoute.Sitemap = routes.flatMap((route) =>
    i18n.locales.map((locale) => ({
      url: localeUrl(baseUrl, locale, route),
      lastModified: new Date(),
      changeFrequency: (route === ''
        ? 'daily'
        : route === '/services' || route === '/training'
          ? 'weekly'
          : 'monthly') as 'daily' | 'weekly' | 'monthly',
      priority: route === '' ? 1 : route === '/services' || route === '/training' ? 0.8 : 0.5,
      alternateRefs: [
        { href: localeUrl(baseUrl, i18n.defaultLocale, route), hreflang: 'x-default' },
        ...i18n.locales.map((loc) => ({ href: localeUrl(baseUrl, loc, route), hreflang: loc })),
      ],
    }))
  )

  try {
    const payload = await getPayload({ config })

    const [servicesResult, coursesResult, pagesResult] = await Promise.all([
      payload.find({ collection: 'services', limit: 100, pagination: false }),
      payload.find({ collection: 'courses', limit: 100, pagination: false, sort: 'order' }),
      payload.find({ collection: 'pages', limit: 200, pagination: false }),
    ])

    const serviceSlugs = servicesResult.docs
      .map((s) => (s as { slug?: string }).slug)
      .filter((s): s is string => !!s)

    const courseSlugs = coursesResult.docs
      .map((c) => (c as { slug?: string }).slug)
      .filter((s): s is string => !!s)

    const pageSlugs = pagesResult.docs
      .map((p) => (p as { slug?: string }).slug)
      .filter((s): s is string => !!s && s !== 'home' && s !== 'services' && s !== 'training' && s !== 'contacts')

    const serviceEntries = i18n.locales.flatMap((locale) =>
      serviceSlugs.map((slug) => ({
        url: localeUrl(baseUrl, locale, `/services/${slug}`),
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: 0.7,
        alternateRefs: [
          { href: localeUrl(baseUrl, i18n.defaultLocale, `/services/${slug}`), hreflang: 'x-default' },
          ...i18n.locales.map((loc) => ({ href: localeUrl(baseUrl, loc, `/services/${slug}`), hreflang: loc })),
        ],
      }))
    )

    const tariffEntries = i18n.locales.flatMap((locale) =>
      serviceSlugs.map((slug) => ({
        url: localeUrl(baseUrl, locale, `/services/${slug}/tariffs`),
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: 0.6,
        alternateRefs: [
          { href: localeUrl(baseUrl, i18n.defaultLocale, `/services/${slug}/tariffs`), hreflang: 'x-default' },
          ...i18n.locales.map((loc) => ({ href: localeUrl(baseUrl, loc, `/services/${slug}/tariffs`), hreflang: loc })),
        ],
      }))
    )

    const courseEntries = i18n.locales.flatMap((locale) =>
      courseSlugs.map((slug) => ({
        url: localeUrl(baseUrl, locale, `/training/${slug}`),
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: 0.7,
        alternateRefs: [
          { href: localeUrl(baseUrl, i18n.defaultLocale, `/training/${slug}`), hreflang: 'x-default' },
          ...i18n.locales.map((loc) => ({ href: localeUrl(baseUrl, loc, `/training/${slug}`), hreflang: loc })),
        ],
      }))
    )

    const customPageEntries = i18n.locales.flatMap((locale) =>
      pageSlugs.map((slug) => ({
        url: localeUrl(baseUrl, locale, `/${slug}`),
        lastModified: new Date(),
        changeFrequency: 'monthly' as const,
        priority: 0.5,
        alternateRefs: [
          { href: localeUrl(baseUrl, i18n.defaultLocale, `/${slug}`), hreflang: 'x-default' },
          ...i18n.locales.map((loc) => ({ href: localeUrl(baseUrl, loc, `/${slug}`), hreflang: loc })),
        ],
      }))
    )

    return [...sitemapEntries, ...serviceEntries, ...tariffEntries, ...courseEntries, ...customPageEntries]
  } catch (err) {
    console.error('sitemap: Payload fetch failed, using base routes only', err)
    return sitemapEntries
  }
}
