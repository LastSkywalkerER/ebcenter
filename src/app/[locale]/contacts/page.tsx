import { ContactForm } from '@/features/ContactForm'
import { Locale } from '@/shared/i18n/config'
import { getTranslations } from '@/shared/i18n/utils'

export default async function ContactsPage({ params }: { params: { locale: Locale } }) {
  const t = await getTranslations(params.locale)

  return (
    <>
      <main className='flex-grow py-16 bg-gray-50'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <h1 className='text-4xl font-bold text-center mb-12 text-gray-900'>{t.contacts.title}</h1>

          <div className='grid grid-cols-1 lg:grid-cols-2 gap-12'>
            {/* Contact Information */}
            <div className='bg-white rounded-lg shadow-lg p-8'>
              <h2 className='text-2xl font-bold text-gray-900 mb-6'>
                {t.contacts.contactInfo.title}
              </h2>
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

            {/* Contact Form */}
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
      </main>
    </>
  )
}
