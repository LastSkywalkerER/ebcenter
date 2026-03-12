/**
 * Generates favicon variants from public/images/favicon-ps.png
 * Run: yarn generate:icons
 *
 * Outputs:
 * - public/favicon.png (32x32)
 * - public/apple-touch-icon.png (180x180)
 * - public/web-app-manifest-192x192.png (192x192)
 * - public/web-app-manifest-512x512.png (512x512)
 * - src/app/icon.png (32x32) — Next.js app icon
 * - src/app/apple-icon.png (180x180) — Next.js apple-touch-icon
 * - src/app/favicon.ico — browser favicon (prevents /favicon.ico hitting [locale] route)
 */
import path from 'path'
import fs from 'fs'
import sharp from 'sharp'
import toIco from 'to-ico'

const SOURCE = 'public/images/favicon-ps.png'
const VARIANTS: Array<{ name: string; size: number; dir: 'public' | 'app' }> = [
  { name: 'favicon.png', size: 32, dir: 'public' },
  { name: 'apple-touch-icon.png', size: 180, dir: 'public' },
  { name: 'web-app-manifest-192x192.png', size: 192, dir: 'public' },
  { name: 'web-app-manifest-512x512.png', size: 512, dir: 'public' },
  { name: 'icon.png', size: 32, dir: 'app' },
  { name: 'apple-icon.png', size: 180, dir: 'app' },
]

async function main() {
  const cwd = process.cwd()
  const sourcePath = path.resolve(cwd, SOURCE)

  if (!fs.existsSync(sourcePath)) {
    console.error(`Source not found: ${sourcePath}`)
    process.exit(1)
  }

  const buffer = await sharp(sourcePath)
    .resize(1024, 1024, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toBuffer()

  for (const { name, size, dir } of VARIANTS) {
    const outDir = dir === 'app' ? path.join(cwd, 'src', 'app') : path.join(cwd, 'public')
    const outPath = path.resolve(outDir, name)
    await sharp(buffer)
      .resize(size, size)
      .png()
      .toFile(outPath)
    console.log(`  ${dir}/${name} (${size}x${size})`)
  }

  // Generate favicon.ico (prevents /favicon.ico from matching [locale] route)
  const png32 = await sharp(buffer).resize(32, 32).png().toBuffer()
  const icoBuffer = await toIco([png32])
  const faviconPath = path.resolve(cwd, 'src', 'app', 'favicon.ico')
  fs.writeFileSync(faviconPath, icoBuffer)
  console.log('  app/favicon.ico (32x32)')

  console.log('Icons generated from favicon-ps.png')
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
