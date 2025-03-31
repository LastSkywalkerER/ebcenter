import { Locale } from '@/shared/i18n/config'
import { getTranslations } from '@/shared/i18n/utils'
import Link from 'next/link'

export default async function CourseProgram({
  params,
}: {
  params: Promise<{ locale: Locale; course: string }>
}) {
  const { locale, course } = await params
  const t = await getTranslations(locale)

  const program =
    t.training.courseProgram.programs[course as keyof typeof t.training.courseProgram.programs]

  return (
    <>
      <main className='flex-grow py-16 bg-gray-50'>
        <div className='max-w-4xl mx-auto px-4 sm:px-6 lg:px-8'>
          <Link
            href={`/${locale}/training`}
            className='inline-flex items-center text-blue-600 hover:text-blue-800 mb-8'
          >
            <svg className='w-5 h-5 mr-2' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M15 19l-7-7 7-7'
              />
            </svg>
            {t.training.courseProgram.backToCourses}
          </Link>

          {program ? (
            <>
              <h1 className='text-3xl font-bold text-gray-900 mb-8'>{program.title}</h1>
              <div className='bg-white rounded-lg shadow-lg p-8'>
                <div className='space-y-8'>
                  {program.sections.map(
                    (
                      section: { title: string; content: (string | string[])[] },
                      sectionIndex: number
                    ) => (
                      <div
                        key={sectionIndex}
                        className='border-b border-gray-200 pb-6 last:border-b-0'
                      >
                        <h2 className='text-xl font-semibold text-gray-900 mb-4'>
                          {section.title}
                        </h2>
                        <div className='space-y-4'>
                          {section.content.map((item: string | string[], itemIndex: number) => (
                            <div key={itemIndex}>
                              {Array.isArray(item) ? (
                                <ul className='list-disc list-inside space-y-2 text-gray-700'>
                                  {item.map((subItem: string, subIndex: number) => (
                                    <li key={subIndex}>{subItem}</li>
                                  ))}
                                </ul>
                              ) : (
                                <p className='text-gray-700'>{item}</p>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    )
                  )}
                </div>
              </div>
            </>
          ) : (
            <div className='text-center py-12'>
              <h1 className='text-3xl font-bold text-gray-900 mb-4'>
                {t.training.courseProgram.title}
              </h1>
              <p className='text-gray-600'>{t.training.courseProgram.inDevelopment}</p>
            </div>
          )}
        </div>
      </main>
    </>
  )
}
