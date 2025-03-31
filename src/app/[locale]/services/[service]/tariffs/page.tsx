import { Locale } from '@/shared/i18n/config'
import { getTranslations } from '@/shared/i18n/utils'
import Link from 'next/link'

export default async function ServiceTariffs({
  params,
}: {
  params: Promise<{ locale: Locale; service: string }>
}) {
  const { locale, service } = await params
  const t = await getTranslations(locale)

  const serviceKey = Object.entries(t.services.items).find(
    ([, value]) => value.slug === service
  )?.[0]

  const serviceTariffs = serviceKey
    ? t.services.tariffs[serviceKey as keyof typeof t.services.tariffs]
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

          {serviceTariffs ? (
            <>
              <div className='mb-12'>
                <h1 className='text-2xl font-semibold text-gray-900 mb-2'>
                  {serviceTariffs.title}
                </h1>
                <p className='text-gray-600 text-sm'>{serviceTariffs.description}</p>
              </div>

              <div className='space-y-6'>
                {serviceTariffs.items.map(
                  (
                    tariff: {
                      name: string
                      price: string
                      description: string
                      features: string[]
                    },
                    index: number
                  ) => (
                    <div
                      key={index}
                      className='border-b border-gray-200 last:border-b-0 pb-6 last:pb-0'
                    >
                      <div className='flex flex-col md:flex-row md:items-start md:justify-between mb-4'>
                        <div className='flex-1'>
                          <div className='flex items-center justify-between mb-2'>
                            <h2 className='text-lg font-medium text-gray-900'>{tariff.name}</h2>
                            <span className='text-lg font-medium text-gray-900'>
                              {tariff.price}
                            </span>
                          </div>
                          <p className='text-sm text-gray-600'>{tariff.description}</p>
                        </div>
                      </div>

                      <div className='grid grid-cols-1 md:grid-cols-2 gap-3'>
                        {tariff.features.map((feature: string, featureIndex: number) => (
                          <div
                            key={featureIndex}
                            className='flex items-center text-sm text-gray-600'
                          >
                            <svg
                              className='w-4 h-4 text-gray-400 mr-2 flex-shrink-0'
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
                            {feature}
                          </div>
                        ))}
                      </div>
                    </div>
                  )
                )}
              </div>
            </>
          ) : (
            <div className='text-center py-12'>
              <h1 className='text-2xl font-semibold text-gray-900 mb-2'>
                {t.services.tariffs.notFound.title}
              </h1>
              <p className='text-sm text-gray-600'>{t.services.tariffs.notFound.description}</p>
            </div>
          )}
        </div>
      </main>
    </>
  )
}
