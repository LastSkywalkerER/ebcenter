import type { CollectionConfig } from 'payload'
import { lexicalEditor } from '@payloadcms/richtext-lexical'

export const Pages: CollectionConfig = {
  slug: 'pages',
  access: {
    read: () => true,
  },
  admin: {
    useAsTitle: 'slug',
    defaultColumns: ['title', 'slug', 'showInNav', 'navOrder', 'updatedAt'],
    listSearchableFields: ['slug', 'title'],
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      localized: true,
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      validate: (val: unknown) => (val && String(val) === 'contacts' ? 'Slug "contacts" is not allowed. Contacts are on the main page only. Use Globals → Contact Info.' : true),
      admin: {
        description: 'URL path (e.g. home, about-us). Use "home" for the main page. Not: services, training, contacts (reserved).',
      },
    },
    {
      name: 'showInNav',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        description: 'Show this page in header/footer navigation',
      },
    },
    {
      name: 'navOrder',
      type: 'number',
      defaultValue: 0,
      admin: {
        description: 'Order in navigation (lower = first)',
      },
    },
    {
      type: 'collapsible',
      label: 'SEO',
      admin: { description: 'Override meta for this page (optional)' },
      fields: [
        { name: 'metaTitle', type: 'text', localized: true, admin: { description: 'Page meta title' } },
        { name: 'metaDescription', type: 'textarea', localized: true, admin: { description: 'Page meta description' } },
        { name: 'ogImage', type: 'upload', relationTo: 'media', localized: true, admin: { description: 'OG изображение для этой страницы (рекомендуется 1200×630 px)' } },
      ],
    },
    {
      name: 'layout',
      type: 'blocks',
      localized: true,
      blocks: [
        {
          slug: 'hero',
          labels: { singular: 'Hero', plural: 'Hero blocks' },
          fields: [
            { name: 'badge', type: 'text', localized: true, admin: { description: 'Small badge above title (e.g. Сметные услуги · Минск · РБ)' } },
            { name: 'title', type: 'text', required: true, localized: true },
            { name: 'subtitle', type: 'textarea', localized: true },
            { name: 'cta', type: 'text', localized: true },
            { name: 'ctaLink', type: 'text', defaultValue: '/services', admin: { description: 'URL for CTA button' } },
            { name: 'secondaryCta', type: 'text', localized: true },
            { name: 'secondaryCtaLink', type: 'text', defaultValue: '/training', admin: { description: 'URL for secondary button' } },
            { name: 'background', type: 'upload', relationTo: 'media' },
          ],
        },
        {
          slug: 'badge',
          labels: { singular: 'Badge Strip', plural: 'Badge Strip blocks' },
          fields: [
            {
              name: 'items',
              type: 'array',
              localized: true,
              fields: [{ name: 'text', type: 'text', required: true }],
            },
          ],
        },
        {
          slug: 'stats',
          labels: { singular: 'Trust Stats', plural: 'Trust Stats blocks' },
          fields: [
            {
              name: 'items',
              type: 'array',
              required: true,
              localized: true,
              minRows: 1,
              fields: [
                { name: 'value', type: 'text', required: true },
                { name: 'label', type: 'text', required: true },
              ],
            },
          ],
        },
        {
          slug: 'section',
          labels: { singular: 'Section', plural: 'Section blocks' },
          fields: [
            { name: 'title', type: 'text', required: true, localized: true },
            { name: 'subtitle', type: 'textarea', localized: true },
          ],
        },
        {
          slug: 'seoParagraphs',
          labels: { singular: 'SEO Paragraphs', plural: 'SEO Paragraph blocks' },
          fields: [
            { name: 'title', type: 'text', localized: true, admin: { description: 'Optional section heading (h2)' } },
            {
              name: 'paragraphs',
              type: 'array',
              required: true,
              localized: true,
              fields: [{ name: 'text', type: 'textarea', required: true }],
            },
          ],
        },
        {
          slug: 'imageText',
          labels: { singular: 'Image + Text', plural: 'Image + Text blocks' },
          fields: [
            { name: 'title', type: 'text', required: true, localized: true },
            { name: 'image', type: 'upload', relationTo: 'media', admin: { description: 'Optional image' } },
            { name: 'imageUrl', type: 'text', admin: { description: 'Or use static path: /images/filename.png' } },
            { name: 'linkUrl', type: 'text', admin: { description: 'Optional link URL (e.g. https://belsmeta.by)' } },
            { name: 'linkText', type: 'text', localized: true, admin: { description: 'Link text' } },
            {
              name: 'paragraphs',
              type: 'array',
              required: true,
              localized: true,
              fields: [{ name: 'text', type: 'textarea', required: true }],
            },
          ],
        },
        {
          slug: 'richText',
          labels: { singular: 'Rich Text', plural: 'Rich Text blocks' },
          fields: [
            { name: 'content', type: 'richText', editor: lexicalEditor(), localized: true },
          ],
        },
        {
          slug: 'serviceList',
          labels: { singular: 'Service List', plural: 'Service List blocks' },
          fields: [
            { name: 'sectionTag', type: 'text', localized: true, admin: { description: 'Small tag above title (e.g. Услуги)' } },
            { name: 'sectionTitle', type: 'text', localized: true, admin: { description: 'Section heading' } },
            { name: 'sectionSubtitle', type: 'textarea', localized: true, admin: { description: 'Subtitle/description below title' } },
            { name: 'limit', type: 'number', admin: { description: 'Max services to show (0 = all)' }, defaultValue: 0 },
          ],
        },
        {
          slug: 'courseList',
          labels: { singular: 'Course List', plural: 'Course List blocks' },
          fields: [
            { name: 'sectionTag', type: 'text', localized: true, admin: { description: 'Small tag (e.g. Обучение)' } },
            { name: 'sectionTitle', type: 'text', localized: true },
            { name: 'sectionSubtitle', type: 'textarea', localized: true },
          ],
        },
        {
          slug: 'contactForm',
          labels: { singular: 'Contact Form (labels from SiteSettings)', plural: 'Contact Form blocks' },
          fields: [],
        },
        {
          slug: 'contactInfo',
          labels: { singular: 'Contact Info (data from Contacts global)', plural: 'Contact Info blocks' },
          fields: [
            { name: 'sectionTag', type: 'text', localized: true, admin: { description: 'Tag for CTA section (e.g. Контакты)' } },
            { name: 'sectionTitle', type: 'text', localized: true, admin: { description: 'Title for CTA+form section' } },
            { name: 'sectionDescription', type: 'textarea', localized: true, admin: { description: 'Description text' } },
          ],
        },
        {
          slug: 'principles',
          labels: { singular: 'Principles of Work', plural: 'Principles blocks' },
          fields: [
            {
              name: 'sectionTag',
              type: 'text',
              localized: true,
              admin: { description: 'Small tag above title (e.g. Принципы работы)' },
            },
            {
              name: 'sectionTitle',
              type: 'text',
              required: true,
              localized: true,
              admin: { description: 'Section heading (e.g. Our principles of work)' },
            },
            {
              name: 'items',
              type: 'array',
              required: true,
              localized: true,
              minRows: 1,
              fields: [
                {
                  name: 'icon',
                  type: 'select',
                  required: true,
                  options: [
                    { label: 'Speed (lightning)', value: 'speed' },
                    { label: 'Accuracy (check)', value: 'accuracy' },
                    { label: 'Honesty (handshake)', value: 'honesty' },
                    { label: 'Fixed price (wallet)', value: 'fixedPrice' },
                  ],
                  admin: { description: 'Icon for the principle card' },
                },
                { name: 'title', type: 'text', required: true },
                { name: 'description', type: 'text', required: true },
              ],
            },
          ],
        },
        {
          slug: 'consultationForm',
          labels: { singular: 'Consultation form (compact)', plural: 'Consultation form blocks' },
          fields: [],
        },
        {
          slug: 'advantages',
          labels: { singular: 'Advantages / Why Us', plural: 'Advantages blocks' },
          fields: [
            { name: 'tag', type: 'text', localized: true, admin: { description: 'Small tag above title (e.g. Преимущества)' } },
            { name: 'title', type: 'text', required: true, localized: true },
            { name: 'description', type: 'textarea', localized: true },
            { name: 'ctaText', type: 'text', localized: true, defaultValue: 'Получить консультацию' },
            {
              name: 'items',
              type: 'array',
              required: true,
              localized: true,
              minRows: 1,
              fields: [
                {
                  name: 'icon',
                  type: 'select',
                  required: true,
                  options: [
                    { label: 'Check (practice)', value: 'check' },
                    { label: 'Shield (legislation)', value: 'shield' },
                    { label: 'Clock (deadlines)', value: 'clock' },
                    { label: 'Dollar (pricing)', value: 'dollar' },
                  ],
                },
                { name: 'title', type: 'text', required: true },
                { name: 'description', type: 'text', required: true },
              ],
            },
          ],
        },
        {
          slug: 'pricing',
          labels: { singular: 'Pricing / Tariffs', plural: 'Pricing blocks' },
          fields: [
            { name: 'sectionTag', type: 'text', localized: true, admin: { description: 'Small tag (e.g. Тарифы)' } },
            { name: 'sectionTitle', type: 'text', localized: true },
            { name: 'sectionDescription', type: 'textarea', localized: true },
            {
              name: 'cards',
              type: 'array',
              required: true,
              localized: true,
              minRows: 1,
              maxRows: 3,
              fields: [
                { name: 'title', type: 'text', required: true },
                { name: 'description', type: 'textarea' },
                {
                  name: 'features',
                  type: 'array',
                  fields: [{ name: 'text', type: 'text', required: true }],
                },
                { name: 'ctaText', type: 'text', defaultValue: 'Узнать стоимость' },
                { name: 'isFeatured', type: 'checkbox', defaultValue: false },
                { name: 'featuredBadge', type: 'text', defaultValue: 'Популярный' },
              ],
            },
          ],
        },
        {
          slug: 'knowledge',
          labels: { singular: 'Knowledge Base Section', plural: 'Knowledge Base sections' },
          fields: [
            { name: 'tag', type: 'text', localized: true, admin: { description: 'Small tag (e.g. База знаний)' } },
            { name: 'title', type: 'text', required: true, localized: true },
            {
              name: 'paragraphs',
              type: 'array',
              localized: true,
              fields: [{ name: 'text', type: 'textarea', required: true }],
            },
            { name: 'articlesTitle', type: 'text', localized: true, defaultValue: 'Рекомендуемые статьи' },
            {
              name: 'articleSource',
              type: 'select',
              defaultValue: 'featured',
              options: [
                { label: 'Auto: featured articles', value: 'featured' },
                { label: 'Manual: specify slugs', value: 'manual' },
              ],
            },
            {
              name: 'manualSlugs',
              type: 'array',
              admin: { condition: (data, siblingData) => siblingData?.articleSource === 'manual' },
              fields: [{ name: 'slug', type: 'text', required: true }],
            },
          ],
        },
        {
          slug: 'about',
          labels: { singular: 'About / Specialist', plural: 'About blocks' },
          fields: [
            { name: 'tag', type: 'text', localized: true, admin: { description: 'Small tag (e.g. О специалисте)' } },
            { name: 'title', type: 'text', required: true, localized: true },
            {
              name: 'paragraphs',
              type: 'array',
              localized: true,
              fields: [{ name: 'text', type: 'textarea', required: true }],
            },
            { name: 'avatar', type: 'upload', relationTo: 'media', admin: { description: 'Avatar photo' } },
            {
              name: 'stats',
              type: 'array',
              localized: true,
              fields: [
                { name: 'value', type: 'text', required: true },
                { name: 'label', type: 'text', required: true },
              ],
            },
          ],
        },
        {
          slug: 'faq',
          labels: { singular: 'FAQ / Accordion', plural: 'FAQ blocks' },
          fields: [
            { name: 'sectionTitle', type: 'text', localized: true },
            {
              name: 'items',
              type: 'array',
              required: true,
              localized: true,
              minRows: 1,
              fields: [
                { name: 'question', type: 'text', required: true },
                { name: 'answer', type: 'textarea', required: true },
              ],
            },
          ],
        },
      ],
    },
  ],
}
