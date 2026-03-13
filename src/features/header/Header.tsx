import LanguageSwitcher from '@/features/LanguageSwitcher/LanguageSwitcher'
import { MobileMenu } from '@/features/header/MobileMenu'
import { OrderCallLink } from '@/features/header/OrderCallLink'
import { Locale } from '@/shared/i18n/config'
import { getLocalePath } from '@/shared/lib/localePath'
import { getTranslations } from '@/shared/i18n/utils'
import Image from 'next/image'
import Link from 'next/link'

const EXAMPLE_NAV = [
  { slug: 'home', labelKey: 'home' as const },
  { slug: 'services', labelKey: 'services' as const },
  { slug: 'pricing', labelKey: 'tariffs' as const, anchor: '#pricing' },
  { slug: 'training', labelKey: 'training' as const },
  { slug: 'knowledge', labelKey: 'knowledge' as const },
  { slug: 'about', labelKey: 'about' as const, anchor: '#about' },
  { slug: 'contacts', labelKey: 'contacts' as const, anchor: '#contacts' },
] as const

const Header = async ({ locale }: { locale: Locale }) => {
  const t = await getTranslations(locale)
  const homePath = getLocalePath(locale, '')
  const navLabels: Record<string, string> = {
    home: t.common.home,
    services: t.common.services,
    tariffs: t.header.navigation?.tariffs ?? (locale === 'ru' ? 'Тарифы' : 'Tariffs'),
    training: t.common.training,
    knowledge: t.header.navigation?.knowledge ?? (locale === 'ru' ? 'База знаний' : 'Knowledge Base'),
    about: t.header.navigation?.about ?? (locale === 'ru' ? 'О нас' : 'About'),
    contacts: t.common.contacts,
  }
  const nav = EXAMPLE_NAV.map((item) => {
    const label = navLabels[item.labelKey] ?? item.slug
    const anchor = 'anchor' in item ? item.anchor : undefined
    const href = anchor
      ? `${homePath}${anchor}`
      : item.slug === 'home'
        ? homePath
        : item.slug === 'services'
          ? getLocalePath(locale, '/services')
          : item.slug === 'training'
            ? getLocalePath(locale, '/training')
            : item.slug === 'contacts'
              ? getLocalePath(locale, '/contacts')
              : item.slug === 'knowledge'
                ? getLocalePath(locale, '/knowledge')
                : `${homePath}${anchor ?? ''}`
    return { label, href, slug: item.slug }
  })

  return (
    <header className='bg-white border-b border-slate-200 sticky top-0 z-[100]'>
      <div className='max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-10'>
        <div className='flex items-center gap-7 h-[68px]'>
          <Link href={homePath} className='flex items-center gap-[9px] shrink-0'>
            <Image
              src='/images/favicon-ps.png'
              alt={t.header.logo}
              width={28}
              height={28}
              className='text-blue-600'
            />
            <span className='text-[20px] font-extrabold text-[#1A2E52] tracking-[-0.4px]'>
              {t.header.logo}
            </span>
          </Link>

          <nav className='hidden lg:flex items-center gap-0.5 flex-1'>
            {nav.map((item) => (
              <Link
                key={item.slug || 'home'}
                href={item.href}
                className='px-[11px] py-1.5 text-[14px] font-medium text-slate-500 hover:text-slate-900 hover:bg-slate-50 rounded-lg transition-colors whitespace-nowrap'
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className='hidden lg:flex items-center shrink-0 ml-auto'>
            <OrderCallLink
              href={`${homePath}#contacts`}
              className='inline-flex items-center justify-center bg-blue-600 text-white px-5 py-2.5 rounded-lg hover:bg-blue-700 active:bg-blue-800 transition-colors text-sm font-semibold whitespace-nowrap border-2 border-blue-600'
            >
              {t.common.getConsultation ?? 'Получить консультацию'}
            </OrderCallLink>
          </div>

          {process.env.NODE_ENV !== 'production' && <LanguageSwitcher locale={locale} />}

          <MobileMenu locale={locale} translations={t} navItems={nav} />
        </div>
      </div>
    </header>
  )
}

export default Header
