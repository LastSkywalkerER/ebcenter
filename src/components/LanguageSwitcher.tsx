import { i18n, Locale } from '@/i18n/config'
import Link from 'next/link'

export default function LanguageSwitcher({ locale }: { locale: Locale }) {
  const switchLocale = (newLocale: Locale) => {
    return `/${newLocale}`
  }

  return (
    <div className="flex gap-2">
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