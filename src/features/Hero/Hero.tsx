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
}: HeroProps) => {
  const imageSrc = backgroundImageUrl || '/images/hero-bg.png'
  const offset = useParallax(0.1)

  return (
    <section className='relative h-[calc(100vh-68px)] min-h-[400px] bg-slate-900 overflow-hidden flex flex-col'>
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
      <div className='relative flex-1 flex flex-col max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-10 w-full min-h-0'>
        <div className='flex-1 flex items-center py-8'>
          <div className='max-w-2xl'>
            {badge && (
              <div className='inline-block bg-white/[0.14] text-white/[0.92] text-[12px] font-bold tracking-[0.07em] uppercase py-[5px] px-3.5 rounded-full mb-[22px] border border-white/20'>
                {badge}
              </div>
            )}
            <h1 className='text-4xl sm:text-5xl md:text-[56px] font-bold mb-4 text-white leading-[1.08] tracking-tight'>
              {title}
            </h1>
            <p className='text-base md:text-lg mb-8 text-slate-300 leading-relaxed'>{subtitle}</p>
            <div className='flex flex-col sm:flex-row gap-3'>
              <Link
                href={ctaLink.startsWith('#') || ctaLink.startsWith('/') ? ctaLink : `/${ctaLink}`}
                className='inline-flex items-center justify-center bg-blue-600 text-white px-7 py-3 rounded-lg hover:bg-blue-700 active:bg-blue-800 transition-colors text-sm font-semibold shadow-lg shadow-blue-900/40 text-center'
              >
                {cta}
              </Link>
              <Link
                href={secondaryCtaLink}
                className='inline-flex items-center justify-center bg-white/10 backdrop-blur-sm border border-white/20 text-white px-7 py-3 rounded-lg hover:bg-white/20 transition-colors text-sm font-semibold text-center'
              >
                {training}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
