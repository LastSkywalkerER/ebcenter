'use client'

import Image from 'next/image'
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
}

function getBackgroundUrl(background: unknown): string | null {
  if (background && typeof background === 'object' && 'url' in background) {
    return (background as { url?: string }).url ?? null
  }
  return null
}

export function BlockRenderer({ blocks, locale, translations, heroBackgroundUrl }: BlockRendererProps) {
  if (!blocks?.length) return null

  const t = translations

  return (
    <>
      {blocks.map((block, index) => {
        const key = `${block.blockType}-${index}`

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
              />
            )
          }
          case 'section':
            return (
              <section key={key} className='py-16 bg-white'>
                <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
                  <SectionTitle
                    title={(block.title as string) ?? ''}
                    subtitle={(block.subtitle as string) ?? undefined}
                  />
                </div>
              </section>
            )
          case 'seoParagraphs': {
            const paragraphs = (block.paragraphs as Array<{ text?: string }>) ?? []
            const title = block.title as string | undefined
            return (
              <section key={key} className='py-16 bg-white'>
                <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
                  {title && (
                    <h2 className='text-2xl md:text-3xl font-bold text-gray-900 mb-6 text-center'>
                      {title}
                    </h2>
                  )}
                  <div className='prose prose-gray max-w-none space-y-4'>
                    {paragraphs.map((p, i) => (
                      <p key={i} className='text-gray-600 text-justify'>
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
            return (
              <section key={key} className='py-16 bg-white'>
                <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
                  <div className='grid grid-cols-1 lg:grid-cols-2 gap-12 items-center'>
                    {imageUrl && (
                      <div className='relative aspect-video rounded-lg overflow-hidden bg-gray-100'>
                        <Image
                          src={imageUrl}
                          alt={(block.title as string) ?? ''}
                          fill
                          className='object-cover'
                          sizes='(max-width: 1024px) 100vw, 50vw'
                        />
                      </div>
                    )}
                    <div>
                      <h2 className='text-2xl md:text-3xl font-bold text-gray-900 mb-6'>
                        {(block.title as string) ?? ''}
                      </h2>
                      <div className='space-y-4'>
                        {paragraphs.map((p, i) => (
                          <p key={i} className='text-gray-600 text-justify'>
                            {p.text}
                          </p>
                        ))}
                        {(block.linkUrl as string) && (
                          <a
                            href={(block.linkUrl as string).startsWith('http') ? (block.linkUrl as string) : `https://${block.linkUrl}`}
                            target='_blank'
                            rel='noopener noreferrer'
                            className='inline-block mt-4 text-blue-600 hover:text-blue-800 font-medium'
                          >
                            {(block.linkText as string) || 'Подробнее'}
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
              <section key={key} className='py-16 bg-white'>
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
            const items = Object.entries(t.services.items)
            const displayed = limit > 0 ? items.slice(0, limit) : items
            return (
              <section key={key} className='py-16 bg-white'>
                <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
                  {sectionTitle && (
                    <h2 className='text-2xl md:text-3xl font-bold text-gray-900 mb-12 text-center'>
                      {sectionTitle}
                    </h2>
                  )}
                  <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
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
            const courseIcons: Record<string, React.ReactNode> = {
              'express-course': <ExpressCourseIcon />,
              'contract-price': <ContractPriceIcon />,
              individual: <IndividualIcon />,
            }
            return (
              <section key={key} className='py-16 bg-white'>
                <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
                  <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
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
            return (
              <section key={key} className='py-16 bg-gray-50'>
                <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
                  <ContactForm
                    title={t.contacts.form.title}
                    name={t.common.name}
                    email={t.common.email}
                    phone={t.common.phone}
                    message={t.common.message}
                    submit={t.contacts.form.submit}
                    phonePlaceholder={t.contacts.form.phonePlaceholder}
                    phoneError={t.common.phoneError}
                    success={t.common.success}
                    error={t.common.error}
                    sending={t.common.sending}
                    securityCheck={t.common.securityCheck}
                    securityError={t.common.securityError}
                    validation={{
                      nameRequired: t.common.validation.nameRequired,
                      messageRequired: t.common.validation.messageRequired,
                      emailInvalid: t.common.validation.emailInvalid,
                    }}
                  />
                </div>
              </section>
            )
          }
          case 'contactInfo': {
            return (
              <section key={key} className='py-16 bg-white'>
                <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
                  <div className='bg-white rounded-lg shadow-lg p-8'>
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
          default:
            return null
        }
      })}
    </>
  )
}
