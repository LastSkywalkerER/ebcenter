import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
  -- pages_blocks_stats
  CREATE TABLE IF NOT EXISTS "pages_blocks_stats" (
    "_order" integer NOT NULL,
    "_parent_id" integer NOT NULL,
    "_path" text NOT NULL,
    "_locale" "_locales" NOT NULL,
    "id" varchar PRIMARY KEY NOT NULL,
    "block_name" varchar
  );

  CREATE TABLE IF NOT EXISTS "pages_blocks_stats_items" (
    "_order" integer NOT NULL,
    "_parent_id" varchar NOT NULL,
    "_locale" "_locales" NOT NULL,
    "id" varchar PRIMARY KEY NOT NULL,
    "value" varchar NOT NULL,
    "label" varchar NOT NULL
  );

  DO $$ BEGIN
    ALTER TABLE "pages_blocks_stats_items" ADD CONSTRAINT "pages_blocks_stats_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_stats"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION WHEN duplicate_object THEN NULL; END $$;
  DO $$ BEGIN
    ALTER TABLE "pages_blocks_stats" ADD CONSTRAINT "pages_blocks_stats_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION WHEN duplicate_object THEN NULL; END $$;

  CREATE INDEX IF NOT EXISTS "pages_blocks_stats_items_order_idx" ON "pages_blocks_stats_items" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_blocks_stats_items_parent_id_idx" ON "pages_blocks_stats_items" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_stats_items_locale_idx" ON "pages_blocks_stats_items" USING btree ("_locale");
  CREATE INDEX IF NOT EXISTS "pages_blocks_stats_order_idx" ON "pages_blocks_stats" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_blocks_stats_parent_id_idx" ON "pages_blocks_stats" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_stats_path_idx" ON "pages_blocks_stats" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "pages_blocks_stats_locale_idx" ON "pages_blocks_stats" USING btree ("_locale");

  -- Add badge to hero
  ALTER TABLE "pages_blocks_hero" ADD COLUMN IF NOT EXISTS "badge" varchar;

  -- Add section fields to service_list, course_list, contact_info
  ALTER TABLE "pages_blocks_service_list" ADD COLUMN IF NOT EXISTS "section_tag" varchar;
  ALTER TABLE "pages_blocks_service_list" ADD COLUMN IF NOT EXISTS "section_subtitle" varchar;

  ALTER TABLE "pages_blocks_course_list" ADD COLUMN IF NOT EXISTS "section_tag" varchar;
  ALTER TABLE "pages_blocks_course_list" ADD COLUMN IF NOT EXISTS "section_title" varchar;
  ALTER TABLE "pages_blocks_course_list" ADD COLUMN IF NOT EXISTS "section_subtitle" varchar;

  ALTER TABLE "pages_blocks_contact_info" ADD COLUMN IF NOT EXISTS "section_tag" varchar;
  ALTER TABLE "pages_blocks_contact_info" ADD COLUMN IF NOT EXISTS "section_title" varchar;
  ALTER TABLE "pages_blocks_contact_info" ADD COLUMN IF NOT EXISTS "section_description" varchar;

  -- Add section_tag to pricing (stored in pricing_locales)
  ALTER TABLE "pages_blocks_pricing_locales" ADD COLUMN IF NOT EXISTS "section_tag" varchar;
  `)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
  DROP TABLE IF EXISTS "pages_blocks_stats_items" CASCADE;
  DROP TABLE IF EXISTS "pages_blocks_stats" CASCADE;

  ALTER TABLE "pages_blocks_service_list" DROP COLUMN IF EXISTS "section_tag";
  ALTER TABLE "pages_blocks_service_list" DROP COLUMN IF EXISTS "section_subtitle";

  ALTER TABLE "pages_blocks_course_list" DROP COLUMN IF EXISTS "section_tag";
  ALTER TABLE "pages_blocks_course_list" DROP COLUMN IF EXISTS "section_title";
  ALTER TABLE "pages_blocks_course_list" DROP COLUMN IF EXISTS "section_subtitle";

  ALTER TABLE "pages_blocks_contact_info" DROP COLUMN IF EXISTS "section_tag";
  ALTER TABLE "pages_blocks_contact_info" DROP COLUMN IF EXISTS "section_title";
  ALTER TABLE "pages_blocks_contact_info" DROP COLUMN IF EXISTS "section_description";

  ALTER TABLE "pages_blocks_hero" DROP COLUMN IF EXISTS "badge";
  ALTER TABLE "pages_blocks_pricing_locales" DROP COLUMN IF EXISTS "section_tag";
  `)
}
