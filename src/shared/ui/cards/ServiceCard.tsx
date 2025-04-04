import { Locale } from '@/shared/i18n/config'
import Link from 'next/link'
import React from 'react'

interface ServiceCardProps {
  title: string
  description: string
  slug: string
  icon: React.ReactNode
  locale: Locale
  hasTariffs?: boolean
  tariffsText: string
  moreText: string
}

export const ServiceCard: React.FC<ServiceCardProps> = ({
  title,
  description,
  slug,
  icon,
  locale,
  hasTariffs = false,
  tariffsText,
  moreText,
}) => {
  return (
    <div className='group bg-white rounded-2xl shadow-xl p-8 hover:shadow-2xl transition-all duration-300 border border-gray-100 flex flex-col h-full'>
      <div className='flex-grow'>
        <div className='flex items-center gap-4 mb-6'>
          <div className='p-3 bg-blue-50 rounded-xl group-hover:bg-blue-100 transition-colors'>
            {icon}
          </div>
          <h3 className='text-xl font-semibold text-gray-900 group-hover:text-blue-600 transition-colors'>
            {title}
          </h3>
        </div>
        <p className='text-gray-600 mb-6'>{description}</p>
      </div>
      <div className='space-y-3 mt-auto'>
        {hasTariffs && (
          <Link
            href={`/${locale}/services/${slug}/tariffs`}
            className='block w-full bg-gray-50 text-gray-900 py-3 px-6 rounded-lg hover:bg-gray-100 transition-colors text-center font-medium'
          >
            {tariffsText}
          </Link>
        )}
        <Link
          href={`/${locale}/services/${slug}`}
          className='block w-full bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors text-center font-medium'
        >
          {moreText}
        </Link>
      </div>
    </div>
  )
}
