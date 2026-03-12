'use client'

import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { i18n } from '@/shared/i18n/config'

const scrollToContacts = () => {
  document.getElementById('contacts')?.scrollIntoView({ block: 'start', behavior: 'smooth' })
}

interface OrderCallLinkProps {
  href: string
  children: React.ReactNode
  className?: string
  onClick?: () => void
}

export function OrderCallLink({ href, children, className, onClick }: OrderCallLinkProps) {
  const pathname = usePathname()
  const isHome = pathname === '/' || pathname === `/${i18n.defaultLocale}` || i18n.locales.some((loc) => pathname === `/${loc}`)

  const handleClick = () => {
    scrollToContacts()
    onClick?.()
  }

  if (isHome) {
    return (
      <button
        type='button'
        onClick={handleClick}
        className={className}
      >
        {children}
      </button>
    )
  }

  return (
    <Link href={href} className={className} onClick={onClick}>
      {children}
    </Link>
  )
}
