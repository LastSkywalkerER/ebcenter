/**
 * Generates favicon variants from public/images/favicon-ps.png
 * Run: yarn generate:icons
 *
 * Outputs:
 * - public/favicon.png (32x32)
 * - public/apple-touch-icon.png (180x180)
 * - public/web-app-manifest-192x192.png (192x192)
 * - public/web-app-manifest-512x512.png (512x512)
 */
import path from 'path'
import fs from 'fs'
import sharp from 'sharp'

const SOURCE = 'public/images/favicon-ps.png'
const VARIANTS: Array<{ name: string; size: number }> = [
  { name: 'favicon.png', size: 32 },
  { name: 'apple-touch-icon.png', size: 180 },
  { name: 'web-app-manifest-192x192.png', size: 192 },
  { name: 'web-app-manifest-512x512.png', size: 512 },
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

  for (const { name, size } of VARIANTS) {
    const outPath = path.resolve(cwd, 'public', name)
    await sharp(buffer)
      .resize(size, size)
      .png()
      .toFile(outPath)
    console.log(`  ${name} (${size}x${size})`)
  }

  console.log('Icons generated from favicon-ps.png')
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
