import path from 'path'
import sharp from 'sharp'
import { buildConfig } from 'payload'
import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'

import { Users } from './src/collections/Users'
import { Media } from './src/collections/Media'
import { Services } from './src/collections/Services'
import { Courses } from './src/collections/Courses'
import { Pages } from './src/collections/Pages'
import { KnowledgeBase } from './src/collections/KnowledgeBase'
import { SiteSettings } from './src/globals/SiteSettings'
import { Contacts } from './src/globals/Contacts'

export default buildConfig({
  admin: {
    user: Users.slug,
    meta: {
      defaultOGImageType: 'off',
    },
    importMap: {
      baseDir: path.resolve(process.cwd()),
    },
    livePreview: {
      url: ({ data, locale }) => {
        const base = process.env.NEXT_PUBLIC_SERVER_URL ?? process.env.NEXT_PUBLIC_SITE_URL ?? process.env.NEXT_PUBLIC_BASE_URL ?? 'http://localhost:3000'
        const loc = locale?.code ?? 'ru'
        const pathSegment = data?.slug === 'home' ? '' : `/${(data?.slug as string) ?? ''}`
        const path = loc === 'ru' ? (pathSegment || '/') : `/${loc}${pathSegment || ''}`
        return `${base.replace(/\/$/, '')}${path.startsWith('/') ? path : `/${path}`}`
      },
      collections: ['pages'],
      breakpoints: [
        { label: 'Desktop', name: 'desktop', width: 1280, height: 800 },
        { label: 'Tablet', name: 'tablet', width: 768, height: 1024 },
        { label: 'Mobile', name: 'mobile', width: 375, height: 667 },
      ],
    },
  },
  collections: [Users, Media, Services, Courses, Pages, KnowledgeBase],
  globals: [SiteSettings, Contacts],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(process.cwd(), 'src/payload-types.ts'),
  },
  localization: {
    locales: [
      { code: 'ru', label: 'Russian' },
      { code: 'en', label: 'English' },
    ],
    defaultLocale: 'ru',
    fallback: true,
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URL || '',
    },
  }),
  sharp,
})
