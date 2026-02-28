'use client'

import { ContactForm } from '@/features/ContactForm'
import { Hero } from '@/features/Hero/Hero'
import type { Locale } from '@/shared/i18n/config'
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
}

function getBackgroundUrl(background: unknown): string | null {
  if (background && typeof background === 'object' && 'url' in background) {
    return (background as { url?: string }).url ?? null
  }
  return null
}

export function BlockRenderer({ blocks, locale, translations }: BlockRendererProps) {
  if (!blocks?.length) return null

  const t = translations

  return (
    <>
      {blocks.map((block, index) => {
        const key = `${block.blockType}-${index}`

        switch (block.blockType) {
          case 'hero': {
            const ctaLink = (block.ctaLink as string) || `/${locale}/services`
            const secondaryCtaLink = (block.secondaryCtaLink as string) || `/${locale}/training`
            const bgUrl = getBackgroundUrl(block.background)
            return (
              <Hero
                key={key}
                title={(block.title as string) ?? ''}
                subtitle={(block.subtitle as string) ?? ''}
                cta={(block.cta as string) ?? t.home.hero.cta}
                training={(block.secondaryCta as string) ?? t.common.training}
                locale={locale}
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
            const items = Object.entries(t.services.items)
            const displayed = limit > 0 ? items.slice(0, limit) : items
            return (
              <section key={key} className='py-16 bg-white'>
                <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
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
            const formBlock = block as Record<string, unknown>
            return (
              <section key={key} className='py-16 bg-gray-50'>
                <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
                  <ContactForm
                    title={(formBlock.title as string) || t.contacts.form.title}
                    name={(formBlock.nameLabel as string) || t.common.name}
                    email={(formBlock.emailLabel as string) || t.common.email}
                    phone={(formBlock.phoneLabel as string) || t.common.phone}
                    message={(formBlock.messageLabel as string) || t.common.message}
                    submit={(formBlock.submitLabel as string) || t.contacts.form.submit}
                    phonePlaceholder={(formBlock.phonePlaceholder as string) || t.contacts.form.phonePlaceholder}
                    phoneError={(formBlock.phoneError as string) || t.common.phoneError}
                    success={(formBlock.successMessage as string) || t.common.success}
                    error={(formBlock.errorMessage as string) || t.common.error}
                    sending={(formBlock.sendingMessage as string) || t.common.sending}
                    securityCheck={(formBlock.securityCheck as string) || t.common.securityCheck}
                    securityError={(formBlock.securityError as string) || t.common.securityError}
                    validation={{
                      nameRequired: (formBlock.validationNameRequired as string) || t.common.validation.nameRequired,
                      messageRequired: (formBlock.validationMessageRequired as string) || t.common.validation.messageRequired,
                      emailInvalid: (formBlock.validationEmailInvalid as string) || t.common.validation.emailInvalid,
                    }}
                  />
                </div>
              </section>
            )
          }
          case 'contactInfo': {
            const infoBlock = block as Record<string, unknown>
            return (
              <section key={key} className='py-16 bg-white'>
                <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
                  <div className='bg-white rounded-lg shadow-lg p-8'>
                    <ContactInfo
                      address={t.common.address}
                      addressValue={(infoBlock.contactAddress as string) || t.common.contactInfo.address}
                      phone={t.common.phone}
                      phoneValue={(infoBlock.contactPhone as string) || t.common.contactInfo.phone}
                      email={t.common.email}
                      emailValue={(infoBlock.contactEmail as string) || t.common.contactInfo.email}
                      unp={t.common.unp}
                      unpValue={(infoBlock.contactUnp as string) || t.common.contactInfo.unp}
                      workingHours={t.common.workingHours}
                      workingHoursValue={(infoBlock.contactWorkingHours as string) || t.common.contactInfo.workingHours}
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
