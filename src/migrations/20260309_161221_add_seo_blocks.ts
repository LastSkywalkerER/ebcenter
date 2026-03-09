import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE IF NOT EXISTS "pages_blocks_seo_paragraphs_paragraphs" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "pages_blocks_seo_paragraphs" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "pages_blocks_image_text_paragraphs" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "pages_blocks_image_text" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"image_id" integer,
  	"image_url" varchar,
  	"link_url" varchar,
  	"link_text" varchar,
  	"block_name" varchar
  );
  
  ALTER TABLE "pages_blocks_service_list" ADD COLUMN IF NOT EXISTS "section_title" varchar;
  ALTER TABLE "services_locales" ADD COLUMN IF NOT EXISTS "meta_title" varchar;
  ALTER TABLE "services_locales" ADD COLUMN IF NOT EXISTS "meta_description" varchar;
  ALTER TABLE "services_locales" ADD COLUMN IF NOT EXISTS "og_image_id" integer;
  ALTER TABLE "courses_locales" ADD COLUMN IF NOT EXISTS "meta_title" varchar;
  ALTER TABLE "courses_locales" ADD COLUMN IF NOT EXISTS "meta_description" varchar;
  ALTER TABLE "courses_locales" ADD COLUMN IF NOT EXISTS "og_image_id" integer;
  DO $$ BEGIN
    ALTER TABLE "pages_blocks_seo_paragraphs_paragraphs" ADD CONSTRAINT "pages_blocks_seo_paragraphs_paragraphs_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_seo_paragraphs"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION WHEN duplicate_object THEN NULL; END $$;
  DO $$ BEGIN
    ALTER TABLE "pages_blocks_seo_paragraphs" ADD CONSTRAINT "pages_blocks_seo_paragraphs_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION WHEN duplicate_object THEN NULL; END $$;
  DO $$ BEGIN
    ALTER TABLE "pages_blocks_image_text_paragraphs" ADD CONSTRAINT "pages_blocks_image_text_paragraphs_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_image_text"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION WHEN duplicate_object THEN NULL; END $$;
  DO $$ BEGIN
    ALTER TABLE "pages_blocks_image_text" ADD CONSTRAINT "pages_blocks_image_text_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION WHEN duplicate_object THEN NULL; END $$;
  DO $$ BEGIN
    ALTER TABLE "pages_blocks_image_text" ADD CONSTRAINT "pages_blocks_image_text_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION WHEN duplicate_object THEN NULL; END $$;
  CREATE INDEX IF NOT EXISTS "pages_blocks_seo_paragraphs_paragraphs_order_idx" ON "pages_blocks_seo_paragraphs_paragraphs" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_blocks_seo_paragraphs_paragraphs_parent_id_idx" ON "pages_blocks_seo_paragraphs_paragraphs" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_seo_paragraphs_paragraphs_locale_idx" ON "pages_blocks_seo_paragraphs_paragraphs" USING btree ("_locale");
  CREATE INDEX IF NOT EXISTS "pages_blocks_seo_paragraphs_order_idx" ON "pages_blocks_seo_paragraphs" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_blocks_seo_paragraphs_parent_id_idx" ON "pages_blocks_seo_paragraphs" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_seo_paragraphs_path_idx" ON "pages_blocks_seo_paragraphs" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "pages_blocks_seo_paragraphs_locale_idx" ON "pages_blocks_seo_paragraphs" USING btree ("_locale");
  CREATE INDEX IF NOT EXISTS "pages_blocks_image_text_paragraphs_order_idx" ON "pages_blocks_image_text_paragraphs" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_blocks_image_text_paragraphs_parent_id_idx" ON "pages_blocks_image_text_paragraphs" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_image_text_paragraphs_locale_idx" ON "pages_blocks_image_text_paragraphs" USING btree ("_locale");
  CREATE INDEX IF NOT EXISTS "pages_blocks_image_text_order_idx" ON "pages_blocks_image_text" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_blocks_image_text_parent_id_idx" ON "pages_blocks_image_text" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_image_text_path_idx" ON "pages_blocks_image_text" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "pages_blocks_image_text_locale_idx" ON "pages_blocks_image_text" USING btree ("_locale");
  CREATE INDEX IF NOT EXISTS "pages_blocks_image_text_image_idx" ON "pages_blocks_image_text" USING btree ("image_id");
  DO $$ BEGIN
    ALTER TABLE "services_locales" ADD CONSTRAINT "services_locales_og_image_id_media_id_fk" FOREIGN KEY ("og_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION WHEN duplicate_object THEN NULL; END $$;
  DO $$ BEGIN
    ALTER TABLE "courses_locales" ADD CONSTRAINT "courses_locales_og_image_id_media_id_fk" FOREIGN KEY ("og_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION WHEN duplicate_object THEN NULL; END $$;
  CREATE INDEX IF NOT EXISTS "services_og_image_idx" ON "services_locales" USING btree ("og_image_id","_locale");
  CREATE INDEX IF NOT EXISTS "courses_og_image_idx" ON "courses_locales" USING btree ("og_image_id","_locale");`)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE IF EXISTS "pages_blocks_seo_paragraphs_paragraphs" CASCADE;
  DROP TABLE IF EXISTS "pages_blocks_seo_paragraphs" CASCADE;
  DROP TABLE IF EXISTS "pages_blocks_image_text_paragraphs" CASCADE;
  DROP TABLE IF EXISTS "pages_blocks_image_text" CASCADE;
  ALTER TABLE "services_locales" DROP CONSTRAINT IF EXISTS "services_locales_og_image_id_media_id_fk";
  ALTER TABLE "courses_locales" DROP CONSTRAINT IF EXISTS "courses_locales_og_image_id_media_id_fk";
  DROP INDEX IF EXISTS "services_og_image_idx";
  DROP INDEX IF EXISTS "courses_og_image_idx";
  ALTER TABLE "services_locales" DROP COLUMN IF EXISTS "meta_title";
  ALTER TABLE "services_locales" DROP COLUMN IF EXISTS "meta_description";
  ALTER TABLE "services_locales" DROP COLUMN IF EXISTS "og_image_id";
  ALTER TABLE "courses_locales" DROP COLUMN IF EXISTS "meta_title";
  ALTER TABLE "courses_locales" DROP COLUMN IF EXISTS "meta_description";
  ALTER TABLE "courses_locales" DROP COLUMN IF EXISTS "og_image_id";
  ALTER TABLE "pages_blocks_service_list" DROP COLUMN IF EXISTS "section_title";`)
}
