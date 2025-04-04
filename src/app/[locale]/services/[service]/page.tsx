import { Locale } from '@/shared/i18n/config'
import { getTranslations } from '@/shared/i18n/utils'
import { BackButton } from '@/shared/ui/buttons/BackButton'
import { NotFound } from '@/shared/ui/sections/NotFound'
import { ServiceContent } from '@/shared/ui/sections/ServiceContent'

export default async function ServiceDetails({
  params,
}: {
  params: Promise<{ locale: Locale; service: string }>
}) {
  const { locale, service } = await params
  const t = await getTranslations(locale)

  const serviceKey = Object.entries(t.services.items).find(
    ([, value]) => value.slug === service
  )?.[0]

  const serviceDetails = serviceKey
    ? t.services.details[serviceKey as keyof typeof t.services.details]
    : null

  return (
    <>
      <main className='flex-grow py-16 bg-white'>
        <div className='max-w-4xl mx-auto px-4 sm:px-6 lg:px-8'>
          <BackButton href='/services' text={t.services.backToServices} locale={locale} />

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
    </>
  )
}
