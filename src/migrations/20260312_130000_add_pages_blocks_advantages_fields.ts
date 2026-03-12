import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

/**
 * Payload expects advantages block fields (tag, title, description) on the main
 * pages_blocks_advantages table; they were only in _locales in the original migration.
 */
export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
  ALTER TABLE "pages_blocks_advantages" ADD COLUMN IF NOT EXISTS "tag" varchar;
  ALTER TABLE "pages_blocks_advantages" ADD COLUMN IF NOT EXISTS "title" varchar;
  ALTER TABLE "pages_blocks_advantages" ADD COLUMN IF NOT EXISTS "description" varchar;
  `)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
  ALTER TABLE "pages_blocks_advantages" DROP COLUMN IF EXISTS "tag";
  ALTER TABLE "pages_blocks_advantages" DROP COLUMN IF EXISTS "title";
  ALTER TABLE "pages_blocks_advantages" DROP COLUMN IF EXISTS "description";
  `)
}
