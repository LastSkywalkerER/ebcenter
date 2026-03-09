import { Analytics } from '@vercel/analytics/next'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import '../globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  icons: {
    icon: '/web-app-manifest-192x192.png',
  },
}

export default function MainRootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='ru'>
      <body className={inter.className}>
        <div className='min-h-screen flex flex-col'>
          {children}

          <Analytics />
        </div>
      </body>
    </html>
  )
}
