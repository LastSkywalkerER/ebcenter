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
  moreText: string
  isAccent?: boolean
  onCtaClick?: () => void
}

export const ServiceCard: React.FC<ServiceCardProps> = ({
  title,
  description,
  slug,
  icon,
  locale,
  moreText,
  isAccent = false,
  onCtaClick,
}) => {
  const homePath = getLocalePath(locale, '')

  if (isAccent) {
    const content = (
      <>
        <div className='w-[52px] h-[52px] bg-white/18 rounded-lg flex items-center justify-center mb-3.5 shrink-0'>
          <div className='text-white [&>svg]:w-7 [&>svg]:h-7'>{icon}</div>
        </div>
        <h3 className='text-[15px] font-bold text-white mb-1.5'>{title}</h3>
        <p className='text-[13px] text-white/78 flex-1 leading-snug mb-3.5 line-clamp-2'>{description}</p>
        <span className='text-[13px] font-semibold text-white/85 mt-auto'>Обсудить задачу →</span>
      </>
    )
    if (onCtaClick) {
      return (
        <button
          type='button'
          onClick={onCtaClick}
          className='flex flex-col p-[22px] rounded-[14px] border border-transparent bg-gradient-to-br from-[#1A2E52] to-[#2B4A8A] text-white cursor-pointer transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md text-left w-full'
        >
          {content}
        </button>
      )
    }
    return (
      <Link
        href={`${homePath}#contacts`}
        className='flex flex-col p-[22px] rounded-[14px] border border-transparent bg-gradient-to-br from-[#1A2E52] to-[#2B4A8A] text-white cursor-pointer transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md'
      >
        {content}
      </Link>
    )
  }

  return (
    <Link
      href={`${getLocalePath(locale, '/services')}#${slug}`}
      className='group flex flex-col p-[22px] bg-white border-[1.5px] border-slate-200 rounded-[14px] transition-all duration-200 hover:border-blue-600 hover:shadow-md hover:-translate-y-0.5 cursor-pointer'
    >
      <div className='w-[52px] h-[52px] bg-blue-50 rounded-lg flex items-center justify-center mb-3.5 shrink-0 text-blue-600 group-hover:bg-blue-100 transition-colors [&>svg]:w-7 [&>svg]:h-7'>
        {icon}
      </div>
      <h3 className='text-[15px] font-bold text-slate-900 mb-1.5'>{title}</h3>
      <p className='text-[13px] text-slate-500 flex-1 leading-snug mb-3.5 line-clamp-2'>{description}</p>
      <span className='text-[13px] font-semibold text-blue-600 mt-auto'>{moreText} →</span>
    </Link>
  )
}
