import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
  ALTER TABLE "site_settings_locales" ADD COLUMN IF NOT EXISTS "nav_tariffs" varchar;
  ALTER TABLE "site_settings_locales" ADD COLUMN IF NOT EXISTS "nav_knowledge" varchar;
  ALTER TABLE "site_settings_locales" ADD COLUMN IF NOT EXISTS "nav_about" varchar;
  `)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
  ALTER TABLE "site_settings_locales" DROP COLUMN IF EXISTS "nav_tariffs";
  ALTER TABLE "site_settings_locales" DROP COLUMN IF EXISTS "nav_knowledge";
  ALTER TABLE "site_settings_locales" DROP COLUMN IF EXISTS "nav_about";
  `)
}
