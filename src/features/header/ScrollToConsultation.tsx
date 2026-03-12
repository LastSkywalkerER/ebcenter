'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'

export function ScrollToConsultation() {
  const pathname = usePathname()

  useEffect(() => {
    if (typeof window === 'undefined') return
    const hash = window.location.hash.slice(1)
    if (!hash) return
    const t = setTimeout(() => {
      document.getElementById(hash)?.scrollIntoView({ block: 'start', behavior: 'smooth' })
    }, 100)
    return () => clearTimeout(t)
  }, [pathname])

  return null
}
