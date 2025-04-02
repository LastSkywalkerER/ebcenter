import coursesData from '@/shared/constants/courses.json'
import serviceData from '@/shared/constants/services.json'
import { i18n } from '@/shared/i18n/config'
import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL
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

  // Generate service pages
  const serviceEntries = i18n.locales.flatMap((locale) =>
    Object.values(serviceData).map((slug) => ({
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

  // Generate tariff pages
  const tariffEntries = i18n.locales.flatMap((locale) =>
    Object.values(serviceData).map((slug) => ({
      url: `${baseUrl}/${locale}/tariffs/${slug}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.6,
      alternateRefs: i18n.locales.map((altLocale) => ({
        href: `${baseUrl}/${altLocale}/tariffs/${slug}`,
        hreflang: altLocale,
      })),
    }))
  )

  // Generate course pages
  const courseEntries = i18n.locales.flatMap((locale) =>
    Object.values(coursesData).map((course) => ({
      url: `${baseUrl}/${locale}/training/${course.slug}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.7,
      alternateRefs: i18n.locales.map((altLocale) => ({
        href: `${baseUrl}/${altLocale}/training/${course.slug}`,
        hreflang: altLocale,
      })),
    }))
  )

  return [...sitemapEntries, ...serviceEntries, ...tariffEntries, ...courseEntries]
}
