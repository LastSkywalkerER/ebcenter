import LanguageSwitcher from '@/features/LanguageSwitcher/LanguageSwitcher'
import { MobileMenu } from '@/features/header/MobileMenu'
import { Locale } from '@/shared/i18n/config'
import { getLocalePath } from '@/shared/lib/localePath'
import { getNavItems, getHeaderLogoUrl } from '@/shared/lib/payload'
import { formatPhoneForTel } from '@/shared/lib/utils'
import { getTranslations } from '@/shared/i18n/utils'
import Image from 'next/image'
import Link from 'next/link'

const Header = async ({ locale }: { locale: Locale }) => {
  const [t, logoUrl, navItems] = await Promise.all([
    getTranslations(locale),
    getHeaderLogoUrl(locale),
    getNavItems(locale),
  ])
  const logoSrc = logoUrl || '/images/favicon-ps.png'
  const nav = navItems.length > 0 ? navItems : [
    { label: t.common.home, href: getLocalePath(locale, ''), slug: '' },
    { label: t.common.services, href: getLocalePath(locale, '/services'), slug: 'services' },
    { label: t.common.training, href: getLocalePath(locale, '/training'), slug: 'training' },
    { label: t.common.contacts, href: getLocalePath(locale, '/contacts'), slug: 'contacts' },
  ]

  return (
    <header className='bg-white shadow-md'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='flex justify-between items-center h-16'>
          <div className='flex-shrink-0 flex items-center'>
            <Image src={logoSrc} alt={t.header.logo} width={32} height={32} className='mr-2' />
            <Link href={getLocalePath(locale, '')} className='text-2xl font-bold text-gray-800'>
              {t.header.logo}
            </Link>
          </div>

          <nav className='hidden md:flex space-x-8'>
            {nav.map((item) => (
              <Link key={item.slug || 'home'} href={item.href} className='text-gray-600 hover:text-gray-900'>
                {item.label}
              </Link>
            ))}
          </nav>

          <div className='hidden md:flex items-center space-x-4 shrink-0'>
            {t.common.contactInfo.phone && (
              <Link
                href={`tel:${formatPhoneForTel(t.common.contactInfo.phone)}`}
                className='text-gray-600 hover:text-gray-900 whitespace-nowrap'
              >
                {t.common.contactInfo.phone}
              </Link>
            )}
            {t.common.contactInfo.email && (
              <Link
                href={`mailto:${t.common.contactInfo.email}`}
                className='text-gray-600 hover:text-gray-900 whitespace-nowrap'
              >
                {t.common.contactInfo.email}
              </Link>
            )}
          </div>

          <LanguageSwitcher locale={locale} />

          <MobileMenu locale={locale} translations={t} navItems={nav} />
        </div>
      </div>
    </header>
  )
}

export default Header
