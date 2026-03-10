'use client'

import { env } from '@/shared/config/env'
import { useEffect } from 'react'

function getDomain(): string | null {
  try {
    if (env.BASE_URL) return new URL(env.BASE_URL).hostname
  } catch {
    // Invalid URL
  }
  return null
}

export function PlausibleProvider() {
  useEffect(() => {
    const domain = getDomain()
    if (!domain) return

    // Dynamic import to avoid loading tracker on server (it uses `location` which is browser-only)
    import('@plausible-analytics/tracker').then(({ init }) => {
      init({
        domain,
        captureOnLocalhost: false,
      })
    })
  }, [])

  return null
}
