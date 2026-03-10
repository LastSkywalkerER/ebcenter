import { Locale } from '@/shared/i18n/config'
import { getLocalePath } from '@/shared/lib/localePath'
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
    <div className='group bg-white rounded-xl border border-slate-200 shadow-sm p-6 hover:border-blue-200 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 flex flex-col h-full min-w-0'>
      <div className='flex-grow'>
        <div className='p-2.5 bg-blue-50 rounded-lg inline-flex mb-4 group-hover:bg-blue-100 transition-colors'>
          {icon}
        </div>
        <h3 className='text-base font-semibold text-slate-900 mb-2 leading-snug'>
          {title}
        </h3>
        <p className='text-sm text-slate-500 leading-relaxed'>{description}</p>
      </div>
      <div className='flex items-center gap-4 mt-5 pt-4 border-t border-slate-100'>
        <Link
          href={getLocalePath(locale, `/services/${slug}`)}
          className='text-sm font-medium text-blue-600 hover:text-blue-800 transition-colors inline-flex items-center gap-1'
        >
          {moreText}
          <svg className='w-3.5 h-3.5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M9 5l7 7-7 7' />
          </svg>
        </Link>
        {hasTariffs && (
          <Link
            href={getLocalePath(locale, `/services/${slug}/tariffs`)}
            className='text-sm text-slate-400 hover:text-slate-600 transition-colors'
          >
            {tariffsText}
          </Link>
        )}
      </div>
    </div>
  )
}
