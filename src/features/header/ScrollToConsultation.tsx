'use client'

import { useEffect } from 'react'

export function ScrollToConsultation() {
  useEffect(() => {
    if (typeof window === 'undefined') return
    if (window.location.hash !== '#consultation') return
    const el = document.getElementById('consultation')
    if (el) {
      el.scrollIntoView({ block: 'center', behavior: 'smooth' })
    }
  }, [])

  return null
}
