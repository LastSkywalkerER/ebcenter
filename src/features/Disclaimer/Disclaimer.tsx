import { getTranslations } from '@/i18n/utils'
import { Locale } from '@/i18n/config'

export default async function Disclaimer({ locale }: { locale: Locale }) {
  const t = getTranslations(locale)

  return (
    <div className='bg-blue-50 border-b border-blue-100'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3'>
        <div className='flex items-center justify-center text-sm text-blue-700'>
          <span>{t.common.disclaimer}</span>
          <a
            href='https://ebcenter.by'
            target='_blank'
            rel='noopener noreferrer'
            className='ml-1 font-medium hover:text-blue-800 underline'
          >
            ebc.by
          </a>
        </div>
      </div>
    </div>
  )
}
