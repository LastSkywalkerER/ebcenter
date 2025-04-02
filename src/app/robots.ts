import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL
  if (!baseUrl) {
    throw new Error('NEXT_PUBLIC_BASE_URL environment variable is not set')
  }

  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    host: baseUrl,
    sitemap: `${baseUrl}/sitemap.xml`,
  }
}
