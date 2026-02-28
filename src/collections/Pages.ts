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
            { name: 'title', type: 'text', localized: true, admin: { description: 'Form title' } },
            { name: 'nameLabel', type: 'text', localized: true, admin: { description: 'Name field label' } },
            { name: 'emailLabel', type: 'text', localized: true, admin: { description: 'Email field label' } },
            { name: 'phoneLabel', type: 'text', localized: true, admin: { description: 'Phone field label' } },
            { name: 'messageLabel', type: 'text', localized: true, admin: { description: 'Message field label' } },
            { name: 'submitLabel', type: 'text', localized: true, admin: { description: 'Submit button text' } },
            { name: 'phonePlaceholder', type: 'text', localized: true, admin: { description: 'Phone input placeholder' } },
            { name: 'phoneError', type: 'text', localized: true, admin: { description: 'Phone validation error' } },
            { name: 'successMessage', type: 'text', localized: true, admin: { description: 'Success message' } },
            { name: 'errorMessage', type: 'text', localized: true, admin: { description: 'Error message' } },
            { name: 'sendingMessage', type: 'text', localized: true, admin: { description: 'Sending state message' } },
            { name: 'securityCheck', type: 'text', localized: true, admin: { description: 'Security check label' } },
            { name: 'securityError', type: 'text', localized: true, admin: { description: 'Security error message' } },
            {
              type: 'collapsible',
              label: 'Validation',
              admin: { description: 'Form validation messages' },
              fields: [
                { name: 'validationNameRequired', type: 'text', localized: true },
                { name: 'validationMessageRequired', type: 'text', localized: true },
                { name: 'validationEmailInvalid', type: 'text', localized: true },
              ],
            },
          ],
        },
        {
          slug: 'contactInfo',
          labels: { singular: 'Contact Info', plural: 'Contact Info blocks' },
          fields: [
            { name: 'contactPhone', type: 'text', localized: true, admin: { description: 'Phone number' } },
            { name: 'contactEmail', type: 'text', localized: true, admin: { description: 'Email address' } },
            { name: 'contactAddress', type: 'text', localized: true, admin: { description: 'Physical address' } },
            { name: 'contactWorkingHours', type: 'text', localized: true, admin: { description: 'Working hours' } },
            { name: 'contactUnp', type: 'text', localized: true, admin: { description: 'UNP number' } },
          ],
        },
      ],
    },
  ],
}
