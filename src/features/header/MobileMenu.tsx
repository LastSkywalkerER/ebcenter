'use client'

import { Locale } from '@/shared/i18n/config'
import { OrderCallLink } from '@/features/header/OrderCallLink'
import { getLocalePath } from '@/shared/lib/localePath'
import { formatPhoneForTel } from '@/shared/lib/utils'
import Link from 'next/link'
import { useEffect, useState } from 'react'

interface NavItem {
  label: string
  href: string
  slug: string
}

interface MobileMenuProps {
  locale?: Locale
  translations: {
    common: {
      home: string
      services: string
      training: string
      contacts: string
      orderCall: string
      contactInfo: {
        phone: string
        email: string
      }
    }
  }
  navItems: NavItem[]
}

export const MobileMenu = ({ locale, translations, navItems }: MobileMenuProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const [mounted, setMounted] = useState(false)

  // Prevent vertical scroll when menu is open (horizontal scroll prevented by overflow-x: hidden on html/body)
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  // Handle escape key to close menu
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false)
      }
    }
    window.addEventListener('keydown', handleEscape)
    return () => window.removeEventListener('keydown', handleEscape)
  }, [isOpen])

  // Set mounted after hydration to prevent hydration mismatch
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <div className='lg:hidden'>
      <button
        type='button'
        className='relative z-50 p-2 text-slate-600 hover:text-slate-900 focus:outline-none'
        onClick={() => setIsOpen(!isOpen)}
        aria-label={isOpen ? 'Close menu' : 'Open menu'}
      >
        <div className='relative w-6 h-6'>
          <span
            className={`absolute h-0.5 w-6 bg-current transform transition-all duration-300 ease-in-out ${
              isOpen ? 'rotate-45 top-3' : 'rotate-0 top-1'
            }`}
          />
          <span
            className={`absolute h-0.5 w-6 bg-current transform transition-all duration-300 ease-in-out ${
              isOpen ? 'opacity-0' : 'opacity-100 top-3'
            }`}
          />
          <span
            className={`absolute h-0.5 w-6 bg-current transform transition-all duration-300 ease-in-out ${
              isOpen ? '-rotate-45 top-3' : 'rotate-0 top-5'
            }`}
          />
        </div>
      </button>

      {/* Backdrop */}
      <div
        className={`fixed inset-0 bg-slate-900/80 transition-opacity duration-300 ease-in-out z-40 ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setIsOpen(false)}
      />

      {/* Menu - full width on mobile, solid white, full viewport height */}
      <div
        className={`fixed top-0 right-0 bottom-0 w-full sm:max-w-sm min-w-0 h-screen bg-white border-l border-slate-200 shadow-2xl transform transition-transform duration-300 ease-in-out z-50 ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className='h-full flex flex-col min-h-0'>
          {/* Close button */}
          <div className='flex justify-end p-4 shrink-0'>
            <button
              onClick={() => setIsOpen(false)}
              className='p-2 text-slate-600 hover:text-slate-900 focus:outline-none rounded-full hover:bg-slate-100'
              aria-label='Close menu'
            >
              <svg className='w-6 h-6' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M6 18L18 6M6 6l12 12'
                />
              </svg>
            </button>
          </div>

          {/* Nav links - flex-1 with min-h-0 so it can scroll if needed */}
          <div className='flex-1 min-h-0 overflow-y-auto px-5 pb-4 bg-white'>
            <nav className='space-y-1 py-2'>
              {navItems.map((item) => (
                <Link
                  key={item.slug || 'home'}
                  href={item.href}
                  className='block px-5 py-3 text-lg font-medium text-slate-800 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors duration-200'
                  onClick={() => setIsOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Bottom section - pinned to bottom */}
          <div className='shrink-0 border-t border-slate-200 px-5 py-6 space-y-4 bg-slate-50'>
            <OrderCallLink
              href={`${getLocalePath(locale ?? 'ru', '')}#contacts`}
              className='flex items-center justify-center w-full px-5 py-3.5 text-base font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors'
              onClick={() => setIsOpen(false)}
            >
              {translations.common.orderCall}
            </OrderCallLink>
            <div className='space-y-2 pt-1'>
              {translations.common.contactInfo.phone && (
                <Link
                  href={`tel:${formatPhoneForTel(translations.common.contactInfo.phone)}`}
                  className='flex items-center px-5 py-3 text-base font-medium text-slate-900 hover:text-blue-600 hover:bg-white rounded-lg transition-colors duration-200 min-h-[44px]'
                  onClick={() => setIsOpen(false)}
                >
                  <svg
                    className='w-5 h-5 mr-3 text-blue-600 shrink-0'
                    fill='none'
                    stroke='currentColor'
                    viewBox='0 0 24 24'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={2}
                      d='M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z'
                    />
                  </svg>
                  {translations.common.contactInfo.phone}
                </Link>
              )}
              {translations.common.contactInfo.email && (
                <Link
                  href={`mailto:${translations.common.contactInfo.email}`}
                  className='flex items-center px-5 py-3 text-base font-medium text-slate-900 hover:text-blue-600 hover:bg-white rounded-lg transition-colors duration-200 min-h-[44px]'
                  onClick={() => setIsOpen(false)}
                >
                  <svg
                    className='w-5 h-5 mr-3 text-blue-600 shrink-0'
                    fill='none'
                    stroke='currentColor'
                    viewBox='0 0 24 24'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={2}
                      d='M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z'
                    />
                  </svg>
                  {translations.common.contactInfo.email}
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
