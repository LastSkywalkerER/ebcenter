import { Locale } from '@/shared/i18n/config'
import { getLocalePath } from '@/shared/lib/localePath'
import { BackIcon } from '@/shared/ui/icons/ServiceIcons'
import Link from 'next/link'
import React from 'react'

interface BackButtonProps {
  /** Path without locale, e.g. /services or /training */
  path: string
  text: string
  locale: Locale
}

export const BackButton: React.FC<BackButtonProps> = ({ path, text, locale }) => {
  return (
    <Link
      href={getLocalePath(locale, path)}
      className='inline-flex items-center text-sm text-slate-500 hover:text-slate-800 mb-6 transition-colors gap-1'
    >
      <BackIcon />
      {text}
    </Link>
  )
}
