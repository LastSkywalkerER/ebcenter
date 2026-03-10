import React from 'react'

interface SectionTitleProps {
  title: string
  subtitle?: string
  className?: string
  as?: 'h1' | 'h2' | 'h3'
  action?: React.ReactNode
}

export const SectionTitle: React.FC<SectionTitleProps> = ({ title, subtitle, className = '', as: Tag = 'h2', action }) => {
  return (
    <div className={`mb-8 ${className}`}>
      <div className='flex items-stretch gap-5'>
        <div className='w-1 rounded-full bg-blue-600 shrink-0' />
        <div className='flex-1 min-w-0'>
          <Tag className='text-3xl md:text-4xl font-bold text-slate-900 tracking-tight leading-tight'>
            {title}
          </Tag>
          {subtitle && (
            <p className='mt-2 text-sm text-slate-400 leading-relaxed text-justify'>
              {subtitle}
            </p>
          )}
        </div>
        {action && <div className='shrink-0 self-center'>{action}</div>}
      </div>
    </div>
  )
}
