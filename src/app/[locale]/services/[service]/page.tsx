import { Locale } from '@/shared/i18n/config'
import { getTranslations } from '@/shared/i18n/utils'
import Link from 'next/link'

export default async function ServiceDetails({
  params,
}: {
  params: Promise<{ locale: Locale; service: string }>
}) {
  const { locale, service } = await params
  const t = await getTranslations(locale)

  const serviceKey = Object.entries(t.services.items).find(
    ([, value]) => value.slug === service
  )?.[0]

  const serviceDetails = serviceKey
    ? t.services.details[serviceKey as keyof typeof t.services.details]
    : null

  return (
    <>
      <main className='flex-grow py-16 bg-white'>
        <div className='max-w-4xl mx-auto px-4 sm:px-6 lg:px-8'>
          <Link
            href={`/${locale}/services`}
            className='inline-flex items-center text-gray-600 hover:text-gray-900 mb-8'
          >
            <svg className='w-5 h-5 mr-2' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M15 19l-7-7 7-7'
              />
            </svg>
            {t.services.backToServices}
          </Link>

          {serviceDetails ? (
            <>
              <div className='mb-12'>
                <h1 className='text-2xl font-semibold text-gray-900 mb-2'>
                  {serviceDetails.title}
                </h1>
                <p className='text-gray-600 text-sm'>{serviceDetails.description}</p>
              </div>

              <div className='space-y-4'>
                {serviceDetails.content.map((item: string, index: number) => (
                  <div key={index} className='flex items-start'>
                    <svg
                      className='w-5 h-5 text-gray-400 mr-3 mt-0.5 flex-shrink-0'
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
                    <p className='text-gray-600'>{item}</p>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <div className='text-center py-12'>
              <h1 className='text-2xl font-semibold text-gray-900 mb-2'>
                {t.services.notFound.title}
              </h1>
              <p className='text-sm text-gray-600'>{t.services.notFound.description}</p>
            </div>
          )}
        </div>
      </main>
    </>
  )
}
