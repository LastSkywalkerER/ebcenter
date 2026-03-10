'use client'

import Image from 'next/image'
import Link from 'next/link'
import { ContactForm } from '@/features/ContactForm'
import { Hero } from '@/features/Hero/Hero'
import type { Locale } from '@/shared/i18n/config'
import { getLocalePath } from '@/shared/lib/localePath'
import type { Translations } from '@/shared/i18n/utils'
import { RenderRichText } from '@/shared/ui/richtext/RenderRichText'
import { SectionTitle } from '@/shared/ui/sections/SectionTitle'
import { ContactInfo } from '@/shared/ui/contact/ContactInfo'
import { CourseCard } from '@/shared/ui/cards/CourseCard'
import { ServiceCard } from '@/shared/ui/cards/ServiceCard'
import { getServiceIcon } from '@/shared/utils/serviceIcons'
import {
  ContractPriceIcon,
  ExpressCourseIcon,
  IndividualIcon,
} from '@/shared/ui/icons/CourseIcons'
import { PrinciplesSection } from '@/shared/ui/sections/PrinciplesSection'
import { ConsultationForm } from '@/features/ConsultationForm'

type Block = {
  blockType: string
  [key: string]: unknown
}

interface BlockRendererProps {
  blocks: Block[]
  locale: Locale
  translations: Translations
  /** Fallback hero background from SiteSettings when block has no background */
  heroBackgroundUrl?: string | null
  /** Pre-fill message in contact form (e.g. for course registration) */
  initialMessageForForm?: string
}

function getBackgroundUrl(background: unknown): string | null {
  if (background && typeof background === 'object' && 'url' in background) {
    return (background as { url?: string }).url ?? null
  }
  return null
}

