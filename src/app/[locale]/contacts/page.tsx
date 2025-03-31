import Header from '@/features/header/Header'
import { Locale } from '@/i18n/config'

export default async function Contacts({params}: {params: Promise<{locale: Locale}>}) {
  const locale = (await params).locale

  return (
    <>
      <Header locale={locale} />
      <main className="flex-grow py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold text-center mb-12 text-gray-900">Контакты</h1>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Company Information */}
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h2 className="text-2xl font-bold mb-6 text-gray-900">Контактная информация</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-gray-900">Адрес</h3>
                  <p className="text-gray-600">г. Минск, ул. Примерная, 123</p>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Телефон</h3>
                  <p className="text-gray-600">+375 (29) 123-45-67</p>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Email</h3>
                  <p className="text-gray-600">info@ebcenter.by</p>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">УНП</h3>
                  <p className="text-gray-600">123456789</p>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Время работы</h3>
                  <p className="text-gray-600">Пн-Пт: 9:00 - 18:00</p>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h2 className="text-2xl font-bold mb-6 text-gray-900">Форма обратной связи</h2>
              <form className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                    Ваше имя
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 h-[40px] flex items-center text-gray-900"
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
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 h-[40px] flex items-center text-gray-900"
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
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 h-[40px] flex items-center text-gray-900"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                    Сообщение
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 text-gray-900"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors h-[40px] flex items-center justify-center"
                >
                  Отправить
                </button>
              </form>
            </div>
          </div>
        </div>
      </main>
    </>
  )
} 