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
                address={t.contacts.contactInfo.address}
                addressValue={t.contacts.contactInfo.addressValue}
                phone={t.contacts.contactInfo.phone}
                phoneValue={t.contacts.contactInfo.phoneValue}
                email={t.contacts.contactInfo.email}
                emailValue={t.contacts.contactInfo.emailValue}
                unp={t.contacts.contactInfo.unp}
                unpValue={t.contacts.contactInfo.unpValue}
                workingHours={t.contacts.contactInfo.workingHours}
                workingHoursValue={t.contacts.contactInfo.workingHoursValue}
              />
            </div>

            <ContactForm
              title={t.contacts.form.title}
              name={t.contacts.form.name}
              email={t.contacts.form.email}
              phone={t.contacts.form.phone}
              message={t.contacts.form.message}
              submit={t.contacts.form.submit}
              phonePlaceholder={t.contacts.form.phonePlaceholder}
              phoneError={t.contacts.form.phoneError}
              success={t.contacts.form.success}
              error={t.contacts.form.error}
              sending={t.contacts.form.sending}
              securityCheck={t.contacts.form.securityCheck}
              securityError={t.contacts.form.securityError}
              validation={{
                nameRequired: t.contacts.form.validation.nameRequired,
                messageRequired: t.contacts.form.validation.messageRequired,
                emailInvalid: t.contacts.form.validation.emailInvalid,
              }}
            />
          </div>
        </div>
      </main>
    </>
  )
}
