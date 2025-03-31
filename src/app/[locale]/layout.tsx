import Disclaimer from '@/features/Disclaimer/Disclaimer'
import Header from '@/features/header/Header'
import { i18n, Locale } from '@/shared/i18n/config'
import { Inter } from 'next/font/google'
import { notFound } from 'next/navigation'
import { ReactNode } from 'react'
import '../globals.css'

const inter = Inter({ subsets: ['latin'] })

export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({ locale }))
}

export default async function RootLayout({
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
    <html lang={locale}>
      <body className={inter.className}>
        <Disclaimer locale={locale as Locale} />
        <Header locale={locale as Locale} />
        <main>{children}</main>
      </body>
    </html>
  )
}
