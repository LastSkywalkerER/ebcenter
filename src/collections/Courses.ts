import type { CollectionConfig } from 'payload'

export const Courses: CollectionConfig = {
  slug: 'courses',
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
