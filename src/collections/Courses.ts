import type { CollectionConfig } from 'payload'

export const Courses: CollectionConfig = {
  slug: 'courses',
  access: {
    read: () => true,
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug', 'order', 'updatedAt'],
  },
  fields: [
    {
      name: 'order',
      type: 'number',
      defaultValue: 0,
      admin: {
        description: 'Display order on training page (lower = first)',
      },
    },
    {
      name: 'key',
      type: 'text',
      required: true,
      unique: true,
      admin: {
        description: 'Unique key (e.g. express-course, contract-price)',
      },
    },
    {
      name: 'title',
      type: 'text',
      required: true,
      localized: true,
    },
    {
      name: 'duration',
      type: 'text',
      localized: true,
    },
    {
      name: 'price',
      type: 'text',
      localized: true,
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
    },
    {
      name: 'topics',
      type: 'array',
      localized: true,
      fields: [{ name: 'topic', type: 'text' }],
    },
    {
      type: 'collapsible',
      label: 'SEO',
      admin: { description: 'Override meta for this course page (optional)' },
      fields: [
        { name: 'metaTitle', type: 'text', localized: true, admin: { description: 'Meta title (если не задан — используется title)' } },
        { name: 'metaDescription', type: 'textarea', localized: true, admin: { description: 'Meta description' } },
        { name: 'ogImage', type: 'upload', relationTo: 'media', localized: true, admin: { description: 'OG изображение (рекомендуется 1200×630 px)' } },
      ],
    },
    {
      name: 'programSections',
      type: 'array',
      label: 'Program sections',
      localized: true,
      fields: [
        { name: 'title', type: 'text', required: true },
        {
          name: 'content',
          type: 'array',
          fields: [
            {
              name: 'item',
              type: 'textarea',
            },
          ],
        },
      ],
    },
  ],
}
