'use client'

import Image from 'next/image'
import { useState, useEffect } from 'react'
import { ContactForm } from '@/features/ContactForm'
import { consumeContactFormMessage } from '@/shared/lib/scrollToContacts'
import { Hero } from '@/features/Hero/Hero'
import type { Locale } from '@/shared/i18n/config'
import { getLocalePath } from '@/shared/lib/localePath'
import type { Translations } from '@/shared/i18n/utils'
import { RenderRichText } from '@/shared/ui/richtext/RenderRichText'
import { SectionTitle } from '@/shared/ui/sections/SectionTitle'
import { ContactInfo } from '@/shared/ui/contact/ContactInfo'
import { CourseCard } from '@/shared/ui/cards/CourseCard'
import { ServiceCard } from '@/shared/ui/cards/ServiceCard'
import { PricingCard } from '@/shared/ui/cards/PricingCard'
import { AdvantagesSection } from '@/shared/ui/sections/AdvantagesSection'
import { KnowledgeSection } from '@/shared/ui/sections/KnowledgeSection'
import { AboutSection } from '@/shared/ui/sections/AboutSection'
import { FAQSection } from '@/shared/ui/sections/FAQSection'
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

interface KnowledgeArticle {
  title: string
  slug: string
  href: string
}

interface BlockRendererProps {
  blocks: Block[]
  locale: Locale
  translations: Translations
  /** Fallback hero background from SiteSettings when block has no background */
  heroBackgroundUrl?: string | null
  /** Pre-fill message in contact form (e.g. for course registration) */
  initialMessageForForm?: string
  /** Pre-fetched knowledge articles for the knowledge block */
  knowledgeArticles?: KnowledgeArticle[]
}

function getBackgroundUrl(background: unknown): string | null {
  if (background && typeof background === 'object' && 'url' in background) {
    return (background as { url?: string }).url ?? null
  }
  return null
}

