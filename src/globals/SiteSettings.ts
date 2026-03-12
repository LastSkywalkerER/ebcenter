import type { GlobalConfig } from 'payload'

export const SiteSettings: GlobalConfig = {
  slug: 'site-settings',
  label: 'Site Settings',
  access: {
    read: () => true,
  },
  admin: {
    livePreview: {
      url: ({ locale }) => {
        const loc = locale?.code ?? 'ru'
        const base = process.env.NEXT_PUBLIC_SERVER_URL ?? process.env.NEXT_PUBLIC_SITE_URL ?? ''
        if (loc === 'ru') return base || '/'
        return `${base}/${loc}`.replace(/\/$/, '') || `/${loc}`
      },
      breakpoints: [
        { label: 'Desktop', name: 'desktop', width: 1280, height: 800 },
        { label: 'Tablet', name: 'tablet', width: 768, height: 1024 },
        { label: 'Mobile', name: 'mobile', width: 375, height: 667 },
      ],
    },
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Hero',
          fields: [
            {
              name: 'heroTitle',
              type: 'text',
              required: true,
              localized: true,
              defaultValue: 'Сметные услуги в строительстве',
            },
            {
              name: 'heroSubtitle',
              type: 'text',
              localized: true,
              defaultValue: 'Быстрое и качественное составление документации',
            },
            {
              name: 'heroCta',
              type: 'text',
              localized: true,
              defaultValue: 'Наши услуги',
            },
            {
              name: 'heroBackground',
              type: 'upload',
              relationTo: 'media',
              localized: false,
            },
            {
              name: 'descriptionTitle',
              type: 'text',
              localized: true,
              defaultValue: 'Сметная документация и\u00A0обучение сметчиков',
            },
            {
              name: 'descriptionText',
              type: 'textarea',
              localized: true,
              defaultValue: 'Инженерный Бизнес Центр предоставляет услуги по составлению сметной документации, по сметному обслуживанию строительных компаний в части составления отчетной документации, образовательные услуги по индивидуальному, корпоративному, дистанционному и групповому обучению сметному делу.',
            },
          ],
        },
        {
          label: 'Header',
          fields: [
            {
              name: 'headerLogo',
              type: 'upload',
              relationTo: 'media',
            },
            {
              name: 'headerLogoText',
              type: 'text',
              localized: true,
              defaultValue: 'Prosmety',
            },
            {
              type: 'collapsible',
              label: 'Navigation Labels',
              admin: { description: 'Labels for header navigation items' },
              fields: [
                { name: 'navTariffs', type: 'text', localized: true, defaultValue: 'Тарифы' },
                { name: 'navKnowledge', type: 'text', localized: true, defaultValue: 'База знаний' },
                { name: 'navAbout', type: 'text', localized: true, defaultValue: 'О нас' },
              ],
            },
          ],
        },
        {
          label: 'Footer',
          fields: [
            { name: 'footerTitle', type: 'text', localized: true, defaultValue: 'ProSmety' },
            { name: 'footerDescription', type: 'textarea', localized: true, defaultValue: 'Сметные услуги в строительстве и обучение сметному делу' },
            { name: 'footerQuickLinksTitle', type: 'text', localized: true, defaultValue: 'Навигация', admin: { description: 'Заголовок блока навигации в футере' } },
            { name: 'footerCopyright', type: 'text', localized: true, defaultValue: 'Все права защищены' },
          ],
        },
        {
          label: 'Common',
          fields: [
            { name: 'commonMore', type: 'text', localized: true, defaultValue: 'Подробнее' },
            { name: 'commonTariffs', type: 'text', localized: true, defaultValue: 'Тарифы' },
            { name: 'commonRegister', type: 'text', localized: true, defaultValue: 'Записаться' },
            { name: 'commonSendRequest', type: 'text', localized: true, defaultValue: 'Отправить заявку' },
            { name: 'commonCourseProgram', type: 'text', localized: true, defaultValue: 'Программа курса' },
            { name: 'commonHome', type: 'text', localized: true, defaultValue: 'Главная' },
            { name: 'commonServices', type: 'text', localized: true, defaultValue: 'Услуги' },
            { name: 'commonTraining', type: 'text', localized: true, defaultValue: 'Обучение' },
            { name: 'commonContacts', type: 'text', localized: true, defaultValue: 'Контакты' },
            { name: 'commonContactUs', type: 'text', localized: true, defaultValue: 'Связаться с нами' },
            { name: 'commonPhone', type: 'text', localized: true, defaultValue: 'Телефон' },
            { name: 'commonEmail', type: 'text', localized: true, defaultValue: 'Email' },
            { name: 'commonAddress', type: 'text', localized: true, defaultValue: 'Адрес' },
            { name: 'commonWorkingHours', type: 'text', localized: true, defaultValue: 'Режим работы' },
            { name: 'commonName', type: 'text', localized: true, defaultValue: 'Имя' },
            { name: 'commonMessage', type: 'text', localized: true, defaultValue: 'Сообщение' },
            { name: 'commonSelectCourse', type: 'text', localized: true, defaultValue: 'Выберите курс' },
            { name: 'commonViewAllServices', type: 'text', localized: true, defaultValue: 'Все услуги' },
            { name: 'commonOrderCall', type: 'text', localized: true, defaultValue: 'Заказать звонок' },
            { name: 'commonGetConsultation', type: 'text', localized: true, defaultValue: 'Получить консультацию' },
            { name: 'commonDisclaimer', type: 'text', localized: true, defaultValue: 'Мы улучшили наш сайт, старую версию вы можете найти по ссылке' },
            { name: 'commonPhoneError', type: 'text', localized: true, defaultValue: 'Пожалуйста, введите корректный номер телефона в формате +375XXXXXXXXX' },
            { name: 'commonSuccess', type: 'text', localized: true, defaultValue: 'Ваше сообщение успешно отправлено!' },
            { name: 'commonError', type: 'text', localized: true, defaultValue: 'Произошла ошибка при отправке сообщения. Пожалуйста, попробуйте еще раз.' },
            { name: 'commonSending', type: 'text', localized: true, defaultValue: 'Отправка...' },
            { name: 'commonSecurityCheck', type: 'text', localized: true, defaultValue: 'Пожалуйста, пройдите проверку безопасности' },
            { name: 'commonSecurityError', type: 'text', localized: true, defaultValue: 'Проверка безопасности не пройдена. Пожалуйста, попробуйте еще раз.' },
            { name: 'commonUnp', type: 'text', localized: true, defaultValue: 'УНП' },
            {
              type: 'collapsible',
              label: 'Validation',
              fields: [
                { name: 'validationNameRequired', type: 'text', localized: true, defaultValue: 'Пожалуйста, введите ваше имя' },
                { name: 'validationMessageRequired', type: 'text', localized: true, defaultValue: 'Пожалуйста, введите ваше сообщение' },
                { name: 'validationEmailInvalid', type: 'text', localized: true, defaultValue: 'Пожалуйста, введите корректный email адрес' },
              ],
            },
            {
              type: 'collapsible',
              label: 'Services',
              fields: [
                { name: 'servicesTitle', type: 'text', localized: true, defaultValue: 'Наши услуги' },
                { name: 'servicesSubtitle', type: 'text', localized: true, defaultValue: 'Услуги в сфере строительства и проектирования' },
                { name: 'backToServices', type: 'text', localized: true, defaultValue: 'Вернуться к услугам' },
                { name: 'backToService', type: 'text', localized: true, defaultValue: 'Вернуться к услуге' },
                { name: 'notFoundTitle', type: 'text', localized: true, defaultValue: 'Услуга не найдена' },
                { name: 'notFoundDescription', type: 'text', localized: true, defaultValue: 'Запрошенная услуга не существует' },
              ],
            },
            {
              type: 'collapsible',
              label: 'Training',
              fields: [
                { name: 'trainingSubtitle', type: 'text', localized: true, defaultValue: 'Курсы по сметному делу и ценообразованию' },
                { name: 'courseDetails', type: 'text', localized: true, defaultValue: 'Детали курса:' },
                { name: 'registrationTitle', type: 'text', localized: true, defaultValue: 'Запись на обучение' },
                { name: 'backToCourses', type: 'text', localized: true, defaultValue: 'Вернуться к курсам' },
                { name: 'inDevelopment', type: 'text', localized: true, defaultValue: 'Программа курса находится в разработке' },
                { name: 'courseProgramTitle', type: 'text', localized: true, defaultValue: 'Программа курса' },
              ],
            },
          ],
        },
        {
          label: 'SEO',
          fields: [
            {
              name: 'metaTitle',
              type: 'text',
              localized: true,
              admin: { description: 'Default meta title for the site' },
            },
            {
              name: 'metaDescription',
              type: 'textarea',
              localized: true,
              admin: { description: 'Default meta description' },
            },
            {
              name: 'metaKeywords',
              type: 'text',
              localized: true,
              admin: { description: 'Default meta keywords (comma-separated)' },
            },
            {
              name: 'ogImage',
              type: 'upload',
              relationTo: 'media',
              localized: true,
              admin: { description: 'OG изображение (рекомендуется 1200×630 px). Если не задано — используется фоновое изображение Hero.' },
            },
            {
              name: 'robotsIndex',
              type: 'checkbox',
              defaultValue: true,
              admin: { description: 'Allow search engines to index the site' },
            },
            {
              name: 'robotsFollow',
              type: 'checkbox',
              defaultValue: true,
              admin: { description: 'Allow search engines to follow links' },
            },
          ],
        },
      ],
    },
  ],
}
