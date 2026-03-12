import { Locale } from '@/shared/i18n/config'
import { getLocalePath } from '@/shared/lib/localePath'
import { getTranslations } from '@/shared/i18n/utils'
import Image from 'next/image'
import Link from 'next/link'

const Footer = async ({ locale }: { locale: Locale }) => {
  const t = await getTranslations(locale)

  const serviceEntries = Object.entries(t.services.items).slice(0, 5)
  const courseEntries = Object.entries(t.training.courses)

  return (
    <footer className='bg-[#0F1E3A] text-white'>
      <div className='max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-10 pt-[60px] pb-7'>
        <div className='grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-9 mb-11'>
          {/* Brand */}
          <div>
            <Link href={getLocalePath(locale, '')} className='flex items-center gap-[9px] mb-2.5'>
              <Image
                src='/images/favicon-ps.png'
                alt=''
                width={26}
                height={26}
                className='text-blue-400'
              />
              <span className='text-[20px] font-extrabold text-white tracking-[-0.4px]'>
                {t.header.logo}
              </span>
            </Link>
            <p className='text-[13px] text-white/65 leading-relaxed max-w-[280px]'>
              {t.footer.companyInfo.description}
            </p>
          </div>

          {/* Navigation groups */}
          <div className='grid grid-cols-2 sm:grid-cols-3 gap-7'>
            {/* Services */}
            <div>
              <h4 className='text-[11px] font-bold uppercase tracking-[0.1em] text-white mb-3.5'>
                {t.common.services}
              </h4>
              <div className='flex flex-col gap-1.5'>
                {serviceEntries.map(([key, service]) => (
                  <Link
                    key={key}
                    href={`${getLocalePath(locale, '/services')}#${service.slug}`}
                    className='text-[13px] text-white/55 hover:text-white transition-colors leading-snug'
                  >
                    {service.title}
                  </Link>
                ))}
                <Link
                  href={getLocalePath(locale, '/services')}
                  className='text-[13px] text-white/55 hover:text-white transition-colors'
                >
                  {t.common.viewAllServices}
                </Link>
              </div>
            </div>

            {/* Training */}
            <div>
              <h4 className='text-[11px] font-bold uppercase tracking-[0.1em] text-white mb-3.5'>
                {t.common.training}
              </h4>
              <div className='flex flex-col gap-1.5'>
                {courseEntries.map(([courseSlug, course]) => (
                  <Link
                    key={courseSlug}
                    href={`${getLocalePath(locale, '/training')}#${courseSlug}`}
                    className='text-[13px] text-white/55 hover:text-white transition-colors leading-snug'
                  >
                    {course.title}
                  </Link>
                ))}
              </div>
            </div>

            {/* Company */}
            <div>
              <h4 className='text-[11px] font-bold uppercase tracking-[0.1em] text-white mb-3.5'>
                {t.footer.companyColumnTitle ?? (locale === 'ru' ? 'Компания' : 'Company')}
              </h4>
              <div className='flex flex-col gap-1.5'>
                <Link href={getLocalePath(locale, '/knowledge')} className='text-[13px] text-white/55 hover:text-white transition-colors'>
                  {t.header.navigation?.knowledge ?? (locale === 'ru' ? 'База знаний' : 'Knowledge Base')}
                </Link>
                <Link href={`${getLocalePath(locale, '')}#pricing`} className='text-[13px] text-white/55 hover:text-white transition-colors'>
                  {t.common.tariffs}
                </Link>
                <Link href={`${getLocalePath(locale, '')}#about`} className='text-[13px] text-white/55 hover:text-white transition-colors'>
                  {t.footer.aboutSpecialist ?? (locale === 'ru' ? 'О специалисте' : 'About the Specialist')}
                </Link>
                <Link href={`${getLocalePath(locale, '')}#contacts`} className='text-[13px] text-white/55 hover:text-white transition-colors'>
                  {t.common.contacts}
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className='pt-7 border-t border-white/[0.08] flex flex-col sm:flex-row justify-between gap-1.5 text-[12px] text-white/50'>
          <p>© {new Date().getFullYear()} {t.header.logo}. {t.footer.copyright}</p>
          <p>{t.common.contactInfo.address}</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
