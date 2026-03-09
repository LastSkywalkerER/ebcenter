import type { CollectionConfig } from 'payload'

export const Services: CollectionConfig = {
  slug: 'services',
  access: {
    read: () => true,
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug', 'updatedAt'],
  },
  fields: [
    {
      name: 'key',
      type: 'text',
      required: true,
      unique: true,
      admin: {
        description: 'Unique key for mapping (e.g. estimateService)',
      },
    },
    {
      name: 'title',
      type: 'text',
      required: true,
      localized: true,
    },
    {
      name: 'description',
      type: 'textarea',
      localized: true,
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      admin: {
        description: 'URL slug (e.g. smetnoe-obsluzhivanie)',
      },
    },
    {
      name: 'content',
      type: 'array',
      label: 'Content blocks',
      localized: true,
      fields: [
        {
          name: 'text',
          type: 'textarea',
          required: true,
        },
      ],
    },
    {
      type: 'collapsible',
      label: 'SEO',
      admin: { description: 'Override meta for this service page (optional)' },
      fields: [
        { name: 'metaTitle', type: 'text', localized: true, admin: { description: 'Meta title (если не задан — используется title)' } },
        { name: 'metaDescription', type: 'textarea', localized: true, admin: { description: 'Meta description' } },
        { name: 'ogImage', type: 'upload', relationTo: 'media', localized: true, admin: { description: 'OG изображение (рекомендуется 1200×630 px)' } },
      ],
    },
    {
      name: 'hasTariffs',
      type: 'checkbox',
      defaultValue: false,
    },
    {
      name: 'tariffItems',
      type: 'array',
      label: 'Tariff plans',
      localized: true,
      admin: {
        condition: (_, siblingData) => siblingData?.hasTariffs === true,
      },
      fields: [
        { name: 'name', type: 'text', required: true },
        { name: 'price', type: 'text', required: true },
        { name: 'description', type: 'textarea' },
        {
          name: 'features',
          type: 'array',
          fields: [{ name: 'feature', type: 'text' }],
        },
      ],
    },
  ],
}
