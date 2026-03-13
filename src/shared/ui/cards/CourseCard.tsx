import { Locale } from '@/shared/i18n/config'
import { getLocalePath } from '@/shared/lib/localePath'
import Link from 'next/link'
import React from 'react'

type BadgeVariant = 'default' | 'blue' | 'dark'

interface CourseCardProps {
  course: {
    programSlug: string
    icon: React.ReactNode
    title: string
    duration: string
    price: string
    topics: string[]
  }
  locale: Locale
  registerText: string
  badge?: string
  badgeVariant?: BadgeVariant
  isFeatured?: boolean
  onRegisterClick?: () => void
  /** Link to training page with hash (e.g. /training#express-course) */
  href?: string
}

const badgeClasses: Record<BadgeVariant, string> = {
  default: 'bg-slate-400 text-white',
  blue: 'bg-blue-600 text-white',
  dark: 'bg-[#1A2E52] text-white',
}

export const CourseCard: React.FC<CourseCardProps> = ({
  course,
  locale,
  registerText,
  badgeVariant = 'default',
  badge,
  isFeatured = false,
  onRegisterClick,
  href: hrefProp,
}) => {
  const homePath = getLocalePath(locale, '')
  const isOutline = badgeVariant === 'dark'
  const linkHref = hrefProp ?? `${homePath}#contacts`

  return (
    <div
      className={`relative bg-white rounded-[14px] p-[30px] flex flex-col gap-[14px] transition-all duration-200 hover:shadow-md hover:-translate-y-0.5 ${
        isFeatured
          ? 'border-[1.5px] border-blue-600 shadow-[0_0_0_1px_rgb(37,99,235)]'
          : 'border-[1.5px] border-slate-200'
      }`}
    >
      {badge && (
        <div
          className={`absolute top-[-12px] left-6 text-[11px] font-bold px-3 py-0.5 rounded-full ${badgeClasses[badgeVariant]}`}
        >
          {badge}
        </div>
      )}

      <div className='w-14 h-14 bg-blue-50 text-blue-600 rounded-lg flex items-center justify-center [&>svg]:w-9 [&>svg]:h-9'>
        {course.icon}
      </div>

      <p className='text-[19px] font-bold text-slate-900'>{course.title}</p>

      <ul className='flex flex-col gap-[7px] flex-1'>
        {course.topics.map((topic, idx) => (
          <li key={idx} className='relative pl-[18px] text-[13px] text-slate-500 leading-relaxed'>
            <span className='absolute left-0 text-[#10B981] font-bold text-[12px]'>✓</span>
            {topic}
          </li>
        ))}
      </ul>

      <div className='pt-0'>
        {onRegisterClick ? (
          <button
            type='button'
            onClick={onRegisterClick}
            className={`w-full py-2.5 px-5 rounded-lg text-sm font-semibold transition-colors ${
              isOutline
                ? 'border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white'
                : 'bg-blue-600 text-white hover:bg-blue-700'
            }`}
          >
            {registerText}
          </button>
        ) : (
          <Link
            href={linkHref}
            className={`w-full inline-flex justify-center py-2.5 px-5 rounded-lg text-sm font-semibold transition-colors ${
              isOutline
                ? 'border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white'
                : 'bg-blue-600 text-white hover:bg-blue-700'
            }`}
          >
            {registerText}
          </Link>
        )}
      </div>
    </div>
  )
}
