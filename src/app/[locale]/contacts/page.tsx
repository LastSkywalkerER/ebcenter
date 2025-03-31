import { Locale } from '@/shared/i18n/config'
import { getTranslations } from '@/shared/i18n/utils'

export default async function Contacts({ params }: { params: Promise<{ locale: Locale }> }) {
  const locale = (await params).locale
  const t = await getTranslations(locale)

  return (
    <>
      <main className='flex-grow py-16 bg-gray-50'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <h1 className='text-4xl font-bold text-center mb-12 text-gray-900'>{t.contacts.title}</h1>

          <div className='grid grid-cols-1 lg:grid-cols-2 gap-12'>
            {/* Company Information */}
            <div className='bg-white rounded-lg shadow-lg p-8'>
              <h2 className='text-2xl font-bold mb-6 text-gray-900'>
                {t.contacts.contactInfo.title}
              </h2>
              <div className='space-y-4'>
                <div>
                  <h3 className='font-semibold text-gray-900'>{t.contacts.contactInfo.address}</h3>
                  <p className='text-gray-600'>{t.contacts.contactInfo.addressValue}</p>
                </div>
                <div>
                  <h3 className='font-semibold text-gray-900'>{t.contacts.contactInfo.phone}</h3>
                  <p className='text-gray-600'>{t.contacts.contactInfo.phoneValue}</p>
                </div>
                <div>
                  <h3 className='font-semibold text-gray-900'>{t.contacts.contactInfo.email}</h3>
                  <p className='text-gray-600'>{t.contacts.contactInfo.emailValue}</p>
                </div>
                <div>
                  <h3 className='font-semibold text-gray-900'>{t.contacts.contactInfo.unp}</h3>
                  <p className='text-gray-600'>{t.contacts.contactInfo.unpValue}</p>
                </div>
                <div>
                  <h3 className='font-semibold text-gray-900'>
                    {t.contacts.contactInfo.workingHours}
                  </h3>
                  <p className='text-gray-600'>{t.contacts.contactInfo.workingHoursValue}</p>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className='bg-white rounded-lg shadow-lg p-8'>
              <h2 className='text-2xl font-bold mb-6 text-gray-900'>{t.contacts.form.title}</h2>
              <form className='space-y-6'>
                <div>
                  <label htmlFor='name' className='block text-sm font-medium text-gray-700 mb-1'>
                    {t.contacts.form.name}
                  </label>
                  <input
                    type='text'
                    id='name'
                    name='name'
                    className='w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 h-[40px] flex items-center text-gray-900'
                    required
                  />
                </div>
                <div>
                  <label htmlFor='email' className='block text-sm font-medium text-gray-700 mb-1'>
                    {t.contacts.form.email}
                  </label>
                  <input
                    type='email'
                    id='email'
                    name='email'
                    className='w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 h-[40px] flex items-center text-gray-900'
                    required
                  />
                </div>
                <div>
                  <label htmlFor='phone' className='block text-sm font-medium text-gray-700 mb-1'>
                    {t.contacts.form.phone}
                  </label>
                  <input
                    type='tel'
                    id='phone'
                    name='phone'
                    className='w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 h-[40px] flex items-center text-gray-900'
                    required
                  />
                </div>
                <div>
                  <label htmlFor='message' className='block text-sm font-medium text-gray-700 mb-1'>
                    {t.contacts.form.message}
                  </label>
                  <textarea
                    id='message'
                    name='message'
                    rows={4}
                    className='w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 text-gray-900'
                    required
                  />
                </div>
                <button
                  type='submit'
                  className='w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors h-[40px] flex items-center justify-center'
                >
                  {t.contacts.form.submit}
                </button>
              </form>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}
