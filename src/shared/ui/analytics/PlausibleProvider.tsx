'use client'

import { init } from '@plausible-analytics/tracker'
import { env } from '@/shared/config/env'
import { useEffect } from 'react'

function getDomain(): string | null {
  if (env.PLAUSIBLE_DOMAIN) return env.PLAUSIBLE_DOMAIN

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

    init({
      domain,
      captureOnLocalhost: false,
    })
  }, [])

  return null
}
