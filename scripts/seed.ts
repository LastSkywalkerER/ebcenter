/**
 * Seeds default admin user (if env vars set) and migrates content.
 * Run: yarn seed
 * Requires: DATABASE_URL, PAYLOAD_SECRET. Optional: PAYLOAD_ADMIN_EMAIL, PAYLOAD_ADMIN_PASSWORD
 */
import 'dotenv/config'
import { getPayload } from 'payload'
import config from '@payload-config'

// Import content migration logic
import { migrateContent } from './migrate-content'

async function seed() {
  if (!process.env.DATABASE_URL) {
    throw new Error('DATABASE_URL is not set. Add it to .env.')
  }
  if (!process.env.PAYLOAD_SECRET) {
    throw new Error('PAYLOAD_SECRET is not set. Add it to .env (e.g. openssl rand -base64 32)')
  }

  console.log('Starting seed...')
  const payload = await getPayload({ config })

  // Create default admin if env vars set
  const adminEmail = process.env.PAYLOAD_ADMIN_EMAIL
  const adminPassword = process.env.PAYLOAD_ADMIN_PASSWORD
  if (adminEmail && adminPassword) {
    const existing = await payload.find({
      collection: 'users',
      where: { email: { equals: adminEmail } },
      limit: 1,
    })
    if (existing.docs.length === 0) {
      await payload.create({
        collection: 'users',
        data: { email: adminEmail, password: adminPassword },
      })
      console.log('Default admin created:', adminEmail)
    } else {
      console.log('Admin already exists:', adminEmail)
    }
  } else {
    console.log(
      'Skipping admin creation (set PAYLOAD_ADMIN_EMAIL and PAYLOAD_ADMIN_PASSWORD to create default admin)'
    )
  }

  // Migrate content only on first deploy (DB empty) or when FORCE_SEED=1. Redeploys preserve admin edits.
  const forceSeed = process.env.FORCE_SEED === '1'
  const services = await payload.find({ collection: 'services', limit: 1 })
  if (forceSeed || services.docs.length === 0) {
    await migrateContent(payload)
    console.log(forceSeed ? 'Content migrated (FORCE_SEED=1)' : 'Content migrated (first run)')
  } else {
    console.log('Content exists, skipping migration (FORCE_SEED=1 to re-run)')
  }

  console.log('Seed complete!')
  process.exit(0)
}

seed().catch((err) => {
  console.error('Seed failed:', err)
  process.exit(1)
})
