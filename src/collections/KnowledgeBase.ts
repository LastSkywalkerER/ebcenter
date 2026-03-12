import type { CollectionConfig } from 'payload'
import { lexicalEditor } from '@payloadcms/richtext-lexical'

export const KnowledgeBase: CollectionConfig = {
  slug: 'knowledge-base',
  access: {
    read: () => true,
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug', 'publishedAt', 'isFeatured', 'order'],
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
        description: 'URL path for the article (e.g. kak-sostavlyaetsya-smeta)',
      },
    },
    {
      name: 'description',
      type: 'textarea',
      localized: true,
      admin: {
        description: 'Short description shown in article list',
      },
    },
    {
      name: 'content',
      type: 'richText',
      editor: lexicalEditor(),
      localized: true,
    },
    {
      name: 'publishedAt',
      type: 'date',
      admin: {
        description: 'Publication date',
      },
    },
    {
      name: 'isFeatured',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        description: 'Show in Knowledge section on home page (recommended articles)',
      },
    },
    {
      name: 'order',
      type: 'number',
      defaultValue: 0,
      admin: {
        description: 'Display order (lower = first)',
      },
    },
    {
      type: 'collapsible',
      label: 'SEO',
      fields: [
        {
          name: 'metaTitle',
          type: 'text',
          localized: true,
        },
        {
          name: 'metaDescription',
          type: 'textarea',
          localized: true,
        },
      ],
    },
  ],
}
