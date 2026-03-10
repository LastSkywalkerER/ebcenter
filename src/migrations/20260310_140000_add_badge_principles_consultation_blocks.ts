import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE IF NOT EXISTS "pages_blocks_badge" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );

  CREATE TABLE IF NOT EXISTS "pages_blocks_badge_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar NOT NULL
  );

  CREATE TABLE IF NOT EXISTS "pages_blocks_principles" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"section_title" varchar NOT NULL,
  	"block_name" varchar
  );

  CREATE TABLE IF NOT EXISTS "pages_blocks_principles_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"icon" varchar NOT NULL,
  	"title" varchar NOT NULL,
  	"description" varchar NOT NULL
  );

  CREATE TABLE IF NOT EXISTS "pages_blocks_consultation_form" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );

  DO $$ BEGIN
    ALTER TABLE "pages_blocks_badge_items" ADD CONSTRAINT "pages_blocks_badge_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_badge"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION WHEN duplicate_object THEN NULL; END $$;
  DO $$ BEGIN
    ALTER TABLE "pages_blocks_badge" ADD CONSTRAINT "pages_blocks_badge_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION WHEN duplicate_object THEN NULL; END $$;
  DO $$ BEGIN
    ALTER TABLE "pages_blocks_principles_items" ADD CONSTRAINT "pages_blocks_principles_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_principles"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION WHEN duplicate_object THEN NULL; END $$;
  DO $$ BEGIN
    ALTER TABLE "pages_blocks_principles" ADD CONSTRAINT "pages_blocks_principles_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION WHEN duplicate_object THEN NULL; END $$;
  DO $$ BEGIN
    ALTER TABLE "pages_blocks_consultation_form" ADD CONSTRAINT "pages_blocks_consultation_form_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION WHEN duplicate_object THEN NULL; END $$;

  CREATE INDEX IF NOT EXISTS "pages_blocks_badge_items_order_idx" ON "pages_blocks_badge_items" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_blocks_badge_items_parent_id_idx" ON "pages_blocks_badge_items" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_badge_items_locale_idx" ON "pages_blocks_badge_items" USING btree ("_locale");
  CREATE INDEX IF NOT EXISTS "pages_blocks_badge_order_idx" ON "pages_blocks_badge" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_blocks_badge_parent_id_idx" ON "pages_blocks_badge" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_badge_path_idx" ON "pages_blocks_badge" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "pages_blocks_badge_locale_idx" ON "pages_blocks_badge" USING btree ("_locale");
  CREATE INDEX IF NOT EXISTS "pages_blocks_principles_items_order_idx" ON "pages_blocks_principles_items" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_blocks_principles_items_parent_id_idx" ON "pages_blocks_principles_items" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_principles_items_locale_idx" ON "pages_blocks_principles_items" USING btree ("_locale");
  CREATE INDEX IF NOT EXISTS "pages_blocks_principles_order_idx" ON "pages_blocks_principles" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_blocks_principles_parent_id_idx" ON "pages_blocks_principles" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_principles_path_idx" ON "pages_blocks_principles" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "pages_blocks_principles_locale_idx" ON "pages_blocks_principles" USING btree ("_locale");
  CREATE INDEX IF NOT EXISTS "pages_blocks_consultation_form_order_idx" ON "pages_blocks_consultation_form" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_blocks_consultation_form_parent_id_idx" ON "pages_blocks_consultation_form" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_consultation_form_path_idx" ON "pages_blocks_consultation_form" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "pages_blocks_consultation_form_locale_idx" ON "pages_blocks_consultation_form" USING btree ("_locale");`)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE IF EXISTS "pages_blocks_badge_items" CASCADE;
  DROP TABLE IF EXISTS "pages_blocks_badge" CASCADE;
  DROP TABLE IF EXISTS "pages_blocks_principles_items" CASCADE;
  DROP TABLE IF EXISTS "pages_blocks_principles" CASCADE;
  DROP TABLE IF EXISTS "pages_blocks_consultation_form" CASCADE;`)
}
