import React from 'react'

type AdvantageIconKey = 'check' | 'shield' | 'clock' | 'dollar'

function AdvantageIcon({ icon }: { icon: AdvantageIconKey }) {
  switch (icon) {
    case 'check':
      return (
        <svg width='24' height='24' viewBox='0 0 24 24' fill='none'>
          <path d='M22 11.08V12a10 10 0 11-5.93-9.14' stroke='currentColor' strokeWidth='1.8' strokeLinecap='round'/>
          <path d='M22 4L12 14.01l-3-3' stroke='currentColor' strokeWidth='1.8' strokeLinecap='round' strokeLinejoin='round'/>
        </svg>
      )
    case 'shield':
      return (
        <svg width='24' height='24' viewBox='0 0 24 24' fill='none'>
          <path d='M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z' stroke='currentColor' strokeWidth='1.8' strokeLinecap='round' strokeLinejoin='round'/>
        </svg>
      )
    case 'clock':
      return (
        <svg width='24' height='24' viewBox='0 0 24 24' fill='none'>
          <circle cx='12' cy='12' r='10' stroke='currentColor' strokeWidth='1.8'/>
          <path d='M12 6v6l4 2' stroke='currentColor' strokeWidth='1.8' strokeLinecap='round'/>
        </svg>
      )
    case 'dollar':
      return (
        <svg width='24' height='24' viewBox='0 0 24 24' fill='none'>
          <path d='M12 1v22M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6' stroke='currentColor' strokeWidth='1.8' strokeLinecap='round' strokeLinejoin='round'/>
        </svg>
      )
  }
}

export interface AdvantageItem {
  icon: AdvantageIconKey
  title: string
  description: string
}

interface AdvantagesSectionProps {
  tag?: string
  title: string
  description?: string
  ctaText?: string
  items: AdvantageItem[]
  onCtaClick: () => void
}

export function AdvantagesSection({
  tag,
  title,
  description,
  ctaText = 'Получить консультацию',
  items,
  onCtaClick,
}: AdvantagesSectionProps) {
  return (
    <section className='py-[72px] bg-slate-50'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-11 lg:gap-[72px] items-center'>
          {/* Left: text + CTA */}
          <div className='flex flex-col items-start gap-3.5'>
            {tag && (
              <span className='inline-block bg-blue-100 text-blue-600 text-[12px] font-bold tracking-[0.08em] uppercase px-3 py-1 rounded-full'>
                {tag}
              </span>
            )}
            <h2 className='text-[clamp(22px,4vw,34px)] font-extrabold text-slate-900 leading-tight'>
              {title}
            </h2>
            {description && (
              <p className='text-base text-slate-500 leading-relaxed'>{description}</p>
            )}
            <button
              onClick={onCtaClick}
              className='mt-1 inline-flex items-center justify-center bg-blue-600 text-white px-6 py-2.5 rounded-lg hover:bg-blue-700 active:bg-blue-800 transition-colors text-sm font-semibold'
            >
              {ctaText}
            </button>
          </div>

          {/* Right: advantage items */}
          <div className='flex flex-col gap-[22px]'>
            {items.map((item, i) => (
              <div key={i} className='flex gap-3.5 items-start'>
                <div className='w-[46px] h-[46px] shrink-0 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center'>
                  <AdvantageIcon icon={item.icon as AdvantageIconKey} />
                </div>
                <div>
                  <p className='text-[15px] font-bold text-slate-900 mb-1'>{item.title}</p>
                  <p className='text-[13px] text-slate-500 leading-relaxed'>{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
