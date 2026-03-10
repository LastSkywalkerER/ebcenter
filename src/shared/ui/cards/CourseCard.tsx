import { Locale } from '@/shared/i18n/config'
import { getLocalePath } from '@/shared/lib/localePath'
import { CheckIcon } from '@/shared/ui/icons/ServiceIcons'
import Link from 'next/link'
import React from 'react'

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
  courseProgramText: string
  registerText: string
  courseDetailsText: string
}

export const CourseCard: React.FC<CourseCardProps> = ({
  course,
  locale,
  courseProgramText,
  registerText,
  courseDetailsText,
}) => {
  return (
    <div className='bg-white rounded-xl border border-slate-200 shadow-sm p-6 hover:border-blue-200 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 flex flex-col min-w-0'>
      <div className='flex-grow'>
        <div className='flex flex-col items-start mb-5'>
          <div className='inline-flex p-2.5 bg-blue-50 rounded-lg mb-3'>{course.icon}</div>
          <h2 className='text-base font-semibold text-slate-900 mb-1'>{course.title}</h2>
          <div className='flex items-center gap-2 text-xs text-slate-400'>
            <span>{course.duration}</span>
            <span>·</span>
            <span className='font-medium text-blue-600'>{course.price}</span>
          </div>
        </div>
        <div>
          <h3 className='text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2'>{courseDetailsText}</h3>
          <ul className='space-y-1.5'>
            {course.topics.map((topic, idx) => (
              <li key={idx} className='flex items-start gap-2'>
                <div className='w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0'>
                  <CheckIcon />
                </div>
                <span className='text-xs text-slate-600 leading-relaxed break-words'>{topic}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className='flex items-center gap-4 mt-5 pt-4 border-t border-slate-100'>
        <Link
          href={`${getLocalePath(locale, '/training')}?course=${encodeURIComponent(course.programSlug)}#registration`}
          className='text-sm font-medium text-blue-600 hover:text-blue-800 transition-colors inline-flex items-center gap-1'
        >
          {registerText}
          <svg className='w-3.5 h-3.5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M9 5l7 7-7 7' />
          </svg>
        </Link>
        <Link
          href={getLocalePath(locale, `/training/${course.programSlug}`)}
          className='text-sm text-slate-400 hover:text-slate-600 transition-colors'
        >
          {courseProgramText}
        </Link>
      </div>
    </div>
  )
}
