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
          badge: 'Сметные услуги · Минск · РБ',
          title: ruJson?.home?.hero?.title ?? 'Профессиональная подготовка смет, актов и договоров',
          subtitle: ruJson?.home?.hero?.subtitle ?? 'Работаем по нормативам НРР 2017 и НРР 2022. Расчёты в программе Belsmeta. Точно, прозрачно и в срок.',
          cta: ruJson?.home?.hero?.cta ?? 'Получить консультацию',
          ctaLink: '#contacts',
          secondaryCta: ruJson?.common?.viewAllServices ?? 'Все услуги',
          secondaryCtaLink: '/services',
        },
        {
          blockType: 'badge',
          items: [{ text: 'Более 20\u202F000 часов практической работы со сметной документацией' }],
        },
        {
          blockType: 'stats',
          items: [
            { value: '20 000+', label: 'часов практической работы со сметной документацией' },
            { value: 'НРР 2022', label: 'Актуальная нормативная база расчёта смет' },
            { value: '100+', label: 'выполненных проектов для клиентов РБ' },
            { value: 'Belsmeta', label: 'Сертифицированная программа расчёта смет' },
          ],
        },
        {
          blockType: 'serviceList',
          sectionTag: 'Услуги',
          sectionTitle: 'Сметные услуги для строительства',
          sectionSubtitle: 'Полный спектр сметной документации по законодательству Республики Беларусь',
          limit: 0,
        },
        {
          blockType: 'advantages',
          tag: 'Преимущества',
          title: 'Почему выбирают нас',
          description: 'Работаем точно, прозрачно и в срок — ценим ваше время и репутацию',
          ctaText: ruJson?.common?.getConsultation ?? 'Получить консультацию',
          items: [
            { icon: 'check', title: 'Практикующий сметчик', description: 'Более 20 000 часов реальной работы с документацией — не теория, а живая практика' },
            { icon: 'shield', title: 'Работа по законодательству РБ', description: 'Все документы соответствуют нормативным требованиям Республики Беларусь' },
            { icon: 'clock', title: 'Быстрые сроки подготовки', description: 'Оперативная работа без потери качества — ваши дедлайны под контролем' },
            { icon: 'dollar', title: 'Прозрачное ценообразование', description: 'Стоимость фиксируется до старта работ — никаких неожиданных доплат' },
          ],
        },
        {
          blockType: 'principles',
          sectionTag: 'Принципы работы',
          sectionTitle: 'Как мы работаем',
          items: [
            { icon: 'accuracy', title: 'Точность расчётов', description: 'Актуальная нормативная база НРР и сертифицированное ПО Belsmeta гарантируют корректность каждой цифры' },
            { icon: 'honesty', title: 'Прозрачная стоимость', description: 'Называем стоимость до начала работы. Никаких скрытых платежей — только то, о чём договорились' },
            { icon: 'speed', title: 'Соблюдение сроков', description: 'Фиксируем сроки на этапе обсуждения и строго их соблюдаем — ваш проект не будет задержан' },
            { icon: 'fixedPrice', title: 'Конфиденциальность', description: 'Ваши данные и документы надёжно защищены. Работаем в рамках соглашения о неразглашении' },
          ],
        },
        {
          blockType: 'pricing',
          sectionTag: 'Тарифы',
          sectionTitle: 'Стоимость услуг',
          sectionDescription: 'Точная стоимость рассчитывается индивидуально — зависит от объёма и сложности задачи',
          cards: [
            {
              title: 'Разовая задача',
              description: 'Подходит для одноразовых запросов: одна смета, один акт или консультация',
              features: [
                { text: 'Локальная смета' },
                { text: 'Акт выполненных работ' },
                { text: 'Расчёт договорной цены' },
                { text: 'Консультация (1 час)' },
              ],
              ctaText: 'Узнать стоимость',
              isFeatured: false,
            },
            {
              title: 'Пакет документов',
              description: 'Комплексная подготовка пакета сметной документации для объекта',
              features: [
                { text: 'Несколько смет / актов' },
                { text: 'Договор подряда' },
                { text: 'Сметная документация проекта' },
                { text: 'Сопровождение и правки' },
              ],
              ctaText: 'Рассчитать стоимость',
              isFeatured: true,
              featuredBadge: 'Популярный',
            },
            {
              title: 'Обслуживание',
              description: 'Постоянное сметное сопровождение строительной организации',
              features: [
                { text: 'Ежемесячное сопровождение' },
                { text: 'Неограниченные правки' },
                { text: 'Приоритетные сроки' },
                { text: 'Консультации без ограничений' },
              ],
              ctaText: 'Обсудить условия',
              isFeatured: false,
            },
          ],
        },
        {
          blockType: 'knowledge',
          tag: 'База знаний',
          title: 'Сметное дело в строительстве РБ',
          paragraphs: [
            { text: 'Нормативная база ценообразования в строительстве Республики Беларусь основана на Нормативах расхода ресурсов — НРР 2017 и НРР 2022. Эти документы определяют порядок расчёта стоимости строительно-монтажных работ, нормы расхода материалов, затрат труда и работы машин и механизмов.' },
            { text: 'Для подготовки сметной документации применяется специализированное программное обеспечение Belsmeta — отечественная программа для составления смет, актов выполненных работ и расчёта договорной цены. Программа работает с актуальной нормативной базой и формирует все необходимые формы документов.' },
            { text: 'Правильно составленная сметная документация — основа финансовой безопасности строительного проекта. Она определяет стоимость работ, является основанием для расчётов между заказчиком и подрядчиком, а также контролирует целевое использование средств.' },
          ],
          articlesTitle: 'Рекомендуемые статьи',
          articleSource: 'featured',
        },
        {
          blockType: 'courseList',
          sectionTag: 'Обучение',
          sectionTitle: 'Курсы по сметному делу',
          sectionSubtitle: 'Практические курсы для начинающих и действующих сметчиков. Реальные задачи, не теория.',
        },
        {
          blockType: 'about',
          tag: 'О специалисте',
          title: 'Практикующий специалист по сметному делу',
          paragraphs: [
            { text: 'Занимаюсь подготовкой сметной документации для строительных организаций и частных заказчиков Беларуси. За годы работы накоплен обширный опыт в различных направлениях: жилищное, промышленное и дорожное строительство.' },
            { text: 'Работаю с нормативной базой НРР 2017 и НРР 2022, использую программу Belsmeta. Все документы строго соответствуют требованиям законодательства Республики Беларусь.' },
          ],
          stats: [
            { value: '20 000+', label: 'часов практики' },
            { value: 'НРР 2017/2022', label: 'нормативная база' },
            { value: 'Belsmeta', label: 'программа расчёта' },
          ],
        },
        {
          blockType: 'contactInfo',
          sectionTag: 'Контакты',
          sectionTitle: 'Получить консультацию',
          sectionDescription: 'Оставьте заявку — свяжемся в течение рабочего дня, обсудим задачу и предложим решение.',
        },
        { blockType: 'contactForm' },
      ],
      layoutEn: [
        {
          blockType: 'hero',
          badge: 'Estimating services · Minsk · Belarus',
          title: enJson?.home?.hero?.title ?? 'Professional preparation of estimates, acts and contracts',
          subtitle: enJson?.home?.hero?.subtitle ?? 'We work according to NRR 2017 and NRR 2022 standards. Calculations in Belsmeta. Accurate, transparent and on time.',
          cta: enJson?.home?.hero?.cta ?? 'Get consultation',
          ctaLink: '#contacts',
          secondaryCta: enJson?.common?.viewAllServices ?? 'All services',
          secondaryCtaLink: '/services',
        },
        {
          blockType: 'badge',
          items: [{ text: 'Over 20,000 hours of practical work with estimate documentation' }],
        },
        {
          blockType: 'stats',
          items: [
            { value: '20,000+', label: 'hours of practical work with estimate documentation' },
            { value: 'NRR 2022', label: 'Current regulatory base for estimate calculation' },
            { value: '100+', label: 'completed projects for RB clients' },
            { value: 'Belsmeta', label: 'Certified estimating software' },
          ],
        },
        {
          blockType: 'serviceList',
          sectionTag: 'Services',
          sectionTitle: 'Estimating services for construction',
          sectionSubtitle: 'Full range of estimate documentation under the legislation of the Republic of Belarus',
          limit: 0,
        },
        {
          blockType: 'advantages',
          tag: 'Advantages',
          title: 'Why choose us',
          description: 'We work accurately, transparently and on time — we value your time and reputation',
          ctaText: enJson?.common?.getConsultation ?? 'Get consultation',
          items: [
            { icon: 'check', title: 'Practicing estimator', description: 'Over 20,000 hours of real documentation work — not theory, but live practice' },
            { icon: 'shield', title: 'Work under RB legislation', description: 'All documents comply with regulatory requirements of the Republic of Belarus' },
            { icon: 'clock', title: 'Fast preparation', description: 'Efficient work without quality loss — your deadlines under control' },
            { icon: 'dollar', title: 'Transparent pricing', description: 'Cost is fixed before work starts — no unexpected surcharges' },
          ],
        },
        {
          blockType: 'principles',
          sectionTag: 'Principles of work',
          sectionTitle: 'How we work',
          items: [
            { icon: 'accuracy', title: 'Calculation accuracy', description: 'Current NRR regulatory base and certified Belsmeta software guarantee correctness of every number' },
            { icon: 'honesty', title: 'Transparent cost', description: 'We name the cost before starting work. No hidden fees — only what we agreed on' },
            { icon: 'speed', title: 'Meeting deadlines', description: 'We fix deadlines at the discussion stage and strictly adhere to them — your project will not be delayed' },
            { icon: 'fixedPrice', title: 'Confidentiality', description: 'Your data and documents are reliably protected. We work under a non-disclosure agreement' },
          ],
        },
        {
          blockType: 'pricing',
          sectionTag: 'Pricing',
          sectionTitle: 'Service cost',
          sectionDescription: 'Exact cost is calculated individually — depends on volume and complexity of the task',
          cards: [
            {
              title: 'One-time task',
              description: 'Suitable for one-time requests: one estimate, one act or consultation',
              features: [
                { text: 'Local estimate' },
                { text: 'Completion certificate' },
                { text: 'Contract price calculation' },
                { text: 'Consultation (1 hour)' },
              ],
              ctaText: 'Get price',
              isFeatured: false,
            },
            {
              title: 'Document package',
              description: 'Comprehensive preparation of estimate documentation package for the facility',
              features: [
                { text: 'Multiple estimates / acts' },
                { text: 'Construction contract' },
                { text: 'Project estimate documentation' },
                { text: 'Support and revisions' },
              ],
              ctaText: 'Calculate cost',
              isFeatured: true,
              featuredBadge: 'Popular',
            },
            {
              title: 'Maintenance',
              description: 'Ongoing estimate support for construction organization',
              features: [
                { text: 'Monthly support' },
                { text: 'Unlimited revisions' },
                { text: 'Priority deadlines' },
                { text: 'Unlimited consultations' },
              ],
              ctaText: 'Discuss terms',
              isFeatured: false,
            },
          ],
        },
        {
          blockType: 'knowledge',
          tag: 'Knowledge Base',
          title: 'Estimating in RB construction',
          paragraphs: [
            { text: 'The pricing regulatory base in construction of the Republic of Belarus is based on Natural Resource Consumption Standards — NRR 2017 and NRR 2022. These documents define the procedure for calculating the cost of construction and installation works, consumption rates of materials, labor costs and operation of machines and mechanisms.' },
            { text: 'Belsmeta specialized software is used for preparing estimate documentation — a domestic program for preparing estimates, completion certificates and contract price calculation. The program works with the current regulatory base and generates all necessary document forms.' },
            { text: 'Properly prepared estimate documentation is the basis of financial security for a construction project. It determines the cost of work, serves as the basis for settlements between the customer and the contractor, and also controls the targeted use of funds.' },
          ],
          articlesTitle: 'Recommended articles',
          articleSource: 'featured',
        },
        {
          blockType: 'courseList',
          sectionTag: 'Training',
          sectionTitle: 'Estimating courses',
          sectionSubtitle: 'Practical courses for beginners and working estimators. Real tasks, not theory.',
        },
        {
          blockType: 'about',
          tag: 'About',
          title: 'Practicing estimating specialist',
          paragraphs: [
            { text: 'I prepare estimate documentation for construction organizations and private clients in Belarus. Over the years of work, extensive experience has been accumulated in various areas: housing, industrial and road construction.' },
            { text: 'I work with the NRR 2017 and NRR 2022 regulatory base, use Belsmeta software. All documents strictly comply with the requirements of the legislation of the Republic of Belarus.' },
          ],
          stats: [
            { value: '20,000+', label: 'hours of practice' },
            { value: 'NRR 2017/2022', label: 'regulatory base' },
            { value: 'Belsmeta', label: 'calculation software' },
          ],
        },
        {
          blockType: 'contactInfo',
          sectionTag: 'Contacts',
          sectionTitle: 'Get consultation',
          sectionDescription: 'Leave a request — we will contact you within a working day, discuss the task and propose a solution.',
        },
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
  ]

  // Remove contacts page if it exists (no separate contacts page)
  const contactsPage = await payload.find({
    collection: 'pages',
    where: { slug: { equals: 'contacts' } },
    limit: 1,
  })
  if (contactsPage.docs.length > 0) {
    await payload.delete({ collection: 'pages', id: contactsPage.docs[0].id })
    console.log('  Page "contacts" removed (contacts only on main page)')
  }

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
