import { ContactForm } from '@/features/ContactForm'
import { Locale } from '@/shared/i18n/config'
import { getTranslations } from '@/shared/i18n/utils'
import { ContactInfo } from '@/shared/ui/contact/ContactInfo'
import { SectionTitle } from '@/shared/ui/sections/SectionTitle'

export default async function Contacts({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params
  const t = await getTranslations(locale)

  return (
    <>
      <main className='flex-grow py-16 bg-white'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <SectionTitle title={t.contacts.title} subtitle={t.contacts.subtitle} />

          <div className='grid grid-cols-1 lg:grid-cols-2 gap-12'>
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
      </main>
    </>
  )
}
