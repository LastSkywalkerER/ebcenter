import { Locale } from '@/shared/i18n/config'
import { getTranslations } from '@/shared/i18n/utils'
import Link from 'next/link'

const Footer = async ({ locale }: { locale: Locale }) => {
  const t = await getTranslations(locale)

  return (
    <footer className='bg-gray-800 text-white'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12'>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
          {/* Company Info */}
          <div>
            <h3 className='text-xl font-bold mb-4'>{t.footer.companyInfo.title}</h3>
            <p className='text-gray-300 mb-4'>{t.footer.companyInfo.description}</p>
            <div className='space-y-2 text-gray-300'>
              <p>{t.footer.companyInfo.unp}</p>
              <p>{t.footer.companyInfo.address}</p>
              <p>{t.footer.companyInfo.workingHours}</p>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className='text-xl font-bold mb-4'>{t.footer.quickLinks.title}</h3>
            <ul className='space-y-2'>
              <li>
                <Link href={`/${locale}`} className='text-gray-300 hover:text-white'>
                  {t.footer.quickLinks.home}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/services`} className='text-gray-300 hover:text-white'>
                  {t.footer.quickLinks.services}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/training`} className='text-gray-300 hover:text-white'>
                  {t.footer.quickLinks.training}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/contacts`} className='text-gray-300 hover:text-white'>
                  {t.footer.quickLinks.contacts}
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className='text-xl font-bold mb-4'>{t.footer.contactInfo.title}</h3>
            <ul className='space-y-2 text-gray-300'>
              <li>
                <Link href='tel:+375291234567' className='hover:text-white'>
                  {t.footer.contactInfo.phone}
                </Link>
              </li>
              <li>
                <Link href='mailto:info@ebcenter.by' className='hover:text-white'>
                  {t.footer.contactInfo.email}
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
