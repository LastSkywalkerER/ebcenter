import { Locale } from '@/shared/i18n/config'
import { getLocalePath } from '@/shared/lib/localePath'
import { getNavItems } from '@/shared/lib/payload'
import { formatPhoneForTel } from '@/shared/lib/utils'
import { getTranslations } from '@/shared/i18n/utils'
import Link from 'next/link'

const Footer = async ({ locale }: { locale: Locale }) => {
  const [t, navItems] = await Promise.all([getTranslations(locale), getNavItems(locale)])
  const nav = navItems.length > 0 ? navItems : [
    { label: t.common.home, href: getLocalePath(locale, ''), slug: '' },
    { label: t.common.services, href: getLocalePath(locale, '/services'), slug: 'services' },
    { label: t.common.training, href: getLocalePath(locale, '/training'), slug: 'training' },
    { label: t.common.contacts, href: getLocalePath(locale, '/contacts'), slug: 'contacts' },
  ]

  return (
    <footer className='bg-slate-900 text-slate-100'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14'>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
          {/* Company Info */}
          <div>
            <h3 className='text-sm font-semibold uppercase tracking-widest text-slate-400 mb-5'>{t.footer.companyInfo.title}</h3>
            <p className='text-slate-400 mb-4 text-sm'>{t.footer.companyInfo.description}</p>
            <div className='space-y-2 text-slate-400 text-sm'>
              <p>
                {t.common.unp}: {t.common.contactInfo.unp}
              </p>
              <p>{t.common.contactInfo.address}</p>
              <p>{t.common.contactInfo.workingHours}</p>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className='text-sm font-semibold uppercase tracking-widest text-slate-400 mb-5'>{t.footer.quickLinks.title}</h3>
            <ul className='space-y-2'>
              {nav.map((item) => (
                <li key={item.slug || 'home'}>
                  <Link href={item.href} className='text-slate-400 hover:text-white transition-colors text-sm'>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className='text-sm font-semibold uppercase tracking-widest text-slate-400 mb-5'>{t.footer.contactInfo.title}</h3>
            <ul className='space-y-2 text-slate-400 text-sm'>
              {t.common.contactInfo.phone && (
                <li>
                  <Link href={`tel:${formatPhoneForTel(t.common.contactInfo.phone)}`} className='hover:text-white transition-colors'>
                    {t.common.contactInfo.phone}
                  </Link>
                </li>
              )}
              {t.common.contactInfo.email && (
                <li>
                  <Link href={`mailto:${t.common.contactInfo.email}`} className='hover:text-white transition-colors'>
                    {t.common.contactInfo.email}
                  </Link>
                </li>
              )}
              {t.common.contactInfo.address && (
                <li>{t.common.contactInfo.address}</li>
              )}
              {t.common.contactInfo.workingHours && (
                <li>{t.common.contactInfo.workingHours}</li>
              )}
              {t.common.contactInfo.unp && (
                <li>
                  {t.common.unp}: {t.common.contactInfo.unp}
                </li>
              )}
            </ul>
          </div>
        </div>

        <div className='mt-10 pt-8 border-t border-slate-800 text-center text-slate-500 text-sm'>
          <p>
            &copy; {new Date().getFullYear()} {t.footer.companyInfo.title}. {t.footer.copyright}
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
