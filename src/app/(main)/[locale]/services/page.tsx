import { serviceSlugs } from '@/shared/constants/services'
import { Locale } from '@/shared/i18n/config'
import { getTranslations } from '@/shared/i18n/utils'
import { ServiceWithTariffs } from '@/shared/types/services'
import { ServiceCard } from '@/shared/ui/cards/ServiceCard'
import { SectionTitle } from '@/shared/ui/sections/SectionTitle'
import { getServiceIcon } from '@/shared/utils/serviceIcons'

export default async function Services({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params
  const t = await getTranslations(locale)

  const services: ServiceWithTariffs[] = Object.entries(t.services.items).map(([key, value]) => ({
    title: value.title,
    description: value.description,
    icon: getServiceIcon(key),
    slug: serviceSlugs[key as keyof typeof serviceSlugs],
    hasTariffs: key in t.services.tariffs,
  }))

  return (
    <>
      <main className='flex-grow py-16 bg-white'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <SectionTitle title={t.services.title} subtitle={t.services.subtitle} />

          <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
            {services.map((service, index) => (
              <ServiceCard
                key={index}
                title={service.title}
                description={service.description}
                slug={service.slug}
                icon={service.icon}
                locale={locale}
                hasTariffs={service.hasTariffs}
                tariffsText={t.common.tariffs}
                moreText={t.common.more}
              />
            ))}
          </div>
        </div>
      </main>
    </>
  )
}
