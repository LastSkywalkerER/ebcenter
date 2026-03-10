import type { Locale } from '@/shared/i18n/config'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getPageBySlug, getServiceBySlug, getCourseBySlug, getSiteMeta } from '@/shared/lib/payload'
import { getTranslations } from '@/shared/i18n/utils'
import { BlockRenderer } from '@/shared/ui/blocks/BlockRenderer'
import { BackButton } from '@/shared/ui/buttons/BackButton'
import { CourseProgram } from '@/shared/ui/sections/CourseProgram'
import { NotFound } from '@/shared/ui/sections/NotFound'
import { ServiceContent } from '@/shared/ui/sections/ServiceContent'
import { TariffCard } from '@/shared/ui/cards/TariffCard'
import { JsonLd } from '@/shared/ui/seo/JsonLd'
import { Breadcrumbs } from '@/shared/ui/seo/Breadcrumbs'
import { env } from '@/shared/config/env'
import { buildAlternates } from '@/shared/lib/alternates'
import { ContactInfo } from '@/shared/ui/contact/ContactInfo'
import { ContactForm } from '@/features/ContactForm'
import { SectionTitle } from '@/shared/ui/sections/SectionTitle'

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
    return (
      <main className='flex-grow'>
        <BlockRenderer blocks={page.layout} locale={locale} translations={t} heroBackgroundUrl={meta.heroBackgroundUrl} />
      </main>
    )
  }

  // Services list: slug = ['services']
  if (slug.length === 1 && slug[0] === 'services') {
    const page = await getPageBySlug('services', locale)
    if (!page?.layout?.length) {
      const fallback = await getPageWithFallback('services', locale, t)
      if (fallback) {
        return (
          <main className='flex-grow'>
            <BlockRenderer blocks={fallback} locale={locale} translations={t} heroBackgroundUrl={meta.heroBackgroundUrl} />
          </main>
        )
      }
      notFound()
    }
    return (
      <main className='flex-grow'>
        <BlockRenderer blocks={page.layout} locale={locale} translations={t} heroBackgroundUrl={meta.heroBackgroundUrl} />
      </main>
    )
  }

  // Service detail: slug = ['services', serviceSlug]
  if (slug.length === 2 && slug[0] === 'services') {
    const serviceSlug = slug[1]
    const serviceKey = Object.entries(t.services.items).find(
      ([, value]) => value.slug === serviceSlug
    )?.[0]
    const serviceDetails = serviceKey
      ? t.services.details[serviceKey as keyof typeof t.services.details]
      : null
    const serviceMeta = await getServiceBySlug(serviceSlug, locale)
    const serviceSchema = serviceMeta ? {
      '@context': 'https://schema.org',
      '@type': 'Service',
      name: serviceMeta.title ?? serviceDetails?.title,
      description: serviceMeta.description ?? serviceDetails?.description,
      provider: { '@type': 'Organization', name: 'ProSmety' },
      areaServed: { '@type': 'Country', name: 'Belarus' },
    } : null

    const servicesPath = locale === 'ru' ? '/services' : `/${locale}/services`
    const breadcrumbs = [
      { label: t.common.home, href: locale === 'ru' ? '/' : `/${locale}` },
      { label: t.services.title, href: servicesPath },
      { label: serviceDetails?.title ?? serviceSlug },
    ]

    return (
      <main className='flex-grow bg-white'>
        {serviceSchema && <JsonLd data={serviceSchema} />}
        {/* Page header */}
        <div className='border-b border-slate-100 bg-slate-50'>
          <div className='max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10'>
            <Breadcrumbs items={breadcrumbs} baseUrl={env.BASE_URL || ''} />
            <BackButton path="/services" text={t.services.backToServices} locale={locale} />
            {serviceDetails && (
              <div className='mt-2'>
                <h1 className='text-2xl md:text-3xl font-bold text-slate-900 tracking-tight'>{serviceDetails.title}</h1>
                {serviceDetails.description && (
                  <p className='mt-2 text-slate-500 text-sm leading-relaxed max-w-2xl'>{serviceDetails.description}</p>
                )}
              </div>
            )}
          </div>
        </div>
        <div className='max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12'>
          {serviceDetails ? (
            <ServiceContent serviceDetails={serviceDetails} />
          ) : (
            <NotFound
              title={t.services.notFound.title}
              description={t.services.notFound.description}
            />
          )}
        </div>
      </main>
    )
  }

  // Tariffs: slug = ['services', serviceSlug, 'tariffs']
  if (slug.length === 3 && slug[0] === 'services' && slug[2] === 'tariffs') {
    const serviceSlug = slug[1]
    const serviceKey = Object.entries(t.services.items).find(
      ([, value]) => value.slug === serviceSlug
    )?.[0]
    const tariffs = serviceKey
      ? t.services.tariffs[serviceKey as keyof typeof t.services.tariffs]
      : null

    return (
      <main className='flex-grow bg-white'>
        {/* Page header */}
        <div className='border-b border-slate-100 bg-slate-50'>
          <div className='max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10'>
            <BackButton path="/services" text={t.services.backToServices} locale={locale} />
            {tariffs && (
              <div className='mt-2'>
                <h1 className='text-2xl md:text-3xl font-bold text-slate-900 tracking-tight'>{tariffs.title}</h1>
                {tariffs.description && (
                  <p className='mt-2 text-slate-500 text-sm leading-relaxed max-w-2xl'>{tariffs.description}</p>
                )}
              </div>
            )}
          </div>
        </div>
        <div className='max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12'>
          {tariffs ? (
            <div className='space-y-8'>
              {tariffs.items.map((tariff, index) => (
                <TariffCard
                  key={index}
                  tariff={tariff}
                  isLast={index === tariffs.items.length - 1}
                />
              ))}
            </div>
          ) : (
            <NotFound
              title={t.services.notFound.title}
              description={t.services.notFound.description}
            />
          )}
        </div>
      </main>
    )
  }

  // Training list: slug = ['training']
  if (slug.length === 1 && slug[0] === 'training') {
    const page = await getPageBySlug('training', locale)
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

    if (!page?.layout?.length) {
      const fallback = await getPageWithFallback('training', locale, t)
      if (fallback) {
        return (
          <main className='flex-grow'>
            <BlockRenderer
              blocks={fallback}
              locale={locale}
              translations={t}
              heroBackgroundUrl={meta.heroBackgroundUrl}
              initialMessageForForm={initialMessageForForm}
            />
          </main>
        )
      }
      notFound()
    }
    return (
      <main className='flex-grow'>
        <BlockRenderer
          blocks={page.layout}
          locale={locale}
          translations={t}
          heroBackgroundUrl={meta.heroBackgroundUrl}
          initialMessageForForm={initialMessageForForm}
        />
      </main>
    )
  }

  // Course detail: slug = ['training', courseSlug]
  if (slug.length === 2 && slug[0] === 'training') {
    const courseSlug = slug[1]
    const program =
      t.training.courseProgram.programs[
        courseSlug as keyof typeof t.training.courseProgram.programs
      ]
    const courseMeta = await getCourseBySlug(courseSlug, locale)
    const courseSchema = courseMeta ? {
      '@context': 'https://schema.org',
      '@type': 'Course',
      name: courseMeta.title ?? program?.title,
      description: courseMeta.metaDescription ?? undefined,
      provider: { '@type': 'Organization', name: 'ProSmety' },
      ...(courseMeta.price && {
        offers: {
          '@type': 'Offer',
          price: courseMeta.price,
          priceCurrency: 'BYN',
        },
      }),
    } : null

    const trainingPath = locale === 'ru' ? '/training' : `/${locale}/training`
    const courseBreadcrumbs = [
      { label: t.common.home, href: locale === 'ru' ? '/' : `/${locale}` },
      { label: t.common.training, href: trainingPath },
      { label: courseMeta?.title ?? program?.title ?? courseSlug },
    ]

    return (
      <main className='flex-grow bg-white'>
        {courseSchema && <JsonLd data={courseSchema} />}
        {/* Page header */}
        <div className='border-b border-slate-100 bg-slate-50'>
          <div className='max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10'>
            <Breadcrumbs items={courseBreadcrumbs} baseUrl={env.BASE_URL || ''} />
            <BackButton
              path="/training"
              text={t.training.courseProgram.backToCourses}
              locale={locale}
            />
            {program && (
              <h1 className='mt-2 text-2xl md:text-3xl font-bold text-slate-900 tracking-tight'>{program.title}</h1>
            )}
          </div>
        </div>
        <div className='max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12'>
          {program ? (
            <CourseProgram sections={program.sections} />
          ) : (
            <NotFound
              title={t.training.courseProgram.title}
              description={t.training.courseProgram.inDevelopment}
            />
          )}
        </div>
      </main>
    )
  }

  // Contacts: slug = ['contacts'] — always rendered from Global Contacts
  if (slug.length === 1 && slug[0] === 'contacts') {
    return (
      <main className='flex-grow bg-white'>
        {/* Combined contact info + form */}
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16'>
          <SectionTitle title={t.contacts.title} className='mb-12' />
          <div className='grid grid-cols-1 lg:grid-cols-5 gap-12'>
            <div className='lg:col-span-2'>
              <ContactInfo
                address={t.common.address}
                addressValue={t.common.contactInfo.address}
                phone={t.common.phone}
                phoneValue={t.common.contactInfo.phone}
                email={t.common.email}
                emailValue={t.common.contactInfo.email}
                unp={t.common.unp}
                unpValue={t.common.contactInfo.unp}
                workingHours={t.common.workingHours}
                workingHoursValue={t.common.contactInfo.workingHours}
              />
            </div>
            <div className='lg:col-span-3'>
              <ContactForm
                title={t.contacts.form.title}
                name={t.common.name}
                contactPlaceholder={t.contacts.consultationForm?.contactPlaceholder ?? 'Email или телефон'}
                message={t.common.message}
                submit={t.contacts.form.submit}
                success={t.common.success}
                error={t.common.error}
                sending={t.common.sending}
                securityCheck={t.common.securityCheck}
                securityError={t.common.securityError}
                validation={{
                  nameRequired: t.common.validation.nameRequired,
                  messageRequired: t.common.validation.messageRequired,
                }}
                contactRequired={t.contacts.consultationForm?.contactRequired ?? 'Введите email или телефон'}
                contactInvalid={t.contacts.consultationForm?.contactInvalid ?? t.common.phoneError}
              />
            </div>
          </div>
        </div>
      </main>
    )
  }

  // Custom page: slug = ['custom-slug']
  const page = await getPageBySlug(pathSlug, locale)
  if (!page?.layout?.length) notFound()

  return (
    <main className='flex-grow'>
      <BlockRenderer blocks={page.layout} locale={locale} translations={t} heroBackgroundUrl={meta.heroBackgroundUrl} />
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
      { blockType: 'hero', title: t.home.hero.title, subtitle: t.home.hero.subtitle, cta: t.home.hero.cta, secondaryCta: t.common.training, ctaLink: '/services', secondaryCtaLink: '/training' },
      { blockType: 'badge', items: [
        locale === 'ru' ? 'Более 20\u202F000 часов практической работы со сметной документацией' : 'Over 20,000 hours of practical work with estimate documentation',
      ]},
      { blockType: 'serviceList', limit: 3, sectionTitle: t.home.description.title },
      { blockType: 'contactForm' },
    ],
    services: [
      { blockType: 'serviceList', limit: 0, sectionTitle: t.services.title, sectionSubtitle: t.services.subtitle },
    ],
    training: [
      { blockType: 'courseList', sectionTitle: t.training.title, sectionSubtitle: t.training.subtitle },
      { blockType: 'contactForm' },
    ],
    contacts: [
      { blockType: 'contactInfo' },
      { blockType: 'contactForm' },
    ],
  }
  return defaults[slug] ?? null
}
