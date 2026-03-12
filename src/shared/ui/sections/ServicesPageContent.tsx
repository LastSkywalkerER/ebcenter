'use client'

import { useState } from 'react'
import { PageHero } from './PageHero'
import { FAQSection } from './FAQSection'
import { ContactForm } from '@/features/ContactForm'
import type { Translations } from '@/shared/i18n/utils'

interface ServiceDetailProps {
  id: string
  title: string
  paragraphs: string[]
  listTitle: string
  listItems: string[]
  ctaTitle: string
  ctaDescription: string
  ctaPrimary: string
  ctaSecondary?: string
  altBg?: boolean
  onCtaClick: () => void
}

function ServiceDetail({
  id,
  title,
  paragraphs,
  listTitle,
  listItems,
  ctaTitle,
  ctaDescription,
  ctaPrimary,
  ctaSecondary,
  altBg,
  onCtaClick,
}: ServiceDetailProps) {
  return (
    <section
      id={id}
      className={`py-[60px] border-b border-slate-200 ${altBg ? 'bg-[#F8FAFC]' : 'bg-white'}`}
    >
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-10 items-start'>
          <div>
            <h2 className='text-[clamp(20px,3vw,28px)] font-extrabold text-slate-900 mb-5 leading-tight'>
              {title}
            </h2>
            {paragraphs.map((p, i) => (
              <p key={i} className='text-[15px] text-slate-500 leading-[1.7] mb-3.5'>
                {p}
              </p>
            ))}
            <h4 className='text-[15px] font-bold text-slate-900 mb-2.5 mt-1'>{listTitle}</h4>
            <ul className='flex flex-col gap-1.5'>
              {listItems.map((item, i) => (
                <li key={i} className='relative pl-[18px] text-[14px] text-slate-500 leading-relaxed'>
                  <span className='absolute left-0 top-0 text-[#10B981] font-bold text-[13px]'>✓</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className='bg-[#F8FAFC] border border-slate-200 rounded-xl p-7 flex flex-col gap-4'>
            <h4 className='text-[17px] font-bold text-slate-900'>{ctaTitle}</h4>
            <p className='text-[14px] text-slate-500 leading-relaxed'>{ctaDescription}</p>
            <button
              onClick={onCtaClick}
              className='w-full py-2.5 px-5 rounded-lg text-sm font-semibold bg-blue-600 text-white hover:bg-blue-700 transition-colors text-center'
            >
              {ctaPrimary}
            </button>
            {ctaSecondary && (
              <button
                onClick={onCtaClick}
                className='w-full py-2.5 px-5 rounded-lg text-sm font-semibold border border-slate-300 text-slate-700 hover:bg-slate-50 transition-colors text-center'
              >
                {ctaSecondary}
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

interface ServicesPageContentProps {
  translations: Translations
  initialMessage?: string
}

export function ServicesPageContent({ translations: t, initialMessage }: ServicesPageContentProps) {
  const [scrollMessage, setScrollMessage] = useState<string | undefined>(undefined)
  const cf = t.contacts.consultationForm
  const toContacts = (msg: string) => () => {
    setScrollMessage(msg)
    document.getElementById('contacts')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  const services: ServiceDetailProps[] = [
    {
      id: 'raschet-dogovornoy-kontraktnoy-tseny',
      title: 'Расчёт договорной (контрактной) цены',
      paragraphs: [
        'Договорная цена — ключевой документ, определяющий стоимость строительно-монтажных работ по объекту. Она формируется на основании нормативной базы НРР 2022 с применением действующих коэффициентов и индексов изменения стоимости строительства.',
        'Правильно рассчитанная договорная цена защищает интересы как заказчика, так и подрядчика: она исключает споры о стоимости работ и является основанием для заключения договора подряда.',
      ],
      listTitle: 'Что включает услуга:',
      listItems: [
        'Расчёт прямых затрат по НРР 2022 (труд, материалы, машины)',
        'Применение действующих коэффициентов и индексов',
        'Расчёт накладных расходов и плановых накоплений',
        'Учёт временных зданий и сооружений, прочих работ и затрат',
        'Оформление по установленным формам (форма 1, форма 3)',
        'Сопровождение при согласовании с заказчиком',
      ],
      ctaTitle: 'Узнать стоимость',
      ctaDescription: 'Стоимость рассчитывается индивидуально — зависит от вида работ и объёма объекта',
      ctaPrimary: 'Получить консультацию',
      ctaSecondary: 'Задать вопрос',
      altBg: false,
      onCtaClick: toContacts('Узнать стоимость: Расчёт договорной (контрактной) цены'),
    },
    {
      id: 'lokalnaya-smeta-po-defektnomu-aktu',
      title: 'Локальная смета по дефектному акту',
      paragraphs: [
        'Локальная смета по дефектному акту составляется для определения стоимости ремонтных или восстановительных работ, выявленных в ходе обследования объекта. Дефектный акт служит основанием для расчёта объёмов работ и материалов.',
        'Такая смета необходима при ремонте жилых и нежилых помещений, реконструкции зданий, а также при аварийных работах, когда требуется обоснование затрат.',
      ],
      listTitle: 'Что включает услуга:',
      listItems: [
        'Изучение дефектного акта и определение видов работ',
        'Подбор расценок из НРР 2017 / НРР 2022',
        'Расчёт объёмов и стоимости работ по каждой позиции',
        'Составление ведомости объёмов работ и материалов',
        'Оформление локальной сметы по установленным формам',
      ],
      ctaTitle: 'Узнать стоимость',
      ctaDescription: 'Расчёт стоимости — бесплатно. Оставьте заявку и опишите задачу.',
      ctaPrimary: 'Получить консультацию',
      altBg: true,
      onCtaClick: toContacts('Узнать стоимость: Локальная смета по дефектному акту'),
    },
    {
      id: 'akty-sdachi-priemki',
      title: 'Акты выполненных работ (КС-2, С-2а)',
      paragraphs: [
        'Акты выполненных работ — обязательные документы для расчётов между заказчиком и подрядчиком по строительным объектам. Форма С-2а применяется в Республике Беларусь при расчётах за выполненные строительные и монтажные работы.',
        'Правильно оформленный акт — гарантия своевременной оплаты и отсутствия претензий от заказчика или контролирующих органов.',
      ],
      listTitle: 'Что включает услуга:',
      listItems: [
        'Заполнение акта по форме С-2а (КС-2) в Belsmeta',
        'Сопоставление объёмов с утверждённой сметой',
        'Расчёт стоимости с учётом текущих индексов',
        'Оформление справки о стоимости работ (КС-3 / С-3)',
        'Консультация по порядку согласования с заказчиком',
      ],
      ctaTitle: 'Узнать стоимость',
      ctaDescription: 'Стоимость зависит от количества позиций и вида объекта',
      ctaPrimary: 'Получить консультацию',
      altBg: false,
      onCtaClick: toContacts('Узнать стоимость: Акты выполненных работ'),
    },
    {
      id: 'smetnoe-obsluzhivanie',
      title: 'Сметное обслуживание строительных организаций',
      paragraphs: [
        'Постоянное сметное сопровождение — оптимальное решение для строительных компаний, которым регулярно требуется подготовка сметной документации. Вы получаете профессионального сметчика без затрат на штатного сотрудника.',
      ],
      listTitle: 'Что включает обслуживание:',
      listItems: [
        'Регулярная подготовка смет, актов и договоров',
        'Приоритетное выполнение заявок',
        'Неограниченные консультации по сметным вопросам',
        'Контроль актуальности нормативной базы',
        'Правки документов без дополнительной оплаты',
      ],
      ctaTitle: 'Условия обслуживания',
      ctaDescription: 'Стоимость абонентского обслуживания — по договорённости, зависит от объёма работ',
      ctaPrimary: 'Обсудить условия',
      altBg: true,
      onCtaClick: toContacts('Обсудить условия: Сметное обслуживание'),
    },
    {
      id: 'smeti-dlya-hozsposoba',
      title: 'Сметы для хозяйственного способа',
      paragraphs: [
        'Хозяйственный способ строительства — выполнение строительно-монтажных работ силами самого заказчика, без привлечения подрядных организаций. Для таких работ требуется специальная сметная документация, составленная с учётом особенностей законодательства РБ.',
      ],
      listTitle: 'Что включает услуга:',
      listItems: [
        'Сметный расчёт стоимости работ для хозспособа',
        'Учёт специфики нормирования при хозспособе',
        'Ведомость расхода материалов и трудозатрат',
        'Документация для внутреннего учёта организации',
      ],
      ctaTitle: 'Узнать стоимость',
      ctaDescription: 'Оставьте заявку — обсудим задачу и рассчитаем стоимость',
      ctaPrimary: 'Получить консультацию',
      altBg: false,
      onCtaClick: toContacts('Узнать стоимость: Сметы для хозяйственного способа'),
    },
    {
      id: 'smetnaya-dokumentatsiya',
      title: 'Сметная документация для проекта',
      paragraphs: [
        'Полный пакет проектно-сметной документации — необходимое условие для получения разрешения на строительство и финансирования объекта. Документация разрабатывается в соответствии с требованиями ТКП 45 и действующими нормативными правовыми актами.',
      ],
      listTitle: 'Состав документации:',
      listItems: [
        'Сводный сметный расчёт стоимости строительства',
        'Объектные и локальные сметные расчёты',
        'Ведомости объёмов работ',
        'Расчёт договорной (контрактной) цены',
        'Сопроводительные документы и пояснительная записка',
      ],
      ctaTitle: 'Узнать стоимость',
      ctaDescription: 'Стоимость зависит от вида и сложности объекта',
      ctaPrimary: 'Получить консультацию',
      altBg: true,
      onCtaClick: toContacts('Узнать стоимость: Сметная документация для проекта'),
    },
    {
      id: 'sostavlenie-dogovorov-podryada',
      title: 'Подготовка договоров строительного подряда',
      paragraphs: [
        'Договор строительного подряда — основной документ, регулирующий отношения заказчика и подрядчика. Его правильное составление предотвращает споры и защищает интересы сторон.',
      ],
      listTitle: 'Что включает услуга:',
      listItems: [
        'Подготовка договора подряда по нормам ГК РБ',
        'Формирование приложений: ведомость объёмов, график работ',
        'Согласование условий оплаты и порядка расчётов',
        'Учёт требований к гарантийным обязательствам',
        'Консультация по условиям договора',
      ],
      ctaTitle: 'Узнать стоимость',
      ctaDescription: 'Стоимость зависит от типа и сложности договора',
      ctaPrimary: 'Получить консультацию',
      altBg: false,
      onCtaClick: toContacts('Получить консультацию: Подготовка договоров'),
    },
    {
      id: 'konsultatsionnye-uslugi',
      title: 'Консультации по сметному делу',
      paragraphs: [
        'Профессиональная консультация поможет разобраться в нормативной базе, правилах составления документации, вопросах ценообразования и разногласиях с контрагентами.',
      ],
      listTitle: 'Темы консультаций:',
      listItems: [
        'Нормативная база: НРР 2017, НРР 2022, ТКП 45',
        'Порядок расчёта договорной цены',
        'Правила оформления актов выполненных работ',
        'Проверка сметной документации подрядчика',
        'Спорные ситуации при расчётах заказчик–подрядчик',
        'Работа в программе Belsmeta',
      ],
      ctaTitle: 'Записаться на консультацию',
      ctaDescription: 'Консультации проводятся онлайн или по телефону',
      ctaPrimary: 'Записаться',
      altBg: true,
      onCtaClick: toContacts('Записаться на консультацию по сметному делу'),
    },
  ]

  const faqItems = [
    {
      question: 'Сколько стоят сметные услуги?',
      answer: 'Стоимость рассчитывается индивидуально и зависит от вида услуги, объёма и сложности задачи. Для разовых задач — от составления одной локальной сметы. Для постоянного обслуживания — по договорённости. Уточните стоимость, оставив заявку.',
    },
    {
      question: 'Какие программы вы используете?',
      answer: 'Основная программа — Belsmeta, сертифицированное отечественное программное обеспечение для расчёта сметной документации. Работаем с актуальными нормативными базами НРР 2017 и НРР 2022.',
    },
    {
      question: 'В какие сроки будет готова документация?',
      answer: 'Сроки фиксируются на этапе обсуждения задачи. Стандартно: простая смета — 1–2 рабочих дня, акт выполненных работ — 1 рабочий день, договорная цена — 2–5 рабочих дней. Возможна срочная подготовка.',
    },
    {
      question: 'Работаете ли вы с физическими лицами?',
      answer: 'Да, работаем с физическими лицами, индивидуальными предпринимателями и организациями. Для частных заказчиков чаще всего требуются сметы на ремонт квартиры или дома по дефектному акту.',
    },
    {
      question: 'Что нужно предоставить для составления сметы?',
      answer: 'Для локальной сметы: дефектный акт или перечень работ и объёмов. Для договорной цены: проектная документация или техническое задание. Для актов: утверждённая смета и информация о выполненных работах. Подробнее уточним при обсуждении задачи.',
    },
  ]

  return (
    <>
      <PageHero
        tag='Услуги'
        title='Сметные услуги для строительства'
        description='Полный спектр подготовки сметной документации по законодательству Республики Беларусь. Работаем с НРР 2017 и НРР 2022 в программе Belsmeta.'
      />

      {services.map((service) => (
        <ServiceDetail key={service.id} {...service} />
      ))}

      <FAQSection
        sectionTitle='Часто задаваемые вопросы'
        sectionTag='FAQ'
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
                Обратная связь
              </span>
              <h2 className='text-[clamp(22px,4vw,34px)] font-extrabold text-white mb-3.5 leading-tight'>
                Не нашли нужную услугу?
              </h2>
              <p className='text-[15px] text-white/80 mb-7 leading-[1.65]'>
                Опишите вашу задачу — предложим оптимальное решение и рассчитаем стоимость. Работаем с любыми видами сметной документации.
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
