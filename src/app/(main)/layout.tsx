import type { Metadata } from 'next'

export const metadata: Metadata = {
  icons: {
    icon: [
      { url: '/favicon.png', sizes: '32x32', type: 'image/png' },
      { url: '/web-app-manifest-192x192.png', sizes: '192x192', type: 'image/png' },
    ],
    apple: '/apple-touch-icon.png',
  },
}

export default function MainRootLayout({ children }: { children: React.ReactNode }) {
  return children
}
