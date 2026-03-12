import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`

  -- =====================================================
  -- KnowledgeBase collection
  -- =====================================================
  CREATE TABLE IF NOT EXISTS "knowledge_base" (
    "_order" integer,
    "id" serial PRIMARY KEY NOT NULL,
    "slug" varchar UNIQUE NOT NULL,
    "published_at" timestamp(3) with time zone,
    "is_featured" boolean DEFAULT false,
    "order" integer DEFAULT 0,
    "updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
    "created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );

  CREATE TABLE IF NOT EXISTS "knowledge_base_locales" (
    "title" varchar NOT NULL,
    "description" varchar,
    "meta_title" varchar,
    "meta_description" varchar,
    "id" serial PRIMARY KEY NOT NULL,
    "_locale" "_locales" NOT NULL,
    "_parent_id" integer NOT NULL
  );

  DO $$ BEGIN
    ALTER TABLE "knowledge_base_locales" ADD CONSTRAINT "knowledge_base_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."knowledge_base"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION WHEN duplicate_object THEN NULL; END $$;

  CREATE INDEX IF NOT EXISTS "knowledge_base_slug_idx" ON "knowledge_base" USING btree ("slug");
  CREATE INDEX IF NOT EXISTS "knowledge_base_is_featured_idx" ON "knowledge_base" USING btree ("is_featured");
  CREATE INDEX IF NOT EXISTS "knowledge_base_created_at_idx" ON "knowledge_base" USING btree ("created_at");
  CREATE UNIQUE INDEX IF NOT EXISTS "knowledge_base_locales_locale_parent_id_unique" ON "knowledge_base_locales" USING btree ("_locale","_parent_id");

  -- =====================================================
  -- pages_blocks_advantages
  -- =====================================================
  CREATE TABLE IF NOT EXISTS "pages_blocks_advantages" (
    "_order" integer NOT NULL,
    "_parent_id" integer NOT NULL,
    "_path" text NOT NULL,
    "_locale" "_locales" NOT NULL,
    "id" varchar PRIMARY KEY NOT NULL,
    "cta_text" varchar,
    "block_name" varchar
  );

  CREATE TABLE IF NOT EXISTS "pages_blocks_advantages_locales" (
    "tag" varchar,
    "title" varchar NOT NULL,
    "description" varchar,
    "id" serial PRIMARY KEY NOT NULL,
    "_locale" "_locales" NOT NULL,
    "_parent_id" varchar NOT NULL
  );

  CREATE TABLE IF NOT EXISTS "pages_blocks_advantages_items" (
    "_order" integer NOT NULL,
    "_parent_id" varchar NOT NULL,
    "_locale" "_locales" NOT NULL,
    "id" varchar PRIMARY KEY NOT NULL,
    "icon" varchar NOT NULL,
    "title" varchar NOT NULL,
    "description" varchar NOT NULL
  );

  DO $$ BEGIN
    ALTER TABLE "pages_blocks_advantages" ADD CONSTRAINT "pages_blocks_advantages_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION WHEN duplicate_object THEN NULL; END $$;
  DO $$ BEGIN
    ALTER TABLE "pages_blocks_advantages_locales" ADD CONSTRAINT "pages_blocks_advantages_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_advantages"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION WHEN duplicate_object THEN NULL; END $$;
  DO $$ BEGIN
    ALTER TABLE "pages_blocks_advantages_items" ADD CONSTRAINT "pages_blocks_advantages_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_advantages"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION WHEN duplicate_object THEN NULL; END $$;

  CREATE INDEX IF NOT EXISTS "pages_blocks_advantages_order_idx" ON "pages_blocks_advantages" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_blocks_advantages_parent_id_idx" ON "pages_blocks_advantages" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_advantages_path_idx" ON "pages_blocks_advantages" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "pages_blocks_advantages_locale_idx" ON "pages_blocks_advantages" USING btree ("_locale");
  CREATE UNIQUE INDEX IF NOT EXISTS "pages_blocks_advantages_locales_locale_parent_id_unique" ON "pages_blocks_advantages_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_advantages_items_order_idx" ON "pages_blocks_advantages_items" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_blocks_advantages_items_parent_id_idx" ON "pages_blocks_advantages_items" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_advantages_items_locale_idx" ON "pages_blocks_advantages_items" USING btree ("_locale");

  -- =====================================================
  -- pages_blocks_pricing
  -- =====================================================
  CREATE TABLE IF NOT EXISTS "pages_blocks_pricing" (
    "_order" integer NOT NULL,
    "_parent_id" integer NOT NULL,
    "_path" text NOT NULL,
    "_locale" "_locales" NOT NULL,
    "id" varchar PRIMARY KEY NOT NULL,
    "block_name" varchar
  );

  CREATE TABLE IF NOT EXISTS "pages_blocks_pricing_locales" (
    "section_title" varchar,
    "section_description" varchar,
    "id" serial PRIMARY KEY NOT NULL,
    "_locale" "_locales" NOT NULL,
    "_parent_id" varchar NOT NULL
  );

  CREATE TABLE IF NOT EXISTS "pages_blocks_pricing_cards" (
    "_order" integer NOT NULL,
    "_parent_id" varchar NOT NULL,
    "_locale" "_locales" NOT NULL,
    "id" varchar PRIMARY KEY NOT NULL,
    "title" varchar NOT NULL,
    "description" varchar,
    "cta_text" varchar,
    "is_featured" boolean DEFAULT false,
    "featured_badge" varchar
  );

  CREATE TABLE IF NOT EXISTS "pages_blocks_pricing_cards_features" (
    "_order" integer NOT NULL,
    "_parent_id" varchar NOT NULL,
    "id" varchar PRIMARY KEY NOT NULL,
    "text" varchar NOT NULL
  );

  DO $$ BEGIN
    ALTER TABLE "pages_blocks_pricing" ADD CONSTRAINT "pages_blocks_pricing_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION WHEN duplicate_object THEN NULL; END $$;
  DO $$ BEGIN
    ALTER TABLE "pages_blocks_pricing_locales" ADD CONSTRAINT "pages_blocks_pricing_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_pricing"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION WHEN duplicate_object THEN NULL; END $$;
  DO $$ BEGIN
    ALTER TABLE "pages_blocks_pricing_cards" ADD CONSTRAINT "pages_blocks_pricing_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_pricing"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION WHEN duplicate_object THEN NULL; END $$;
  DO $$ BEGIN
    ALTER TABLE "pages_blocks_pricing_cards_features" ADD CONSTRAINT "pages_blocks_pricing_cards_features_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_pricing_cards"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION WHEN duplicate_object THEN NULL; END $$;

  CREATE INDEX IF NOT EXISTS "pages_blocks_pricing_order_idx" ON "pages_blocks_pricing" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_blocks_pricing_parent_id_idx" ON "pages_blocks_pricing" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_pricing_path_idx" ON "pages_blocks_pricing" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "pages_blocks_pricing_locale_idx" ON "pages_blocks_pricing" USING btree ("_locale");
  CREATE UNIQUE INDEX IF NOT EXISTS "pages_blocks_pricing_locales_locale_parent_id_unique" ON "pages_blocks_pricing_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_pricing_cards_order_idx" ON "pages_blocks_pricing_cards" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_blocks_pricing_cards_parent_id_idx" ON "pages_blocks_pricing_cards" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_pricing_cards_locale_idx" ON "pages_blocks_pricing_cards" USING btree ("_locale");
  CREATE INDEX IF NOT EXISTS "pages_blocks_pricing_cards_features_order_idx" ON "pages_blocks_pricing_cards_features" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_blocks_pricing_cards_features_parent_id_idx" ON "pages_blocks_pricing_cards_features" USING btree ("_parent_id");

  -- =====================================================
  -- pages_blocks_knowledge
  -- =====================================================
  CREATE TABLE IF NOT EXISTS "pages_blocks_knowledge" (
    "_order" integer NOT NULL,
    "_parent_id" integer NOT NULL,
    "_path" text NOT NULL,
    "_locale" "_locales" NOT NULL,
    "id" varchar PRIMARY KEY NOT NULL,
    "article_source" varchar DEFAULT 'featured',
    "block_name" varchar
  );

  CREATE TABLE IF NOT EXISTS "pages_blocks_knowledge_locales" (
    "tag" varchar,
    "title" varchar NOT NULL,
    "articles_title" varchar,
    "id" serial PRIMARY KEY NOT NULL,
    "_locale" "_locales" NOT NULL,
    "_parent_id" varchar NOT NULL
  );

  CREATE TABLE IF NOT EXISTS "pages_blocks_knowledge_paragraphs" (
    "_order" integer NOT NULL,
    "_parent_id" varchar NOT NULL,
    "_locale" "_locales" NOT NULL,
    "id" varchar PRIMARY KEY NOT NULL,
    "text" varchar NOT NULL
  );

  CREATE TABLE IF NOT EXISTS "pages_blocks_knowledge_manual_slugs" (
    "_order" integer NOT NULL,
    "_parent_id" varchar NOT NULL,
    "id" varchar PRIMARY KEY NOT NULL,
    "slug" varchar NOT NULL
  );

  DO $$ BEGIN
    ALTER TABLE "pages_blocks_knowledge" ADD CONSTRAINT "pages_blocks_knowledge_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION WHEN duplicate_object THEN NULL; END $$;
  DO $$ BEGIN
    ALTER TABLE "pages_blocks_knowledge_locales" ADD CONSTRAINT "pages_blocks_knowledge_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_knowledge"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION WHEN duplicate_object THEN NULL; END $$;
  DO $$ BEGIN
    ALTER TABLE "pages_blocks_knowledge_paragraphs" ADD CONSTRAINT "pages_blocks_knowledge_paragraphs_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_knowledge"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION WHEN duplicate_object THEN NULL; END $$;
  DO $$ BEGIN
    ALTER TABLE "pages_blocks_knowledge_manual_slugs" ADD CONSTRAINT "pages_blocks_knowledge_manual_slugs_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_knowledge"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION WHEN duplicate_object THEN NULL; END $$;

  CREATE INDEX IF NOT EXISTS "pages_blocks_knowledge_order_idx" ON "pages_blocks_knowledge" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_blocks_knowledge_parent_id_idx" ON "pages_blocks_knowledge" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_knowledge_path_idx" ON "pages_blocks_knowledge" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "pages_blocks_knowledge_locale_idx" ON "pages_blocks_knowledge" USING btree ("_locale");
  CREATE UNIQUE INDEX IF NOT EXISTS "pages_blocks_knowledge_locales_locale_parent_id_unique" ON "pages_blocks_knowledge_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_knowledge_paragraphs_order_idx" ON "pages_blocks_knowledge_paragraphs" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_blocks_knowledge_paragraphs_parent_id_idx" ON "pages_blocks_knowledge_paragraphs" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_knowledge_paragraphs_locale_idx" ON "pages_blocks_knowledge_paragraphs" USING btree ("_locale");
  CREATE INDEX IF NOT EXISTS "pages_blocks_knowledge_manual_slugs_order_idx" ON "pages_blocks_knowledge_manual_slugs" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_blocks_knowledge_manual_slugs_parent_id_idx" ON "pages_blocks_knowledge_manual_slugs" USING btree ("_parent_id");

  -- =====================================================
  -- pages_blocks_about
  -- =====================================================
  CREATE TABLE IF NOT EXISTS "pages_blocks_about" (
    "_order" integer NOT NULL,
    "_parent_id" integer NOT NULL,
    "_path" text NOT NULL,
    "_locale" "_locales" NOT NULL,
    "id" varchar PRIMARY KEY NOT NULL,
    "avatar_id" integer,
    "block_name" varchar
  );

  CREATE TABLE IF NOT EXISTS "pages_blocks_about_locales" (
    "tag" varchar,
    "title" varchar NOT NULL,
    "id" serial PRIMARY KEY NOT NULL,
    "_locale" "_locales" NOT NULL,
    "_parent_id" varchar NOT NULL
  );

  CREATE TABLE IF NOT EXISTS "pages_blocks_about_paragraphs" (
    "_order" integer NOT NULL,
    "_parent_id" varchar NOT NULL,
    "_locale" "_locales" NOT NULL,
    "id" varchar PRIMARY KEY NOT NULL,
    "text" varchar NOT NULL
  );

  CREATE TABLE IF NOT EXISTS "pages_blocks_about_stats" (
    "_order" integer NOT NULL,
    "_parent_id" varchar NOT NULL,
    "_locale" "_locales" NOT NULL,
    "id" varchar PRIMARY KEY NOT NULL,
    "value" varchar NOT NULL,
    "label" varchar NOT NULL
  );

  DO $$ BEGIN
    ALTER TABLE "pages_blocks_about" ADD CONSTRAINT "pages_blocks_about_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION WHEN duplicate_object THEN NULL; END $$;
  DO $$ BEGIN
    ALTER TABLE "pages_blocks_about" ADD CONSTRAINT "pages_blocks_about_avatar_id_media_fk" FOREIGN KEY ("avatar_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION WHEN duplicate_object THEN NULL; END $$;
  DO $$ BEGIN
    ALTER TABLE "pages_blocks_about_locales" ADD CONSTRAINT "pages_blocks_about_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_about"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION WHEN duplicate_object THEN NULL; END $$;
  DO $$ BEGIN
    ALTER TABLE "pages_blocks_about_paragraphs" ADD CONSTRAINT "pages_blocks_about_paragraphs_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_about"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION WHEN duplicate_object THEN NULL; END $$;
  DO $$ BEGIN
    ALTER TABLE "pages_blocks_about_stats" ADD CONSTRAINT "pages_blocks_about_stats_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_about"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION WHEN duplicate_object THEN NULL; END $$;

  CREATE INDEX IF NOT EXISTS "pages_blocks_about_order_idx" ON "pages_blocks_about" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_blocks_about_parent_id_idx" ON "pages_blocks_about" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_about_path_idx" ON "pages_blocks_about" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "pages_blocks_about_locale_idx" ON "pages_blocks_about" USING btree ("_locale");
  CREATE UNIQUE INDEX IF NOT EXISTS "pages_blocks_about_locales_locale_parent_id_unique" ON "pages_blocks_about_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_about_paragraphs_order_idx" ON "pages_blocks_about_paragraphs" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_blocks_about_paragraphs_parent_id_idx" ON "pages_blocks_about_paragraphs" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_about_paragraphs_locale_idx" ON "pages_blocks_about_paragraphs" USING btree ("_locale");
  CREATE INDEX IF NOT EXISTS "pages_blocks_about_stats_order_idx" ON "pages_blocks_about_stats" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_blocks_about_stats_parent_id_idx" ON "pages_blocks_about_stats" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_about_stats_locale_idx" ON "pages_blocks_about_stats" USING btree ("_locale");

  -- =====================================================
  -- pages_blocks_faq
  -- =====================================================
  CREATE TABLE IF NOT EXISTS "pages_blocks_faq" (
    "_order" integer NOT NULL,
    "_parent_id" integer NOT NULL,
    "_path" text NOT NULL,
    "_locale" "_locales" NOT NULL,
    "id" varchar PRIMARY KEY NOT NULL,
    "block_name" varchar
  );

  CREATE TABLE IF NOT EXISTS "pages_blocks_faq_locales" (
    "section_title" varchar,
    "id" serial PRIMARY KEY NOT NULL,
    "_locale" "_locales" NOT NULL,
    "_parent_id" varchar NOT NULL
  );

  CREATE TABLE IF NOT EXISTS "pages_blocks_faq_items" (
    "_order" integer NOT NULL,
    "_parent_id" varchar NOT NULL,
    "_locale" "_locales" NOT NULL,
    "id" varchar PRIMARY KEY NOT NULL,
    "question" varchar NOT NULL,
    "answer" varchar NOT NULL
  );

  DO $$ BEGIN
    ALTER TABLE "pages_blocks_faq" ADD CONSTRAINT "pages_blocks_faq_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION WHEN duplicate_object THEN NULL; END $$;
  DO $$ BEGIN
    ALTER TABLE "pages_blocks_faq_locales" ADD CONSTRAINT "pages_blocks_faq_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_faq"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION WHEN duplicate_object THEN NULL; END $$;
  DO $$ BEGIN
    ALTER TABLE "pages_blocks_faq_items" ADD CONSTRAINT "pages_blocks_faq_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_faq"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION WHEN duplicate_object THEN NULL; END $$;

  CREATE INDEX IF NOT EXISTS "pages_blocks_faq_order_idx" ON "pages_blocks_faq" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_blocks_faq_parent_id_idx" ON "pages_blocks_faq" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_faq_path_idx" ON "pages_blocks_faq" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "pages_blocks_faq_locale_idx" ON "pages_blocks_faq" USING btree ("_locale");
  CREATE UNIQUE INDEX IF NOT EXISTS "pages_blocks_faq_locales_locale_parent_id_unique" ON "pages_blocks_faq_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_faq_items_order_idx" ON "pages_blocks_faq_items" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_blocks_faq_items_parent_id_idx" ON "pages_blocks_faq_items" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_faq_items_locale_idx" ON "pages_blocks_faq_items" USING btree ("_locale");
  `)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
  DROP TABLE IF EXISTS "pages_blocks_faq_items" CASCADE;
  DROP TABLE IF EXISTS "pages_blocks_faq_locales" CASCADE;
  DROP TABLE IF EXISTS "pages_blocks_faq" CASCADE;
  DROP TABLE IF EXISTS "pages_blocks_about_stats" CASCADE;
  DROP TABLE IF EXISTS "pages_blocks_about_paragraphs" CASCADE;
  DROP TABLE IF EXISTS "pages_blocks_about_locales" CASCADE;
  DROP TABLE IF EXISTS "pages_blocks_about" CASCADE;
  DROP TABLE IF EXISTS "pages_blocks_knowledge_manual_slugs" CASCADE;
  DROP TABLE IF EXISTS "pages_blocks_knowledge_paragraphs" CASCADE;
  DROP TABLE IF EXISTS "pages_blocks_knowledge_locales" CASCADE;
  DROP TABLE IF EXISTS "pages_blocks_knowledge" CASCADE;
  DROP TABLE IF EXISTS "pages_blocks_pricing_cards_features" CASCADE;
  DROP TABLE IF EXISTS "pages_blocks_pricing_cards" CASCADE;
  DROP TABLE IF EXISTS "pages_blocks_pricing_locales" CASCADE;
  DROP TABLE IF EXISTS "pages_blocks_pricing" CASCADE;
  DROP TABLE IF EXISTS "pages_blocks_advantages_items" CASCADE;
  DROP TABLE IF EXISTS "pages_blocks_advantages_locales" CASCADE;
  DROP TABLE IF EXISTS "pages_blocks_advantages" CASCADE;
  DROP TABLE IF EXISTS "knowledge_base_locales" CASCADE;
  DROP TABLE IF EXISTS "knowledge_base" CASCADE;
  `)
}
