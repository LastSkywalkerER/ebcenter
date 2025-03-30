
import Header from '@/features/header/Header'
import { Locale } from '@/i18n/config'
import Image from 'next/image'
import Link from 'next/link'

interface HomeProps {
  params: { locale: Locale };
  searchParams: { [key: string]: string | string[] | undefined };
}

export default function Home({params: {locale}}: HomeProps) {
  return (
    <>
      <Header locale={locale} />
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative h-[600px] bg-gray-100">
          <div className="absolute inset-0">
            <Image
              src="/images/hero-bg.jpg"
              alt="Проектно-сметные работы"
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-black bg-opacity-50" />
          </div>
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center">
            <div className="text-white">
              <h1 className="text-4xl md:text-6xl font-bold mb-4">
                Сметные услуги в строительстве
              </h1>
              <p className="text-xl md:text-2xl mb-8">
                Быстрое и качественное составление документации
              </p>
              <a
                href="/services"
                className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Наши услуги
          </a>
        </div>
          </div>
        </section>

        {/* Services Section */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">Основные услуги</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Service 1 */}
              <div className="bg-white rounded-lg shadow-lg p-6 flex flex-col">
                <div className="flex-grow">
                  <div className="text-center mb-6">
                    <div className="inline-block p-3 bg-blue-50 rounded-full mb-4">
                      <svg className="w-24 h-24 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <h2 className="text-xl font-semibold text-gray-900 mb-2">Составление смет</h2>
                    <p className="text-gray-600">
                      Профессиональное составление сметной документации для строительных проектов
                    </p>
                  </div>
                </div>

                <div className="space-y-3 mt-auto">
                  <Link 
                    href="/services/составление-смет"
                    className="block w-full bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors text-center"
                  >
                    Подробнее
                  </Link>
                  <Link 
                    href="/services/составление-смет/tariffs"
                    className="block w-full bg-gray-100 text-gray-900 py-3 px-6 rounded-lg hover:bg-gray-200 transition-colors text-center"
                  >
                    Тарифы
                  </Link>
                </div>
              </div>

              {/* Service 2 */}
              <div className="bg-white rounded-lg shadow-lg p-6 flex flex-col">
                <div className="flex-grow">
                  <div className="text-center mb-6">
                    <div className="inline-block p-3 bg-blue-50 rounded-full mb-4">
                      <svg className="w-24 h-24 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <h2 className="text-xl font-semibold text-gray-900 mb-2">Акты выполненных работ</h2>
                    <p className="text-gray-600">
                      Корректное оформление актов выполненных работ в соответствии с законодательством
                    </p>
                  </div>
                </div>

                <div className="space-y-3 mt-auto">
                  <Link 
                    href="/services/акты-выполненных-работ"
                    className="block w-full bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors text-center"
                  >
                    Подробнее
                  </Link>
                  <Link 
                    href="/services/акты-выполненных-работ/tariffs"
                    className="block w-full bg-gray-100 text-gray-900 py-3 px-6 rounded-lg hover:bg-gray-200 transition-colors text-center"
                  >
                    Тарифы
                  </Link>
                </div>
              </div>

              {/* Service 3 */}
              <div className="bg-white rounded-lg shadow-lg p-6 flex flex-col">
                <div className="flex-grow">
                  <div className="text-center mb-6">
                    <div className="inline-block p-3 bg-blue-50 rounded-full mb-4">
                      <svg className="w-24 h-24 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                      </svg>
                    </div>
                    <h2 className="text-xl font-semibold text-gray-900 mb-2">Сметное обслуживание</h2>
                    <p className="text-gray-600">
                      Комплексное сметное обслуживание организаций на постоянной основе
                    </p>
                  </div>
                </div>

                <div className="space-y-3 mt-auto">
                  <Link 
                    href="/services/сметное-обслуживание"
                    className="block w-full bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors text-center"
                  >
                    Подробнее
                  </Link>
                  <Link 
                    href="/services/сметное-обслуживание/tariffs"
                    className="block w-full bg-gray-100 text-gray-900 py-3 px-6 rounded-lg hover:bg-gray-200 transition-colors text-center"
                  >
                    Тарифы
                  </Link>
                </div>
              </div>
            </div>
    </div>
    
        </section>
      </main>
    </>
  )
}
