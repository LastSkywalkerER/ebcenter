import type { Locale } from '@/shared/i18n/config'
import type { Metadata } from 'next'
import { notFound, redirect } from 'next/navigation'
import { getPageBySlug, getServiceBySlug, getCourseBySlug, getSiteMeta, getKnowledgeArticles, getKnowledgeArticleBySlug } from '@/shared/lib/payload'
import { getTranslations } from '@/shared/i18n/utils'
import { BlockRenderer } from '@/shared/ui/blocks/BlockRenderer'
import { BackButton } from '@/shared/ui/buttons/BackButton'
import { ServicesPageContent } from '@/shared/ui/sections/ServicesPageContent'
import { TrainingPageContent } from '@/shared/ui/sections/TrainingPageContent'
import { env } from '@/shared/config/env'
import { buildAlternates } from '@/shared/lib/alternates'
import { RenderRichText } from '@/shared/ui/richtext/RenderRichText'
import { getLocalePath } from '@/shared/lib/localePath'

type PageProps = {
  params: Promise<{ locale: Locale; slug?: string[] }>
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>
}

function getPageSlugForMeta(slugSegments: string[] | undefined): string | null {
  const slug = slugSegments ?? []
  if (slug.length === 0) return 'home'
  if (slug.length === 1 && ['services', 'training'].includes(slug[0])) return slug[0]
  if (slug.length === 1) return slug[0]
  return null
}

function slugToPath(slug: string[]): string {
  if (slug.length === 0) return ''
  return '/' + slug.join('/')
}

function buildOgMetadata(ogImageUrl: string | null, title: string | null | undefined) {
  if (!ogImageUrl) return {}
  return {
    openGraph: {
      images: [{ url: ogImageUrl, width: 1200, height: 630, alt: title ?? undefined }],
    },
    twitter: {
      card: 'summary_large_image' as const,
      images: [ogImageUrl],
    },
  }
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale, slug: slugSegments } = await params
  const slug = slugSegments ?? []

  const baseUrl = env.BASE_URL || ''

  // Service detail: /services/{slug}
  if (slug.length === 2 && slug[0] === 'services') {
    const service = await getServiceBySlug(slug[1], locale)
    if (!service) return {}
    const title = service.metaTitle ?? service.title ?? null
    const description = service.metaDescription ?? service.description ?? null
    const ogImageUrl = service.ogImage && typeof service.ogImage === 'object' && 'url' in service.ogImage ? (service.ogImage.url ?? null) : null
    const path = slugToPath(slug)
    return {
      ...(title && { title }),
      ...(description && { description }),
      ...buildOgMetadata(ogImageUrl, title),
      alternates: buildAlternates(baseUrl, locale, path),
    }
  }

  // Tariffs: /services/{slug}/tariffs — inherit from service
  if (slug.length === 3 && slug[0] === 'services' && slug[2] === 'tariffs') {
    const service = await getServiceBySlug(slug[1], locale)
    if (!service) return {}
    const title = service.metaTitle ?? service.title ?? null
    const path = slugToPath(slug)
    return {
      ...(title && { title }),
      ...(service.metaDescription && { description: service.metaDescription }),
      alternates: buildAlternates(baseUrl, locale, path),
    }
  }

  // Course detail: /training/{slug}
  if (slug.length === 2 && slug[0] === 'training') {
    const course = await getCourseBySlug(slug[1], locale)
    if (!course) return {}
    const title = course.metaTitle ?? course.title ?? null
    const ogImageUrl = course.ogImage && typeof course.ogImage === 'object' && 'url' in course.ogImage ? (course.ogImage.url ?? null) : null
    const path = slugToPath(slug)
    return {
      ...(title && { title }),
      ...(course.metaDescription && { description: course.metaDescription }),
      ...buildOgMetadata(ogImageUrl, title),
      alternates: buildAlternates(baseUrl, locale, path),
    }
  }

  // Knowledge list: /knowledge
  if (slug.length === 1 && slug[0] === 'knowledge') {
    const page = await getPageBySlug('knowledge', locale)
    return {
      title: page?.metaTitle ?? (locale === 'ru' ? 'База знаний | ProSmety' : 'Knowledge Base | ProSmety'),
      description: page?.metaDescription ?? (locale === 'ru' ? 'Статьи и материалы по сметному делу в строительстве' : 'Articles and materials on construction estimating'),
      alternates: buildAlternates(baseUrl, locale, '/knowledge'),
    }
  }

  // Knowledge article: /knowledge/{slug}
  if (slug.length === 2 && slug[0] === 'knowledge') {
    const article = await getKnowledgeArticleBySlug(slug[1], locale)
    if (!article) return {}
    return {
      title: article.metaTitle ?? article.title ?? undefined,
      description: article.metaDescription ?? article.description ?? undefined,
      alternates: buildAlternates(baseUrl, locale, `/knowledge/${slug[1]}`),
    }
  }

  // Services list: /services — with fallback meta
  if (slug.length === 1 && slug[0] === 'services') {
    const page = await getPageBySlug('services', locale)
    return {
      title: page?.metaTitle ?? (locale === 'ru' ? 'Сметные услуги | ProSmety' : 'Estimate Services | ProSmety'),
      description: page?.metaDescription ?? (locale === 'ru' ? 'Профессиональные сметные услуги для строительства в Республике Беларусь' : 'Professional estimate services for construction in Belarus'),
      alternates: buildAlternates(baseUrl, locale, '/services'),
    }
  }

  // Training list: /training — with fallback meta
  if (slug.length === 1 && slug[0] === 'training') {
    const page = await getPageBySlug('training', locale)
    return {
      title: page?.metaTitle ?? (locale === 'ru' ? 'Обучение сметному делу | ProSmety' : 'Estimating Training | ProSmety'),
      description: page?.metaDescription ?? (locale === 'ru' ? 'Курсы по сметному делу для начинающих и специалистов' : 'Estimating courses for beginners and professionals'),
      alternates: buildAlternates(baseUrl, locale, '/training'),
    }
  }

  const pageSlug = getPageSlugForMeta(slugSegments)
  if (!pageSlug) return {}
  const page = await getPageBySlug(pageSlug, locale)
  if (!page?.metaTitle && !page?.metaDescription) return {}
  const ogImage = page.ogImage && typeof page.ogImage === 'object' && 'url' in page.ogImage ? (page.ogImage.url ?? null) : null
  const path = slugToPath(slug)
  return {
    ...(page.metaTitle && { title: page.metaTitle }),
    ...(page.metaDescription && { description: page.metaDescription }),
    ...buildOgMetadata(ogImage, page.metaTitle),
    alternates: buildAlternates(baseUrl, locale, path),
  }
}

