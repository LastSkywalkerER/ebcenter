import 'server-only'
import { cache } from 'react'
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
    courses: Record<string, Course>
    courseOrder: string[]
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

// Deep merge: CMS values take precedence, but empty strings fall back to JSON defaults
function mergeWithDefaults<T>(cms: T, defaults: T): T {
  if (typeof cms !== 'object' || cms === null) {
    return (typeof cms === 'string' && cms === '') ? defaults : cms
  }
  const result = { ...cms } as Record<string, unknown>
  for (const key of Object.keys(defaults as Record<string, unknown>)) {
    const cmsVal = (cms as Record<string, unknown>)[key]
    const defVal = (defaults as Record<string, unknown>)[key]
    if (typeof cmsVal === 'string' && cmsVal === '') {
      result[key] = defVal
    } else if (typeof cmsVal === 'object' && cmsVal !== null && !Array.isArray(cmsVal)) {
      result[key] = mergeWithDefaults(cmsVal, defVal)
    }
  }
  return result as T
}

async function _getTranslations(locale: Locale): Promise<Translations> {
  try {
    const { getSiteContent } = await import('@/shared/lib/payload')
    const cmsContent = await getSiteContent(locale)
    if (cmsContent) {
      const jsonTranslations = (await import(`./locales/${locale}.json`)).default as Translations
      return {
        ...mergeWithDefaults(cmsContent, jsonTranslations),
        admin: jsonTranslations.admin,
        login: jsonTranslations.login,
      }
    }
  } catch {
    // Fallback to JSON if Payload fails (e.g. DB not ready)
  }

  return (await import(`./locales/${locale}.json`)).default as Translations
}

// cache() deduplicates calls within the same request, no stale data across requests
export const getTranslations = cache(_getTranslations)

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
