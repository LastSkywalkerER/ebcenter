import React from 'react'

interface SectionTitleProps {
  title: string
  subtitle?: string
  className?: string
  as?: 'h1' | 'h2' | 'h3'
  action?: React.ReactNode
  tag?: string
  /** Use for dark backgrounds (e.g. principles, CTA) */
  tagVariant?: 'default' | 'light'
}

export const SectionTitle: React.FC<SectionTitleProps> = ({ title, subtitle, className = '', as: Tag = 'h2', action, tag, tagVariant = 'default' }) => {
  const tagClass = tagVariant === 'light'
    ? 'inline-block bg-white/[0.18] text-white/95 text-[12px] font-bold tracking-[0.08em] uppercase px-3 py-1 rounded-full mb-3'
    : 'inline-block bg-blue-50 text-blue-600 text-[12px] font-bold tracking-[0.08em] uppercase px-3 py-1 rounded-full mb-3'
  return (
    <div className={`text-center mb-[52px] ${className}`}>
      {tag && (
        <span className={tagClass}>
          {tag}
        </span>
      )}
      <Tag className='text-[clamp(22px,4vw,34px)] font-extrabold text-slate-900 leading-tight mb-3.5'>
        {title}
      </Tag>
      {subtitle && (
        <p className='text-[16px] text-slate-500 max-w-[580px] mx-auto leading-[1.65]'>
          {subtitle}
        </p>
      )}
      {action && <div className='mt-3'>{action}</div>}
    </div>
  )
}
