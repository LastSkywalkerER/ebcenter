import { Locale } from '@/shared/i18n/config'
import { getTranslations } from '@/shared/i18n/utils'
import { BackButton } from '@/shared/ui/buttons/BackButton'
import { CourseProgram } from '@/shared/ui/sections/CourseProgram'
import { NotFound } from '@/shared/ui/sections/NotFound'
import { SectionTitle } from '@/shared/ui/sections/SectionTitle'

export default async function CourseProgramPage({
  params,
}: {
  params: Promise<{ locale: Locale; course: string }>
}) {
  const { locale, course } = await params
  const t = await getTranslations(locale)

  const program =
    t.training.courseProgram.programs[course as keyof typeof t.training.courseProgram.programs]

  return (
    <>
      <main className='flex-grow py-16 bg-gray-50'>
        <div className='max-w-4xl mx-auto px-4 sm:px-6 lg:px-8'>
          <BackButton
            href='/training'
            text={t.training.courseProgram.backToCourses}
            locale={locale}
          />

          {program ? (
            <>
              <SectionTitle title={program.title} />
              <CourseProgram sections={program.sections} />
            </>
          ) : (
            <NotFound
              title={t.training.courseProgram.title}
              description={t.training.courseProgram.inDevelopment}
            />
          )}
        </div>
      </main>
    </>
  )
}
