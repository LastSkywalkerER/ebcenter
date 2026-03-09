import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

// Migration signature requires payload and req; only db is used
export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages_locales" ADD COLUMN "meta_title" varchar;
  ALTER TABLE "pages_locales" ADD COLUMN "meta_description" varchar;
  ALTER TABLE "pages_locales" ADD COLUMN "og_image_id" integer;
  ALTER TABLE "site_settings" ADD COLUMN "robots_index" boolean DEFAULT true;
  ALTER TABLE "site_settings" ADD COLUMN "robots_follow" boolean DEFAULT true;
  ALTER TABLE "site_settings_locales" ADD COLUMN "meta_title" varchar;
  ALTER TABLE "site_settings_locales" ADD COLUMN "meta_description" varchar;
  ALTER TABLE "site_settings_locales" ADD COLUMN "meta_keywords" varchar;
  ALTER TABLE "site_settings_locales" ADD COLUMN "og_image_id" integer;
  ALTER TABLE "pages_locales" ADD CONSTRAINT "pages_locales_og_image_id_media_id_fk" FOREIGN KEY ("og_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "site_settings_locales" ADD CONSTRAINT "site_settings_locales_og_image_id_media_id_fk" FOREIGN KEY ("og_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "pages_og_image_idx" ON "pages_locales" USING btree ("og_image_id","_locale");
  CREATE INDEX "site_settings_og_image_idx" ON "site_settings_locales" USING btree ("og_image_id","_locale");`)
}

// Migration signature requires payload and req; only db is used
export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages_locales" DROP CONSTRAINT "pages_locales_og_image_id_media_id_fk";
  
  ALTER TABLE "site_settings_locales" DROP CONSTRAINT "site_settings_locales_og_image_id_media_id_fk";
  
  DROP INDEX "pages_og_image_idx";
  DROP INDEX "site_settings_og_image_idx";
  ALTER TABLE "pages_locales" DROP COLUMN "meta_title";
  ALTER TABLE "pages_locales" DROP COLUMN "meta_description";
  ALTER TABLE "pages_locales" DROP COLUMN "og_image_id";
  ALTER TABLE "site_settings" DROP COLUMN "robots_index";
  ALTER TABLE "site_settings" DROP COLUMN "robots_follow";
  ALTER TABLE "site_settings_locales" DROP COLUMN "meta_title";
  ALTER TABLE "site_settings_locales" DROP COLUMN "meta_description";
  ALTER TABLE "site_settings_locales" DROP COLUMN "meta_keywords";
  ALTER TABLE "site_settings_locales" DROP COLUMN "og_image_id";`)
}
