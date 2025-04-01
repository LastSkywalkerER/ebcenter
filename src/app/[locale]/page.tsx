import { ContactForm } from '@/features/ContactForm'
import { Hero } from '@/features/Hero/Hero'
import { Locale } from '@/shared/i18n/config'
import { getTranslations } from '@/shared/i18n/utils'
import Link from 'next/link'

const serviceIcons = {
  estimateService: (
    <svg className='w-12 h-12 text-blue-600' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
      <path
        strokeLinecap='round'
        strokeLinejoin='round'
        strokeWidth={2}
        d='M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z'
      />
    </svg>
  ),
  currentRepair: (
    <svg className='w-12 h-12 text-blue-600' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
      <path
        strokeLinecap='round'
        strokeLinejoin='round'
        strokeWidth={2}
        d='M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z'
      />
    </svg>
  ),
  estimateDocs: (
    <svg className='w-12 h-12 text-blue-600' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
      <path
        strokeLinecap='round'
        strokeLinejoin='round'
        strokeWidth={2}
        d='M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4'
      />
    </svg>
  ),
}

export default async function HomeAlt({ params }: { params: Promise<{ locale: Locale }> }) {
  const locale = (await params).locale
  const t = await getTranslations(locale)

  return (
    <>
      <main className='flex-grow'>
        <Hero
          title={t.home.hero.title}
          subtitle={t.home.hero.subtitle}
          cta={t.home.hero.cta}
          training={t.common.training}
          locale={locale}
        />

        {/* Description Section with Cards */}
        <section className='py-24 bg-white'>
          <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
            <div className='text-center mb-16'>
              <h2 className='text-4xl font-bold text-gray-900 mb-6'>{t.home.description.title}</h2>
              <p className='text-xl text-gray-600 max-w-3xl mx-auto'>{t.home.description.text}</p>
            </div>
            <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
              {Object.entries(t.services.items)
                .slice(0, 3)
                .map(([key, service]) => (
                  <div
                    key={key}
                    className='group bg-white rounded-2xl shadow-xl p-8 hover:shadow-2xl transition-all duration-300 border border-gray-100 flex flex-col h-full'
                  >
                    <div className='flex-grow'>
                      <div className='flex items-center gap-4 mb-6'>
                        <div className='p-3 bg-blue-50 rounded-xl group-hover:bg-blue-100 transition-colors'>
                          {serviceIcons[key as keyof typeof serviceIcons]}
                        </div>
                        <h3 className='text-xl font-semibold text-gray-900 group-hover:text-blue-600 transition-colors'>
                          {service.title}
                        </h3>
                      </div>
                      <p className='text-gray-600 mb-6'>{service.description}</p>
                    </div>
                    <div className='space-y-3 mt-auto'>
                      {key in t.services.tariffs && (
                        <Link
                          href={`/${locale}/services/${service.slug}/tariffs`}
                          className='block w-full bg-gray-50 text-gray-900 py-3 px-6 rounded-lg hover:bg-gray-100 transition-colors text-center font-medium'
                        >
                          {t.common.tariffs}
                        </Link>
                      )}
                      <Link
                        href={`/${locale}/services/${service.slug}`}
                        className='block w-full bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors text-center font-medium'
                      >
                        {t.common.more}
                      </Link>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className='py-24 bg-gray-50'>
          <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
            <div className='grid grid-cols-1 lg:grid-cols-2 gap-12 items-center'>
              <div>
                <h2 className='text-2xl font-bold text-gray-900 mb-6'>{t.contacts.title}</h2>
                <div className='space-y-6'>
                  <div className='flex items-start gap-4'>
                    <div className='p-3 bg-blue-50 rounded-lg'>
                      <svg
                        className='w-6 h-6 text-blue-600'
                        fill='none'
                        stroke='currentColor'
                        viewBox='0 0 24 24'
                      >
                        <path
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          strokeWidth={2}
                          d='M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z'
                        />
                        <path
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          strokeWidth={2}
                          d='M15 11a3 3 0 11-6 0 3 3 0 016 0z'
                        />
                      </svg>
                    </div>
                    <div>
                      <h3 className='font-semibold text-gray-900 mb-1'>
                        {t.contacts.contactInfo.address}
                      </h3>
                      <p className='text-gray-600'>{t.contacts.contactInfo.addressValue}</p>
                    </div>
                  </div>
                  <div className='flex items-start gap-4'>
                    <div className='p-3 bg-blue-50 rounded-lg'>
                      <svg
                        className='w-6 h-6 text-blue-600'
                        fill='none'
                        stroke='currentColor'
                        viewBox='0 0 24 24'
                      >
                        <path
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          strokeWidth={2}
                          d='M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z'
                        />
                      </svg>
                    </div>
                    <div>
                      <h3 className='font-semibold text-gray-900 mb-1'>
                        {t.contacts.contactInfo.phone}
                      </h3>
                      <p className='text-gray-600'>{t.contacts.contactInfo.phoneValue}</p>
                    </div>
                  </div>
                  <div className='flex items-start gap-4'>
                    <div className='p-3 bg-blue-50 rounded-lg'>
                      <svg
                        className='w-6 h-6 text-blue-600'
                        fill='none'
                        stroke='currentColor'
                        viewBox='0 0 24 24'
                      >
                        <path
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          strokeWidth={2}
                          d='M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z'
                        />
                      </svg>
                    </div>
                    <div>
                      <h3 className='font-semibold text-gray-900 mb-1'>
                        {t.contacts.contactInfo.email}
                      </h3>
                      <p className='text-gray-600'>{t.contacts.contactInfo.emailValue}</p>
                    </div>
                  </div>
                  <div className='flex items-start gap-4'>
                    <div className='p-3 bg-blue-50 rounded-lg'>
                      <svg
                        className='w-6 h-6 text-blue-600'
                        fill='none'
                        stroke='currentColor'
                        viewBox='0 0 24 24'
                      >
                        <path
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          strokeWidth={2}
                          d='M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z'
                        />
                      </svg>
                    </div>
                    <div>
                      <h3 className='font-semibold text-gray-900 mb-1'>
                        {t.contacts.contactInfo.unp}
                      </h3>
                      <p className='text-gray-600'>{t.contacts.contactInfo.unpValue}</p>
                    </div>
                  </div>
                  <div className='flex items-start gap-4'>
                    <div className='p-3 bg-blue-50 rounded-lg'>
                      <svg
                        className='w-6 h-6 text-blue-600'
                        fill='none'
                        stroke='currentColor'
                        viewBox='0 0 24 24'
                      >
                        <path
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          strokeWidth={2}
                          d='M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z'
                        />
                      </svg>
                    </div>
                    <div>
                      <h3 className='font-semibold text-gray-900 mb-1'>
                        {t.contacts.contactInfo.workingHours}
                      </h3>
                      <p className='text-gray-600'>{t.contacts.contactInfo.workingHoursValue}</p>
                    </div>
                  </div>
                </div>
              </div>

              <ContactForm
                title={t.contacts.form.title}
                name={t.contacts.form.name}
                email={t.contacts.form.email}
                phone={t.contacts.form.phone}
                message={t.contacts.form.message}
                submit={t.contacts.form.submit}
                phonePlaceholder={t.contacts.form.phonePlaceholder}
                phoneError={t.contacts.form.phoneError}
                success={t.contacts.form.success}
                error={t.contacts.form.error}
                sending={t.contacts.form.sending}
                securityCheck={t.contacts.form.securityCheck}
                securityError={t.contacts.form.securityError}
                validation={{
                  nameRequired: t.contacts.form.validation.nameRequired,
                  messageRequired: t.contacts.form.validation.messageRequired,
                  emailInvalid: t.contacts.form.validation.emailInvalid,
                }}
              />
            </div>
          </div>
        </section>
      </main>
    </>
  )
}
