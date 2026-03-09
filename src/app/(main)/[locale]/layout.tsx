import Footer from '@/features/footer/Footer'
import Header from '@/features/header/Header'
import { LivePreviewRefresh } from '@/shared/ui/LivePreviewRefresh'
import { env } from '@/shared/config/env'
import { i18n, Locale } from '@/shared/i18n/config'
import { getLocalePath } from '@/shared/lib/localePath'
import { getSiteMeta } from '@/shared/lib/payload'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { ReactNode } from 'react'

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
  const ogImageUrl = meta.ogImageUrl?.startsWith('http')
    ? meta.ogImageUrl
    : meta.ogImageUrl && baseUrl
      ? `${baseUrl}${meta.ogImageUrl.startsWith('/') ? '' : '/'}${meta.ogImageUrl}`
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
      images: ogImageUrl ? [{ url: ogImageUrl, width: 192, height: 192, alt: meta.metaTitle ?? 'EBCenter' }] : undefined,
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

  return (
    <>
      <LivePreviewRefresh />
      <Header locale={locale as Locale} />
      <main>{children}</main>
      <Footer locale={locale as Locale} />
    </>
  )
}
