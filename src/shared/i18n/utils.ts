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
    contacts: string
    contactUs: string
    phone: string
    email: string
    address: string
    workingHours: string
    name: string
    message: string
    selectCourse: string
    disclaimer: string
    phoneError: string
    success: string
    error: string
    sending: string
    securityCheck: string
    securityError: string
    unp: string
    validation: {
      nameRequired: string
      messageRequired: string
      emailInvalid: string
    }
    contactInfo: {
      phone: string
      email: string
      address: string
      workingHours: string
      unp: string
    }
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
      email: string
      phone: string
      message: string
      submit: string
      phonePlaceholder: string
      phoneError: string
      success: string
      error: string
      sending: string
      securityCheck: string
      securityError: string
      validation: {
        nameRequired: string
        messageRequired: string
        emailInvalid: string
      }
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
  admin: {
    title: string
    welcome: string
    logout: string
    loading: string
    acts: {
      title: string
      notFound: string
      notFoundDescription: string
      number: string
      date: string
      quantity: string
      price: string
      total: string
      client: string
      downloadError: string
      selectedCount: string
      downloadReports: string
    }
    dialog: {
      addAct: string
      addClient: string
      client: string
      selectClient: string
      actNumber: string
      actNumberHint: string
      year: string
      month: string
      selectMonth: string
      quantity: string
      price: string
      total: string
      cancel: string
      save: string
      saving: string
      createActError: string
      createClientError: string
      name: string
      companyName: string
      requisites: string
      requisitesPlaceholder: string
      position: string
      positionPlaceholder: string
      initials: string
      initialsPlaceholder: string
      document: string
      documentPlaceholder: string
      contract: string
      contractPlaceholder: string
      required: string
    }
    filters: {
      client: string
      selectClient: string
      allClients: string
      period: string
      allPeriods: string
      addClient: string
      addAct: string
    }
  }
  login: {
    title: string
    email: string
    password: string
    login: string
    loggingIn: string
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
