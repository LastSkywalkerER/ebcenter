import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
  ALTER TABLE "site_settings_locales" ADD COLUMN IF NOT EXISTS "common_view_all_services" varchar;
  ALTER TABLE "site_settings_locales" ADD COLUMN IF NOT EXISTS "common_order_call" varchar;
  ALTER TABLE "site_settings_locales" ADD COLUMN IF NOT EXISTS "common_get_consultation" varchar;
  `)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
  ALTER TABLE "site_settings_locales" DROP COLUMN IF EXISTS "common_view_all_services";
  ALTER TABLE "site_settings_locales" DROP COLUMN IF EXISTS "common_order_call";
  ALTER TABLE "site_settings_locales" DROP COLUMN IF EXISTS "common_get_consultation";
  `)
}
