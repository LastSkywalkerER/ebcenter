import Link from 'next/link'

const Header = () => {
  return (
    <header className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0">
            <Link href="/" className="text-2xl font-bold text-gray-800">
              EBCenter
            </Link>
          </div>
          
          <nav className="hidden md:flex space-x-8">
            <Link href="/" className="text-gray-600 hover:text-gray-900">
              Главная
            </Link>
            <Link href="/services" className="text-gray-600 hover:text-gray-900">
              Услуги
            </Link>
            <Link href="/training" className="text-gray-600 hover:text-gray-900">
              Обучение
            </Link>
            <Link href="/contacts" className="text-gray-600 hover:text-gray-900">
              Контакты
            </Link>
          </nav>

          <div className="hidden md:flex items-center space-x-4">
            <a href="tel:+375291234567" className="text-gray-600 hover:text-gray-900">
              +375 (29) 123-45-67
            </a>
            <a href="mailto:info@ebcenter.by" className="text-gray-600 hover:text-gray-900">
              info@ebcenter.by
            </a>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button type="button" className="text-gray-600 hover:text-gray-900">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header 