/**
 * Seeds default Pages (Home, Services, Training, Contacts) with block layouts.
 * Run: yarn payload run scripts/seed-pages.ts
 * Or called from scripts/seed.ts
 *
 * Uses Media from Payload (seeded by seed-media) for imageText blocks when available.
 */
import 'dotenv/config'
import type { Payload } from 'payload'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Block = { blockType: string; [key: string]: any }

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function layoutAsPayload(layout: Block[]): any {
  return layout
}

/** Get Media ID by alt (ru). Returns null if not found. */
async function getMediaIdByAlt(payload: Payload, altRu: string): Promise<number | null> {
  const result = await payload.find({
    collection: 'media',
    where: { alt: { equals: altRu } },
    limit: 1,
    locale: 'ru',
  })
  return result.docs[0]?.id ?? null
}

async function seedPages(payload: Payload) {
  const ruJson = (await import('../src/shared/i18n/locales/ru.json')).default
  const enJson = (await import('../src/shared/i18n/locales/en.json')).default

  // Resolve Media IDs for imageText blocks (from seed-media)
  const [nprMediaId, belsmetaMediaId] = await Promise.all([
    getMediaIdByAlt(payload, 'Нормативы НРР в Беларуси'),
    getMediaIdByAlt(payload, 'Работа в программе Belsmeta Cloud'),
  ])

  const nprImage = nprMediaId ? { image: nprMediaId } : { imageUrl: '/images/npr-normatives.png' }
  const belsmetaImage = belsmetaMediaId ? { image: belsmetaMediaId } : { imageUrl: '/images/belsmeta-section.png' }

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
          blockType: 'badge',
          items: [
            { text: 'Более 20\u202F000 часов практической работы со сметной документацией' },
          ],
        },
        { blockType: 'serviceList', sectionTitle: ruJson?.home?.services?.title ?? 'Основные услуги', limit: 3 },
        {
          blockType: 'principles',
          sectionTitle: 'Наши принципы работы',
          items: [
            { icon: 'speed', title: 'Скорость', description: 'Быстро выполняем' },
            { icon: 'accuracy', title: 'Точность', description: 'Актуальные нормы' },
            { icon: 'honesty', title: 'Честность', description: 'Прозрачные условия' },
            { icon: 'fixedPrice', title: 'Фиксированная цена', description: 'Стоимость заранее' },
          ],
        },
        { blockType: 'consultationForm' },
        {
          blockType: 'imageText',
          title: (ruJson?.home as { seo?: { nprTitle?: string } })?.seo?.nprTitle ?? 'Нормативы НРР в Беларуси',
          ...nprImage,
          linkUrl: 'https://belenir.com/',
          linkText: 'Подробнее о нормативах НРР',
          paragraphs: ((ruJson?.home as { seo?: { nprParagraphs?: string[] } })?.seo?.nprParagraphs ?? []).map((t) => ({ text: t })),
        },
        {
          blockType: 'imageText',
          title: (ruJson?.home as { seo?: { belsmetaTitle?: string } })?.seo?.belsmetaTitle ?? 'Работаем в Belsmeta Cloud',
          ...belsmetaImage,
          linkUrl: 'https://www.belsmeta.by/',
          linkText: 'Подробнее о программе Belsmeta',
          paragraphs: ((ruJson?.home as { seo?: { belsmetaParagraphs?: string[] } })?.seo?.belsmetaParagraphs ?? []).map((t) => ({ text: t })),
        },
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
          blockType: 'badge',
          items: [
            { text: 'Over 20,000 hours of practical work with estimate documentation' },
          ],
        },
        { blockType: 'serviceList', sectionTitle: enJson?.home?.services?.title ?? 'Main Services', limit: 3 },
        {
          blockType: 'principles',
          sectionTitle: 'Our principles of work',
          items: [
            { icon: 'speed', title: 'Speed', description: 'We deliver quickly' },
            { icon: 'accuracy', title: 'Accuracy', description: 'Up-to-date standards' },
            { icon: 'honesty', title: 'Honesty', description: 'Transparent terms' },
            { icon: 'fixedPrice', title: 'Fixed price', description: 'Cost agreed in advance' },
          ],
        },
        { blockType: 'consultationForm' },
        {
          blockType: 'imageText',
          title: (enJson?.home as { seo?: { nprTitle?: string } })?.seo?.nprTitle ?? 'NPR Normatives in Belarus',
          ...nprImage,
          linkUrl: 'https://belenir.com/',
          linkText: 'Learn more about NPR normatives',
          paragraphs: ((enJson?.home as { seo?: { nprParagraphs?: string[] } })?.seo?.nprParagraphs ?? []).map((t) => ({ text: t })),
        },
        {
          blockType: 'imageText',
          title: (enJson?.home as { seo?: { belsmetaTitle?: string } })?.seo?.belsmetaTitle ?? 'Working with Belsmeta Cloud',
          ...belsmetaImage,
          linkUrl: 'https://www.belsmeta.by/',
          linkText: 'Learn more about Belsmeta',
          paragraphs: ((enJson?.home as { seo?: { belsmetaParagraphs?: string[] } })?.seo?.belsmetaParagraphs ?? []).map((t) => ({ text: t })),
        },
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
