import LanguageSwitcher from '@/features/LanguageSwitcher/LanguageSwitcher'
import { Locale } from '@/shared/i18n/config'
import { getTranslations } from '@/shared/i18n/utils'
import Image from 'next/image'
import Link from 'next/link'

const Header = async ({ locale }: { locale: Locale }) => {
  const t = await getTranslations(locale)

  return (
    <header className='bg-white shadow-md'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='flex justify-between items-center h-16'>
          <div className='flex-shrink-0 flex items-center'>
            <Image
              src='/web-app-manifest-512x512.png'
              alt={t.header.logo}
              width={32}
              height={32}
              className='mr-2'
            />
            <Link href={`/${locale}`} className='text-2xl font-bold text-gray-800'>
              {t.header.logo}
            </Link>
          </div>

          <nav className='hidden md:flex space-x-8'>
            <Link href={`/${locale}`} className='text-gray-600 hover:text-gray-900'>
              {t.common.home}
            </Link>
            <Link href={`/${locale}/services`} className='text-gray-600 hover:text-gray-900'>
              {t.common.services}
            </Link>
            <Link href={`/${locale}/training`} className='text-gray-600 hover:text-gray-900'>
              {t.common.training}
            </Link>
            <Link href={`/${locale}/contacts`} className='text-gray-600 hover:text-gray-900'>
              {t.common.contacts}
            </Link>
          </nav>

          <div className='hidden md:flex items-center space-x-4'>
            <Link href='tel:+375291234567' className='text-gray-600 hover:text-gray-900'>
              {t.common.contactInfo.phone}
            </Link>
            <Link href='mailto:info@ebcenter.by' className='text-gray-600 hover:text-gray-900'>
              {t.common.contactInfo.email}
            </Link>
          </div>

          <LanguageSwitcher locale={locale} />

          {/* Mobile menu button */}
          <div className='md:hidden'>
            <button type='button' className='text-gray-600 hover:text-gray-900'>
              <svg className='h-6 w-6' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M4 6h16M4 12h16M4 18h16'
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
