'use client'

import { useState } from 'react'
import { PageHero } from './PageHero'
import { FAQSection } from './FAQSection'
import { ContactForm } from '@/features/ContactForm'
import type { Translations } from '@/shared/i18n/utils'

interface CourseModule {
  num: string
  title: string
  description: string
}

interface CourseDetailProps {
  id: string
  icon: React.ReactNode
  label: string
  title: string
  paragraphs: string[]
  modulesTitle: string
  modules: CourseModule[]
  sidebarTitle: string
  sidebarFeatures: string[]
  sidebarNote: string
  primaryBtn: string
  secondaryBtn?: string
  altBg?: boolean
  onCtaClick: () => void
}

function CourseDetail({
  id,
  icon,
  label,
  title,
  paragraphs,
  modulesTitle,
  modules,
  sidebarTitle,
  sidebarFeatures,
  sidebarNote,
  primaryBtn,
  secondaryBtn,
  altBg,
  onCtaClick,
}: CourseDetailProps) {
  return (
    <section
      id={id}
      className={`py-[64px] border-b border-slate-200 ${altBg ? 'bg-[#F8FAFC]' : 'bg-white'}`}
    >
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-10 items-start'>
          {/* Left: content */}
          <div>
            <div className='flex items-start gap-[18px] mb-5'>
              <div className='w-16 h-16 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center shrink-0'>
                {icon}
              </div>
              <div>
                <div className='text-[12px] font-bold uppercase tracking-[0.08em] text-blue-600 mb-1'>
                  {label}
                </div>
                <h2 className='text-[clamp(20px,3vw,28px)] font-extrabold text-slate-900 leading-tight'>
                  {title}
                </h2>
              </div>
            </div>
            {paragraphs.map((p, i) => (
              <p key={i} className='text-[15px] text-slate-500 leading-[1.7] mb-3.5'>
                {p}
              </p>
            ))}
            <h4 className='text-[15px] font-bold text-slate-900 mb-3.5'>{modulesTitle}</h4>
            <div className='flex flex-col gap-2.5'>
              {modules.map((mod, i) => (
                <div
                  key={i}
                  className='flex gap-3.5 px-[18px] py-3.5 bg-white border border-slate-200 rounded-lg items-start'
                >
                  <span className='text-[13px] font-extrabold text-blue-600 min-w-[24px] shrink-0'>
                    {mod.num}
                  </span>
                  <div>
                    <h4 className='text-[14px] font-bold text-slate-900 mb-[3px]'>{mod.title}</h4>
                    <p className='text-[13px] text-slate-500 leading-snug'>{mod.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          {/* Right: sidebar */}
          <div className='bg-white border-[1.5px] border-slate-200 rounded-xl p-7 flex flex-col gap-4'>
            <h3 className='text-[17px] font-bold text-slate-900'>{sidebarTitle}</h3>
            <ul className='flex flex-col gap-2.5'>
              {sidebarFeatures.map((feat, i) => (
                <li
                  key={i}
                  className='relative pl-[22px] text-[14px] text-slate-500 leading-snug'
                >
                  <span className='absolute left-0 text-[#10B981] font-bold text-[13px]'>✓</span>
                  {feat}
                </li>
              ))}
            </ul>
            <div className='h-px bg-slate-200' />
            <p className='text-[13px] text-slate-500 leading-relaxed'>{sidebarNote}</p>
            <button
              onClick={onCtaClick}
              className='w-full py-2.5 px-5 rounded-lg text-sm font-semibold bg-blue-600 text-white hover:bg-blue-700 transition-colors'
            >
              {primaryBtn}
            </button>
            {secondaryBtn && (
              <button
                onClick={onCtaClick}
                className='w-full py-2.5 px-5 rounded-lg text-sm font-semibold border border-slate-300 text-slate-700 hover:bg-slate-50 transition-colors'
              >
                {secondaryBtn}
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

interface TrainingPageContentProps {
  translations: Translations
  initialMessage?: string
}

export function TrainingPageContent({ translations: t, initialMessage }: TrainingPageContentProps) {
  const [scrollMessage, setScrollMessage] = useState<string | undefined>(undefined)
  const cf = t.contacts.consultationForm
  const toContacts = (msg: string) => () => {
    setScrollMessage(msg)
    document.getElementById('contacts')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  const courses: CourseDetailProps[] = [
    {
      id: 'express-course',
      icon: (
        <svg width='32' height='32' viewBox='0 0 24 24' fill='none'>
          <path d='M22 10v6M2 10l10-5 10 5-10 5-10-5z' stroke='currentColor' strokeWidth='1.5' strokeLinecap='round' strokeLinejoin='round'/>
          <path d='M6 12v5c3.33 1.67 8.67 1.67 12 0v-5' stroke='currentColor' strokeWidth='1.5' strokeLinecap='round'/>
        </svg>
      ),
      label: 'Начальный уровень',
      title: 'Экспресс-курс сметчик',
      paragraphs: [
        'Курс разработан для тех, кто хочет быстро и системно войти в профессию сметчика. Вы получите практические навыки составления сметной документации, научитесь работать с нормативной базой и освоите программу Belsmeta.',
        'Формат: онлайн-занятия с разбором реальных задач. После курса вы сможете самостоятельно составлять локальные сметы и акты выполненных работ.',
      ],
      modulesTitle: 'Программа курса',
      modules: [
        { num: '01', title: 'Введение в сметное дело', description: 'Структура строительного ценообразования в РБ. Нормативная база НРР. Виды сметной документации.' },
        { num: '02', title: 'Нормативная база НРР 2022', description: 'Структура и состав НРР. Как читать расценки. Статьи затрат: труд, материалы, машины. Применение коэффициентов.' },
        { num: '03', title: 'Программа Belsmeta: от нуля до первой сметы', description: 'Установка, интерфейс, создание объекта. Заполнение позиций сметы. Формирование итогов и печатных форм.' },
        { num: '04', title: 'Локальная смета: практика', description: 'Составление локальной сметы на ремонтные работы. Разбор типовых ошибок. Проверка расчётов.' },
        { num: '05', title: 'Акты выполненных работ С-2а', description: 'Заполнение актов на основании утверждённых смет. Расчёт стоимости с учётом индексов. Оформление.' },
      ],
      sidebarTitle: 'Экспресс-курс сметчик',
      sidebarFeatures: [
        'Для начинающих сметчиков',
        'Онлайн-формат, гибкий график',
        'Реальные практические задания',
        'НРР 2017 и НРР 2022',
        'Практика в Belsmeta',
        'Разбор ошибок и вопросов',
      ],
      sidebarNote: 'Стоимость и расписание уточняйте при записи — составляем программу под вас',
      primaryBtn: 'Записаться на курс',
      secondaryBtn: 'Задать вопрос',
      altBg: false,
      onCtaClick: toContacts('Записаться на курс: Экспресс-курс сметчик'),
    },
    {
      id: 'contract-price',
      icon: (
        <svg width='32' height='32' viewBox='0 0 24 24' fill='none'>
          <path d='M18 20V10M12 20V4M6 20v-6' stroke='currentColor' strokeWidth='1.5' strokeLinecap='round' strokeLinejoin='round'/>
        </svg>
      ),
      label: 'Продвинутый уровень',
      title: 'Контрактная цена',
      paragraphs: [
        'Продвинутый курс для тех, кто уже знаком с основами сметного дела и хочет освоить расчёт договорной и контрактной цены — ключевого документа в системе ценообразования строительства РБ.',
        'Курс построен на разборе реальных объектов. Вы научитесь рассчитывать все виды договорных цен, применять коэффициенты и индексы, работать с приложениями к договорам подряда.',
      ],
      modulesTitle: 'Программа курса',
      modules: [
        { num: '01', title: 'Нормативная база: НРР 2017 vs НРР 2022', description: 'Отличия НРР 2017 и НРР 2022. Когда применяется каждая. Актуальные коэффициенты и индексы изменения стоимости.' },
        { num: '02', title: 'Виды договорных цен', description: 'Твёрдая, приблизительная, открытая договорная цена. Когда применяется каждый вид. Порядок формирования.' },
        { num: '03', title: 'Состав договорной цены', description: 'Прямые затраты, накладные расходы, плановые накопления. Временные здания и сооружения. Прочие затраты. Резерв средств.' },
        { num: '04', title: 'Расчёт в программе Belsmeta', description: 'Настройка параметров объекта. Заполнение форм договорной цены. Проверка итогов. Печатные формы.' },
        { num: '05', title: 'Разбор реальных кейсов', description: 'Расчёт договорной цены на реальных объектах различных видов строительства. Разбор спорных ситуаций.' },
      ],
      sidebarTitle: 'Контрактная цена',
      sidebarFeatures: [
        'Для практикующих сметчиков',
        'Онлайн-формат, гибкий график',
        'Реальные объекты в практике',
        'НРР 2017 и НРР 2022',
        'Все виды договорных цен',
        'Разбор спорных ситуаций',
      ],
      sidebarNote: 'Для прохождения курса желательно знание основ сметного дела',
      primaryBtn: 'Записаться на курс',
      secondaryBtn: 'Задать вопрос',
      altBg: true,
      onCtaClick: toContacts('Записаться на курс: Контрактная цена'),
    },
    {
      id: 'individual',
      icon: (
        <svg width='32' height='32' viewBox='0 0 24 24' fill='none'>
          <path d='M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2M12 11a4 4 0 100-8 4 4 0 000 8z' stroke='currentColor' strokeWidth='1.5' strokeLinecap='round' strokeLinejoin='round'/>
        </svg>
      ),
      label: 'Индивидуально',
      title: 'Индивидуальное обучение',
      paragraphs: [
        'Персональная программа обучения, разработанная под ваши конкретные задачи и текущий уровень подготовки. Занятия проводятся в удобное для вас время, в темпе, который подходит именно вам.',
        'Индивидуальный формат особенно эффективен, если у вас есть конкретные задачи на работе, вопросы, которые вы хотите разобрать на своих примерах, или если вы хотите быстро освоить определённую тему.',
      ],
      modulesTitle: 'Примеры тем для обучения',
      modules: [
        { num: '→', title: 'Работа с Belsmeta: углублённый уровень', description: 'Настройки программы, нестандартные позиции, автоматизация типовых операций.' },
        { num: '→', title: 'Проверка и анализ сметной документации', description: 'Как проверить смету от подрядчика. Типичные ошибки и завышения. Методика проверки.' },
        { num: '→', title: 'Нестандартные работы в сметах', description: 'Составление единичных расценок. Обоснование применения специальных расценок.' },
        { num: '→', title: 'Ваша тема', description: 'Разберём любой вопрос по сметному делу на примере ваших реальных задач и документов.' },
      ],
      sidebarTitle: 'Индивидуальное обучение',
      sidebarFeatures: [
        'Программа под ваши задачи',
        'Удобный график занятий',
        'Разбор ваших документов',
        'Любой уровень подготовки',
        'Онлайн-формат',
        'Личное сопровождение',
      ],
      sidebarNote: 'Расскажите о ваших задачах — составим программу и обсудим условия',
      primaryBtn: 'Обсудить программу',
      altBg: false,
      onCtaClick: toContacts('Обсудить программу: Индивидуальное обучение'),
    },
  ]

  const faqItems = [
    {
      question: 'Нужно ли иметь опыт в строительстве для прохождения курсов?',
      answer: 'Для экспресс-курса сметчика опыт в строительстве не обязателен — курс рассчитан на начинающих. Для курса по контрактной цене желательно понимание основ сметного дела. В индивидуальном обучении программа подстраивается под ваш уровень.',
    },
    {
      question: 'Нужно ли устанавливать программу Belsmeta?',
      answer: 'Для курсов, включающих практику в Belsmeta, потребуется установленная программа. Помогу разобраться с установкой и первоначальной настройкой. Belsmeta — платный продукт, уточните стоимость лицензии у разработчика.',
    },
    {
      question: 'В каком формате проводятся занятия?',
      answer: 'Занятия проводятся онлайн — через видеозвонок с демонстрацией экрана. Это позволяет работать с программой Belsmeta в реальном времени и разбирать задачи наглядно. График обсуждается индивидуально.',
    },
    {
      question: 'Будет ли выдан сертификат после прохождения курса?',
      answer: 'Курсы ориентированы на получение практических навыков, а не официальных документов. Вы получите реальные знания и умение работать с документацией. Если вам нужен государственный сертификат, уточните при записи — подскажу дополнительные варианты.',
    },
  ]

  return (
    <>
      <PageHero
        tag='Обучение'
        title='Курсы по сметному делу в строительстве'
        description='Практические курсы от действующего сметчика. Работа с реальными задачами, нормативной базой НРР 2017 и НРР 2022, практика в программе Belsmeta.'
      />

      {courses.map((course) => (
        <CourseDetail key={course.id} {...course} />
      ))}

      <FAQSection
        sectionTag='Вопросы'
        sectionTitle='Часто задаваемые вопросы об обучении'
        items={faqItems}
      />

      <section
        id='contacts'
        className='py-[72px] bg-gradient-to-br from-[#1A2E52] to-[#2B4A8A]'
      >
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='grid grid-cols-1 lg:grid-cols-2 gap-[72px] items-start'>
            <div className='text-white'>
              <span className='inline-block bg-white/[0.18] text-white/95 text-[12px] font-bold tracking-[0.08em] uppercase px-3 py-1 rounded-full mb-3.5'>
                Запись
              </span>
              <h2 className='text-[clamp(22px,4vw,34px)] font-extrabold text-white mb-3.5 leading-tight'>
                Записаться на курс
              </h2>
              <p className='text-[15px] text-white/80 mb-7 leading-[1.65]'>
                Оставьте заявку — обсудим подходящий формат и составим удобное расписание занятий.
              </p>
              <div className='space-y-3'>
                <div className='flex items-center gap-3'>
                  <svg className='w-5 h-5 text-white/60 shrink-0' viewBox='0 0 24 24' fill='none'>
                    <path d='M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z' stroke='currentColor' strokeWidth='1.5'/>
                  </svg>
                  <a href={`tel:${t.common.contactInfo.phone.replace(/\D/g, '')}`} className='text-white/85 hover:text-white text-[15px]'>
                    {t.common.contactInfo.phone}
                  </a>
                </div>
                <div className='flex items-center gap-3'>
                  <svg className='w-5 h-5 text-white/60 shrink-0' viewBox='0 0 24 24' fill='none'>
                    <path d='M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z' stroke='currentColor' strokeWidth='1.5'/>
                    <path d='M22 6l-10 7L2 6' stroke='currentColor' strokeWidth='1.5'/>
                  </svg>
                  <a href={`mailto:${t.common.contactInfo.email}`} className='text-white/85 hover:text-white text-[15px]'>
                    {t.common.contactInfo.email}
                  </a>
                </div>
              </div>
            </div>
            <ContactForm
              title={t.contacts.form.title}
              name={t.common.name}
              contactPlaceholder={cf?.contactPlaceholder ?? 'Email или телефон'}
              message={t.common.message}
              submit={t.contacts.form.submit}
              success={t.common.success}
              error={t.common.error}
              sending={t.common.sending}
              securityCheck={t.common.securityCheck}
              securityError={t.common.securityError}
              validation={{
                nameRequired: t.common.validation.nameRequired,
                messageRequired: t.common.validation.messageRequired,
              }}
              contactRequired={cf?.contactRequired ?? 'Введите email или телефон'}
              contactInvalid={cf?.contactInvalid ?? t.common.phoneError}
              initialMessage={scrollMessage ?? initialMessage}
            />
          </div>
        </div>
      </section>
    </>
  )
}
