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
          slug: 'section',
          labels: { singular: 'Section', plural: 'Section blocks' },
          fields: [
            { name: 'title', type: 'text', required: true, localized: true },
            { name: 'subtitle', type: 'textarea', localized: true },
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
          labels: { singular: 'Contact Form', plural: 'Contact Form blocks' },
          fields: [
            { name: 'title', type: 'text', localized: true, admin: { description: 'Override form title (optional)' } },
          ],
        },
        {
          slug: 'contactInfo',
          labels: { singular: 'Contact Info', plural: 'Contact Info blocks' },
          fields: [],
        },
      ],
    },
  ],
}
