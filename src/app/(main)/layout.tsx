import type { Metadata } from 'next'

export const metadata: Metadata = {
  icons: {
    icon: '/web-app-manifest-192x192.png',
  },
}

export default function MainRootLayout({ children }: { children: React.ReactNode }) {
  return children
}
