import type { GlobalConfig } from 'payload'

export const Contacts: GlobalConfig = {
  slug: 'contacts',
  label: 'Contact Info',
  access: {
    read: () => true,
  },
  admin: {
    description: 'Phone, email, address — used on main page and in footer. No separate contacts page.',
    livePreview: {
      url: ({ locale }) => {
        const loc = locale?.code ?? 'ru'
        const base = process.env.NEXT_PUBLIC_SERVER_URL ?? ''
        const path = loc === 'ru' ? '/#contacts' : `/${loc}#contacts`
        return `${base}${path}`
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
          label: 'Contact Info',
          fields: [
            { name: 'contactOrganizationName', type: 'text', localized: true, admin: { description: 'Full legal name of the organization' } },
            { name: 'contactPhone', type: 'text', localized: true, defaultValue: '+375 (29) 123-45-67' },
            { name: 'contactEmail', type: 'text', localized: true, defaultValue: 'info@prosmety.by' },
            { name: 'contactAddress', type: 'text', localized: true, defaultValue: 'г. Минск, ул. Примерная, 123', admin: { description: 'Physical/visit address' } },
            { name: 'contactPostalAddress', type: 'text', localized: true, admin: { description: 'Postal address for correspondence' } },
            { name: 'contactWorkingHours', type: 'text', localized: true, defaultValue: 'Пн-Пт: 9:00 - 18:00' },
            { name: 'contactUnp', type: 'text', localized: true, defaultValue: '123456789' },
          ],
        },
        {
          label: 'Labels',
          admin: { description: 'Заголовки для блока контактов на главной и в футере' },
          fields: [
            { name: 'contactsTitle', type: 'text', localized: true, defaultValue: 'Контакты', admin: { description: 'Заголовок страницы контактов' } },
            { name: 'contactsSubtitle', type: 'text', localized: true, admin: { description: 'Подзаголовок страницы контактов' } },
            { name: 'contactInfoTitle', type: 'text', localized: true, defaultValue: 'Контакты', admin: { description: 'Заголовок блока контактной информации в футере' } },
            { name: 'formTitle', type: 'text', localized: true, defaultValue: 'Связаться с нами', admin: { description: 'Заголовок формы обратной связи' } },
            { name: 'phonePlaceholder', type: 'text', localized: true, defaultValue: '+375XXXXXXXXX', admin: { description: 'Placeholder для поля телефона в форме' } },
          ],
        },
      ],
    },
  ],
}
