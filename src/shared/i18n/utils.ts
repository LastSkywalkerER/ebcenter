import 'server-only'
import { Locale } from './config'

type TranslationValue = string | string[] | { [key: string]: TranslationValue }

type Translations = {
  common: {
    more: string
    tariffs: string
    register: string
    courseProgram: string
    sendRequest: string
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
      items: {
        estimates: {
          title: string
          description: string
        }
        acts: {
          title: string
          description: string
        }
        service: {
          title: string
          description: string
        }
      }
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
      estimateService: {
        title: string
        description: string
      }
      currentRepair: {
        title: string
        description: string
      }
      estimateDocs: {
        title: string
        description: string
      }
      contractPrice: {
        title: string
        description: string
      }
      contracts: {
        title: string
        description: string
      }
      reporting: {
        title: string
        description: string
      }
      localEstimates: {
        title: string
        description: string
      }
      consulting: {
        title: string
        description: string
      }
      selfService: {
        title: string
        description: string
      }
      individual: {
        title: string
        description: string
      }
    }
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
  }
  contacts: {
    title: string
    contactInfo: {
      title: string
      address: string
      addressValue: string
      phone: string
      phoneValue: string
      email: string
      emailValue: string
      unp: string
      unpValue: string
      workingHours: string
      workingHoursValue: string
    }
    form: {
      title: string
      name: string
      email: string
      phone: string
      message: string
      submit: string
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
      home: string
      services: string
      training: string
      contacts: string
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
