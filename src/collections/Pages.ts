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
      admin: {
        description: 'URL path (e.g. home, services, about-us). Use "home" for the main page.',
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
            { name: 'sectionTitle', type: 'text', localized: true, admin: { description: 'Optional heading above the list' } },
            { name: 'limit', type: 'number', admin: { description: 'Max services to show (0 = all)' }, defaultValue: 0 },
          ],
        },
        {
          slug: 'courseList',
          labels: { singular: 'Course List', plural: 'Course List blocks' },
          fields: [],
        },
        {
          slug: 'contactForm',
          labels: { singular: 'Contact Form (labels from SiteSettings)', plural: 'Contact Form blocks' },
          fields: [],
        },
        {
          slug: 'contactInfo',
          labels: { singular: 'Contact Info (data from Contacts global)', plural: 'Contact Info blocks' },
          fields: [],
        },
        {
          slug: 'principles',
          labels: { singular: 'Principles of Work', plural: 'Principles blocks' },
          fields: [
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
      ],
    },
  ],
}
