'use client'

import { useParallax } from '@/shared/hooks/useParallax'
import Image from 'next/image'
import Link from 'next/link'

interface HeroProps {
  title: string
  subtitle: string
  cta: string
  training: string
  backgroundImageUrl?: string | null
  ctaLink?: string
  secondaryCtaLink?: string
  badge?: string | null
  badgeStrip?: string | null
}

export const Hero = ({
  title,
  subtitle,
  cta,
  training,
  backgroundImageUrl,
  ctaLink = '/services',
  secondaryCtaLink = '/training',
  badge,
  badgeStrip,
}: HeroProps) => {
  const imageSrc = backgroundImageUrl || '/images/hero-bg.png'
  const offset = useParallax(0.1)

  return (
    <section className='relative h-[580px] md:h-[640px] bg-slate-900 overflow-hidden'>
      <div className='absolute inset-0'>
        <div
          style={{
            transform: `translateY(calc(-20% + ${offset}px))`,
            transition: 'transform 0.1s ease-out',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
          }}
        >
          <Image
            src={imageSrc}
            alt={title}
            width={1920}
            height={1080}
            className='object-cover object-top'
            priority
            style={{
              minHeight: '150%',
            }}
          />
        </div>
        <div className='absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/55 to-slate-900/20' />
      </div>
      <div className='relative max-w-7xl mx-auto px-6 lg:px-8 h-full flex items-end pb-14 md:items-center md:pb-0'>
        <div className='max-w-2xl'>
          {badge && (
            <div className='inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/15 rounded-full px-4 py-1.5 mb-5'>
              <div className='w-1.5 h-1.5 rounded-full bg-blue-400' />
              <span className='text-xs font-medium text-white/80 tracking-wide'>{badge}</span>
            </div>
          )}
          <h1 className='text-4xl sm:text-5xl md:text-[56px] font-bold mb-4 text-white leading-[1.08] tracking-tight'>
            {title}
          </h1>
          <p className='text-base md:text-lg mb-8 text-slate-300 leading-relaxed'>{subtitle}</p>
          <div className='flex flex-col sm:flex-row gap-3'>
            <Link
              href={ctaLink.startsWith('/') ? ctaLink : `/${ctaLink}`}
              className='inline-flex items-center justify-center bg-blue-600 text-white px-7 py-3 rounded-lg hover:bg-blue-700 active:bg-blue-800 transition-colors text-sm font-semibold shadow-lg shadow-blue-900/40 text-center'
            >
              {cta}
            </Link>
            <Link
              href={secondaryCtaLink.startsWith('/') ? secondaryCtaLink : `/${secondaryCtaLink}`}
              className='inline-flex items-center justify-center bg-white/10 backdrop-blur-sm border border-white/20 text-white px-7 py-3 rounded-lg hover:bg-white/20 transition-colors text-sm font-semibold text-center'
            >
              {training}
            </Link>
          </div>
        </div>
      </div>
      {badgeStrip && (
        <div className='absolute bottom-0 left-0 right-0'>
          <div className='max-w-7xl mx-auto px-6 lg:px-8 pb-5'>
            <div className='flex items-center gap-3 bg-white/10 backdrop-blur-sm border border-white/15 rounded-xl px-5 py-3'>
              <svg className='w-4 h-4 text-blue-400 shrink-0' viewBox='0 0 16 16' fill='none' stroke='currentColor' strokeWidth='2'>
                <path strokeLinecap='round' strokeLinejoin='round' d='M2.5 8.5l3.5 3.5 7-7' />
              </svg>
              <span className='text-base text-white/80 leading-snug'>{badgeStrip}</span>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