export default async function DynamicPage({ params, searchParams }: PageProps) {
  const { locale, slug: slugSegments } = await params
  const slug = slugSegments ?? []
  const pathSlug = slug.join('/')

  const [t, meta] = await Promise.all([getTranslations(locale), getSiteMeta(locale)])

  // Home: slug = []
  if (slug.length === 0) {
    const page = await getPageBySlug('home', locale)
    if (!page?.layout?.length) {
      // Fallback: render default home if no page configured
      const fallbackPage = await getPageWithFallback('home', locale, t)
      if (fallbackPage) {
        return (
          <main className='flex-grow'>
            <BlockRenderer blocks={fallbackPage} locale={locale} translations={t} heroBackgroundUrl={meta.heroBackgroundUrl} />
          </main>
        )
      }
      notFound()
    }
    // Pre-fetch knowledge articles if a knowledge block is present
    const hasKnowledgeBlock = page.layout.some(b => b.blockType === 'knowledge')
    const knowledgeArticlesRaw = hasKnowledgeBlock ? await getKnowledgeArticles(locale, 5, true) : []
    const knowledgeArticles = knowledgeArticlesRaw.map(a => ({
      title: a.title ?? '',
      slug: a.slug ?? '',
      href: getLocalePath(locale, `/knowledge/${a.slug}`),
    }))
    // Override hero CTA from CMS: left = Services, right = Training
    const homeBlocks = page.layout.map((b) =>
      b.blockType === 'hero'
        ? { ...b, cta: t.common.services, secondaryCta: t.common.training, ctaLink: '/services', secondaryCtaLink: '/training' }
        : b
    )
    return (
      <main className='flex-grow'>
        <BlockRenderer blocks={homeBlocks} locale={locale} translations={t} heroBackgroundUrl={meta.heroBackgroundUrl} knowledgeArticles={knowledgeArticles} />
      </main>
    )
  }

  // Services list: slug = ['services']
  if (slug.length === 1 && slug[0] === 'services') {
    return (
      <main className='flex-grow'>
        <ServicesPageContent translations={t} />
      </main>
    )
  }

  // Service detail / tariffs: redirect to /services#slug (no separate pages)
  if (slug.length === 2 && slug[0] === 'services') {
    redirect(getLocalePath(locale, `/services#${slug[1]}`))
  }
  if (slug.length === 3 && slug[0] === 'services' && slug[2] === 'tariffs') {
    redirect(getLocalePath(locale, `/services#${slug[1]}`))
  }

  // Training list: slug = ['training']
  if (slug.length === 1 && slug[0] === 'training') {
    const searchParamsRes = searchParams != null ? await searchParams : undefined
    const courseSlugRaw = searchParamsRes?.course
    const courseSlug = typeof courseSlugRaw === 'string' ? courseSlugRaw : Array.isArray(courseSlugRaw) ? courseSlugRaw[0] : undefined
    const courseTitle =
      typeof courseSlug === 'string' && courseSlug
        ? (t.training.courses as Record<string, { title?: string }>)[courseSlug]?.title
        : undefined
    const initialMessageForForm =
      courseTitle != null
        ? (locale === 'ru'
            ? `Здравствуйте. Я хотел бы записаться на курс «${courseTitle}».`
            : `Hello. I would like to register for the course "${courseTitle}".`)
        : undefined

    return (
      <main className='flex-grow'>
        <TrainingPageContent translations={t} initialMessage={initialMessageForForm} />
      </main>
    )
  }

  // Course detail: redirect to /training#slug (no separate page)
  if (slug.length === 2 && slug[0] === 'training') {
    redirect(getLocalePath(locale, `/training#${slug[1]}`))
  }

  // Knowledge base list: slug = ['knowledge']
  if (slug.length === 1 && slug[0] === 'knowledge') {
    const articles = await getKnowledgeArticles(locale, 0, false)
    return (
      <main className='flex-grow bg-white'>
        <div className='border-b border-slate-100 bg-slate-50'>
          <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10'>
            <h1 className='text-2xl md:text-3xl font-bold text-slate-900 tracking-tight'>
              {locale === 'ru' ? 'База знаний' : 'Knowledge Base'}
            </h1>
            <p className='mt-2 text-slate-500 text-sm'>
              {locale === 'ru' ? 'Статьи по сметному делу в строительстве' : 'Articles on construction estimating'}
            </p>
          </div>
        </div>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12'>
          {articles.length === 0 ? (
            <p className='text-slate-500'>{locale === 'ru' ? 'Статьи ещё не добавлены' : 'No articles yet'}</p>
          ) : (
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
              {articles.map((article) => (
                <a
                  key={article.id}
                  href={getLocalePath(locale, `/knowledge/${article.slug}`)}
                  className='flex flex-col gap-2 bg-white border border-slate-200 rounded-xl p-6 hover:border-blue-500 hover:shadow-md transition-all'
                >
                  <h2 className='text-[15px] font-bold text-slate-900'>{article.title}</h2>
                  {article.description && (
                    <p className='text-[13px] text-slate-500 line-clamp-2'>{article.description}</p>
                  )}
                  <span className='mt-auto text-[13px] font-semibold text-blue-600'>
                    {locale === 'ru' ? 'Читать →' : 'Read →'}
                  </span>
                </a>
              ))}
            </div>
          )}
        </div>
      </main>
    )
  }

  // Knowledge article: slug = ['knowledge', articleSlug]
  if (slug.length === 2 && slug[0] === 'knowledge') {
    const articleSlug = slug[1]
    const article = await getKnowledgeArticleBySlug(articleSlug, locale)
    if (!article) notFound()
    const knowledgePath = locale === 'ru' ? '/knowledge' : `/${locale}/knowledge`
    return (
      <main className='flex-grow bg-white'>
        <div className='border-b border-slate-100 bg-slate-50'>
          <div className='max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10'>
            <BackButton path='/knowledge' text={locale === 'ru' ? '← База знаний' : '← Knowledge Base'} locale={locale} />
            <h1 className='mt-2 text-2xl md:text-3xl font-bold text-slate-900 tracking-tight'>{article.title}</h1>
            {article.description && (
              <p className='mt-2 text-slate-500 text-sm leading-relaxed max-w-2xl'>{article.description}</p>
            )}
          </div>
        </div>
        <div className='max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12'>
          <div className='prose prose-gray max-w-none'>
            <RenderRichText content={article.content} />
          </div>
          <div className='mt-10 pt-6 border-t border-slate-100'>
            <a href={knowledgePath} className='text-sm font-medium text-blue-600 hover:text-blue-800'>
              {locale === 'ru' ? '← Все статьи' : '← All articles'}
            </a>
          </div>
        </div>
      </main>
    )
  }

  // Contacts: redirect to home#contacts (contacts only on main page)
  if (slug.length === 1 && slug[0] === 'contacts') {
    redirect(`${getLocalePath(locale, '')}#contacts`)
  }

  // Custom page: slug = ['custom-slug']
  const page = await getPageBySlug(pathSlug, locale)
  if (!page?.layout?.length) notFound()

  const hasKnowledgeBlock = page.layout.some(b => b.blockType === 'knowledge')
  const knowledgeArticlesRaw = hasKnowledgeBlock ? await getKnowledgeArticles(locale, 5, true) : []
  const knowledgeArticles = knowledgeArticlesRaw.map(a => ({
    title: a.title ?? '',
    slug: a.slug ?? '',
    href: getLocalePath(locale, `/knowledge/${a.slug}`),
  }))

  return (
    <main className='flex-grow'>
      <BlockRenderer blocks={page.layout} locale={locale} translations={t} heroBackgroundUrl={meta.heroBackgroundUrl} knowledgeArticles={knowledgeArticles} />
    </main>
  )
}

