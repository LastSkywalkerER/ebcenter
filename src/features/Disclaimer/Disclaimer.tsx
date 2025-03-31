import { Locale } from '@/shared/i18n/config'
import { getTranslations } from '@/shared/i18n/utils'
import Link from 'next/link'

export default async function Disclaimer({ locale }: { locale: Locale }) {
  const t = await getTranslations(locale)

  return (
    <div className='bg-blue-50 border-b border-blue-100'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3'>
        <div className='flex items-center justify-center text-sm text-blue-700'>
          <span>{t.common.disclaimer}</span>
          <Link
            href='https://ebc.by'
            target='_blank'
            rel='noopener noreferrer'
            className='ml-1 font-medium hover:text-blue-800 underline'
          >
            ebc.by
          </Link>
        </div>
      </div>
    </div>
  )
}
