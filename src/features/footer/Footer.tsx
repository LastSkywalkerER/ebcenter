import { Locale } from '@/shared/i18n/config'
import { getNavItems } from '@/shared/lib/payload'
import { getTranslations } from '@/shared/i18n/utils'
import Link from 'next/link'

const Footer = async ({ locale }: { locale: Locale }) => {
  const [t, navItems] = await Promise.all([getTranslations(locale), getNavItems(locale)])
  const nav = navItems.length > 0 ? navItems : [
    { label: t.common.home, href: `/${locale}`, slug: '' },
    { label: t.common.services, href: `/${locale}/services`, slug: 'services' },
    { label: t.common.training, href: `/${locale}/training`, slug: 'training' },
    { label: t.common.contacts, href: `/${locale}/contacts`, slug: 'contacts' },
  ]

  return (
    <footer className='bg-gray-800 text-white'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12'>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
          {/* Company Info */}
          <div>
            <h3 className='text-xl font-bold mb-4'>{t.footer.companyInfo.title}</h3>
            <p className='text-gray-300 mb-4'>{t.footer.companyInfo.description}</p>
            <div className='space-y-2 text-gray-300'>
              <p>
                {t.common.unp}: {t.common.contactInfo.unp}
              </p>
              <p>{t.common.contactInfo.address}</p>
              <p>{t.common.contactInfo.workingHours}</p>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className='text-xl font-bold mb-4'>{t.footer.quickLinks.title}</h3>
            <ul className='space-y-2'>
              {nav.map((item) => (
                <li key={item.slug || 'home'}>
                  <Link href={item.href} className='text-gray-300 hover:text-white'>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className='text-xl font-bold mb-4'>{t.footer.contactInfo.title}</h3>
            <ul className='space-y-2 text-gray-300'>
              <li>
                <Link href='tel:+375291234567' className='hover:text-white'>
                  {t.common.contactInfo.phone}
                </Link>
              </li>
              <li>
                <Link href='mailto:info@ebcenter.by' className='hover:text-white'>
                  {t.common.contactInfo.email}
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className='mt-8 pt-8 border-t border-gray-700 text-center text-gray-300'>
          <p>
            &copy; {new Date().getFullYear()} {t.footer.companyInfo.title}. {t.footer.copyright}
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
