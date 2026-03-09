'use client'
import { i18n, Locale } from '@/shared/i18n/config'
import { getLocalePath } from '@/shared/lib/localePath'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function LanguageSwitcher({ locale }: { locale: Locale }) {
  const pathname = usePathname()
  // Path without locale: for default locale pathname is / or /services; for others /en or /en/services
  const currentPath =
    pathname.startsWith(`/${locale}/`)
      ? pathname.slice(locale.length + 2)
      : pathname === `/${locale}`
        ? ''
        : pathname === '/'
          ? ''
          : pathname

  const switchLocale = (newLocale: Locale) => getLocalePath(newLocale, currentPath)

  return (
    <div className='flex gap-2'>
      {i18n.locales.map((newLocale) => (
        <Link
          key={newLocale}
          href={switchLocale(newLocale)}
          className={`px-3 py-1 rounded-md text-sm font-medium ${
            locale === newLocale
              ? 'bg-blue-600 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          {newLocale.toUpperCase()}
        </Link>
      ))}
    </div>
  )
}
