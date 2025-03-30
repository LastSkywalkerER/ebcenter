import Link from 'next/link'

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-xl font-bold mb-4">EBCenter</h3>
            <p className="text-gray-300 mb-4">
            Сметные услуги в строительстве и обучение сметному делу
            </p>
            <div className="space-y-2 text-gray-300">
              <p>УНП: 123456789</p>
              <p>г. Минск, ул. Примерная, 123</p>
              <p>Пн-Пт: 9:00 - 18:00</p>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold mb-4">Быстрые ссылки</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-300 hover:text-white">
                  Главная
                </Link>
              </li>
              <li>
                <Link href="/services" className="text-gray-300 hover:text-white">
                  Услуги
                </Link>
              </li>
              <li>
                <Link href="/training" className="text-gray-300 hover:text-white">
                  Обучение
                </Link>
              </li>
              <li>
                <Link href="/contacts" className="text-gray-300 hover:text-white">
                  Контакты
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-xl font-bold mb-4">Контакты</h3>
            <ul className="space-y-2 text-gray-300">
              <li>
                <a href="tel:+375291234567" className="hover:text-white">
                  +375 (29) 123-45-67
                </a>
              </li>
              <li>
                <a href="mailto:info@ebcenter.by" className="hover:text-white">
                  info@ebcenter.by
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-700 text-center text-gray-300">
          <p>&copy; {new Date().getFullYear()} EBCenter. Все права защищены.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer 