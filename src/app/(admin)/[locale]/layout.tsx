import { i18n, Locale } from '@/shared/i18n/config'
import { notFound } from 'next/navigation'
import { ReactNode } from 'react'

export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({ locale }))
}

export default async function AdminLocaleLayout({
  children,
  params,
}: {
  children: ReactNode
  params: Promise<{ locale: Locale }>
}) {
  const locale = (await params).locale

  // Validate that the incoming `locale` parameter is valid
  if (!i18n.locales.includes(locale as Locale)) notFound()

  // Возвращаем только children без хэдера и футера
  return <>{children}</>
}
