import Image from 'next/image'
import type { Locale } from '@/shared/i18n/config'
import { textWithLinks } from '@/shared/lib/textWithLinks'

interface AboutStat {
  value: string
  label: string
}

interface AboutSectionProps {
  tag?: string
  title: string
  paragraphs: string[]
  avatarUrl?: string | null
  stats: AboutStat[]
  locale?: Locale
}

export function AboutSection({ tag, title, paragraphs, avatarUrl, stats, locale = 'ru' }: AboutSectionProps) {
  return (
    <section id="about" className="py-[72px] bg-white">
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='grid grid-cols-1 lg:grid-cols-[auto_1fr] gap-11 lg:gap-[72px] items-center'>
          {/* Avatar */}
          <div className='flex justify-center lg:justify-start'>
            {avatarUrl ? (
              <div className='w-[180px] h-[180px] lg:w-[200px] lg:h-[200px] rounded-full overflow-hidden relative shrink-0'>
                <Image src={avatarUrl} alt={title} fill className='object-cover' />
              </div>
            ) : (
              <div className='w-[180px] h-[180px] lg:w-[200px] lg:h-[200px] rounded-full bg-slate-50 border-2 border-dashed border-slate-200 flex items-center justify-center text-slate-400 shrink-0'>
                <svg width='64' height='64' viewBox='0 0 24 24' fill='none'>
                  <path d='M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2M12 11a4 4 0 100-8 4 4 0 000 8z' stroke='currentColor' strokeWidth='1.2' strokeLinecap='round' strokeLinejoin='round'/>
                </svg>
              </div>
            )}
          </div>

          {/* Content */}
          <div>
            {tag && (
              <span className='inline-block bg-blue-100 text-blue-600 text-[12px] font-bold tracking-[0.08em] uppercase px-3 py-1 rounded-full mb-3'>
                {tag}
              </span>
            )}
            <h2 className='text-[clamp(22px,4vw,34px)] font-extrabold text-slate-900 leading-tight mb-4 text-left'>
              {title}
            </h2>
            <div className='space-y-3.5 mb-5'>
              {paragraphs.map((p, i) => (
                <p key={i} className='text-[15px] text-slate-500 leading-[1.7]'>
                  {textWithLinks(p, locale)}
                </p>
              ))}
            </div>

            {stats.length > 0 && (
              <div className='flex flex-wrap gap-[22px] pt-5 mt-5 border-t border-slate-200'>
                {stats.map((stat, i) => (
                  <div key={i} className='flex flex-col gap-0.5'>
                    <strong className='text-[17px] font-extrabold text-[#1A2E52]'>{stat.value}</strong>
                    <span className='text-[12px] text-slate-500'>{stat.label}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