async function getPageWithFallback(
  slug: string,
  locale: Locale,
  t: Awaited<ReturnType<typeof getTranslations>>
): Promise<Array<{ blockType: string; [key: string]: unknown }> | null> {
  // Provide default blocks for main pages when no Page exists yet (e.g. before seed)
  const defaults: Record<string, Array<{ blockType: string; [key: string]: unknown }>> = {
    home: [
      {
        blockType: 'hero',
        title: t.home.hero.title,
        subtitle: t.home.hero.subtitle,
        cta: t.common.services,
        secondaryCta: t.common.training,
        ctaLink: '/services',
        secondaryCtaLink: '/training',
        badge: locale === 'ru' ? 'Сметные услуги · Минск · РБ' : 'Estimating services · Minsk · Belarus',
      },
      {
        blockType: 'stats',
        items: [
          { value: '20\u202F000+', label: locale === 'ru' ? 'часов практической работы со сметной документацией' : 'hours of practical work' },
          { value: 'НРР 2022', label: locale === 'ru' ? 'Актуальная нормативная база расчёта смет' : 'Current regulatory base' },
          { value: '100+', label: locale === 'ru' ? 'выполненных проектов для клиентов РБ' : 'completed projects' },
          { value: 'Belsmeta', label: locale === 'ru' ? 'Сертифицированная программа расчёта смет' : 'Certified estimating software' },
        ],
      },
      {
        blockType: 'serviceList',
        limit: 0,
        sectionTitle: locale === 'ru' ? 'Сметные услуги для строительства' : 'Estimating services',
        sectionSubtitle: locale === 'ru' ? 'Полный спектр сметной документации по законодательству Республики Беларусь' : 'Full range of estimating documentation',
      },
      {
        blockType: 'advantages',
        tag: locale === 'ru' ? 'Преимущества' : 'Advantages',
        title: locale === 'ru' ? 'Почему выбирают нас' : 'Why choose us',
        description: locale === 'ru' ? 'Работаем точно, прозрачно и в срок — ценим ваше время и репутацию' : 'We work accurately, transparently and on time',
        ctaText: locale === 'ru' ? 'Получить консультацию' : 'Get consultation',
        items: [
          { icon: 'check', title: locale === 'ru' ? 'Практикующий сметчик' : 'Practicing estimator', description: locale === 'ru' ? 'Более 20 000 часов реальной работы с документацией — не теория, а живая практика' : 'Over 20,000 hours of real documentation work' },
          { icon: 'shield', title: locale === 'ru' ? 'Работа по законодательству РБ' : 'Work under RB legislation', description: locale === 'ru' ? 'Все документы соответствуют нормативным требованиям Республики Беларусь' : 'All documents comply with RB regulatory requirements' },
          { icon: 'clock', title: locale === 'ru' ? 'Быстрые сроки подготовки' : 'Fast preparation', description: locale === 'ru' ? 'Оперативная работа без потери качества — ваши дедлайны под контролем' : 'Fast work without quality loss' },
          { icon: 'dollar', title: locale === 'ru' ? 'Прозрачное ценообразование' : 'Transparent pricing', description: locale === 'ru' ? 'Стоимость фиксируется до старта работ — никаких неожиданных доплат' : 'Cost is fixed before work starts' },
        ],
      },
      {
        blockType: 'principles',
        sectionTitle: locale === 'ru' ? 'Как мы работаем' : 'How we work',
        items: [
          { icon: 'accuracy', title: locale === 'ru' ? 'Точность расчётов' : 'Calculation accuracy', description: locale === 'ru' ? 'Актуальная нормативная база НРР и сертифицированное ПО Belsmeta гарантируют корректность каждой цифры' : 'Current NRR regulatory base and certified Belsmeta software guarantee the correctness of every number' },
          { icon: 'honesty', title: locale === 'ru' ? 'Прозрачная стоимость' : 'Transparent cost', description: locale === 'ru' ? 'Называем стоимость до начала работы. Никаких скрытых платежей — только то, о чём договорились' : 'We name the cost before starting work. No hidden fees' },
          { icon: 'speed', title: locale === 'ru' ? 'Соблюдение сроков' : 'Meeting deadlines', description: locale === 'ru' ? 'Фиксируем сроки на этапе обсуждения и строго их соблюдаем — ваш проект не будет задержан' : 'We fix deadlines at the discussion stage and strictly adhere to them' },
          { icon: 'fixedPrice', title: locale === 'ru' ? 'Конфиденциальность' : 'Confidentiality', description: locale === 'ru' ? 'Ваши данные и документы надёжно защищены. Работаем в рамках соглашения о неразглашении' : 'Your data and documents are reliably protected' },
        ],
      },
      {
        blockType: 'pricing',
        sectionTitle: locale === 'ru' ? 'Стоимость услуг' : 'Service pricing',
        sectionDescription: locale === 'ru' ? 'Точная стоимость рассчитывается индивидуально — зависит от объёма и сложности задачи' : 'Exact cost is calculated individually',
        cards: [
          {
            title: locale === 'ru' ? 'Разовая задача' : 'One-time task',
            description: locale === 'ru' ? 'Подходит для одноразовых запросов: одна смета, один акт или консультация' : 'Suitable for one-time requests',
            features: [
              { text: locale === 'ru' ? 'Локальная смета' : 'Local estimate' },
              { text: locale === 'ru' ? 'Акт выполненных работ' : 'Completion certificate' },
              { text: locale === 'ru' ? 'Расчёт договорной цены' : 'Contract price calculation' },
              { text: locale === 'ru' ? 'Консультация (1 час)' : 'Consultation (1 hour)' },
            ],
            ctaText: locale === 'ru' ? 'Узнать стоимость' : 'Get price',
            isFeatured: false,
          },
          {
            title: locale === 'ru' ? 'Пакет документов' : 'Document package',
            description: locale === 'ru' ? 'Комплексная подготовка пакета сметной документации для объекта' : 'Comprehensive preparation of estimating documentation',
            features: [
              { text: locale === 'ru' ? 'Несколько смет / актов' : 'Multiple estimates / acts' },
              { text: locale === 'ru' ? 'Договор подряда' : 'Construction contract' },
              { text: locale === 'ru' ? 'Сметная документация проекта' : 'Project estimating documentation' },
              { text: locale === 'ru' ? 'Сопровождение и правки' : 'Support and revisions' },
            ],
            ctaText: locale === 'ru' ? 'Рассчитать стоимость' : 'Calculate price',
            isFeatured: true,
            featuredBadge: locale === 'ru' ? 'Популярный' : 'Popular',
          },
          {
            title: locale === 'ru' ? 'Обслуживание' : 'Maintenance',
            description: locale === 'ru' ? 'Постоянное сметное сопровождение строительной организации' : 'Ongoing estimating support',
            features: [
              { text: locale === 'ru' ? 'Ежемесячное сопровождение' : 'Monthly support' },
              { text: locale === 'ru' ? 'Неограниченные правки' : 'Unlimited revisions' },
              { text: locale === 'ru' ? 'Приоритетные сроки' : 'Priority deadlines' },
              { text: locale === 'ru' ? 'Консультации без ограничений' : 'Unlimited consultations' },
            ],
            ctaText: locale === 'ru' ? 'Обсудить условия' : 'Discuss terms',
            isFeatured: false,
          },
        ],
      },
      {
        blockType: 'knowledge',
        tag: locale === 'ru' ? 'База знаний' : 'Knowledge Base',
        title: locale === 'ru' ? 'Сметное дело в строительстве РБ' : 'Estimating in RB construction',
        paragraphs: [
          { text: locale === 'ru' ? 'Нормативная база ценообразования в строительстве Республики Беларусь основана на Нормативах расхода ресурсов — НРР 2017 и НРР 2022. Эти документы определяют порядок расчёта стоимости строительно-монтажных работ, нормы расхода материалов, затрат труда и работы машин и механизмов.' : 'The pricing regulatory base in RB construction is based on NRR 2017 and NRR 2022 standards.' },
          { text: locale === 'ru' ? 'Для подготовки сметной документации применяется специализированное программное обеспечение Belsmeta — отечественная программа для составления смет, актов выполненных работ и расчёта договорной цены. Программа работает с актуальной нормативной базой и формирует все необходимые формы документов.' : 'Belsmeta software is used for preparing estimating documentation.' },
          { text: locale === 'ru' ? 'Правильно составленная сметная документация — основа финансовой безопасности строительного проекта. Она определяет стоимость работ, является основанием для расчётов между заказчиком и подрядчиком, а также контролирует целевое использование средств.' : 'Properly prepared estimating documentation is the basis of financial security for a construction project.' },
        ],
        articlesTitle: locale === 'ru' ? 'Рекомендуемые статьи' : 'Recommended articles',
        articleSource: 'featured',
      },
      {
        blockType: 'courseList',
        sectionTitle: locale === 'ru' ? 'Курсы по сметному делу' : 'Estimating courses',
        sectionSubtitle: locale === 'ru' ? 'Практические курсы для начинающих и действующих сметчиков. Реальные задачи, не теория.' : 'Practical courses for beginners and working estimators.',
      },
      {
        blockType: 'about',
        tag: locale === 'ru' ? 'О специалисте' : 'About',
        title: locale === 'ru' ? 'Практикующий специалист по сметному делу' : 'Practicing estimating specialist',
        paragraphs: [
          { text: locale === 'ru' ? 'Занимаюсь подготовкой сметной документации для строительных организаций и частных заказчиков Беларуси. За годы работы накоплен обширный опыт в различных направлениях: жилищное, промышленное и дорожное строительство.' : 'I prepare estimating documentation for construction organizations and private clients in Belarus.' },
          { text: locale === 'ru' ? 'Работаю с нормативной базой НРР 2017 и НРР 2022, использую программу Belsmeta. Все документы строго соответствуют требованиям законодательства Республики Беларусь.' : 'I work with the NRR 2017 and NRR 2022 regulatory base, using Belsmeta software.' },
        ],
        stats: [
          { value: '20\u202F000+', label: locale === 'ru' ? 'часов практики' : 'hours of practice' },
          { value: 'НРР 2017/2022', label: locale === 'ru' ? 'нормативная база' : 'regulatory base' },
          { value: 'Belsmeta', label: locale === 'ru' ? 'программа расчёта' : 'calculation software' },
        ],
      },
      {
        blockType: 'contactWithForm',
        sectionTag: locale === 'ru' ? 'Контакты' : 'Contacts',
        sectionTitle: locale === 'ru' ? 'Получить консультацию' : 'Get consultation',
        sectionDescription: locale === 'ru' ? 'Оставьте заявку — свяжемся в течение рабочего дня, обсудим задачу и предложим решение.' : 'Leave a request — we will contact you within a working day.',
      },
    ],
    services: [
      { blockType: 'serviceList', limit: 0, sectionTitle: t.services.title, sectionSubtitle: t.services.subtitle },
    ],
    training: [
      { blockType: 'courseList', sectionTitle: t.training.title, sectionSubtitle: t.training.subtitle },
      { blockType: 'contactForm' },
    ],
  }
  return defaults[slug] ?? null
}
