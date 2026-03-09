/**
 * Seeds static images into Payload Media collection.
 * Run: yarn payload run scripts/seed-media.ts
 * Or called from scripts/seed.ts
 *
 * Uploads images from public/ and public/images/ so they appear in Admin → Media.
 */
import 'dotenv/config'
import path from 'path'
import fs from 'fs'
import type { Payload } from 'payload'

const MEDIA_ITEMS: Array<{
  key: string
  filePath: string
  altRu: string
  altEn: string
}> = [
  { key: 'favicon-ps', filePath: 'public/images/favicon-ps.png', altRu: 'Логотип ProSmety', altEn: 'ProSmety logo' },
  { key: 'hero-bg', filePath: 'public/images/hero-bg.png', altRu: 'Фоновое изображение главной страницы', altEn: 'Hero section background' },
  { key: 'npr-normatives', filePath: 'public/images/npr-normatives.png', altRu: 'Нормативы НРР в Беларуси', altEn: 'NPR normatives in Belarus' },
  { key: 'belsmeta-section', filePath: 'public/images/belsmeta-section.png', altRu: 'Работа в программе Belsmeta Cloud', altEn: 'Working with Belsmeta Cloud' },
  { key: 'favicon', filePath: 'public/favicon.png', altRu: 'Иконка сайта ProSmety', altEn: 'ProSmety site icon' },
  { key: 'apple-touch-icon', filePath: 'public/apple-touch-icon.png', altRu: 'Иконка для Apple устройств', altEn: 'Apple touch icon' },
  { key: 'web-app-192', filePath: 'public/web-app-manifest-192x192.png', altRu: 'Иконка PWA 192x192', altEn: 'PWA icon 192x192' },
  { key: 'web-app-512', filePath: 'public/web-app-manifest-512x512.png', altRu: 'Иконка PWA 512x512', altEn: 'PWA icon 512x512' },
]

export async function seedMedia(payload: Payload) {
  const cwd = process.cwd()

  for (const item of MEDIA_ITEMS) {
    const absolutePath = path.resolve(cwd, item.filePath)

    if (!fs.existsSync(absolutePath)) {
      console.log(`  Skip ${item.filePath} (file not found)`)
      continue
    }

    const existing = await payload.find({
      collection: 'media',
      where: { alt: { equals: item.altRu } },
      limit: 1,
      locale: 'ru',
    })

    if (existing.docs.length > 0) {
      await payload.update({
        collection: 'media',
        id: existing.docs[0].id,
        locale: 'ru',
        data: {},
        filePath: absolutePath,
        overwriteExistingFiles: true,
      })
      await payload.update({
        collection: 'media',
        id: existing.docs[0].id,
        locale: 'en',
        data: { alt: item.altEn },
      })
      console.log(`  Media "${item.key}" updated`)
      continue
    }

    await payload.create({
      collection: 'media',
      locale: 'ru',
      data: {
        alt: item.altRu,
      },
      filePath: absolutePath,
    })

    const created = await payload.find({
      collection: 'media',
      where: { alt: { equals: item.altRu } },
      limit: 1,
      locale: 'ru',
    })

    if (created.docs[0]) {
      await payload.update({
        collection: 'media',
        id: created.docs[0].id,
        locale: 'en',
        data: {
          alt: item.altEn,
        },
      })
    }

    console.log(`  Media "${item.key}" created`)
  }
}
