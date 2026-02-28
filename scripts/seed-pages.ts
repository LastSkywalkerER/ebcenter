/**
 * Seeds default Pages (Home, Services, Training, Contacts) with block layouts.
 * Run: yarn payload run scripts/seed-pages.ts
 * Or called from scripts/seed.ts
 */
import 'dotenv/config'
import type { Payload } from 'payload'
import config from '@payload-config'
import { getPayload } from 'payload'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Block = { blockType: string; [key: string]: any }

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function layoutAsPayload(layout: Block[]): any {
  return layout
}

async function seedPages(payload: Payload) {
  const ruJson = (await import('../src/shared/i18n/locales/ru.json')).default
  const enJson = (await import('../src/shared/i18n/locales/en.json')).default

  const pages: Array<{
    slug: string
    titleRu: string
    titleEn: string
    showInNav: boolean
    navOrder: number
    layoutRu: Block[]
    layoutEn: Block[]
  }> = [
    {
      slug: 'home',
      titleRu: ruJson?.home?.hero?.title ?? 'Главная',
      titleEn: enJson?.home?.hero?.title ?? 'Home',
      showInNav: true,
      navOrder: 0,
      layoutRu: [
        {
          blockType: 'hero',
          title: ruJson?.home?.hero?.title ?? '',
          subtitle: ruJson?.home?.hero?.subtitle ?? '',
          cta: ruJson?.home?.hero?.cta ?? '',
          ctaLink: '/services',
          secondaryCta: ruJson?.common?.training ?? '',
          secondaryCtaLink: '/training',
        },
        {
          blockType: 'section',
          title: ruJson?.home?.description?.title ?? ruJson?.home?.hero?.title ?? '',
          subtitle: ruJson?.home?.description?.text ?? ruJson?.home?.hero?.subtitle ?? '',
        },
        { blockType: 'serviceList', limit: 3 },
        {
          blockType: 'section',
          title: ruJson?.contacts?.title ?? ruJson?.common?.contacts ?? '',
          subtitle: '',
        },
        { blockType: 'contactInfo' },
        { blockType: 'contactForm' },
      ],
      layoutEn: [
        {
          blockType: 'hero',
          title: enJson?.home?.hero?.title ?? '',
          subtitle: enJson?.home?.hero?.subtitle ?? '',
          cta: enJson?.home?.hero?.cta ?? '',
          ctaLink: '/services',
          secondaryCta: enJson?.common?.training ?? '',
          secondaryCtaLink: '/training',
        },
        {
          blockType: 'section',
          title: enJson?.home?.description?.title ?? enJson?.home?.hero?.title ?? '',
          subtitle: enJson?.home?.description?.text ?? enJson?.home?.hero?.subtitle ?? '',
        },
        { blockType: 'serviceList', limit: 3 },
        {
          blockType: 'section',
          title: enJson?.contacts?.title ?? enJson?.common?.contacts ?? '',
          subtitle: '',
        },
        { blockType: 'contactInfo' },
        { blockType: 'contactForm' },
      ],
    },
    {
      slug: 'services',
      titleRu: ruJson?.common?.services ?? 'Услуги',
      titleEn: enJson?.common?.services ?? 'Services',
      showInNav: true,
      navOrder: 1,
      layoutRu: [
        {
          blockType: 'section',
          title: ruJson?.services?.title ?? ruJson?.common?.services ?? '',
          subtitle: ruJson?.services?.subtitle ?? '',
        },
        { blockType: 'serviceList', limit: 0 },
      ],
      layoutEn: [
        {
          blockType: 'section',
          title: enJson?.services?.title ?? enJson?.common?.services ?? '',
          subtitle: enJson?.services?.subtitle ?? '',
        },
        { blockType: 'serviceList', limit: 0 },
      ],
    },
    {
      slug: 'training',
      titleRu: ruJson?.common?.training ?? 'Обучение',
      titleEn: enJson?.common?.training ?? 'Training',
      showInNav: true,
      navOrder: 2,
      layoutRu: [
        {
          blockType: 'section',
          title: ruJson?.training?.title ?? ruJson?.common?.training ?? '',
          subtitle: ruJson?.training?.subtitle ?? '',
        },
        { blockType: 'courseList' },
        { blockType: 'contactForm' },
      ],
      layoutEn: [
        {
          blockType: 'section',
          title: enJson?.training?.title ?? enJson?.common?.training ?? '',
          subtitle: enJson?.training?.subtitle ?? '',
        },
        { blockType: 'courseList' },
        { blockType: 'contactForm' },
      ],
    },
    {
      slug: 'contacts',
      titleRu: ruJson?.common?.contacts ?? 'Контакты',
      titleEn: enJson?.common?.contacts ?? 'Contacts',
      showInNav: true,
      navOrder: 3,
      layoutRu: [
        {
          blockType: 'section',
          title: ruJson?.contacts?.title ?? ruJson?.common?.contacts ?? '',
          subtitle: (ruJson?.contacts as { subtitle?: string })?.subtitle ?? '',
        },
        { blockType: 'contactInfo' },
        { blockType: 'contactForm' },
      ],
      layoutEn: [
        {
          blockType: 'section',
          title: enJson?.contacts?.title ?? enJson?.common?.contacts ?? '',
          subtitle: (enJson?.contacts as { subtitle?: string })?.subtitle ?? '',
        },
        { blockType: 'contactInfo' },
        { blockType: 'contactForm' },
      ],
    },
  ]

  for (const page of pages) {
    const existing = await payload.find({
      collection: 'pages',
      where: { slug: { equals: page.slug } },
      limit: 1,
    })

    if (existing.docs.length > 0) {
      const doc = existing.docs[0]
      await payload.update({
        collection: 'pages',
        id: doc.id,
        locale: 'ru',
        data: {
          title: page.titleRu,
          showInNav: page.showInNav,
          navOrder: page.navOrder,
          layout: layoutAsPayload(page.layoutRu),
        },
      })
      await payload.update({
        collection: 'pages',
        id: doc.id,
        locale: 'en',
        data: {
          title: page.titleEn,
          showInNav: page.showInNav,
          navOrder: page.navOrder,
          layout: layoutAsPayload(page.layoutEn),
        },
      })
      console.log(`  Page "${page.slug}" updated`)
    } else {
      await payload.create({
        collection: 'pages',
        locale: 'ru',
        data: {
          slug: page.slug,
          title: page.titleRu,
          showInNav: page.showInNav,
          navOrder: page.navOrder,
          layout: layoutAsPayload(page.layoutRu),
        },
      })
      const created = await payload.find({
        collection: 'pages',
        where: { slug: { equals: page.slug } },
        limit: 1,
      })
      if (created.docs[0]) {
        await payload.update({
          collection: 'pages',
          id: created.docs[0].id,
          locale: 'en',
          data: {
            title: page.titleEn,
            layout: layoutAsPayload(page.layoutEn),
          },
        })
      }
      console.log(`  Page "${page.slug}" created`)
    }
  }
}

export { seedPages }
