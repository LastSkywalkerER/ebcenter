import 'server-only'
import { Locale } from './config'

type TranslationValue =
  | string
  | string[]
  | { [key: string]: TranslationValue }
  | Array<{ [key: string]: TranslationValue }>
  | Course
  | Program
  | Section
  | Record<string, Course>
  | Record<string, Program>

type Course = {
  title: string
  duration: string
  price: string
  topics: string[]
}

type Section = {
  title: string
  content: (string | string[])[]
}

type Program = {
  title: string
  sections: Section[]
}

type CourseSlug = 'express' | 'contractPrice' | 'individual'
type ProgramSlug = 'express-course' | 'contract-price' | 'individual'

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
    description: {
      title: string
      text: string
    }
    services: {
      title: string
      description: string
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
    backToServices: string
    backToService: string
    notFound: {
      title: string
      description: string
    }
    items: {
      [key: string]: {
        title: string
        description: string
        slug: string
      }
    }
    details: {
      [key: string]: {
        title: string
        description: string
        content: string[]
      }
    }
    tariffs: {
      notFound: {
        title: string
        description: string
      }
    } & {
      [key: string]: {
        title: string
        description: string
        items: Array<{
          name: string
          price: string
          description: string
          features: string[]
        }>
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
    courses: Record<CourseSlug, Course>
    courseProgram: {
      backToCourses: string
      inDevelopment: string
      title: string
      programs: Record<ProgramSlug, Program>
    }
  }
  contacts: {
    title: string
    subtitle: string
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
      phone: string
      email: string
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
