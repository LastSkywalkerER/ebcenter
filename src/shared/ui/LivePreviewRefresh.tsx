'use client'

import { RefreshRouteOnSave as PayloadRefresh } from '@payloadcms/live-preview-react'
import { useRouter } from 'next/navigation'

export function LivePreviewRefresh() {
  const router = useRouter()
  const serverURL =
    process.env.NEXT_PUBLIC_SITE_URL ||
    process.env.NEXT_PUBLIC_BASE_URL ||
    (typeof window !== 'undefined' ? window.location.origin : 'http://localhost:3000')

  return (
    <PayloadRefresh
      refresh={() => router.refresh()}
      serverURL={serverURL}
    />
  )
}
