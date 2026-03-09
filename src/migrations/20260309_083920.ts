import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

// Migration signature requires payload and req; only db is used
export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages_locales" ADD COLUMN IF NOT EXISTS "meta_title" varchar;
  ALTER TABLE "pages_locales" ADD COLUMN IF NOT EXISTS "meta_description" varchar;
  ALTER TABLE "pages_locales" ADD COLUMN IF NOT EXISTS "og_image_id" integer;
  ALTER TABLE "site_settings" ADD COLUMN IF NOT EXISTS "robots_index" boolean DEFAULT true;
  ALTER TABLE "site_settings" ADD COLUMN IF NOT EXISTS "robots_follow" boolean DEFAULT true;
  ALTER TABLE "site_settings_locales" ADD COLUMN IF NOT EXISTS "meta_title" varchar;
  ALTER TABLE "site_settings_locales" ADD COLUMN IF NOT EXISTS "meta_description" varchar;
  ALTER TABLE "site_settings_locales" ADD COLUMN IF NOT EXISTS "meta_keywords" varchar;
  ALTER TABLE "site_settings_locales" ADD COLUMN IF NOT EXISTS "og_image_id" integer;
  ALTER TABLE "services_locales" ADD COLUMN IF NOT EXISTS "meta_title" varchar;
  ALTER TABLE "services_locales" ADD COLUMN IF NOT EXISTS "meta_description" varchar;
  ALTER TABLE "services_locales" ADD COLUMN IF NOT EXISTS "og_image_id" integer;
  DO $$ BEGIN
    ALTER TABLE "pages_locales" ADD CONSTRAINT "pages_locales_og_image_id_media_id_fk" FOREIGN KEY ("og_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION WHEN duplicate_object THEN NULL; END $$;
  DO $$ BEGIN
    ALTER TABLE "site_settings_locales" ADD CONSTRAINT "site_settings_locales_og_image_id_media_id_fk" FOREIGN KEY ("og_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION WHEN duplicate_object THEN NULL; END $$;
  DO $$ BEGIN
    ALTER TABLE "services_locales" ADD CONSTRAINT "services_locales_og_image_id_media_id_fk" FOREIGN KEY ("og_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION WHEN duplicate_object THEN NULL; END $$;
  CREATE INDEX IF NOT EXISTS "pages_og_image_idx" ON "pages_locales" USING btree ("og_image_id","_locale");
  CREATE INDEX IF NOT EXISTS "site_settings_og_image_idx" ON "site_settings_locales" USING btree ("og_image_id","_locale");
  CREATE INDEX IF NOT EXISTS "services_og_image_idx" ON "services_locales" USING btree ("og_image_id","_locale");`)
}

// Migration signature requires payload and req; only db is used
export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages_locales" DROP CONSTRAINT IF EXISTS "pages_locales_og_image_id_media_id_fk";
  ALTER TABLE "site_settings_locales" DROP CONSTRAINT IF EXISTS "site_settings_locales_og_image_id_media_id_fk";
  ALTER TABLE "services_locales" DROP CONSTRAINT IF EXISTS "services_locales_og_image_id_media_id_fk";
  DROP INDEX IF EXISTS "pages_og_image_idx";
  DROP INDEX IF EXISTS "site_settings_og_image_idx";
  DROP INDEX IF EXISTS "services_og_image_idx";
  ALTER TABLE "pages_locales" DROP COLUMN "meta_title";
  ALTER TABLE "pages_locales" DROP COLUMN "meta_description";
  ALTER TABLE "pages_locales" DROP COLUMN "og_image_id";
  ALTER TABLE "site_settings" DROP COLUMN "robots_index";
  ALTER TABLE "site_settings" DROP COLUMN "robots_follow";
  ALTER TABLE "site_settings_locales" DROP COLUMN "meta_title";
  ALTER TABLE "site_settings_locales" DROP COLUMN "meta_description";
  ALTER TABLE "site_settings_locales" DROP COLUMN "meta_keywords";
  ALTER TABLE "site_settings_locales" DROP COLUMN "og_image_id";
  ALTER TABLE "services_locales" DROP COLUMN "meta_title";
  ALTER TABLE "services_locales" DROP COLUMN "meta_description";
  ALTER TABLE "services_locales" DROP COLUMN "og_image_id";`)
}
