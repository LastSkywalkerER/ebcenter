import 'server-only'
import { Locale } from './config'

type TranslationValue = string | string[] | { [key: string]: TranslationValue }

export type Translations = {
  common: {
    more: string
    tariffs: string
    register: string
    sendRequest: string
    courseProgram: string
    home: string
    services: string
    training: string
    contactUs: string
    phone: string
    email: string
    address: string
    workingHours: string
    name: string
    message: string
    selectCourse: string
    disclaimer: string
  }
  header: {
    logo: string
    navigation: {
      home: string
      services: string
      training: string
      contacts: string
    }
    contact: {
      phone: string
      email: string
    }
  }
  home: {
    hero: {
      title: string
      subtitle: string
      cta: string
    }
    services: {
      title: string
      description: string
      items: {
        title: string
        description: string
      }[]
    }
    contact: {
      title: string
      address: string
      phone: string
      email: string
      workingHours: string
    }
  }
  services: {
    title: string
    subtitle: string
    items: {
      title: string
      description: string
    }[]
  }
  training: {
    title: string
    subtitle: string
    courseDetails: string
    registration: {
      title: string
      form: {
        name: string
        phone: string
        email: string
        course: string
        message: string
      }
    }
    courses: {
      express: {
        title: string
        duration: string
        price: string
        topics: string[]
      }
      contractPrice: {
        title: string
        duration: string
        price: string
        topics: string[]
      }
      individual: {
        title: string
        duration: string
        price: string
        topics: string[]
      }
    }
    courseProgram: {
      backToCourses: string
      inDevelopment: string
      title: string
      programs: {
        'express-course': {
          title: string
          sections: {
            title: string
            content: (string | string[])[]
          }[]
        }
        'contract-price': {
          title: string
          sections: {
            title: string
            content: (string | string[])[]
          }[]
        }
        individual: {
          title: string
          sections: {
            title: string
            content: (string | string[])[]
          }[]
        }
      }
    }
  }
  contacts: {
    title: string
    subtitle: string
    form: {
      name: string
      phone: string
      email: string
      message: string
      send: string
    }
  }
  footer: {
    companyInfo: {
      title: string
      description: string
      unp: string
      address: string
      workingHours: string
    }
    quickLinks: {
      title: string
      links: {
        home: string
        services: string
        training: string
        contacts: string
      }
    }
    contactInfo: {
      title: string
      phone: string
      email: string
    }
    copyright: string
  }
}

const translationsCache: Record<Locale, Translations | null> = {
  ru: null,
  en: null,
}

export async function getTranslations(locale: Locale): Promise<Translations> {
  if (translationsCache[locale]) {
    return translationsCache[locale]!
  }

  const translations = await import(`./locales/${locale}.json`)
  translationsCache[locale] = translations.default
  return translations.default
}

export async function getTranslation(locale: Locale, key: string): Promise<string | string[]> {
  const translations = await getTranslations(locale)
  const keys = key.split('.')
  let value: TranslationValue = translations

  for (const k of keys) {
    value = (value as { [key: string]: TranslationValue })?.[k]
    if (value === undefined) {
      console.warn(`Translation key "${key}" not found for locale "${locale}"`)
      return key
    }
  }

  return value as string | string[]
}
