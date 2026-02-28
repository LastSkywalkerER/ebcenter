import { ContactForm } from '@/features/ContactForm'
import coursesData from '@/shared/constants/courses.json'
import { Locale } from '@/shared/i18n/config'
import { getTranslations } from '@/shared/i18n/utils'
import { CourseCard } from '@/shared/ui/cards/CourseCard'
import { ContractPriceIcon, ExpressCourseIcon, IndividualIcon } from '@/shared/ui/icons/CourseIcons'
import { SectionTitle } from '@/shared/ui/sections/SectionTitle'

const courses = [
  {
    programSlug: coursesData['express-course'].slug,
    icon: <ExpressCourseIcon />,
  },
  {
    programSlug: coursesData['contract-price'].slug,
    icon: <ContractPriceIcon />,
  },
  {
    programSlug: coursesData['individual'].slug,
    icon: <IndividualIcon />,
  },
]

export default async function Training({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params
  const t = await getTranslations(locale)

  return (
    <>
      <main className='flex-grow py-16 bg-white'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <SectionTitle title={t.training.title} subtitle={t.training.subtitle} />

          <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
            {courses.map((course, index) => {
              const courseData =
                t.training.courses[course.programSlug as keyof typeof t.training.courses]
              return (
                <CourseCard
                  key={index}
                  course={{
                    ...course,
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

          <div id='registration' className='mt-16'>
            <ContactForm
              title={t.training.registration.title}
              name={t.common.name}
              email={t.common.email}
              phone={t.common.phone}
              message={t.common.message}
              submit={t.common.sendRequest}
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
