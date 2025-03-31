
import Link from 'next/link'

const serviceTariffs = {
  'smetnoe-obsluzhivanie': {
    title: 'Тарифы на сметное обслуживание',
    description: 'Выберите подходящий тарифный план для вашей организации',
    tariffs: [
      {
        name: 'Сметное обслуживание (ПРОГРАММА 1)',
        price: 'от 50 рублей в месяц',
        description: 'расчет договорной контрактной цены для заключения договора строительного подряда и для участия в торгах или переговорах, составление сметной документации, отчетной документации по факту выполненных работ по согласованному перечню до 3 объектов.',
        features: [
          'До 3 объектов',
          'Расчет договорной цены',
          'Составление сметной документации',
          'Отчетная документация'
        ]
      },
      {
        name: 'Сметное обслуживание (ПРОГРАММА 2)',
        price: 'от 150 рублей в месяц',
        description: 'расчет договорной контрактной цены для заключения договора строительного подряда и для участия в торгах или переговорах, составление сметной документации, отчетной документации по факту выполненных работ по согласованному перечню от 3 объектов.',
        features: [
          'От 3 объектов',
          'Расчет договорной цены',
          'Составление сметной документации',
          'Отчетная документация'
        ]
      },
      {
        name: 'Сметное обслуживание (ОПЛАТА ПО ФАКТУ)',
        price: 'от 20 рублей - 1 час',
        description: 'абонентское сметное обслуживание исходя из фактически обработанных часов по согласованному перечню: расчет договорной контрактной цены для заключения договора строительного подряда и для участия в торгах или переговорах, составление сметной документации, отчетной документации.',
        features: [
          'Почасовая оплата',
          'Гибкий график',
          'Расчет договорной цены',
          'Составление сметной документации',
          'Отчетная документация'
        ]
      }
    ]
  }
}

export default async function ServiceTariffs({ params }: { params: Promise<{ service: string }> }) {
  const pramsService = (await params).service

  const service = serviceTariffs[pramsService as keyof typeof serviceTariffs]

  return (
    <>
 
      <main className="flex-grow py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link 
            href={`/services/${pramsService}`}
            className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-8"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Вернуться к услуге
          </Link>

          {service ? (
            <>
              <div className="mb-12">
                <h1 className="text-2xl font-semibold text-gray-900 mb-2">{service.title}</h1>
                <p className="text-gray-600 text-sm">{service.description}</p>
              </div>

              <div className="space-y-6">
                {service.tariffs.map((tariff, index) => (
                  <div 
                    key={index} 
                    className="border-b border-gray-200 last:border-b-0 pb-6 last:pb-0"
                  >
                    <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <h2 className="text-lg font-medium text-gray-900">{tariff.name}</h2>
                          <span className="text-lg font-medium text-gray-900">{tariff.price}</span>
                        </div>
                        <p className="text-sm text-gray-600">{tariff.description}</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {tariff.features.map((feature, featureIndex) => (
                        <div key={featureIndex} className="flex items-center text-sm text-gray-600">
                          <svg className="w-4 h-4 text-gray-400 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          {feature}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <div className="text-center py-12">
              <h1 className="text-2xl font-semibold text-gray-900 mb-2">Тарифы не найдены</h1>
              <p className="text-sm text-gray-600">Тарифы для запрошенной услуги не существуют</p>
            </div>
          )}
        </div>
      </main>
    </>
  )
} 