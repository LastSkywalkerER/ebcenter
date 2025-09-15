'use client'

import { useEffect } from 'react'
import { I18nextProvider } from 'react-i18next'
import type { Locale } from './config'
import i18n from './i18n'

interface I18nProviderProps {
  children: React.ReactNode
  locale: Locale
}

export function I18nProvider({ children, locale }: I18nProviderProps) {
  useEffect(() => {
    // Устанавливаем язык при изменении locale
    i18n.changeLanguage(locale)
  }, [locale])

  return <I18nextProvider i18n={i18n}>{children}</I18nextProvider>
}
