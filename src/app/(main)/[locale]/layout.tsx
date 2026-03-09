import Footer from '@/features/footer/Footer'
import Header from '@/features/header/Header'
import { LivePreviewRefresh } from '@/shared/ui/LivePreviewRefresh'
import { JsonLd } from '@/shared/ui/seo/JsonLd'
import { env } from '@/shared/config/env'
import { i18n, Locale } from '@/shared/i18n/config'
import { getLocalePath } from '@/shared/lib/localePath'
import { getSiteMeta } from '@/shared/lib/payload'
import { Analytics } from '@vercel/analytics/next'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { notFound } from 'next/navigation'
import { ReactNode } from 'react'
import '../../globals.css'

const inter = Inter({ subsets: ['latin', 'cyrillic'] })

export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({ locale }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>
}): Promise<Metadata> {
  const locale = (await params).locale
  const meta = await getSiteMeta(locale)
  const baseUrl = env.BASE_URL || ''
  const canonicalPath = getLocalePath(locale, '')
  const canonical = baseUrl ? `${baseUrl}${canonicalPath === '/' ? '' : canonicalPath}` : undefined
  const rawOgImage = meta.ogImageUrl ?? meta.heroBackgroundUrl
  const ogImageUrl = rawOgImage?.startsWith('http')
    ? rawOgImage
    : rawOgImage && baseUrl
      ? `${baseUrl}${rawOgImage.startsWith('/') ? '' : '/'}${rawOgImage}`
      : undefined
  const alternates =
    baseUrl && i18n.locales.length > 1
      ? {
          canonical,
          languages: Object.fromEntries(
            i18n.locales.map((loc) => {
              const path = getLocalePath(loc, '')
              return [loc, `${baseUrl}${path === '/' ? '' : path}`]
            })
          ) as Record<string, string>,
        }
      : canonical
        ? { canonical }
        : undefined

  return {
    title: meta.metaTitle ?? 'EBCenter - Сметные работы и обучение',
    description: meta.metaDescription ?? 'Услуги по составлению смет, Сметные работы и обучение сметному делу',
    keywords: meta.metaKeywords ?? undefined,
    openGraph: {
      title: meta.metaTitle ?? undefined,
      description: meta.metaDescription ?? undefined,
      type: 'website',
      locale: locale === 'ru' ? 'ru_RU' : 'en_US',
      url: canonical,
      images: ogImageUrl ? [{ url: ogImageUrl, width: 1200, height: 630, alt: meta.metaTitle ?? 'EBCenter' }] : undefined,
    },
    twitter: {
      card: 'summary_large_image',
      title: meta.metaTitle ?? 'EBCenter - Сметные работы и обучение',
      description: meta.metaDescription ?? undefined,
      images: ogImageUrl ? [ogImageUrl] : undefined,
    },
    alternates,
  }
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode
  params: Promise<{ locale: Locale }>
}) {
  const locale = (await params).locale

  // Validate that the incoming `locale` parameter is valid
  if (!i18n.locales.includes(locale as Locale)) notFound()

  const meta = await getSiteMeta(locale)
  const baseUrl = env.BASE_URL || ''

  const orgSchema = {
    '@context': 'https://schema.org',
    '@type': ['Organization', 'LocalBusiness'],
    name: 'EBCenter',
    url: baseUrl || undefined,
    ...(meta.contactPhone && { telephone: meta.contactPhone }),
    ...(meta.contactEmail && { email: meta.contactEmail }),
    ...(meta.contactAddress && {
      address: {
        '@type': 'PostalAddress',
        streetAddress: meta.contactAddress,
        addressCountry: 'BY',
      },
    }),
  }

  return (
    <html lang={locale}>
      <body className={inter.className}>
        <div className='min-h-screen flex flex-col'>
          <JsonLd data={orgSchema} />
          <LivePreviewRefresh />
          <Header locale={locale as Locale} />
          <main>{children}</main>
          <Footer locale={locale as Locale} />
          <Analytics />
        </div>
      </body>
    </html>
  )
}
