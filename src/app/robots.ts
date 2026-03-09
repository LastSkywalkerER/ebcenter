import { env } from '@/shared/config/env'
import { i18n } from '@/shared/i18n/config'
import { getSiteMeta } from '@/shared/lib/payload'
import type { MetadataRoute } from 'next'

export default async function robots(): Promise<MetadataRoute.Robots> {
  const baseUrl = env.BASE_URL
  if (!baseUrl) {
    throw new Error('NEXT_PUBLIC_BASE_URL environment variable is not set')
  }

  const meta = await getSiteMeta(i18n.defaultLocale)

  return {
    rules: {
      userAgent: '*',
      ...(meta.robotsIndex ? { allow: '/' as const } : { disallow: '/' as const }),
    },
    host: baseUrl,
    sitemap: `${baseUrl}/sitemap.xml`,
  }
}
