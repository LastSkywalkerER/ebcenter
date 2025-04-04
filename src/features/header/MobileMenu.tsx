'use client'

import { Locale } from '@/shared/i18n/config'
import Link from 'next/link'
import { useEffect, useState } from 'react'

interface MobileMenuProps {
  locale: Locale
  translations: {
    common: {
      home: string
      services: string
      training: string
      contacts: string
      contactInfo: {
        phone: string
        email: string
      }
    }
  }
}

export const MobileMenu = ({ locale, translations }: MobileMenuProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const [mounted, setMounted] = useState(false)

  // Prevent scrolling when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
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
    <div className='md:hidden'>
      <button
        type='button'
        className='relative z-50 p-2 text-gray-600 hover:text-gray-900 focus:outline-none'
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
        className={`fixed inset-0 bg-black bg-opacity-50 transition-opacity duration-300 ease-in-out z-40 ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setIsOpen(false)}
      />

      {/* Menu */}
      <div
        className={`fixed inset-y-0 right-0 w-full max-w-sm bg-white shadow-xl transform transition-transform duration-300 ease-in-out z-50 ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className='h-full flex flex-col'>
          {/* Close button */}
          <div className='flex justify-end p-4'>
            <button
              onClick={() => setIsOpen(false)}
              className='p-2 text-gray-600 hover:text-gray-900 focus:outline-none rounded-full hover:bg-gray-100'
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

          <div className='flex-1 px-4 pb-6 space-y-1 overflow-y-auto'>
            <Link
              href={`/${locale}`}
              className='block px-4 py-3 text-lg font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors duration-200'
              onClick={() => setIsOpen(false)}
            >
              {translations.common.home}
            </Link>
            <Link
              href={`/${locale}/services`}
              className='block px-4 py-3 text-lg font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors duration-200'
              onClick={() => setIsOpen(false)}
            >
              {translations.common.services}
            </Link>
            <Link
              href={`/${locale}/training`}
              className='block px-4 py-3 text-lg font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors duration-200'
              onClick={() => setIsOpen(false)}
            >
              {translations.common.training}
            </Link>
            <Link
              href={`/${locale}/contacts`}
              className='block px-4 py-3 text-lg font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors duration-200'
              onClick={() => setIsOpen(false)}
            >
              {translations.common.contacts}
            </Link>
          </div>

          <div className='border-t border-gray-200 px-4 py-6 space-y-3'>
            <Link
              href='tel:+375291234567'
              className='flex items-center px-4 py-3 text-lg font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors duration-200'
              onClick={() => setIsOpen(false)}
            >
              <svg
                className='w-5 h-5 mr-3 text-blue-600'
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
            <Link
              href='mailto:info@ebcenter.by'
              className='flex items-center px-4 py-3 text-lg font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors duration-200'
              onClick={() => setIsOpen(false)}
            >
              <svg
                className='w-5 h-5 mr-3 text-blue-600'
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
          </div>
        </div>
      </div>
    </div>
  )
}
