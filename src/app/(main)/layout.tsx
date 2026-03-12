import type { Metadata } from 'next'

export const metadata: Metadata = {
  icons: {
    icon: [
      { url: '/images/favicon-ps.png', sizes: '32x32', type: 'image/png' },
      { url: '/images/favicon-ps.png', sizes: '192x192', type: 'image/png' },
    ],
    apple: '/images/favicon-ps.png',
  },
}

export default function MainRootLayout({ children }: { children: React.ReactNode }) {
  return children
}
