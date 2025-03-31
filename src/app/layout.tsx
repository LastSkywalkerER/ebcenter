import { Analytics } from '@vercel/analytics/next'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'EBCenter - Сметные работы и обучение',
  description: 'Услуги по составлению смет, Сметных работ и обучение сметному делу',
  keywords: 'смета, Сметные работы, обучение сметчиков, составление смет, сметное обслуживание',
  icons: {
    icon: '/web-app-manifest-192x192.png',
  },
  openGraph: {
    title: 'EBCenter - Сметные работы и обучение',
    description: 'Услуги по составлению смет, Сметных работ и обучение сметному делу',
    type: 'website',
    locale: 'ru_RU',
    images: [
      {
        url: '/web-app-manifest-192x192.png',
        width: 192,
        height: 192,
        alt: 'EBCenter Logo',
      },
    ],
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
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
