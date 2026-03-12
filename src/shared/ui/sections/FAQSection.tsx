'use client'

import { useState } from 'react'

interface FAQItem {
  question: string
  answer: string
}

interface FAQSectionProps {
  sectionTitle?: string
  sectionTag?: string
  items: FAQItem[]
}

export function FAQSection({ sectionTitle, sectionTag, items }: FAQSectionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  if (!items?.length) return null

  return (
    <section className='py-[60px] bg-slate-50'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        {(sectionTag || sectionTitle) && (
          <div className='text-center mb-8'>
            {sectionTag && (
              <span className='inline-block bg-blue-50 text-blue-600 text-[12px] font-bold tracking-[0.08em] uppercase px-3 py-1 rounded-full mb-3'>
                {sectionTag}
              </span>
            )}
            {sectionTitle && (
              <h2 className='text-[clamp(22px,4vw,34px)] font-extrabold text-slate-900 leading-tight'>
                {sectionTitle}
              </h2>
            )}
          </div>
        )}
        <div className='flex flex-col gap-2.5 max-w-3xl mx-auto'>
          {items.map((item, i) => {
            const isOpen = openIndex === i
            return (
              <div key={i} className='bg-white border border-slate-200 rounded-xl overflow-hidden'>
                <button
                  type='button'
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  className='w-full text-left flex justify-between items-center gap-3 px-5 py-[18px] text-[15px] font-semibold text-slate-900 hover:bg-slate-50 transition-colors'
                >
                  <span>{item.question}</span>
                  <svg
                    className={`w-4 h-4 shrink-0 text-slate-400 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
                    viewBox='0 0 16 16'
                    fill='none'
                    stroke='currentColor'
                    strokeWidth='2'
                  >
                    <path strokeLinecap='round' strokeLinejoin='round' d='M4 6l4 4 4-4'/>
                  </svg>
                </button>
                {isOpen && (
                  <div className='px-5 pb-[18px] text-[14px] text-slate-500 leading-relaxed'>
                    {item.answer}
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
