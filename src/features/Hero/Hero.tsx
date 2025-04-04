'use client'

import { useParallax } from '@/shared/hooks/useParallax'
import Image from 'next/image'
import Link from 'next/link'

interface HeroProps {
  title: string
  subtitle: string
  cta: string
  training: string
  locale: string
}

export const Hero = ({ title, subtitle, cta, training, locale }: HeroProps) => {
  const offset = useParallax(0.1)

  return (
    <section className='relative h-[600px] bg-gray-100 overflow-hidden'>
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
            src='/images/hero-bg.png'
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
        <div className='absolute inset-0 bg-black opacity-70' />
      </div>
      <div className='relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='max-w-3xl'>
            <h1 className='text-4xl sm:text-5xl md:text-7xl font-bold mb-6 text-white leading-tight'>
              {title}
            </h1>
            <p className='text-xl md:text-2xl mb-8 text-gray-200 text-justify'>{subtitle}</p>
            <div className='flex flex-col sm:flex-row gap-4'>
              <Link
                href={`/${locale}/services`}
                className='bg-blue-600 text-white px-8 py-4 rounded-lg hover:bg-blue-700 transition-colors text-lg font-semibold text-center'
              >
                {cta}
              </Link>
              <Link
                href={`/${locale}/training`}
                className='bg-white/10 backdrop-blur-sm text-white px-8 py-4 rounded-lg hover:bg-white/20 transition-colors text-lg font-semibold text-center'
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
