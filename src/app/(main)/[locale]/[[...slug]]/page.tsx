import type { Locale } from '@/shared/i18n/config'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getPageBySlug } from '@/shared/lib/payload'
import { getTranslations } from '@/shared/i18n/utils'
import { BlockRenderer } from '@/shared/ui/blocks/BlockRenderer'
import { BackButton } from '@/shared/ui/buttons/BackButton'
import { CourseProgram } from '@/shared/ui/sections/CourseProgram'
import { NotFound } from '@/shared/ui/sections/NotFound'
import { ServiceContent } from '@/shared/ui/sections/ServiceContent'
import { SectionTitle } from '@/shared/ui/sections/SectionTitle'
import { TariffCard } from '@/shared/ui/cards/TariffCard'

type PageProps = {
  params: Promise<{ locale: Locale; slug?: string[] }>
}

function getPageSlugForMeta(slugSegments: string[] | undefined): string | null {
  const slug = slugSegments ?? []
  if (slug.length === 0) return 'home'
  if (slug.length === 1 && ['services', 'training', 'contacts'].includes(slug[0])) return slug[0]
  if (slug.length === 1) return slug[0]
  if (slug.length === 2 && slug[0] === 'services') return null
  if (slug.length === 3 && slug[0] === 'services' && slug[2] === 'tariffs') return null
  if (slug.length === 2 && slug[0] === 'training') return null
  return null
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale, slug: slugSegments } = await params
  const pageSlug = getPageSlugForMeta(slugSegments)
  if (!pageSlug) return {}
  const page = await getPageBySlug(pageSlug, locale)
  if (!page?.metaTitle && !page?.metaDescription) return {}
  const ogImage = page.ogImage && typeof page.ogImage === 'object' && 'url' in page.ogImage ? page.ogImage.url : null
  return {
    ...(page.metaTitle && { title: page.metaTitle }),
    ...(page.metaDescription && { description: page.metaDescription }),
    ...(ogImage && {
      openGraph: {
        images: [{ url: ogImage, width: 192, height: 192, alt: page.metaTitle ?? undefined }],
      },
    }),
  }
}

export default async function DynamicPage({ params }: PageProps) {
  const { locale, slug: slugSegments } = await params
  const slug = slugSegments ?? []
  const pathSlug = slug.join('/')

  const t = await getTranslations(locale)

  // Home: slug = []
  if (slug.length === 0) {
    const page = await getPageBySlug('home', locale)
    if (!page?.layout?.length) {
      // Fallback: render default home if no page configured
      const fallbackPage = await getPageWithFallback('home', locale, t)
      if (fallbackPage) {
        return (
          <main className='flex-grow'>
            <BlockRenderer blocks={fallbackPage} locale={locale} translations={t} />
          </main>
        )
      }
      notFound()
    }
    return (
      <main className='flex-grow'>
        <BlockRenderer blocks={page.layout} locale={locale} translations={t} />
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
            <BlockRenderer blocks={fallback} locale={locale} translations={t} />
          </main>
        )
      }
      notFound()
    }
    return (
      <main className='flex-grow'>
        <BlockRenderer blocks={page.layout} locale={locale} translations={t} />
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

    return (
      <main className='flex-grow py-16 bg-white'>
        <div className='max-w-4xl mx-auto px-4 sm:px-6 lg:px-8'>
          <BackButton path="/services" text={t.services.backToServices} locale={locale} />
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
      <main className='flex-grow py-16 bg-white'>
        <div className='max-w-4xl mx-auto px-4 sm:px-6 lg:px-8'>
          <BackButton path="/services" text={t.services.backToServices} locale={locale} />
          {tariffs ? (
            <>
              <SectionTitle title={tariffs.title} subtitle={tariffs.description} />
              <div className='space-y-8'>
                {tariffs.items.map((tariff, index) => (
                  <TariffCard
                    key={index}
                    tariff={tariff}
                    isLast={index === tariffs.items.length - 1}
                  />
                ))}
              </div>
            </>
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
    if (!page?.layout?.length) {
      const fallback = await getPageWithFallback('training', locale, t)
      if (fallback) {
        return (
          <main className='flex-grow'>
            <BlockRenderer blocks={fallback} locale={locale} translations={t} />
          </main>
        )
      }
      notFound()
    }
    return (
      <main className='flex-grow'>
        <BlockRenderer blocks={page.layout} locale={locale} translations={t} />
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

    return (
      <main className='flex-grow py-16 bg-gray-50'>
        <div className='max-w-4xl mx-auto px-4 sm:px-6 lg:px-8'>
          <BackButton
            path="/training"
            text={t.training.courseProgram.backToCourses}
            locale={locale}
          />
          {program ? (
            <>
              <SectionTitle title={program.title} />
              <CourseProgram sections={program.sections} />
            </>
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

  // Contacts: slug = ['contacts']
  if (slug.length === 1 && slug[0] === 'contacts') {
    const page = await getPageBySlug('contacts', locale)
    if (!page?.layout?.length) {
      const fallback = await getPageWithFallback('contacts', locale, t)
      if (fallback) {
        return (
          <main className='flex-grow'>
            <BlockRenderer blocks={fallback} locale={locale} translations={t} />
          </main>
        )
      }
      notFound()
    }
    return (
      <main className='flex-grow'>
        <BlockRenderer blocks={page.layout} locale={locale} translations={t} />
      </main>
    )
  }

  // Custom page: slug = ['custom-slug']
  const page = await getPageBySlug(pathSlug, locale)
  if (!page?.layout?.length) notFound()

  return (
    <main className='flex-grow'>
      <BlockRenderer blocks={page.layout} locale={locale} translations={t} />
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
      { blockType: 'section', title: t.home.description.title, subtitle: t.home.description.text },
      { blockType: 'serviceList', limit: 3 },
      { blockType: 'section', title: t.contacts.title, subtitle: '' },
      { blockType: 'contactInfo' },
      { blockType: 'contactForm' },
    ],
    services: [
      { blockType: 'section', title: t.services.title, subtitle: t.services.subtitle },
      { blockType: 'serviceList', limit: 0 },
    ],
    training: [
      { blockType: 'section', title: t.training.title, subtitle: t.training.subtitle },
      { blockType: 'courseList' },
      { blockType: 'contactForm' },
    ],
    contacts: [
      { blockType: 'section', title: t.contacts.title, subtitle: t.contacts.subtitle },
      { blockType: 'contactInfo' },
      { blockType: 'contactForm' },
    ],
  }
  return defaults[slug] ?? null
}
