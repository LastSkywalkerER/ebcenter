import { Locale } from '@/shared/i18n/config'
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
    <div className='bg-white rounded-lg shadow-lg p-6 flex flex-col'>
      <div className='flex-grow'>
        <div className='text-center mb-6'>
          <div className='inline-block p-3 bg-blue-50 rounded-full mb-4'>{course.icon}</div>
          <h2 className='text-xl font-semibold text-gray-900 mb-2'>{course.title}</h2>
          <div className='flex justify-center space-x-4 text-sm text-gray-500 mb-4'>
            <span>{course.duration}</span>
            <span>•</span>
            <span>{course.price}</span>
          </div>
          <div className='text-left'>
            <h3 className='font-semibold text-gray-900 mb-2'>{courseDetailsText}</h3>
            <ul className='space-y-2 text-gray-600'>
              {course.topics.map((topic, idx) => (
                <li key={idx} className='flex items-start'>
                  <div className='w-5 h-5 text-blue-600 mr-2 mt-0.5'>
                    <CheckIcon />
                  </div>
                  {topic}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className='space-y-3 mt-auto'>
        <Link
          href={`/${locale}/training/${course.programSlug}`}
          className='block w-full bg-gray-100 text-gray-900 py-3 px-6 rounded-lg hover:bg-gray-200 transition-colors text-center'
        >
          {courseProgramText}
        </Link>
        <Link
          href='#registration'
          className='block w-full bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors text-center'
        >
          {registerText}
        </Link>
      </div>
    </div>
  )
}
