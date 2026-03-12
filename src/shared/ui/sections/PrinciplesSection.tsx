import React from 'react'

export type PrincipleItem = {
  icon: string
  title: string
  description: string
}

interface PrinciplesSectionProps {
  sectionTag?: string
  sectionTitle: string
  items: PrincipleItem[]
  className?: string
}

export const PrinciplesSection: React.FC<PrinciplesSectionProps> = ({
  sectionTag,
  sectionTitle,
  items,
  className = '',
}) => {
  if (!items?.length) return null

  return (
    <section className={`py-[72px] bg-[#1A2E52] text-white ${className}`}>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='text-center mb-[52px]'>
          {sectionTag && (
            <span className='inline-block bg-white/[0.18] text-white/95 text-[12px] font-bold tracking-[0.08em] uppercase px-3 py-1 rounded-full mb-3.5'>
              {sectionTag}
            </span>
          )}
          <h2 className='text-[clamp(22px,4vw,34px)] font-extrabold text-white leading-tight'>
            {sectionTitle}
          </h2>
        </div>
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5'>
          {items.map((item, index) => (
            <div
              key={index}
              className='bg-white/[0.06] border border-white/10 rounded-xl p-7 flex flex-col hover:bg-white/10 transition-colors'
            >
              <div className='text-[36px] font-black text-white/15 leading-none mb-2.5'>
                {String(index + 1).padStart(2, '0')}
              </div>
              <h3 className='text-[17px] font-bold text-white mb-2'>{item.title}</h3>
              <p className='text-[13px] text-white/70 leading-relaxed'>{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
