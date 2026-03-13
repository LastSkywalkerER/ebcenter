import { env } from '@/shared/config/env'
import { getPayload } from 'payload'
import config from '@payload-config'
import { i18n } from '@/shared/i18n/config'
import { getLocalePath } from '@/shared/lib/localePath'
import { getKnowledgeArticles } from '@/shared/lib/payload'
import type { MetadataRoute } from 'next'

type Locale = (typeof i18n)['locales'][number]

function localeUrl(baseUrl: string, locale: Locale, path: string): string {
  return `${baseUrl}${getLocalePath(locale, path)}`
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  let baseUrl = env.BASE_URL
  if (!baseUrl) {
    throw new Error('NEXT_PUBLIC_BASE_URL environment variable is not set')
  }
  baseUrl = baseUrl.replace(/\/$/, '') // Remove trailing slash for canonical URLs

  const routes = ['', '/services', '/training', '/knowledge']

  const sitemapEntries: MetadataRoute.Sitemap = routes.flatMap((route) =>
    i18n.locales.map((locale) => ({
      url: localeUrl(baseUrl, locale, route),
      lastModified: new Date(),
      changeFrequency: (route === ''
        ? 'daily'
        : route === '/services' || route === '/training'
          ? 'weekly'
          : 'monthly') as 'daily' | 'weekly' | 'monthly',
      priority: route === '' ? 1 : route === '/services' || route === '/training' ? 0.8 : route === '/knowledge' ? 0.7 : 0.5,
      alternateRefs: [
        { href: localeUrl(baseUrl, i18n.defaultLocale, route), hreflang: 'x-default' },
        ...i18n.locales.map((loc) => ({ href: localeUrl(baseUrl, loc, route), hreflang: loc })),
      ],
    }))
  )

  try {
    const payload = await getPayload({ config })

    const pagesResult = await payload.find({ collection: 'pages', limit: 200, pagination: false })

    type DocWithMeta = { slug?: string; updatedAt?: string }

    const pages = pagesResult.docs as DocWithMeta[]

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

    const knowledgeArticles = await getKnowledgeArticles(i18n.defaultLocale, 0, false)

    const knowledgeEntries = i18n.locales.flatMap((locale) =>
      knowledgeArticles
        .filter((a): a is typeof a & { slug: string } => !!a.slug)
        .map((a) => ({
          url: localeUrl(baseUrl, locale, `/knowledge/${a.slug}`),
          lastModified: a.publishedAt ? new Date(a.publishedAt) : new Date(),
          changeFrequency: 'monthly' as const,
          priority: 0.6,
          alternateRefs: [
            { href: localeUrl(baseUrl, i18n.defaultLocale, `/knowledge/${a.slug}`), hreflang: 'x-default' },
            ...i18n.locales.map((loc) => ({ href: localeUrl(baseUrl, loc, `/knowledge/${a.slug}`), hreflang: loc })),
          ],
        }))
    )

    return [...sitemapEntries, ...customPageEntries, ...knowledgeEntries]
  } catch (err) {
    console.error('sitemap: Payload fetch failed, using base routes only', err)
    return sitemapEntries
  }
}
