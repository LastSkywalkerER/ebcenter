import React from 'react'

const iconClass = 'w-10 h-10'

/** Lightning bolt — Speed */
export const SpeedIcon: React.FC = () => (
  <svg className={`${iconClass} text-amber-500`} fill='none' stroke='currentColor' viewBox='0 0 24 24'>
    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M13 10V3L4 14h7v7l9-11h-7z' />
  </svg>
)

/** Check in circle — Accuracy */
export const AccuracyIcon: React.FC = () => (
  <svg className={`${iconClass} text-blue-600`} fill='none' stroke='currentColor' viewBox='0 0 24 24'>
    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z' />
  </svg>
)

/** Handshake — Honesty */
export const HonestyIcon: React.FC = () => (
  <svg className={`${iconClass} text-blue-600`} fill='none' stroke='currentColor' viewBox='0 0 24 24'>
    <path
      strokeLinecap='round'
      strokeLinejoin='round'
      strokeWidth={2}
      d='M7 11.5V14m0-2.5v-6a1.5 1.5 0 113 0m-3 6a1.5 1.5 0 00-3 0v2a7.5 7.5 0 0015 0v-5a1.5 1.5 0 00-3 0m-6-3V11m0-5.5v-1a7.5 7.5 0 0115 0v1m-15 0a1.5 1.5 0 013 0m3 0a1.5 1.5 0 00-3 0m3 0h1m-9 0H7m9 0h10'
    />
  </svg>
)

/** Wallet — Fixed price */
export const FixedPriceIcon: React.FC = () => (
  <svg className={`${iconClass} text-blue-600`} fill='none' stroke='currentColor' viewBox='0 0 24 24'>
    <path
      strokeLinecap='round'
      strokeLinejoin='round'
      strokeWidth={2}
      d='M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z'
    />
  </svg>
)

export type PrincipleIconKey = 'speed' | 'accuracy' | 'honesty' | 'fixedPrice'

export function getPrincipleIcon(key: PrincipleIconKey): React.ReactNode {
  switch (key) {
    case 'speed':
      return <SpeedIcon />
    case 'accuracy':
      return <AccuracyIcon />
    case 'honesty':
      return <HonestyIcon />
    case 'fixedPrice':
      return <FixedPriceIcon />
    default:
      return <AccuracyIcon />
  }
}
