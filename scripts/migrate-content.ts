/**
 * Migrates i18n JSON content to Payload CMS.
 * Run: yarn migrate:content  (or: yarn payload run scripts/migrate-content.ts)
 * Requires: DATABASE_URL, PAYLOAD_SECRET (in .env), and migrations applied.
 */
import 'dotenv/config'
import type { Payload } from 'payload'
import { getPayload } from 'payload'
import config from '@payload-config'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type LocaleJson = Record<string, any>

export async function migrateContent(payload: Payload) {
  const ruJson: LocaleJson = (await import('../src/shared/i18n/locales/ru.json')).default
  const enJson: LocaleJson = (await import('../src/shared/i18n/locales/en.json')).default

  console.log('Migrating Site Settings...')
  const locales = ['ru', 'en'] as const
  const translations = [ruJson, enJson] as const
  for (let i = 0; i < locales.length; i++) {
    const locale = locales[i]
    const t = translations[i]
    await payload.updateGlobal({
      slug: 'site-settings',
      locale: locale as 'ru' | 'en',
      data: {
        heroTitle: t?.home?.hero?.title ?? '',
        heroSubtitle: t?.home?.hero?.subtitle ?? '',
        heroCta: t?.home?.hero?.cta ?? '',
        descriptionTitle: t?.home?.description?.title ?? '',
        descriptionText: t?.home?.description?.text ?? '',
        headerLogoText: t?.header?.logo ?? '',
        footerTitle: t?.footer?.companyInfo?.title ?? '',
        footerDescription: t?.footer?.companyInfo?.description ?? '',
        footerCopyright: t?.footer?.copyright ?? '',
        commonMore: t?.common?.more ?? '',
        commonTariffs: t?.common?.tariffs ?? '',
        commonRegister: t?.common?.register ?? '',
        commonSendRequest: t?.common?.sendRequest ?? '',
        commonCourseProgram: t?.common?.courseProgram ?? '',
        commonHome: t?.common?.home ?? '',
        commonServices: t?.common?.services ?? '',
        commonTraining: t?.common?.training ?? '',
        commonContacts: t?.common?.contacts ?? '',
        commonContactUs: t?.common?.contactUs ?? '',
        commonPhone: t?.common?.phone ?? '',
        commonEmail: t?.common?.email ?? '',
        commonAddress: t?.common?.address ?? '',
        commonWorkingHours: t?.common?.workingHours ?? '',
        commonName: t?.common?.name ?? '',
        commonMessage: t?.common?.message ?? '',
        commonSelectCourse: t?.common?.selectCourse ?? '',
        commonDisclaimer: t?.common?.disclaimer ?? '',
        commonPhoneError: t?.common?.phoneError ?? '',
        commonSuccess: t?.common?.success ?? '',
        commonError: t?.common?.error ?? '',
        commonSending: t?.common?.sending ?? '',
        commonSecurityCheck: t?.common?.securityCheck ?? '',
        commonSecurityError: t?.common?.securityError ?? '',
        commonUnp: t?.common?.unp ?? '',
        validationNameRequired: t?.common?.validation?.nameRequired ?? '',
        validationMessageRequired: t?.common?.validation?.messageRequired ?? '',
        validationEmailInvalid: t?.common?.validation?.emailInvalid ?? '',
        servicesTitle: t?.services?.title ?? '',
        servicesSubtitle: t?.services?.subtitle ?? '',
        backToServices: t?.services?.backToServices ?? '',
        backToService: t?.services?.backToService ?? '',
        notFoundTitle: t?.services?.notFound?.title ?? '',
        notFoundDescription: t?.services?.notFound?.description ?? '',
        trainingSubtitle: t?.training?.subtitle ?? '',
        courseDetails: t?.training?.courseDetails ?? '',
        registrationTitle: t?.training?.registration?.title ?? '',
        backToCourses: t?.training?.courseProgram?.backToCourses ?? '',
        inDevelopment: t?.training?.courseProgram?.inDevelopment ?? '',
        courseProgramTitle: t?.training?.courseProgram?.title ?? '',
      },
    })
    console.log(`  Site Settings (${locale}) updated`)

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    await (payload as any).updateGlobal({
      slug: 'contacts',
      locale,
      data: {
        contactPhone: t?.common?.contactInfo?.phone ?? '',
        contactEmail: t?.common?.contactInfo?.email ?? '',
        contactAddress: t?.common?.contactInfo?.address ?? '',
        contactWorkingHours: t?.common?.contactInfo?.workingHours ?? '',
        contactUnp: t?.common?.contactInfo?.unp ?? '',
        contactsTitle: t?.contacts?.title ?? '',
        contactsSubtitle: t?.contacts?.subtitle ?? '',
        contactInfoTitle: t?.contacts?.contactInfo?.title ?? '',
        formTitle: t?.contacts?.form?.title ?? '',
        phonePlaceholder: t?.contacts?.form?.phonePlaceholder ?? '',
      },
    })
    console.log(`  Contacts (${locale}) updated`)
  }

  console.log('Migrating Services...')
  const serviceKeys = Object.keys(ruJson?.services?.items ?? {})
  for (const key of serviceKeys) {
    const ruItem = ruJson?.services?.items?.[key]
    const enItem = enJson?.services?.items?.[key]
    if (!ruItem) continue

    const existing = await payload.find({
      collection: 'services',
      where: { key: { equals: key } },
      limit: 1,
    })

    const content = (ruJson?.services?.details?.[key]?.content ?? []).map(
      (item: string | string[]) =>
        typeof item === 'string'
          ? { text: item }
          : { text: Array.isArray(item) ? item.join('\n') : String(item) }
    )

    const hasTariffs = key in (ruJson?.services?.tariffs ?? {})
    let tariffItems: {
      name: string
      price: string
      description?: string
      features?: { feature: string }[]
    }[] = []
    if (hasTariffs) {
      const ruTariffs = ruJson?.services?.tariffs?.[key]?.items ?? []
      tariffItems = ruTariffs.map(
        (item: { name: string; price: string; description?: string; features?: string[] }) => ({
          name: item.name ?? '',
          price: item.price ?? '',
          description: item.description ?? undefined,
          features: (item.features ?? []).map((f: string) => ({ feature: f })),
        })
      )
    }

    const baseData = {
      key,
      slug: ruItem.slug ?? key,
      hasTariffs: !!hasTariffs,
      content,
      tariffItems,
    }

    if (existing.docs.length > 0) {
      const enTariffsRaw =
        enJson?.services?.tariffs?.[key]?.items ?? ruJson?.services?.tariffs?.[key]?.items ?? []
      const enTariffsData = enTariffsRaw.map(
        (item: { name: string; price: string; description?: string; features?: string[] }) => ({
          name: item.name ?? '',
          price: item.price ?? '',
          description: item.description ?? undefined,
          features: (item.features ?? []).map((f: string) => ({ feature: f })),
        })
      )
      for (const [locale, item] of [
        ['ru' as const, ruItem],
        ['en' as const, enItem ?? ruItem],
      ]) {
        await payload.update({
          collection: 'services',
          id: existing.docs[0].id,
          locale,
          data: {
            ...baseData,
            title: item?.title ?? ruItem.title,
            description: item?.description ?? ruItem.description,
            tariffItems: locale === 'ru' ? tariffItems : enTariffsData,
          },
        })
      }
    } else {
      await payload.create({
        collection: 'services',
        locale: 'ru',
        data: {
          ...baseData,
          title: ruItem.title,
          description: ruItem.description,
        },
      })
      if (enItem) {
        const created = await payload.find({
          collection: 'services',
          where: { key: { equals: key } },
          limit: 1,
        })
        if (created.docs[0]) {
          const enTariffs = enJson?.services?.tariffs?.[key]?.items ?? []
          await payload.update({
            collection: 'services',
            id: created.docs[0].id,
            locale: 'en',
            data: {
              title: enItem.title,
              description: enItem.description,
              tariffItems: enTariffs.map(
                (item: {
                  name: string
                  price: string
                  description?: string
                  features?: string[]
                }) => ({
                  name: item.name ?? '',
                  price: item.price ?? '',
                  description: item.description ?? undefined,
                  features: (item.features ?? []).map((f: string) => ({ feature: f })),
                })
              ),
            },
          })
        }
      }
    }
    console.log(`  Service ${key} migrated`)
  }

  console.log('Migrating Courses...')
  const courseKeys = Object.keys(ruJson?.training?.courses ?? {})
  for (const key of courseKeys) {
    const ruCourse = ruJson?.training?.courses?.[key]
    const enCourse = enJson?.training?.courses?.[key]
    if (!ruCourse) continue

    const ruProgram = ruJson?.training?.courseProgram?.programs?.[key]
    const enProgram = enJson?.training?.courseProgram?.programs?.[key]

    const programSections = (ruProgram?.sections ?? []).map(
      (section: { title: string; content: (string | string[])[] }) => ({
        title: section.title,
        content: (section.content ?? []).map((item: string | string[]) =>
          typeof item === 'string'
            ? { item }
            : { item: Array.isArray(item) ? item.join('\n') : String(item) }
        ),
      })
    )

    const existing = await payload.find({
      collection: 'courses',
      where: { key: { equals: key } },
      limit: 1,
    })

    const coursesSlugMap: Record<string, string> = {
      'express-course': 'express-course',
      'contract-price': 'contract-price',
      individual: 'individual',
    }
    const slug = coursesSlugMap[key] ?? key

    const baseData = {
      key,
      slug,
      topics: (ruCourse.topics ?? []).map((t: string) => ({ topic: t })),
      programSections,
    }

    if (existing.docs.length > 0) {
      await payload.update({
        collection: 'courses',
        id: existing.docs[0].id,
        locale: 'ru',
        data: {
          ...baseData,
          title: ruCourse.title,
          duration: ruCourse.duration,
          price: ruCourse.price,
        },
      })
      if (enCourse) {
        await payload.update({
          collection: 'courses',
          id: existing.docs[0].id,
          locale: 'en',
          data: {
            title: enCourse.title,
            duration: enCourse.duration,
            price: enCourse.price,
            topics: (enCourse.topics ?? []).map((t: string) => ({ topic: t })),
            programSections: (enProgram?.sections ?? []).map(
              (section: { title: string; content: (string | string[])[] }) => ({
                title: section.title,
                content: (section.content ?? []).map((item: string | string[]) =>
                  typeof item === 'string'
                    ? { item }
                    : { item: Array.isArray(item) ? item.join('\n') : String(item) }
                ),
              })
            ),
          },
        })
      }
    } else {
      await payload.create({
        collection: 'courses',
        locale: 'ru',
        data: {
          ...baseData,
          title: ruCourse.title,
          duration: ruCourse.duration,
          price: ruCourse.price,
        },
      })
      const created = await payload.find({
        collection: 'courses',
        where: { key: { equals: key } },
        limit: 1,
      })
      if (created.docs[0] && enCourse) {
        await payload.update({
          collection: 'courses',
          id: created.docs[0].id,
          locale: 'en',
          data: {
            title: enCourse.title,
            duration: enCourse.duration,
            price: enCourse.price,
            topics: (enCourse.topics ?? []).map((t: string) => ({ topic: t })),
            programSections: (enProgram?.sections ?? ruProgram?.sections ?? []).map(
              (section: { title: string; content: (string | string[])[] }) => ({
                title: section.title,
                content: (section.content ?? []).map((item: string | string[]) =>
                  typeof item === 'string'
                    ? { item }
                    : { item: Array.isArray(item) ? item.join('\n') : String(item) }
                ),
              })
            ),
          },
        })
      }
    }
    console.log(`  Course ${key} migrated`)
  }

  console.log('Migration complete!')
}

// Run when executed directly via `payload run` (not when imported by seed.ts)
const isMain = process.argv[1]?.endsWith('migrate-content.ts') ||
  process.argv[1]?.endsWith('migrate-content.js')
if (isMain) {
  if (!process.env.DATABASE_URL) {
    throw new Error('DATABASE_URL is not set.')
  }
  console.log('Starting content migration...')
  const payload = await getPayload({ config })
  await migrateContent(payload)
  process.exit(0)
}
