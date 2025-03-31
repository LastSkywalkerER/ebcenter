
import Link from 'next/link'

const coursePrograms = {
  'express-course': {
    title: 'Программа курса "Экспресс курс Сметчик"',
    sections: [
      {
        title: '1. Основы сметного дела',
        content: [
          'Определение сметной стоимости строительства объектов',
          'Нормативные базы по определению стоимости строительства',
          'Порядок определения сметной стоимости строительства объекта и составления сметной документации на основании нормативов расхода ресурсов в натуральном выражении НРР 2017'
        ]
      },
      {
        title: '2. Нормативы расхода ресурсов',
        content: [
          'Нормативы расхода ресурсов в натуральном выражении',
          'Порядок применения нормативов расхода ресурсов',
          'Нормативы расхода ресурсов по разборке и демонтажу',
          'Особенности применения нормативов расхода ресурсов на монтаж оборудования',
          'Расходы на работы по демонтажу оборудования'
        ]
      },
      {
        title: '3. Расчет стоимости',
        content: [
          'Порядок расчета текущих цен затрат труда',
          'Расчет стоимости строительных материалов',
          'Расчет стоимости эксплуатации строительных машин',
          'Межразрядные расчетные коэффициенты для определения стоимости затрат труда',
          'Влияние усложненных и стесненных условий производства работ'
        ]
      },
      {
        title: '4. Дополнительные расходы',
        content: [
          'Порядок определения транспортных расходов',
          'Зоны строительства',
          'Общехозяйственные и общепроизводственные расходы',
          'Плановая прибыль',
          'Средства на строительство временных зданий и сооружений'
        ]
      },
      {
        title: '5. Специальные условия',
        content: [
          'Средства на дополнительные расходы при производстве строительно-монтажных работ в зимнее время',
          'Часть I - нормы по видам строительства',
          'Часть II - нормы по конструкциям и видам работ'
        ]
      },
      {
        title: '6. Прочие работы и расходы',
        content: [
          'Средства, связанные с отчислениями на социальное страхование',
          'Средства на покрытие расходов, связанных разъездным характером работ',
          'Средства на командирование рабочих подрядчика'
        ]
      },
      {
        title: '7. Командирование рабочих',
        content: [
          'Методические рекомендации по расчету средств на командирование',
          'Размеры возмещения расходов при служебных командировках',
          'Количество командируемых рабочих-строителей и машинистов',
          'Нормативная трудоемкость работ',
          'Условный пример расчета средств на командирование рабочих'
        ]
      },
      {
        title: '8. Налоги и отчисления',
        content: [
          'Налоги и отчисления',
          'Средства, учитывающие применение прогнозных индексов цен',
          'Отклонение в стоимости материалов'
        ]
      },
      {
        title: '9. Сметная документация',
        content: [
          'Состав сметной документации',
          'Порядок составления локальных смет',
          'Формирование информационного блока данных',
          'Группировка данных в локальных сметах по проектно-технологическим модулям (ПТМ)',
          'Составление объектных смет и сводного сметного расчета'
        ]
      },
      {
        title: '10. Документация в строительстве',
        content: [
          'Основные формы учетных документов:',
          [
            'Форма С-1 - Отчет о выполненных работах',
            'Форма С-2а - Акты сдачи-приемки выполненных работ',
            'Форма С-2б - Акты сдачи-приемки монтажных работ',
            'Форма С-3 - Справка о стоимости выполненных работ',
            'Форма С-3а - Справка о стоимости выполненных работ и затратах',
            'Форма С-4 - Отчет о расходе основных материалов',
            'Форма С-7 - Отчет о расходе материалов',
            'Форма С-14 - Отчет о расходе топлива'
          ]
        ]
      },
      {
        title: '11. Договорные отношения',
        content: [
          'Обеспечение исполнения подрядчиком обязательств',
          'Материалы поставки заказчика',
          'Оборудование поставки заказчика, подрядчика и субподрядчика',
          'Порядок формирования неизменной договорной (контрактной) цены',
          'Случаи изменения договорной цены'
        ]
      },
      {
        title: '12. Пусконаладочные работы',
        content: [
          'Порядок определения сметной стоимости ПНР',
          'Пример расчета сметной стоимости ПНР',
          'Отчет о расходе строительных материалов (форма С-29)'
        ]
      },
      {
        title: '13. Сравнительный анализ',
        content: [
          'Сравнительный анализ НРР 2012 и НРР 2017',
          'Пути снижения стоимости строительства',
          'Формирование договорной цены по локальным сметам и ПТМ'
        ]
      },
      {
        title: '14. Нормативная база',
        content: [
          'Инструкция МАиС № 29 по заполнению форм актов',
          'Постановление МАиС от 07.02.2019 N 9 о размере человеко-часа',
          'Анализ конкурсной документации к торгам'
        ]
      }
    ]
  },
  'contract-price': {
    title: 'Программа курса "Контрактная цена"',
    sections: [
      {
        title: '1. Краткий обзор',
        content: [
          'Правила определения сметной стоимости строительства и составления сметной документации на основании нормативов расхода ресурсов в натуральном выражении в НРР 2012 и 2017 года, в том числе формирования отдельных статей затрат:',
          [
            'Затраты труда рабочих и машинистов',
            'Затраты на строительные материалы и эксплуатацию строительных машин, транспортные расходы',
            'Общехозяйственные и общепроизводственные расходы и плановая прибыль',
            'Влияние усложненных и стесненных условий производства работ',
            'Средства на строительство временных зданий и сооружений и средства на дополнительные расходы при производстве строительно-монтажных работ в зимнее время',
            'Прочие работы и расходы',
            'Средства, учитывающие применение прогнозных индексов цен в строительстве, налоги и отчисления'
          ]
        ]
      },
      {
        title: '2. Сравнительный анализ нормативов',
        content: [
          'Сравнительный анализ НРР 2012 и НРР 2017',
          'Основные изменения и отличия',
          'Практическое применение нормативов'
        ]
      },
      {
        title: '3. Сметная документация',
        content: [
          'Состав сметной документации',
          'Формирование информационного блока данных',
          'Группировка данных в локальных сметах по проектно-технологическим модулям (ПТМ)'
        ]
      },
      {
        title: '4. Закупки в строительстве',
        content: [
          'Закупки товаров (работ, услуг) при строительстве',
          'Порядок проведения закупок',
          'Требования к участникам закупок'
        ]
      },
      {
        title: '5. Формирование контрактной цены',
        content: [
          'Порядок формирования неизменной договорной (контрактной) цены на строительство объектов',
          'Цена заказчика',
          'Цена предложения подрядчика',
          'Случаи изменения договорной цены при строительстве объектов, финансируемых полностью или частично за счет средств бюджетов и других источников',
          'Экономия подрядчика'
        ]
      },
      {
        title: '6. Дополнительные работы',
        content: [
          'Порядок формирования стоимости дополнительных работ',
          'Особенности учета дополнительных работ в сметной документации'
        ]
      },
      {
        title: '7. Учетная документация',
        content: [
          'Основные формы учетных документов в строительстве:',
          [
            'Форма С-2а - Акты сдачи-приемки выполненных работ',
            'Форма С-2б - Акты сдачи-приемки монтажных работ',
            'Форма С-3а - Справка о стоимости выполненных работ и затратах'
          ],
          'Рекомендации по применению и заполнению форм'
        ]
      },
      {
        title: '8. Конкурсные торги',
        content: [
          'Анализ конкурсной документации к торгам',
          'Определение порядка формирования контрактной цены для конкурсного предложения'
        ]
      },
      {
        title: '9. Оптимизация стоимости',
        content: [
          'Пути снижения стоимости строительства',
          'Формирование договорной (контрактной) цены по локальным сметам и по проектно-технологическим модулям (ПТМ)'
        ]
      },
      {
        title: '10. Нормативная база',
        content: [
          'Порядок применения и заполнения форм актов сдачи-приемки выполненных строительных и иных специальных монтажных работ (С-2а и С-2б)',
          'Инструкция МАиС № 29'
        ]
      }
    ]
  },
  'individual': {
    title: 'Программа курса "Индивидуальное обучение"',
    sections: [
      {
        title: 'Информация',
        content: [
          'Программа курса будет сформирована из Вашего запроса'
        ]
      }
    ]
  }
}

