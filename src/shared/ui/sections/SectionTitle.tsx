import React from 'react'

interface SectionTitleProps {
  title: string
  subtitle?: string
  className?: string
}

export const SectionTitle: React.FC<SectionTitleProps> = ({ title, subtitle, className = '' }) => {
  return (
    <div className={`mb-12 ${className}`}>
      <h1 className='text-2xl md:text-3xl font-bold text-gray-900 mb-4 mx-auto text-center md:max-w-none'>
        {title}
      </h1>
      {subtitle && <p className='text-xl text-gray-600 mx-auto text-justify'>{subtitle}</p>}
    </div>
  )
}
