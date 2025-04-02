import { ContactForm } from '@/features/ContactForm'
import coursesData from '@/shared/constants/courses.json'
import { Locale } from '@/shared/i18n/config'
import { getTranslations } from '@/shared/i18n/utils'
import Link from 'next/link'

const courses = [
  {
    programSlug: coursesData['express-course'].slug,
    icon: (
      <svg
        className='w-12 h-12 text-blue-600'
        fill='none'
        stroke='currentColor'
        viewBox='0 0 24 24'
      >
        <path
          strokeLinecap='round'
          strokeLinejoin='round'
          strokeWidth={2}
          d='M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253'
        />
      </svg>
    ),
  },
  {
    programSlug: coursesData['contract-price'].slug,
    icon: (
      <svg
        className='w-12 h-12 text-blue-600'
        fill='none'
        stroke='currentColor'
        viewBox='0 0 24 24'
      >
        <path
          strokeLinecap='round'
          strokeLinejoin='round'
          strokeWidth={2}
          d='M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
        />
      </svg>
    ),
  },
  {
    programSlug: coursesData['individual'].slug,
    icon: (
      <svg
        className='w-12 h-12 text-blue-600'
        fill='none'
        stroke='currentColor'
        viewBox='0 0 24 24'
      >
        <path
          strokeLinecap='round'
          strokeLinejoin='round'
          strokeWidth={2}
          d='M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z'
        />
      </svg>
    ),
  },
]

export default async function Training({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params
  const t = await getTranslations(locale)

  return (
    <>
      <main className='flex-grow py-16 bg-white'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='text-center mb-12'>
            <h1 className='text-3xl font-bold text-gray-900 mb-4'>{t.training.title}</h1>
            <p className='text-xl text-gray-600 max-w-2xl mx-auto'>{t.training.subtitle}</p>
          </div>

          <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
            {courses.map((course, index) => {
              const courseData =
                t.training.courses[course.programSlug as keyof typeof t.training.courses]
              return (
                <div key={index} className='bg-white rounded-lg shadow-lg p-6 flex flex-col'>
                  <div className='flex-grow'>
                    <div className='text-center mb-6'>
                      <div className='inline-block p-3 bg-blue-50 rounded-full mb-4'>
                        {course.icon}
                      </div>
                      <h2 className='text-xl font-semibold text-gray-900 mb-2'>
                        {courseData.title}
                      </h2>
                      <div className='flex justify-center space-x-4 text-sm text-gray-500 mb-4'>
                        <span>{courseData.duration}</span>
                        <span>•</span>
                        <span>{courseData.price}</span>
                      </div>
                      <div className='text-left'>
                        <h3 className='font-semibold text-gray-900 mb-2'>
                          {t.training.courseDetails}
                        </h3>
                        <ul className='space-y-2 text-gray-600'>
                          {courseData.topics.map((topic, idx) => (
                            <li key={idx} className='flex items-start'>
                              <svg
                                className='w-5 h-5 text-blue-600 mr-2 mt-0.5'
                                fill='none'
                                stroke='currentColor'
                                viewBox='0 0 24 24'
                              >
                                <path
                                  strokeLinecap='round'
                                  strokeLinejoin='round'
                                  strokeWidth={2}
                                  d='M5 13l4 4L19 7'
                                />
                              </svg>
                              {topic}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className='space-y-3 mt-auto'>
                    <Link
                      href={`/${locale}/training/${course.programSlug}`}
                      className='block w-full bg-gray-100 text-gray-900 py-3 px-6 rounded-lg hover:bg-gray-200 transition-colors text-center'
                    >
                      {t.common.courseProgram}
                    </Link>
                    <Link
                      href='#registration'
                      className='block w-full bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors text-center'
                    >
                      {t.common.register}
                    </Link>
                  </div>
                </div>
              )
            })}
          </div>

          <div id='registration' className='mt-16'>
            <ContactForm
              title={t.training.registration.title}
              name={t.training.registration.form.name}
              email={t.training.registration.form.email}
              phone={t.training.registration.form.phone}
              message={t.training.registration.form.message}
              submit={t.common.sendRequest}
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
