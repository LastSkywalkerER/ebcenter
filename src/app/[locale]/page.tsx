import { ContactForm } from '@/features/ContactForm'
import { Hero } from '@/features/Hero/Hero'
import { Locale } from '@/shared/i18n/config'
import { getTranslations } from '@/shared/i18n/utils'
import { ServiceCard } from '@/shared/ui/cards/ServiceCard'
import { ContactInfo } from '@/shared/ui/contact/ContactInfo'
import {
  CurrentRepairIcon,
  EstimateDocsIcon,
  EstimateServiceIcon,
} from '@/shared/ui/icons/ServiceIcons'
import { SectionTitle } from '@/shared/ui/sections/SectionTitle'

export default async function HomeAlt({ params }: { params: Promise<{ locale: Locale }> }) {
  const locale = (await params).locale
  const t = await getTranslations(locale)

  const serviceIcons = {
    estimateService: <EstimateServiceIcon />,
    currentRepair: <CurrentRepairIcon />,
    estimateDocs: <EstimateDocsIcon />,
  }

  return (
    <>
      <main className='flex-grow'>
        <Hero
          title={t.home.hero.title}
          subtitle={t.home.hero.subtitle}
          cta={t.home.hero.cta}
          training={t.common.training}
          locale={locale}
        />

        {/* Description Section with Cards */}
        <section className='py-24 bg-white'>
          <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
            <SectionTitle title={t.home.description.title} subtitle={t.home.description.text} />

            <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
              {Object.entries(t.services.items)
                .slice(0, 3)
                .map(([key, service]) => (
                  <ServiceCard
                    key={key}
                    title={service.title}
                    description={service.description}
                    slug={service.slug}
                    icon={serviceIcons[key as keyof typeof serviceIcons]}
                    locale={locale}
                    hasTariffs={key in t.services.tariffs}
                    tariffsText={t.common.tariffs}
                    moreText={t.common.more}
                  />
                ))}
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className='py-24 bg-gray-50'>
          <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
            <div className='grid grid-cols-1 lg:grid-cols-2 gap-12 items-center'>
              <div>
                <h2 className='text-2xl font-bold text-gray-900 mb-6'>{t.contacts.title}</h2>
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
          </div>
        </section>
      </main>
    </>
  )
}
