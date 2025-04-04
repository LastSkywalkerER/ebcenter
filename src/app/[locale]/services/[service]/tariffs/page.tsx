import { Locale } from '@/shared/i18n/config'
import { getTranslations } from '@/shared/i18n/utils'
import { BackButton } from '@/shared/ui/buttons/BackButton'
import { TariffCard } from '@/shared/ui/cards/TariffCard'
import { NotFound } from '@/shared/ui/sections/NotFound'
import { SectionTitle } from '@/shared/ui/sections/SectionTitle'

export default async function ServiceTariffs({
  params,
}: {
  params: Promise<{ locale: Locale; service: string }>
}) {
  const { locale, service } = await params
  const t = await getTranslations(locale)

  const serviceKey = Object.entries(t.services.items).find(
    ([, value]) => value.slug === service
  )?.[0]

  const tariffs = serviceKey
    ? t.services.tariffs[serviceKey as keyof typeof t.services.tariffs]
    : null

  return (
    <>
      <main className='flex-grow py-16 bg-white'>
        <div className='max-w-4xl mx-auto px-4 sm:px-6 lg:px-8'>
          <BackButton href={`/services`} text={t.services.backToServices} locale={locale} />

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
    </>
  )
}