export default async function CourseProgram({ params }: { params: Promise<{ course: string }> }) {
  const pramsCourse = (await params).course
  
  const program = coursePrograms[pramsCourse as keyof typeof coursePrograms]

  return (
    <>
    
      <main className="flex-grow py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link 
            href="/training" 
            className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-8"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Вернуться к курсам
          </Link>

          {program ? (
            <>
              <h1 className="text-3xl font-bold text-gray-900 mb-8">{program.title}</h1>
              <div className="bg-white rounded-lg shadow-lg p-8">
                <div className="space-y-8">
                  {program.sections.map((section, sectionIndex) => (
                    <div key={sectionIndex} className="border-b border-gray-200 pb-6 last:border-b-0">
                      <h2 className="text-xl font-semibold text-gray-900 mb-4">{section.title}</h2>
                      <div className="space-y-4">
                        {section.content.map((item, itemIndex) => (
                          <div key={itemIndex}>
                            {Array.isArray(item) ? (
                              <ul className="list-disc list-inside space-y-2 text-gray-700">
                                {item.map((subItem, subIndex) => (
                                  <li key={subIndex}>{subItem}</li>
                                ))}
                              </ul>
                            ) : (
                              <p className="text-gray-700">{item}</p>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </>
          ) : (
            <div className="text-center py-12">
              <h1 className="text-3xl font-bold text-gray-900 mb-4">Программа курса</h1>
              <p className="text-gray-600">Программа курса находится в разработке</p>
            </div>
          )}
        </div>
      </main>
    </>
  )
} 