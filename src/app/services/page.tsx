import Header from '@/features/header/Header'
import Link from 'next/link'

const services = [
  {
    title: 'Сметное обслуживание',
    description: 'Профессиональное сметное обслуживание для строительных организаций',
    icon: (
      <svg className="w-12 h-12 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
      </svg>
    ),
    slug: 'smetnoe-obsluzhivanie'
  },
  {
    title: 'Сметы по текущему ремонту',
    description: 'Составление сметной документации по дефектному акту и по текущему ремонту',
    icon: (
      <svg className="w-12 h-12 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" />
      </svg>
    ),
    slug: 'tekuciy-remont'
  },
  {
    title: 'Сметная документация',
    description: 'Составление сметной документации по разделам проекта',
    icon: (
      <svg className="w-12 h-12 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ),
    slug: 'smetnaya-dokumentatsiya'
  },
  {
    title: 'Расчёт контрактной цены',
    description: 'Расчёт договорной цены для участия в переговорах или торгах',
    icon: (
      <svg className="w-12 h-12 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    slug: 'raschet-kontraktnoy-tseny'
  },
  {
    title: 'Составление договоров подряда',
    description: 'Cоставление договоров строительного подряда и приложений к ним',
    icon: (
      <svg className="w-12 h-12 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ),
    slug: 'sostavlenie-dogovorov-podryada'
  },
  {
    title: 'Отчётная документация',
    description: 'Составление отчётной документации - актов сдачи-приёмки выполненных работ, оформление справок, составление актов на дополнительные работы',
    icon: (
      <svg className="w-12 h-12 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
      </svg>
    ),
    slug: 'otchetnaya-dokumentatsiya'
  },
  {
    title: 'Составление локальных смет',
    description: 'Cоставление локальных смет на общестроительные и специальные виды работ',
    icon: (
      <svg className="w-12 h-12 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
      </svg>
    ),
    slug: 'sostavlenie-lokalnyh-smet'
  },
  {
    title: 'Консультационные услуги',
    description: 'Консультационные услуги по вопросам сметного ценообразования',
    icon: (
      <svg className="w-12 h-12 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    slug: 'konsultatsionnye-uslugi'
  },
  {
    title: 'Сметы для хозспособа',
    description: 'Составление отчётной документации для организаций, выполняющих работы собственными силами',
    icon: (
      <svg className="w-12 h-12 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
      </svg>
    ),
    slug: 'smeti-dlya-hozsposoba'
  },
  {
    title: 'Индивидальный запрос',
    description: 'Индивидальный или разовое обслуживание по согласованному перечню услуг',
    icon: (
      <svg className="w-12 h-12 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
      </svg>
    ),
    slug: 'individualnyy-zapros'
  }
]

export default function Services() {
  return (
    <>
      <Header />
      <main className="flex-grow py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Наши услуги</h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Профессиональные услуги в сфере строительства и проектирования
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div key={index} className="bg-white rounded-lg shadow-lg p-6 flex flex-col">
                <div className="flex-grow">
                  <div className="text-center mb-6">
                    <div className="inline-block p-3 bg-blue-50 rounded-full mb-4">
                      {service.icon}
                    </div>
                    <h2 className="text-xl font-semibold text-gray-900 mb-2">{service.title}</h2>
                    <p className="text-gray-600">{service.description}</p>
                  </div>
                </div>

                <div className="space-y-3 mt-auto">
                  <Link 
                    href={`/services/${service.slug}`}
                    className="block w-full bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors text-center"
                  >
                    Подробнее
                  </Link>
                  <Link 
                    href={`/services/${service.slug}/tariffs`}
                    className="block w-full bg-gray-100 text-gray-900 py-3 px-6 rounded-lg hover:bg-gray-200 transition-colors text-center"
                  >
                    Тарифы
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </>
  )
} 