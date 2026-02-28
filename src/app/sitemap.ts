import { env } from '@/shared/config/env'
import { getPayload } from 'payload'
import config from '@payload-config'
import { i18n } from '@/shared/i18n/config'
import type { MetadataRoute } from 'next'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = env.BASE_URL
  if (!baseUrl) {
    throw new Error('NEXT_PUBLIC_BASE_URL environment variable is not set')
  }

  const routes = ['', '/services', '/training', '/contacts']

  // Generate base routes for all locales
  const sitemapEntries = routes.flatMap((route) =>
    i18n.locales.map((locale) => ({
      url: `${baseUrl}/${locale}${route}`,
      lastModified: new Date(),
      changeFrequency: (route === ''
        ? 'daily'
        : route === '/services' || route === '/training'
          ? 'weekly'
          : 'monthly') as 'daily' | 'weekly' | 'monthly',
      priority: route === '' ? 1 : route === '/services' || route === '/training' ? 0.8 : 0.5,
    }))
  )

  try {
    const payload = await getPayload({ config })

    const [servicesResult, coursesResult] = await Promise.all([
      payload.find({ collection: 'services', limit: 100, pagination: false }),
      payload.find({ collection: 'courses', limit: 100, pagination: false, sort: 'order' }),
    ])

    const serviceSlugs = servicesResult.docs
      .map((s) => (s as { slug?: string }).slug)
      .filter((s): s is string => !!s)

    const courseSlugs = coursesResult.docs
      .map((c) => (c as { slug?: string }).slug)
      .filter((s): s is string => !!s)

    // Service detail pages
    const serviceEntries = i18n.locales.flatMap((locale) =>
      serviceSlugs.map((slug) => ({
        url: `${baseUrl}/${locale}/services/${slug}`,
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: 0.7,
        alternateRefs: i18n.locales.map((altLocale) => ({
          href: `${baseUrl}/${altLocale}/services/${slug}`,
          hreflang: altLocale,
        })),
      }))
    )

    // Tariff pages
    const tariffEntries = i18n.locales.flatMap((locale) =>
      serviceSlugs.map((slug) => ({
        url: `${baseUrl}/${locale}/services/${slug}/tariffs`,
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: 0.6,
        alternateRefs: i18n.locales.map((altLocale) => ({
          href: `${baseUrl}/${altLocale}/services/${slug}/tariffs`,
          hreflang: altLocale,
        })),
      }))
    )

    // Course detail pages
    const courseEntries = i18n.locales.flatMap((locale) =>
      courseSlugs.map((slug) => ({
        url: `${baseUrl}/${locale}/training/${slug}`,
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: 0.7,
        alternateRefs: i18n.locales.map((altLocale) => ({
          href: `${baseUrl}/${altLocale}/training/${slug}`,
          hreflang: altLocale,
        })),
      }))
    )

    return [...sitemapEntries, ...serviceEntries, ...tariffEntries, ...courseEntries]
  } catch (err) {
    console.error('sitemap: Payload fetch failed, using base routes only', err)
    return sitemapEntries
  }
}
