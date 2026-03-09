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

    type DocWithMeta = { slug?: string; updatedAt?: string }

    const services = servicesResult.docs as DocWithMeta[]
    const courses = coursesResult.docs as DocWithMeta[]
    const pages = pagesResult.docs as DocWithMeta[]

    const serviceEntries = i18n.locales.flatMap((locale) =>
      services
        .filter((s): s is DocWithMeta & { slug: string } => !!s.slug)
        .map((s) => ({
          url: localeUrl(baseUrl, locale, `/services/${s.slug}`),
          lastModified: s.updatedAt ? new Date(s.updatedAt) : new Date(),
          changeFrequency: 'weekly' as const,
          priority: 0.7,
          alternateRefs: [
            { href: localeUrl(baseUrl, i18n.defaultLocale, `/services/${s.slug}`), hreflang: 'x-default' },
            ...i18n.locales.map((loc) => ({ href: localeUrl(baseUrl, loc, `/services/${s.slug}`), hreflang: loc })),
          ],
        }))
    )

    const tariffEntries = i18n.locales.flatMap((locale) =>
      services
        .filter((s): s is DocWithMeta & { slug: string } => !!s.slug)
        .map((s) => ({
          url: localeUrl(baseUrl, locale, `/services/${s.slug}/tariffs`),
          lastModified: s.updatedAt ? new Date(s.updatedAt) : new Date(),
          changeFrequency: 'weekly' as const,
          priority: 0.6,
          alternateRefs: [
            { href: localeUrl(baseUrl, i18n.defaultLocale, `/services/${s.slug}/tariffs`), hreflang: 'x-default' },
            ...i18n.locales.map((loc) => ({ href: localeUrl(baseUrl, loc, `/services/${s.slug}/tariffs`), hreflang: loc })),
          ],
        }))
    )

    const courseEntries = i18n.locales.flatMap((locale) =>
      courses
        .filter((c): c is DocWithMeta & { slug: string } => !!c.slug)
        .map((c) => ({
          url: localeUrl(baseUrl, locale, `/training/${c.slug}`),
          lastModified: c.updatedAt ? new Date(c.updatedAt) : new Date(),
          changeFrequency: 'weekly' as const,
          priority: 0.7,
          alternateRefs: [
            { href: localeUrl(baseUrl, i18n.defaultLocale, `/training/${c.slug}`), hreflang: 'x-default' },
            ...i18n.locales.map((loc) => ({ href: localeUrl(baseUrl, loc, `/training/${c.slug}`), hreflang: loc })),
          ],
        }))
    )

    const customPageEntries = i18n.locales.flatMap((locale) =>
      pages
        .filter((p): p is DocWithMeta & { slug: string } => !!p.slug && p.slug !== 'home' && p.slug !== 'services' && p.slug !== 'training' && p.slug !== 'contacts')
        .map((p) => ({
          url: localeUrl(baseUrl, locale, `/${p.slug}`),
          lastModified: p.updatedAt ? new Date(p.updatedAt) : new Date(),
          changeFrequency: 'monthly' as const,
          priority: 0.5,
          alternateRefs: [
            { href: localeUrl(baseUrl, i18n.defaultLocale, `/${p.slug}`), hreflang: 'x-default' },
            ...i18n.locales.map((loc) => ({ href: localeUrl(baseUrl, loc, `/${p.slug}`), hreflang: loc })),
          ],
        }))
    )

    return [...sitemapEntries, ...serviceEntries, ...tariffEntries, ...courseEntries, ...customPageEntries]
  } catch (err) {
    console.error('sitemap: Payload fetch failed, using base routes only', err)
    return sitemapEntries
  }
}
