import i18n from 'i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import Backend from 'i18next-resources-to-backend'
import { initReactI18next } from 'react-i18next'

// Динамическая загрузка переводов
const backend = Backend((language: string) => {
  return import(`./locales/${language}.json`)
})

i18n
  .use(backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: 'ru',
    lng: 'ru', // default language

    interpolation: {
      escapeValue: false, // react already does escaping
    },

    detection: {
      order: ['path', 'localStorage', 'navigator'],
      caches: ['localStorage'],
    },

    react: {
      useSuspense: false, // важно для SSR
    },

    // Настройки для работы с Next.js
    load: 'languageOnly',
    preload: ['ru', 'en'],

    // Отключаем некоторые функции для упрощения
    saveMissing: false,
    updateMissing: false,
  })

export default i18n
