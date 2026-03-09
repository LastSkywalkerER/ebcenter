import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

/**
 * Adds SEO columns (meta_title, meta_description, og_image_id) to services_locales.
 * Required because Services collection has SEO fields but 20260309_083920 only migrated pages/site_settings.
 * Uses IF NOT EXISTS for idempotency when 20260309_083920 was already applied.
 */
export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "services_locales" ADD COLUMN IF NOT EXISTS "meta_title" varchar;
  ALTER TABLE "services_locales" ADD COLUMN IF NOT EXISTS "meta_description" varchar;
  ALTER TABLE "services_locales" ADD COLUMN IF NOT EXISTS "og_image_id" integer;
  CREATE INDEX IF NOT EXISTS "services_og_image_idx" ON "services_locales" USING btree ("og_image_id","_locale");`)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP INDEX IF EXISTS "services_og_image_idx";
  ALTER TABLE "services_locales" DROP COLUMN IF EXISTS "meta_title";
  ALTER TABLE "services_locales" DROP COLUMN IF EXISTS "meta_description";
  ALTER TABLE "services_locales" DROP COLUMN IF EXISTS "og_image_id";`)
}
