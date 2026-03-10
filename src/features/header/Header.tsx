import LanguageSwitcher from '@/features/LanguageSwitcher/LanguageSwitcher'
import { MobileMenu } from '@/features/header/MobileMenu'
import { OrderCallLink } from '@/features/header/OrderCallLink'
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
    <header className='bg-white/95 backdrop-blur-sm border-b border-slate-200 sticky top-0 z-40'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='flex justify-between items-center h-[68px]'>
          <div className='flex-shrink-0 flex items-center'>
            <Image src={logoSrc} alt={t.header.logo} width={32} height={32} className='mr-2' />
            <Link href={getLocalePath(locale, '')} className='text-xl font-bold text-slate-900 tracking-tight'>
              {t.header.logo}
            </Link>
          </div>

          <nav className='hidden md:flex items-center space-x-1'>
            {nav.map((item) => (
              <Link key={item.slug || 'home'} href={item.href} className='px-3 py-2 text-sm font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-50 rounded-md transition-colors'>
                {item.label}
              </Link>
            ))}
          </nav>

          <div className='hidden md:flex items-center gap-4 shrink-0'>
            <OrderCallLink
              href={`${getLocalePath(locale, '')}#consultation`}
              className='inline-flex items-center justify-center min-w-[140px] bg-blue-600 text-white px-5 py-2.5 rounded-lg hover:bg-blue-700 active:bg-blue-800 transition-colors text-sm font-semibold whitespace-nowrap'
            >
              {t.common.orderCall}
            </OrderCallLink>
            <div className='flex flex-col items-end text-right'>
              {t.common.contactInfo.phone && (
                <Link
                  href={`tel:${formatPhoneForTel(t.common.contactInfo.phone)}`}
                  className='text-sm text-slate-500 hover:text-blue-600 whitespace-nowrap transition-colors'
                >
                  {t.common.contactInfo.phone}
                </Link>
              )}
              {t.common.contactInfo.email && (
                <Link
                  href={`mailto:${t.common.contactInfo.email}`}
                  className='text-sm text-slate-500 hover:text-blue-600 whitespace-nowrap transition-colors'
                >
                  {t.common.contactInfo.email}
                </Link>
              )}
            </div>
          </div>

          {process.env.NODE_ENV !== 'production' && <LanguageSwitcher locale={locale} />}

          <MobileMenu locale={locale} translations={t} navItems={nav} />
        </div>
      </div>
    </header>
  )
}

export default Header