export function BlockRenderer({ blocks, locale, translations, heroBackgroundUrl, initialMessageForForm }: BlockRendererProps) {
  if (!blocks?.length) return null

  const t = translations

  // Merge standalone 'section' blocks that precede a list block into that list block's title.
  // Also merge 'contactInfo' + 'contactForm' pairs into a single combined block.
  const LIST_BLOCK_TYPES = new Set(['serviceList', 'courseList', 'contactInfo', 'contactForm'])
  const skipped = new Set<number>()
  const patched = new Map<number, Block>()
  blocks.forEach((block, i) => {
    if (
      block.blockType === 'section' &&
      blocks[i + 1] &&
      LIST_BLOCK_TYPES.has(blocks[i + 1].blockType) &&
      !blocks[i + 1].sectionTitle
    ) {
      skipped.add(i)
      patched.set(i + 1, {
        ...blocks[i + 1],
        sectionTitle: block.title,
        sectionSubtitle: (block.subtitle as string) || undefined,
      })
    }
    // Merge contactInfo immediately followed by contactForm into a combined block
    if (block.blockType === 'contactInfo' && blocks[i + 1]?.blockType === 'contactForm') {
      patched.set(i, { ...block, blockType: 'contactWithForm' })
      skipped.add(i + 1)
    }
    // Merge hero + badge into hero with badgeStrip
    if (block.blockType === 'hero' && blocks[i + 1]?.blockType === 'badge') {
      const badgeItems = (blocks[i + 1].items as Array<{ text?: string } | string>) ?? []
      const firstItem = badgeItems[0]
      const badgeText = typeof firstItem === 'string' ? firstItem : firstItem?.text
      patched.set(i, { ...block, badgeStrip: badgeText ?? null })
      skipped.add(i + 1)
    }
  })
  const mergedBlocks = blocks
    .map((block, i) => (patched.has(i) ? patched.get(i)! : block))
    .filter((_, i) => !skipped.has(i))

  return (
    <>
      {mergedBlocks.map((block, index) => {
        const key = `${block.blockType}-${index}`
        const altBg = index % 2 === 0 ? 'bg-white' : 'bg-slate-50'

        switch (block.blockType) {
          case 'hero': {
            const ctaPath = (block.ctaLink as string) || '/services'
            const secondaryPath = (block.secondaryCtaLink as string) || '/training'
            const ctaLink = getLocalePath(locale, ctaPath.startsWith('/') ? ctaPath : `/${ctaPath}`)
            const secondaryCtaLink = getLocalePath(locale, secondaryPath.startsWith('/') ? secondaryPath : `/${secondaryPath}`)
            const bgUrl = getBackgroundUrl(block.background) ?? heroBackgroundUrl ?? null
            return (
              <Hero
                key={key}
                title={(block.title as string) ?? ''}
                subtitle={(block.subtitle as string) ?? ''}
                cta={(block.cta as string) ?? t.home.hero.cta}
                training={(block.secondaryCta as string) ?? t.common.training}
                backgroundImageUrl={bgUrl}
                ctaLink={ctaLink}
                secondaryCtaLink={secondaryCtaLink}
                badgeStrip={(block.badgeStrip as string) ?? null}
              />
            )
          }
          case 'section': {
            const sectionSubtitle = (block.subtitle as string) || undefined
            return (
              <section key={key} className={`${sectionSubtitle ? 'py-16' : 'pt-16 pb-2'} ${altBg}`}>
                <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
                  <SectionTitle
                    title={(block.title as string) ?? ''}
                    subtitle={sectionSubtitle}
                  />
                </div>
              </section>
            )
          }
          case 'seoParagraphs': {
            const paragraphs = (block.paragraphs as Array<{ text?: string }>) ?? []
            const title = block.title as string | undefined
            return (
              <section key={key} className={`py-16 ${altBg}`}>
                <div className='max-w-4xl mx-auto px-4 sm:px-6 lg:px-8'>
                  {title && (
                    <h2 className='text-xl md:text-2xl font-bold text-slate-900 mb-6 tracking-tight'>
                      {title}
                    </h2>
                  )}
                  <div className='space-y-3'>
                    {paragraphs.map((p, i) => (
                      <p key={i} className='text-sm text-slate-500 leading-relaxed text-justify'>
                        {p.text}
                      </p>
                    ))}
                  </div>
                </div>
              </section>
            )
          }
          case 'imageText': {
            const paragraphs = (block.paragraphs as Array<{ text?: string }>) ?? []
            const img = block.image as { url?: string } | null
            const imageUrl = img?.url ?? (block.imageUrl as string | undefined)
            const isEven = index % 2 === 0
            return (
              <section key={key} className={`py-20 ${altBg} overflow-hidden`}>
                <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
                  <div className={`grid grid-cols-1 lg:grid-cols-2 gap-0 items-stretch rounded-2xl overflow-hidden border border-slate-100 shadow-sm ${isEven ? '' : 'lg:[&>*:first-child]:order-last'}`}>
                    {imageUrl && (
                      <div className='relative min-h-[280px] lg:min-h-[380px] bg-slate-100'>
                        <Image
                          src={imageUrl}
                          alt={(block.title as string) ?? ''}
                          fill
                          className='object-cover'
                          sizes='(max-width: 1024px) 100vw, 50vw'
                        />
                      </div>
                    )}
                    <div className='bg-white p-8 md:p-12 flex flex-col justify-center'>
                      <h2 className='text-2xl md:text-3xl font-bold text-slate-900 mb-5 tracking-tight'>
                        {(block.title as string) ?? ''}
                      </h2>
                      <div className='w-8 h-0.5 bg-blue-600 rounded-full mb-6' />
                      <div className='space-y-4'>
                        {paragraphs.map((p, i) => (
                          <p key={i} className='text-slate-500 text-sm leading-relaxed text-justify'>
                            {p.text}
                          </p>
                        ))}
                        {(block.linkUrl as string) && (
                          <a
                            href={(block.linkUrl as string).startsWith('http') ? (block.linkUrl as string) : `https://${block.linkUrl}`}
                            target='_blank'
                            rel='noopener noreferrer'
                            className='inline-flex items-center gap-1.5 mt-2 text-sm font-medium text-blue-600 hover:text-blue-800 transition-colors'
                          >
                            {(block.linkText as string) || 'Подробнее'}
                            <svg className='w-3.5 h-3.5' viewBox='0 0 16 16' fill='none' stroke='currentColor' strokeWidth='2'>
                              <path d='M3 8h10M9 4l4 4-4 4'/>
                            </svg>
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            )
          }
          case 'richText':
            return (
              <section key={key} className={`py-20 ${altBg}`}>
                <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
                  <div className='prose prose-gray max-w-none'>
                    <RenderRichText content={block.content} />
                  </div>
                </div>
              </section>
            )
          case 'serviceList': {
            const limit = (block.limit as number) ?? 0
            const sectionTitle = block.sectionTitle as string | undefined
            const sectionSubtitle = block.sectionSubtitle as string | undefined
            const items = Object.entries(t.services.items)
            const displayed = limit > 0 ? items.slice(0, limit) : items
            const showAllLink = limit > 0
            return (
              <section key={key} className={`py-16 ${altBg}`}>
                <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
                  {sectionTitle && (
                    <SectionTitle
                      title={sectionTitle}
                      subtitle={sectionSubtitle}
                      action={
                        showAllLink ? (
                          <Link
                            href={getLocalePath(locale, '/services')}
                            className='text-sm text-slate-500 hover:text-slate-700 transition-colors whitespace-nowrap'
                          >
                            {t.common.viewAllServices}
                            <span className='ml-1 inline-block'>→</span>
                          </Link>
                        ) : undefined
                      }
                    />
                  )}
                  <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
                    {displayed.map(([keyName, service]) => (
                      <ServiceCard
                        key={keyName}
                        title={service.title}
                        description={service.description}
                        slug={service.slug}
                        icon={getServiceIcon(keyName)}
                        locale={locale}
                        hasTariffs={keyName in t.services.tariffs}
                        tariffsText={t.common.tariffs}
                        moreText={t.common.more}
                      />
                    ))}
                  </div>
                </div>
              </section>
            )
          }
          case 'courseList': {
            const courseOrder = t.training.courseOrder ?? Object.keys(t.training.courses)
            const courseSectionTitle = block.sectionTitle as string | undefined
            const courseSectionSubtitle = block.sectionSubtitle as string | undefined
            const courseIcons: Record<string, React.ReactNode> = {
              'express-course': <ExpressCourseIcon />,
              'contract-price': <ContractPriceIcon />,
              individual: <IndividualIcon />,
            }
            return (
              <section key={key} className={`py-16 ${altBg}`}>
                <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
                  {courseSectionTitle && (
                    <SectionTitle title={courseSectionTitle} subtitle={courseSectionSubtitle} />
                  )}
                  <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
                    {courseOrder.map((slug) => {
                      const courseData = t.training.courses[slug as keyof typeof t.training.courses]
                      if (!courseData) return null
                      return (
                        <CourseCard
                          key={slug}
                          course={{
                            programSlug: slug,
                            icon: courseIcons[slug] ?? <ExpressCourseIcon />,
                            title: courseData.title,
                            duration: courseData.duration,
                            price: courseData.price,
                            topics: courseData.topics,
                          }}
                          locale={locale}
                          courseProgramText={t.common.courseProgram}
                          registerText={t.common.register}
                          courseDetailsText={t.training.courseDetails}
                        />
                      )
                    })}
                  </div>
                </div>
              </section>
            )
          }
          case 'contactForm': {
            const formSectionTitle = block.sectionTitle as string | undefined
            const formSectionSubtitle = block.sectionSubtitle as string | undefined
            const cf = t.contacts.consultationForm
            return (
              <section key={key} id='registration' className='py-16 bg-slate-50'>
                <div className='max-w-3xl mx-auto px-4 sm:px-6 lg:px-8'>
                  {formSectionTitle && (
                    <SectionTitle title={formSectionTitle} subtitle={formSectionSubtitle} />
                  )}
                  <ContactForm
                    title={t.contacts.form.title}
                    name={t.common.name}
                    contactPlaceholder={cf?.contactPlaceholder ?? 'Email или телефон'}
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
                    contactRequired={cf?.contactRequired ?? 'Введите email или телефон'}
                    contactInvalid={cf?.contactInvalid ?? t.common.phoneError}
                    initialMessage={initialMessageForForm}
                  />
                </div>
              </section>
            )
          }
          case 'contactWithForm': {
            const sectionTitle = block.sectionTitle as string | undefined
            const sectionSubtitle = block.sectionSubtitle as string | undefined
            const cf = t.contacts.consultationForm
            return (
              <section key={key} id='registration' className='py-16 bg-slate-50'>
                <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
                  {sectionTitle && (
                    <SectionTitle title={sectionTitle} subtitle={sectionSubtitle} />
                  )}
                  <div className='grid grid-cols-1 lg:grid-cols-5 gap-10'>
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
                        contactPlaceholder={cf?.contactPlaceholder ?? 'Email или телефон'}
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
                        contactRequired={cf?.contactRequired ?? 'Введите email или телефон'}
                        contactInvalid={cf?.contactInvalid ?? t.common.phoneError}
                        initialMessage={initialMessageForForm}
                      />
                    </div>
                  </div>
                </div>
              </section>
            )
          }
          case 'contactInfo': {
            return (
              <section key={key} className='py-16 bg-white'>
                <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
                  <div className='bg-white rounded-xl border border-slate-200 shadow-sm p-8 md:p-10'>
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
                </div>
              </section>
            )
          }
          case 'principles': {
            const sectionTitle = (block.sectionTitle as string) ?? ''
            const items = (block.items as Array<{ icon?: string; title?: string; description?: string }>) ?? []
            return (
              <PrinciplesSection
                key={key}
                sectionTitle={sectionTitle}
                items={items.map((item) => ({
                  icon: (item.icon ?? 'accuracy') as 'speed' | 'accuracy' | 'honesty' | 'fixedPrice',
                  title: item.title ?? '',
                  description: item.description ?? '',
                }))}
              />
            )
          }
          case 'consultationForm': {
            const cf = t.contacts.consultationForm
            return (
              <section key={key} id='consultation' className={`py-16 ${altBg}`}>
                <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
                  <ConsultationForm
                    title={cf?.title ?? 'Консультация по сметному делу'}
                    description={cf?.description ?? 'Получайте ответы на вопросы и рекомендации от экспертов'}
                    namePlaceholder={cf?.namePlaceholder ?? 'Ваше имя'}
                    contactPlaceholder={cf?.contactPlaceholder ?? 'Email или телефон'}
                    submit={cf?.submit ?? 'Получить консультацию'}
                    success={t.common.success}
                    error={t.common.error}
                    sending={t.common.sending}
                    securityCheck={t.common.securityCheck}
                    securityError={t.common.securityError}
                    nameRequired={t.common.validation.nameRequired}
                    contactRequired={cf?.contactRequired ?? 'Введите email или телефон'}
                    contactInvalid={cf?.contactInvalid ?? t.common.phoneError}
                  />
                </div>
              </section>
            )
          }
          case 'badge': {
            const items = (block.items as Array<{ text?: string } | string>) ?? []
            if (!items.length) return null
            return (
              <div key={key} className='bg-slate-50 py-5 border-b border-slate-100'>
                <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
                  <div className='flex flex-col sm:flex-row gap-3'>
                    {items.map((item, i) => {
                      const text = typeof item === 'string' ? item : item.text
                      return (
                        <div key={i} className='flex items-center gap-2.5 bg-white border border-slate-200 rounded-full px-5 py-2.5 shadow-sm'>
                          <svg className='w-4 h-4 text-slate-400 shrink-0' viewBox='0 0 16 16' fill='none' stroke='currentColor' strokeWidth='2'>
                            <path strokeLinecap='round' strokeLinejoin='round' d='M2.5 8.5l3.5 3.5 7-7' />
                          </svg>
                          <span className='text-sm text-slate-600 leading-snug whitespace-nowrap'>{text}</span>
                        </div>
                      )
                    })}
                  </div>
                </div>
              </div>
            )
          }
          case 'stats': {
            const items = (block.items as Array<{ value: string; label: string }>) ?? []
            if (!items.length) return null
            return (
              <div key={key} className='bg-white border-b border-slate-100'>
                <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
                  <div className='grid grid-cols-2 md:grid-cols-4 divide-x divide-y md:divide-y-0 divide-slate-100'>
                    {items.map((item, i) => (
                      <div key={i} className='py-5 px-6 text-center'>
                        <div className='text-xl md:text-2xl font-bold text-slate-900'>{item.value}</div>
                        <div className='text-xs text-slate-500 mt-0.5'>{item.label}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )
          }
          default:
            return null
        }
      })}
    </>
  )
}
