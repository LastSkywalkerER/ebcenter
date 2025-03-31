import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Footer from '@/features/footer/Footer'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'EBCenter - Сметные работы и обучение',
  description: 'Услуги по составлению смет, Сметных работ и обучение сметному делу',
  keywords: 'смета, Сметные работы, обучение сметчиков, составление смет, сметное обслуживание',
  openGraph: {
    title: 'EBCenter - Сметные работы и обучение',
    description: 'Услуги по составлению смет, Сметных работ и обучение сметному делу',
    type: 'website',
    locale: 'ru_RU',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='ru'>
      <body className={inter.className}>
        <div className='min-h-screen flex flex-col'>
          {children}
          <Footer />
        </div>
      </body>
    </html>
  )
}