export function BlockRenderer({ blocks, locale, translations, heroBackgroundUrl, initialMessageForForm, knowledgeArticles }: BlockRendererProps) {
  const [scrollMessage, setScrollMessage] = useState<string | undefined>(undefined)
  const t = translations

  useEffect(() => {
    const stored = consumeContactFormMessage()
    if (stored) setScrollMessage(stored)
  }, [])

  const scrollToContacts = (message?: string) => {
    if (message) setScrollMessage(message)
    document.getElementById('contacts')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  const formMessage = scrollMessage ?? initialMessageForForm

  if (!blocks?.length) return null

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
            const isAnchor = ctaPath.startsWith('#')
            const ctaLink = isAnchor ? ctaPath : getLocalePath(locale, ctaPath.startsWith('/') ? ctaPath : `/${ctaPath}`)
            const secondaryCtaLink = getLocalePath(locale, secondaryPath.startsWith('/') ? secondaryPath : `/${secondaryPath}`)
            const bgUrl = getBackgroundUrl(block.background) ?? heroBackgroundUrl ?? null
            return (
              <Hero
                key={key}
                title={(block.title as string) ?? ''}
                subtitle={(block.subtitle as string) ?? ''}
                cta={(block.cta as string) ?? t.common.services}
                training={(block.secondaryCta as string) ?? t.common.training}
                backgroundImageUrl={bgUrl}
                ctaLink={ctaLink}
                secondaryCtaLink={secondaryCtaLink}
                badge={(block.badge as string) ?? null}
              />
            )
          }
          case 'section': {
            const sectionSubtitle = (block.subtitle as string) || undefined
            return (
              <section key={key} className={`${sectionSubtitle ? 'py-16' : 'pt-16 pb-2'} ${altBg}`}>
                <div className='max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-10'>
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
                <div className='max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-10'>
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
                <div className='max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-10'>
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
            const sectionTag = block.sectionTag as string | undefined
            const items = Object.entries(t.services.items)
            const displayed = limit > 0 ? items.slice(0, limit) : items
            return (
              <section key={key} id='services' className='py-[72px] bg-white'>
                <div className='max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-10'>
                  {sectionTitle && (
                    <SectionTitle
                      title={sectionTitle}
                      subtitle={sectionSubtitle}
                      tag={sectionTag ?? (locale === 'ru' ? 'Услуги' : 'Services')}
                    />
                  )}
                  <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[14px]'>
                    {displayed.map(([keyName, service], i) => {
                      const isAccent = i === displayed.length - 1
                      return (
                        <ServiceCard
                          key={keyName}
                          title={service.title}
                          description={service.description}
                          slug={service.slug}
                          icon={getServiceIcon(keyName)}
                          locale={locale}
                          moreText={t.common.more}
                          isAccent={isAccent}
                          onCtaClick={isAccent ? () => scrollToContacts(locale === 'ru' ? 'Индивидуальный запрос: обсудить задачу' : 'Individual request: discuss the task') : undefined}
                        />
                      )
                    })}
                  </div>
                </div>
              </section>
            )
          }
          case 'courseList': {
            const courseOrder = t.training.courseOrder ?? Object.keys(t.training.courses)
            const courseSectionTitle = block.sectionTitle as string | undefined
            const courseSectionSubtitle = block.sectionSubtitle as string | undefined
            const courseSectionTag = block.sectionTag as string | undefined
            const courseIcons: Record<string, React.ReactNode> = {
              'express-course': <ExpressCourseIcon />,
              'contract-price': <ContractPriceIcon />,
              individual: <IndividualIcon />,
            }
            const courseBadge: Record<string, { badge: string; variant: 'default' | 'blue' | 'dark'; featured?: boolean }> = {
              'express-course': { badge: 'Старт', variant: 'default' },
              'contract-price': { badge: 'Продвинутый', variant: 'blue', featured: true },
              individual: { badge: 'Индивидуально', variant: 'dark' },
            }
            return (
              <section key={key} className='py-[72px] bg-white'>
                <div className='max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-10'>
                  {courseSectionTitle && (
                    <SectionTitle title={courseSectionTitle} subtitle={courseSectionSubtitle} tag={courseSectionTag ?? (locale === 'ru' ? 'Обучение' : 'Training')} />
                  )}
                  <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[22px]'>
                    {courseOrder.map((slug) => {
                      const courseData = t.training.courses[slug as keyof typeof t.training.courses]
                      if (!courseData) return null
                      const badgeConfig = courseBadge[slug]
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
                          registerText={
                            slug === 'individual'
                              ? (locale === 'ru' ? 'Обсудить программу' : 'Discuss program')
                              : (locale === 'ru' ? 'Записаться на курс' : 'Register')
                          }
                          badge={badgeConfig?.badge}
                          badgeVariant={badgeConfig?.variant}
                          isFeatured={badgeConfig?.featured}
                          href={`${getLocalePath(locale, '/training')}#${slug}`}
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
                    initialMessage={formMessage}
                  />
                </div>
              </section>
            )
          }
          case 'contactWithForm': {
            const sectionTag = block.sectionTag as string | undefined
            const sectionTitle = block.sectionTitle as string | undefined
            const sectionDescription = block.sectionDescription as string | undefined
            const cf = t.contacts.consultationForm
            return (
              <section key={key} id='contacts' className='py-[72px] bg-gradient-to-br from-[#1A2E52] to-[#2B4A8A]'>
                <div className='max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-10'>
                  <div className='grid grid-cols-1 lg:grid-cols-2 gap-[72px] items-start'>
                    <div className='text-white'>
                      {sectionTag && (
                        <span className='inline-block bg-white/[0.18] text-white/95 text-[12px] font-bold tracking-[0.08em] uppercase px-3 py-1 rounded-full mb-3.5'>
                          {sectionTag}
                        </span>
                      )}
                      {sectionTitle && (
                        <h2 className='text-[clamp(22px,4vw,34px)] font-extrabold text-white mb-3.5 leading-tight'>{sectionTitle}</h2>
                      )}
                      {sectionDescription && (
                        <p className='text-[15px] text-white/80 mb-7 leading-[1.65]'>{sectionDescription}</p>
                      )}
                      <div className='space-y-[12px]'>
                        {t.contacts.contactInfo.organizationNameValue && (
                          <div className='flex items-center gap-3'>
                            <svg className='w-5 h-5 text-white/60 shrink-0' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth={2}>
                              <path strokeLinecap='round' strokeLinejoin='round' d='M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4' />
                            </svg>
                            <span className='text-white/85 text-[15px]'>{t.contacts.contactInfo.organizationNameValue}</span>
                          </div>
                        )}
                        <div className='flex items-center gap-3'>
                          <svg className='w-5 h-5 text-white/60 shrink-0' viewBox='0 0 20 20' fill='currentColor'>
                            <path fillRule='evenodd' d='M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z' clipRule='evenodd' />
                          </svg>
                          <span className='text-white/85 text-[15px]'>{t.contacts.contactInfo.addressValue}</span>
                        </div>
                        {t.contacts.contactInfo.postalAddressValue && (
                          <div className='flex items-center gap-3'>
                            <svg className='w-5 h-5 text-white/60 shrink-0' viewBox='0 0 20 20' fill='currentColor'>
                              <path d='M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z' /><path d='M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z' />
                            </svg>
                            <span className='text-white/85 text-[15px]'>{t.contacts.contactInfo.postalAddressValue}</span>
                          </div>
                        )}
                        <div className='flex items-center gap-3'>
                          <svg className='w-5 h-5 text-white/60 shrink-0' viewBox='0 0 20 20' fill='currentColor'>
                            <path d='M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z' />
                          </svg>
                          <a href={`tel:${t.common.contactInfo.phone.replace(/\D/g,'')}`} className='text-white/85 hover:text-white text-[15px]'>{t.common.contactInfo.phone}</a>
                        </div>
                        <div className='flex items-center gap-3'>
                          <svg className='w-5 h-5 text-white/60 shrink-0' viewBox='0 0 20 20' fill='currentColor'>
                            <path d='M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z' /><path d='M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z' />
                          </svg>
                          <a href={`mailto:${t.common.contactInfo.email}`} className='text-white/85 hover:text-white text-[15px]'>{t.common.contactInfo.email}</a>
                        </div>
                        {t.contacts.contactInfo.unpValue && (
                          <div className='flex items-center gap-3'>
                            <svg className='w-5 h-5 text-white/60 shrink-0' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth={2}>
                              <path strokeLinecap='round' strokeLinejoin='round' d='M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z' />
                            </svg>
                            <span className='text-white/85 text-[15px]'>{t.contacts.contactInfo.unpValue}</span>
                          </div>
                        )}
                        {t.contacts.contactInfo.workingHoursValue && (
                          <div className='flex items-center gap-3'>
                            <svg className='w-5 h-5 text-white/60 shrink-0' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth={2}>
                              <path strokeLinecap='round' strokeLinejoin='round' d='M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z' />
                            </svg>
                            <span className='text-white/85 text-[15px]'>{t.contacts.contactInfo.workingHoursValue}</span>
                          </div>
                        )}
                      </div>
                    </div>
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
                      initialMessage={formMessage}
                    />
                  </div>
                </div>
              </section>
            )
          }
          case 'contactInfo': {
            return (
              <section key={key} className='py-16 bg-white'>
                <div className='max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-10'>
                  <div className='bg-white rounded-xl border border-slate-200 shadow-sm p-8 md:p-10'>
                    <ContactInfo
                      organizationName={t.common.organizationName}
                      organizationNameValue={t.contacts.contactInfo.organizationNameValue}
                      address={t.common.address}
                      addressValue={t.contacts.contactInfo.addressValue}
                      postalAddress={t.common.postalAddress}
                      postalAddressValue={t.contacts.contactInfo.postalAddressValue}
                      phone={t.common.phone}
                      phoneValue={t.contacts.contactInfo.phoneValue}
                      email={t.common.email}
                      emailValue={t.contacts.contactInfo.emailValue}
                      unp={t.common.unp}
                      unpValue={t.contacts.contactInfo.unpValue}
                      workingHours={t.common.workingHours}
                      workingHoursValue={t.contacts.contactInfo.workingHoursValue}
                    />
                  </div>
                </div>
              </section>
            )
          }
          case 'principles': {
            const sectionTag = (block.sectionTag as string) || (locale === 'ru' ? 'Принципы работы' : 'Principles of work')
            const sectionTitle = (block.sectionTitle as string) ?? ''
            const items = (block.items as Array<{ icon?: string; title?: string; description?: string }>) ?? []
            return (
              <PrinciplesSection
                key={key}
                sectionTag={sectionTag}
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
                <div className='max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-10'>
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
          case 'advantages': {
            const items = (block.items as Array<{ icon?: string; title?: string; description?: string }>) ?? []
            return (
              <AdvantagesSection
                key={key}
                tag={block.tag as string | undefined}
                title={(block.title as string) ?? ''}
                description={block.description as string | undefined}
                ctaText={(block.ctaText as string) ?? t.common.getConsultation}
                items={items.map(item => ({
                  icon: (item.icon ?? 'check') as 'check' | 'shield' | 'clock' | 'dollar',
                  title: item.title ?? '',
                  description: item.description ?? '',
                }))}
                onCtaClick={() => scrollToContacts(locale === 'ru' ? 'Получить консультацию' : 'Get consultation')}
              />
            )
          }
          case 'pricing': {
            const cards = (block.cards as Array<{
              title?: string
              description?: string
              features?: Array<{ text?: string }>
              ctaText?: string
              isFeatured?: boolean
              featuredBadge?: string
            }>) ?? []
            return (
              <section key={key} id='pricing' className='py-[72px] bg-white'>
                <div className='max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-10'>
                  {!!(block.sectionTitle || block.sectionDescription) && (
                    <SectionTitle
                      title={(block.sectionTitle as string) ?? ''}
                      subtitle={block.sectionDescription as string | undefined}
                      tag={(block.sectionTag as string | undefined) ?? (locale === 'ru' ? 'Тарифы' : 'Pricing')}
                    />
                  )}
                  <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-10'>
                    {cards.map((card, i) => (
                      <PricingCard
                        key={i}
                        title={card.title ?? ''}
                        description={card.description ?? ''}
                        features={(card.features ?? []).map(f => f.text ?? '')}
                        ctaText={card.ctaText ?? t.common.getConsultation}
                        isFeatured={card.isFeatured}
                        featuredBadge={card.featuredBadge}
                        onCtaClick={() =>
                          scrollToContacts(
                            locale === 'ru' ? `Узнать стоимость: ${card.title ?? ''}` : `Get price: ${card.title ?? ''}`
                          )
                        }
                      />
                    ))}
                  </div>
                </div>
              </section>
            )
          }
          case 'knowledge': {
            const paragraphs = (block.paragraphs as Array<{ text?: string }>) ?? []
            const articles = knowledgeArticles ?? []
            return (
              <KnowledgeSection
                key={key}
                tag={block.tag as string | undefined}
                title={(block.title as string) ?? ''}
                paragraphs={paragraphs.map(p => p.text ?? '')}
                articlesTitle={(block.articlesTitle as string) ?? 'Рекомендуемые статьи'}
                articles={articles}
                locale={locale}
              />
            )
          }
          case 'about': {
            const paragraphs = (block.paragraphs as Array<{ text?: string }>) ?? []
            const stats = (block.stats as Array<{ value?: string; label?: string }>) ?? []
            const avatarObj = block.avatar as { url?: string } | null
            return (
              <AboutSection
                key={key}
                tag={block.tag as string | undefined}
                title={(block.title as string) ?? ''}
                paragraphs={paragraphs.map(p => p.text ?? '')}
                avatarUrl={avatarObj?.url}
                stats={stats.map(s => ({ value: s.value ?? '', label: s.label ?? '' }))}
                locale={locale}
              />
            )
          }
          case 'faq': {
            const items = (block.items as Array<{ question?: string; answer?: string }>) ?? []
            return (
              <FAQSection
                key={key}
                sectionTitle={block.sectionTitle as string | undefined}
                items={items.map(item => ({ question: item.question ?? '', answer: item.answer ?? '' }))}
              />
            )
          }
          case 'badge': {
            const items = (block.items as Array<{ text?: string } | string>) ?? []
            if (!items.length) return null
            return (
              <div key={key} className='bg-slate-50 py-5 border-b border-slate-100'>
                <div className='max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-10'>
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
              <div key={key} className='bg-[#F8FAFC] border-b border-slate-200 py-11'>
                <div className='max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-10'>
                  <div className='grid grid-cols-2 md:grid-cols-4 gap-7 md:gap-6'>
                    {items.map((item, i) => (
                      <div
                        key={i}
                        className={`text-center flex flex-col items-center gap-2 md:flex-col md:items-center md:gap-2 min-w-0 ${i > 0 ? 'md:border-l md:border-slate-200 md:pl-6' : ''}`}
                      >
                        <div className='text-[clamp(24px,5vw,34px)] font-extrabold text-[#1A2E52] leading-none'>
                          {item.value}
                        </div>
                        <div className='text-[13px] text-slate-500 leading-tight max-w-[160px]'>
                          {item.label}
                        </div>
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
