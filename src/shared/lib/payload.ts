import 'server-only'
import { getPayload } from 'payload'
import config from '@payload-config'
import type { Locale } from '@/shared/i18n/config'
import type { Translations } from '@/shared/i18n/utils'

export async function getSiteContent(locale: Locale): Promise<Translations | null> {
  try {
    const payload = await getPayload({ config })

    const [siteSettings, servicesResult, coursesResult] = await Promise.all([
      payload.findGlobal({ slug: 'site-settings', locale, fallbackLocale: false }),
      payload.find({ collection: 'services', locale, limit: 100, pagination: false }),
      payload.find({ collection: 'courses', locale, limit: 100, pagination: false }),
    ])

    const settings = siteSettings as unknown as Record<string, unknown>
    const services = servicesResult.docs
    const courses = coursesResult.docs

    const servicesItems: Record<string, { title: string; description: string; slug: string }> = {}
    for (const s of services) {
      const service = s as { key?: string; title?: string; description?: string; slug?: string }
      if (service.key) {
        servicesItems[service.key] = {
          title: service.title ?? '',
          description: service.description ?? '',
          slug: service.slug ?? service.key,
        }
      }
    }

    const servicesDetails: Record<
      string,
      { title: string; description: string; content: string[] }
    > = {}
    for (const s of services) {
      const service = s as {
        key?: string
        title?: string
        description?: string
        content?: { text: string }[]
      }
      if (service.key) {
        servicesDetails[service.key] = {
          title: service.title ?? '',
          description: service.description ?? '',
          content: (service.content ?? []).map((c) => c.text ?? '').filter(Boolean),
        }
      }
    }

    const servicesTariffs: Record<
      string,
      {
        title: string
        description: string
        items: { name: string; price: string; description?: string; features: string[] }[]
      }
    > = {}
    for (const s of services) {
      const service = s as {
        key?: string
        title?: string
        description?: string
        hasTariffs?: boolean
        tariffItems?: {
          name?: string
          price?: string
          description?: string
          features?: { feature?: string }[]
        }[]
      }
      if (service.key && service.hasTariffs && service.tariffItems) {
        servicesTariffs[service.key] = {
          title: service.title ?? '',
          description: service.description ?? '',
          items: service.tariffItems.map((t) => ({
            name: t.name ?? '',
            price: t.price ?? '',
            description: t.description,
            features: (t.features ?? []).map((f) => f.feature ?? '').filter(Boolean),
          })),
        }
      }
    }

    const coursesMap: Record<
      string,
      { title: string; duration: string; price: string; topics: string[] }
    > = {}
    for (const c of courses) {
      const course = c as {
        key?: string
        title?: string
        duration?: string
        price?: string
        topics?: { topic?: string }[]
      }
      if (course.key) {
        coursesMap[course.key] = {
          title: course.title ?? '',
          duration: course.duration ?? '',
          price: course.price ?? '',
          topics: (course.topics ?? []).map((t) => t.topic ?? '').filter(Boolean),
        }
      }
    }

    const programsMap: Record<
      string,
      { title: string; sections: { title: string; content: (string | string[])[] }[] }
    > = {}
    for (const c of courses) {
      const course = c as {
        key?: string
        title?: string
        programSections?: { title?: string; content?: { item?: string }[] }[]
      }
      if (course.key) {
        programsMap[course.key] = {
          title: course.title ?? '',
          sections: (course.programSections ?? []).map((sec) => ({
            title: sec.title ?? '',
            content: (sec.content ?? []).map((c) => c.item ?? '').filter(Boolean),
          })),
        }
      }
    }

    const t: Translations = {
      common: {
        more: (settings?.commonMore as string) ?? '',
        tariffs: (settings?.commonTariffs as string) ?? '',
        register: (settings?.commonRegister as string) ?? '',
        sendRequest: (settings?.commonSendRequest as string) ?? '',
        courseProgram: (settings?.commonCourseProgram as string) ?? '',
        home: (settings?.commonHome as string) ?? '',
        services: (settings?.commonServices as string) ?? '',
        training: (settings?.commonTraining as string) ?? '',
        contacts: (settings?.commonContacts as string) ?? '',
        contactUs: (settings?.commonContactUs as string) ?? '',
        phone: (settings?.commonPhone as string) ?? '',
        email: (settings?.commonEmail as string) ?? '',
        address: (settings?.commonAddress as string) ?? '',
        workingHours: (settings?.commonWorkingHours as string) ?? '',
        name: (settings?.commonName as string) ?? '',
        message: (settings?.commonMessage as string) ?? '',
        selectCourse: (settings?.commonSelectCourse as string) ?? '',
        disclaimer: (settings?.commonDisclaimer as string) ?? '',
        phoneError: (settings?.commonPhoneError as string) ?? '',
        success: (settings?.commonSuccess as string) ?? '',
        error: (settings?.commonError as string) ?? '',
        sending: (settings?.commonSending as string) ?? '',
        securityCheck: (settings?.commonSecurityCheck as string) ?? '',
        securityError: (settings?.commonSecurityError as string) ?? '',
        unp: (settings?.commonUnp as string) ?? '',
        validation: {
          nameRequired: (settings?.validationNameRequired as string) ?? '',
          messageRequired: (settings?.validationMessageRequired as string) ?? '',
          emailInvalid: (settings?.validationEmailInvalid as string) ?? '',
        },
        contactInfo: {
          phone: (settings?.contactPhone as string) ?? '',
          email: (settings?.contactEmail as string) ?? '',
          address: (settings?.contactAddress as string) ?? '',
          workingHours: (settings?.contactWorkingHours as string) ?? '',
          unp: (settings?.contactUnp as string) ?? '',
        },
      },
      header: {
        logo: (settings?.headerLogoText as string) ?? '',
        navigation: {
          home: (settings?.navHome as string) ?? '',
          services: (settings?.navServices as string) ?? '',
          training: (settings?.navTraining as string) ?? '',
          contacts: (settings?.navContacts as string) ?? '',
        },
        contact: {
          phone: (settings?.contactPhone as string) ?? '',
          email: (settings?.contactEmail as string) ?? '',
        },
      },
      home: {
        hero: {
          title: (settings?.heroTitle as string) ?? '',
          subtitle: (settings?.heroSubtitle as string) ?? '',
          cta: (settings?.heroCta as string) ?? '',
        },
        description: {
          title: (settings?.descriptionTitle as string) ?? (settings?.heroTitle as string) ?? '',
          text: (settings?.descriptionText as string) ?? (settings?.heroSubtitle as string) ?? '',
        } as { title: string; text: string },
        services: {
          title: (settings?.commonServices as string) ?? '',
          description: '',
          items: {
            estimates: servicesItems.estimateService ?? { title: '', description: '', slug: '' },
            acts: servicesItems.reporting ?? { title: '', description: '', slug: '' },
            service: servicesItems.estimateService ?? { title: '', description: '', slug: '' },
          },
        },
        contact: {
          title: '',
          address: (settings?.contactAddress as string) ?? '',
          phone: (settings?.contactPhone as string) ?? '',
          email: (settings?.contactEmail as string) ?? '',
          workingHours: (settings?.contactWorkingHours as string) ?? '',
        },
      },
      services: {
        title: (settings?.servicesTitle as string) ?? (settings?.commonServices as string) ?? '',
        subtitle: (settings?.servicesSubtitle as string) ?? '',
        backToServices: (settings?.backToServices as string) ?? '',
        backToService: (settings?.backToService as string) ?? '',
        notFound: {
          title: (settings?.notFoundTitle as string) ?? '',
          description: (settings?.notFoundDescription as string) ?? '',
        },
        items: servicesItems,
        details: servicesDetails,
        tariffs: servicesTariffs as Translations['services']['tariffs'],
      },
      training: {
        title: (settings?.commonTraining as string) ?? '',
        subtitle: (settings?.trainingSubtitle as string) ?? '',
        courseDetails: (settings?.courseDetails as string) ?? '',
        registration: {
          title: (settings?.registrationTitle as string) ?? '',
          form: {
            name: (settings?.commonName as string) ?? '',
            phone: (settings?.commonPhone as string) ?? '',
            email: (settings?.commonEmail as string) ?? '',
            course: (settings?.commonSelectCourse as string) ?? '',
            message: (settings?.commonMessage as string) ?? '',
          },
        },
        courses: coursesMap as unknown as Translations['training']['courses'],
        courseProgram: {
          backToCourses: (settings?.backToCourses as string) ?? '',
          inDevelopment: (settings?.inDevelopment as string) ?? '',
          title: (settings?.courseProgramTitle as string) ?? '',
          programs: programsMap as unknown as Translations['training']['courseProgram']['programs'],
        },
      },
      contacts: {
        title: (settings?.commonContacts as string) ?? '',
        subtitle: (settings?.contactsSubtitle as string) ?? '',
        contactInfo: {
          title: (settings?.contactInfoTitle as string) ?? '',
          address: (settings?.commonAddress as string) ?? '',
          addressValue: (settings?.contactAddress as string) ?? '',
          phone: (settings?.commonPhone as string) ?? '',
          phoneValue: (settings?.contactPhone as string) ?? '',
          email: (settings?.commonEmail as string) ?? '',
          emailValue: (settings?.contactEmail as string) ?? '',
          unp: (settings?.commonUnp as string) ?? '',
          unpValue: (settings?.contactUnp as string) ?? '',
          workingHours: (settings?.commonWorkingHours as string) ?? '',
          workingHoursValue: (settings?.contactWorkingHours as string) ?? '',
        },
        form: {
          title: (settings?.formTitle as string) ?? '',
          name: (settings?.commonName as string) ?? '',
          email: (settings?.commonEmail as string) ?? '',
          phone: (settings?.commonPhone as string) ?? '',
          message: (settings?.commonMessage as string) ?? '',
          submit: (settings?.commonSendRequest as string) ?? '',
          phonePlaceholder: (settings?.phonePlaceholder as string) ?? '',
          phoneError: (settings?.commonPhoneError as string) ?? '',
          success: (settings?.commonSuccess as string) ?? '',
          error: (settings?.commonError as string) ?? '',
          sending: (settings?.commonSending as string) ?? '',
          securityCheck: (settings?.commonSecurityCheck as string) ?? '',
          securityError: (settings?.commonSecurityError as string) ?? '',
          validation: {
            nameRequired: (settings?.validationNameRequired as string) ?? '',
            messageRequired: (settings?.validationMessageRequired as string) ?? '',
            emailInvalid: (settings?.validationEmailInvalid as string) ?? '',
          },
        },
      },
      footer: {
        companyInfo: {
          title: (settings?.footerTitle as string) ?? '',
          description: (settings?.footerDescription as string) ?? '',
          unp: (settings?.commonUnp as string) ?? '',
          address: (settings?.contactAddress as string) ?? '',
          workingHours: (settings?.contactWorkingHours as string) ?? '',
        },
        quickLinks: {
          title: (settings?.commonContacts as string) ?? '',
          home: (settings?.commonHome as string) ?? '',
          services: (settings?.commonServices as string) ?? '',
          training: (settings?.commonTraining as string) ?? '',
          contacts: (settings?.commonContacts as string) ?? '',
        },
        contactInfo: {
          title: (settings?.contactInfoTitle as string) ?? '',
          phone: (settings?.contactPhone as string) ?? '',
          email: (settings?.contactEmail as string) ?? '',
        },
        copyright: (settings?.footerCopyright as string) ?? '',
      },
      admin: {} as Translations['admin'],
      login: {} as Translations['login'],
    }

    return t
  } catch (err) {
    console.error('getSiteContent failed:', err)
    return null
  }
}

export async function getHeroImageUrl(locale: Locale): Promise<string | null> {
  try {
    const payload = await getPayload({ config })
    const settings = (await payload.findGlobal({ slug: 'site-settings', locale })) as {
      heroBackground?: { url?: string } | number
    }
    if (
      settings?.heroBackground &&
      typeof settings.heroBackground === 'object' &&
      'url' in settings.heroBackground
    ) {
      return settings.heroBackground.url ?? null
    }
    return null
  } catch {
    return null
  }
}

export async function getHeaderLogoUrl(locale: Locale): Promise<string | null> {
  try {
    const payload = await getPayload({ config })
    const settings = (await payload.findGlobal({ slug: 'site-settings', locale })) as {
      headerLogo?: { url?: string } | number
    }
    if (
      settings?.headerLogo &&
      typeof settings.headerLogo === 'object' &&
      'url' in settings.headerLogo
    ) {
      return settings.headerLogo.url ?? null
    }
    return null
  } catch {
    return null
  }
}
