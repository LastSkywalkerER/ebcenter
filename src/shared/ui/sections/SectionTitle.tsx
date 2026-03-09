import React from 'react'

interface SectionTitleProps {
  title: string
  subtitle?: string
  className?: string
  as?: 'h1' | 'h2' | 'h3'
}

export const SectionTitle: React.FC<SectionTitleProps> = ({ title, subtitle, className = '', as: Tag = 'h2' }) => {
  return (
    <div className={`mb-12 ${className}`}>
      <Tag className='text-2xl md:text-3xl font-bold text-gray-900 mb-4 mx-auto text-center md:max-w-none'>
        {title}
      </Tag>
      {subtitle && <p className='text-xl text-gray-600 mx-auto text-justify'>{subtitle}</p>}
    </div>
  )
}
