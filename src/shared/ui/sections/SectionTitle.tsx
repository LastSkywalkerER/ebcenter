import React from 'react'

interface SectionTitleProps {
  title: string
  subtitle?: string
  className?: string
  as?: 'h1' | 'h2' | 'h3'
}

export const SectionTitle: React.FC<SectionTitleProps> = ({ title, subtitle, className = '', as: Tag = 'h2' }) => {
  return (
    <div className={`mb-8 ${className}`}>
      <div className='flex items-stretch gap-5'>
        <div className='w-1 rounded-full bg-blue-600 shrink-0' />
        <div>
          <Tag className='text-3xl md:text-4xl font-bold text-slate-900 tracking-tight leading-tight'>
            {title}
          </Tag>
          {subtitle && (
            <p className='mt-2 text-sm text-slate-400 leading-relaxed text-justify'>
              {subtitle}
            </p>
          )}
        </div>
      </div>
    </div>
  )
}
