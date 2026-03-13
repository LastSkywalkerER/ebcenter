import Footer from '@/features/footer/Footer'
import Header from '@/features/header/Header'
import { ScrollToConsultation } from '@/features/header/ScrollToConsultation'
import { PlausibleProvider } from '@/shared/ui/analytics/PlausibleProvider'
import { LivePreviewRefresh } from '@/shared/ui/LivePreviewRefresh'
import { JsonLd } from '@/shared/ui/seo/JsonLd'
import { env } from '@/shared/config/env'
import { i18n, Locale } from '@/shared/i18n/config'
import { buildAlternates } from '@/shared/lib/alternates'
import { getSiteMeta } from '@/shared/lib/payload'
import { getTranslations } from '@/shared/i18n/utils'
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
  const [meta, t] = await Promise.all([getSiteMeta(locale), getTranslations(locale)])
  const baseUrl = env.BASE_URL || ''
  const alternates = buildAlternates(baseUrl, locale, '')
  const canonical = alternates?.canonical
  const rawOgImage = meta.ogImageUrl ?? meta.heroBackgroundUrl
  const ogImageUrl = rawOgImage?.startsWith('http')
    ? rawOgImage
    : rawOgImage && baseUrl
      ? `${baseUrl}${rawOgImage.startsWith('/') ? '' : '/'}${rawOgImage}`
      : undefined

  const defaultDescription = t?.home?.seo?.metaDescription ?? 'Professional preparation of estimates, acts and contracts. Estimate services and training in Belarus.'
  const description = (meta.metaDescription?.trim() || defaultDescription) as string

  // Do NOT set title here — only pages set title. Layout title causes flash during client navigation.
  return {
    description,
    keywords: meta.metaKeywords ?? undefined,
    openGraph: {
      description: description || undefined,
      type: 'website',
      locale: locale === 'ru' ? 'ru_RU' : 'en_US',
      url: canonical,
      images: ogImageUrl ? [{ url: ogImageUrl, width: 1200, height: 630, alt: 'ProSmety' }] : undefined,
    },
    twitter: {
      card: 'summary_large_image',
      description: description || undefined,
      images: ogImageUrl ? [ogImageUrl] : undefined,
    },
    alternates: alternates ?? undefined,
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
    name: 'ProSmety',
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
        <div className='min-h-screen flex flex-col overflow-x-hidden'>
          <JsonLd data={orgSchema} />
          <PlausibleProvider />
          <LivePreviewRefresh />
          <Header locale={locale as Locale} />
          <ScrollToConsultation />
          <div className='flex-grow'>{children}</div>
          <Footer locale={locale as Locale} />
        </div>
      </body>
    </html>
  )
}
