import React from 'react'
import { SectionTitle } from '@/shared/ui/sections/SectionTitle'
import { getPrincipleIcon, type PrincipleIconKey } from '@/shared/ui/icons/PrincipleIcons'

export type PrincipleItem = {
  icon: PrincipleIconKey
  title: string
  description: string
}

interface PrinciplesSectionProps {
  sectionTitle: string
  items: PrincipleItem[]
  className?: string
}

export const PrinciplesSection: React.FC<PrinciplesSectionProps> = ({
  sectionTitle,
  items,
  className = '',
}) => {
  if (!items?.length) return null

  return (
    <section className={`py-16 bg-slate-50 ${className}`}>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <SectionTitle title={sectionTitle} className='mb-10' />
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6'>
          {items.map((item, index) => (
            <div
              key={index}
              className='bg-white rounded-xl border border-slate-200 shadow-sm p-6 flex flex-col min-h-[180px] text-center items-center'
            >
              <div className='mb-4'>
                {getPrincipleIcon((item.icon as PrincipleIconKey) ?? 'accuracy')}
              </div>
              <h3 className='text-base font-semibold text-slate-900 mb-2 leading-snug'>
                {item.title}
              </h3>
              <p className='text-sm text-slate-500 leading-relaxed flex-grow'>
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
