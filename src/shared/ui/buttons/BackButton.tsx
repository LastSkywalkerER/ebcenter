import { Locale } from '@/shared/i18n/config'
import { BackIcon } from '@/shared/ui/icons/ServiceIcons'
import Link from 'next/link'
import React from 'react'

interface BackButtonProps {
  href: string
  text: string
  locale: Locale
}

export const BackButton: React.FC<BackButtonProps> = ({ href, text, locale }) => {
  return (
    <Link
      href={`/${locale}${href}`}
      className='inline-flex items-center text-gray-600 hover:text-gray-900 mb-8'
    >
      <BackIcon />
      {text}
    </Link>
  )
}
