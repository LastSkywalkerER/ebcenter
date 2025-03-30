import Header from '@/features/header/Header'
import Link from 'next/link'

const courses = [
  {
    title: 'Экспресс курс "Сметчик"',
    duration: '13 часов',
    price: '300 BYN',
    topics: [
      'На базе программы Belsmeta\xa0Cloud',
      'Оффлайн/онлайн',
      'Практикующий преподаватель',
      'Сертификат по окончанию курса',
      'Подходит для начинающих'
    ],
    icon: (
      <svg className="w-12 h-12 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
      </svg>
    ),
    programSlug: 'express-course'
  },
  {
    title: 'Курс "Контрактная цена"',
    duration: '10 часов',
    price: '250 BYN',
    topics: [
      'На базе программы Belsmeta\xa0Cloud',
      'Оффлайн/онлайн',
      'Практикующий преподаватель',
      'Сертификат по окончанию курса',
      'Углубленная работа с законодательством'
    ],
    icon: (
      <svg className="w-12 h-12 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    programSlug: 'contract-price'
  },
  {
    title: 'Индивидуальное обучение',
    duration: 'По договоренности',
    price: 'Индивидуально',
    topics: [
      'Персональный план обучения',
      'Гибкий график занятий',
      'Индивидуальный подход',
      'Практические задания',
      'Сертификат по окончанию курса'
    ],
    icon: (
      <svg className="w-12 h-12 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
      </svg>
    ),
    programSlug: 'individual'
  }
]

export default function Training() {
  return (
    <>
      <Header />
      <main className="flex-grow py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Обучение</h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Профессиональные курсы по сметному делу и ценообразованию
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {courses.map((course, index) => (
              <div key={index} className="bg-white rounded-lg shadow-lg p-6 flex flex-col">
                <div className="flex-grow">
                  <div className="text-center mb-6">
                    <div className="inline-block p-3 bg-blue-50 rounded-full mb-4">
                      {course.icon}
                    </div>
                    <h2 className="text-xl font-semibold text-gray-900 mb-2">{course.title}</h2>
                    <p className="text-gray-600 mb-4">{course.description}</p>
                    <div className="flex justify-center space-x-4 text-sm text-gray-500 mb-4">
                      <span>{course.duration}</span>
                      <span>•</span>
                      <span>{course.price}</span>
                    </div>
                    <div className="text-left">
                      <h3 className="font-semibold text-gray-900 mb-2">Детали курса:</h3>
                      <ul className="space-y-2 text-gray-600">
                        {course.topics.map((topic, idx) => (
                          <li key={idx} className="flex items-start">
                            <svg className="w-5 h-5 text-blue-600 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            {topic}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="space-y-3 mt-auto">
                  <Link 
                    href={`/training/${course.programSlug}`}
                    className="block w-full bg-gray-100 text-gray-900 py-3 px-6 rounded-lg hover:bg-gray-200 transition-colors text-center"
                  >
                    Программа курса
                  </Link>
                  <Link 
                    href="#registration"
                    className="block w-full bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors text-center"
                  >
                    Записаться
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <div id="registration" className="mt-16">
            <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">Запись на обучение</h2>
            <form className="max-w-2xl mx-auto space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  ФИО
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900"
                  required
                />
              </div>
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                  Телефон
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900"
                  required
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900"
                  required
                />
              </div>
              <div>
                <label htmlFor="course" className="block text-sm font-medium text-gray-700 mb-1">
                  Выберите курс
                </label>
                <select
                  id="course"
                  name="course"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900"
                  required
                >
                  <option value="">Выберите курс</option>
                  {courses.map((course, index) => (
                    <option key={index} value={course.title}>
                      {course.title}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                  Сообщение
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900"
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Отправить заявку
              </button>
            </form>
          </div>
        </div>
      </main>
    </>
  )
} 