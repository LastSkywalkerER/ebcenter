import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

/**
 * Consolidated migration combining all schema from 17 existing migrations.
 * Idempotent: uses IF NOT EXISTS / DO $$ EXCEPTION WHEN duplicate_object for all operations.
 */
export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
  DO $$ BEGIN
    CREATE TYPE "public"."_locales" AS ENUM('ru', 'en');
  EXCEPTION WHEN duplicate_object THEN NULL; END $$;

  CREATE TABLE IF NOT EXISTS "users_sessions" (
    "_order" integer NOT NULL,
    "_parent_id" integer NOT NULL,
    "id" varchar PRIMARY KEY NOT NULL,
    "created_at" timestamp(3) with time zone,
    "expires_at" timestamp(3) with time zone NOT NULL
  );

  CREATE TABLE IF NOT EXISTS "users" (
    "id" serial PRIMARY KEY NOT NULL,
    "updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
    "created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
    "email" varchar NOT NULL,
    "reset_password_token" varchar,
    "reset_password_expiration" timestamp(3) with time zone,
    "salt" varchar,
    "hash" varchar,
    "login_attempts" numeric DEFAULT 0,
    "lock_until" timestamp(3) with time zone
  );

  CREATE TABLE IF NOT EXISTS "media" (
    "id" serial PRIMARY KEY NOT NULL,
    "updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
    "created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
    "url" varchar,
    "thumbnail_u_r_l" varchar,
    "filename" varchar,
    "mime_type" varchar,
    "filesize" numeric,
    "width" numeric,
    "height" numeric,
    "focal_x" numeric,
    "focal_y" numeric
  );

  CREATE TABLE IF NOT EXISTS "media_locales" (
    "alt" varchar NOT NULL,
    "id" serial PRIMARY KEY NOT NULL,
    "_locale" "_locales" NOT NULL,
    "_parent_id" integer NOT NULL
  );

  CREATE TABLE IF NOT EXISTS "services_content" (
    "_order" integer NOT NULL,
    "_parent_id" integer NOT NULL,
    "_locale" "_locales" NOT NULL,
    "id" varchar PRIMARY KEY NOT NULL,
    "text" varchar NOT NULL
  );

  CREATE TABLE IF NOT EXISTS "services_tariff_items_features" (
    "_order" integer NOT NULL,
    "_parent_id" varchar NOT NULL,
    "_locale" "_locales" NOT NULL,
    "id" varchar PRIMARY KEY NOT NULL,
    "feature" varchar
  );

  CREATE TABLE IF NOT EXISTS "services_tariff_items" (
    "_order" integer NOT NULL,
    "_parent_id" integer NOT NULL,
    "_locale" "_locales" NOT NULL,
    "id" varchar PRIMARY KEY NOT NULL,
    "name" varchar,
    "price" varchar,
    "description" varchar
  );

  CREATE TABLE IF NOT EXISTS "services" (
    "id" serial PRIMARY KEY NOT NULL,
    "key" varchar NOT NULL,
    "slug" varchar NOT NULL,
    "has_tariffs" boolean DEFAULT false,
    "updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
    "created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );

  CREATE TABLE IF NOT EXISTS "services_locales" (
    "title" varchar NOT NULL,
    "description" varchar,
    "meta_title" varchar,
    "meta_description" varchar,
    "og_image_id" integer,
    "id" serial PRIMARY KEY NOT NULL,
    "_locale" "_locales" NOT NULL,
    "_parent_id" integer NOT NULL
  );

  CREATE TABLE IF NOT EXISTS "courses_topics" (
    "_order" integer NOT NULL,
    "_parent_id" integer NOT NULL,
    "_locale" "_locales" NOT NULL,
    "id" varchar PRIMARY KEY NOT NULL,
    "topic" varchar
  );

  CREATE TABLE IF NOT EXISTS "courses_program_sections_content" (
    "_order" integer NOT NULL,
    "_parent_id" varchar NOT NULL,
    "_locale" "_locales" NOT NULL,
    "id" varchar PRIMARY KEY NOT NULL,
    "item" varchar
  );

  CREATE TABLE IF NOT EXISTS "courses_program_sections" (
    "_order" integer NOT NULL,
    "_parent_id" integer NOT NULL,
    "_locale" "_locales" NOT NULL,
    "id" varchar PRIMARY KEY NOT NULL,
    "title" varchar NOT NULL
  );

  CREATE TABLE IF NOT EXISTS "courses" (
    "id" serial PRIMARY KEY NOT NULL,
    "key" varchar NOT NULL,
    "slug" varchar NOT NULL,
    "order" numeric DEFAULT 0,
    "updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
    "created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );

  CREATE TABLE IF NOT EXISTS "courses_locales" (
    "title" varchar NOT NULL,
    "duration" varchar,
    "price" varchar,
    "meta_title" varchar,
    "meta_description" varchar,
    "og_image_id" integer,
    "id" serial PRIMARY KEY NOT NULL,
    "_locale" "_locales" NOT NULL,
    "_parent_id" integer NOT NULL
  );

  CREATE TABLE IF NOT EXISTS "pages" (
    "id" serial PRIMARY KEY NOT NULL,
    "slug" varchar NOT NULL,
    "show_in_nav" boolean DEFAULT false,
    "nav_order" numeric DEFAULT 0,
    "updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
    "created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );

  CREATE TABLE IF NOT EXISTS "pages_locales" (
    "title" varchar NOT NULL,
    "meta_title" varchar,
    "meta_description" varchar,
    "og_image_id" integer,
    "id" serial PRIMARY KEY NOT NULL,
    "_locale" "_locales" NOT NULL,
    "_parent_id" integer NOT NULL
  );

  CREATE TABLE IF NOT EXISTS "payload_kv" (
    "id" serial PRIMARY KEY NOT NULL,
    "key" varchar NOT NULL,
    "data" jsonb NOT NULL
  );

  CREATE TABLE IF NOT EXISTS "payload_locked_documents" (
    "id" serial PRIMARY KEY NOT NULL,
    "global_slug" varchar,
    "updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
    "created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );

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

  CREATE TABLE IF NOT EXISTS "payload_locked_documents_rels" (
    "id" serial PRIMARY KEY NOT NULL,
    "order" integer,
    "parent_id" integer NOT NULL,
    "path" varchar NOT NULL,
    "users_id" integer,
    "media_id" integer,
    "services_id" integer,
    "courses_id" integer,
    "pages_id" integer,
    "knowledge_base_id" integer
  );

  CREATE TABLE IF NOT EXISTS "payload_preferences" (
    "id" serial PRIMARY KEY NOT NULL,
    "key" varchar,
    "value" jsonb,
    "updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
    "created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );

  CREATE TABLE IF NOT EXISTS "payload_preferences_rels" (
    "id" serial PRIMARY KEY NOT NULL,
    "order" integer,
    "parent_id" integer NOT NULL,
    "path" varchar NOT NULL,
    "users_id" integer
  );

  CREATE TABLE IF NOT EXISTS "payload_migrations" (
    "id" serial PRIMARY KEY NOT NULL,
    "name" varchar,
    "batch" numeric,
    "updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
    "created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );

  CREATE TABLE IF NOT EXISTS "site_settings" (
    "id" serial PRIMARY KEY NOT NULL,
    "hero_background_id" integer,
    "header_logo_id" integer,
    "robots_index" boolean DEFAULT true,
    "robots_follow" boolean DEFAULT true,
    "updated_at" timestamp(3) with time zone,
    "created_at" timestamp(3) with time zone
  );

  CREATE TABLE IF NOT EXISTS "site_settings_locales" (
    "hero_title" varchar NOT NULL,
    "hero_subtitle" varchar,
    "hero_cta" varchar,
    "description_title" varchar,
    "description_text" varchar,
    "header_logo_text" varchar,
    "nav_home" varchar,
    "nav_services" varchar,
    "nav_training" varchar,
    "nav_contacts" varchar,
    "nav_tariffs" varchar,
    "nav_knowledge" varchar,
    "nav_about" varchar,
    "contact_phone" varchar,
    "contact_email" varchar,
    "contact_address" varchar,
    "contact_working_hours" varchar,
    "contact_unp" varchar,
    "footer_title" varchar,
    "footer_description" varchar,
    "footer_copyright" varchar,
    "footer_quick_links_title" varchar,
    "meta_title" varchar,
    "meta_description" varchar,
    "meta_keywords" varchar,
    "og_image_id" integer,
    "common_more" varchar,
    "common_tariffs" varchar,
    "common_register" varchar,
    "common_send_request" varchar,
    "common_course_program" varchar,
    "common_home" varchar,
    "common_services" varchar,
    "common_training" varchar,
    "common_contacts" varchar,
    "common_contact_us" varchar,
    "common_phone" varchar,
    "common_email" varchar,
    "common_address" varchar,
    "common_working_hours" varchar,
    "common_name" varchar,
    "common_message" varchar,
    "common_select_course" varchar,
    "common_disclaimer" varchar,
    "common_phone_error" varchar,
    "common_success" varchar,
    "common_error" varchar,
    "common_sending" varchar,
    "common_security_check" varchar,
    "common_security_error" varchar,
    "common_unp" varchar,
    "common_view_all_services" varchar,
    "common_order_call" varchar,
    "common_get_consultation" varchar,
    "validation_name_required" varchar,
    "validation_message_required" varchar,
    "validation_email_invalid" varchar,
    "services_title" varchar,
    "services_subtitle" varchar,
    "back_to_services" varchar,
    "back_to_service" varchar,
    "not_found_title" varchar,
    "not_found_description" varchar,
    "training_subtitle" varchar,
    "course_details" varchar,
    "registration_title" varchar,
    "back_to_courses" varchar,
    "in_development" varchar,
    "course_program_title" varchar,
    "contacts_subtitle" varchar,
    "contact_info_title" varchar,
    "form_title" varchar,
    "phone_placeholder" varchar,
    "id" serial PRIMARY KEY NOT NULL,
    "_locale" "_locales" NOT NULL,
    "_parent_id" integer NOT NULL
  );

  CREATE TABLE IF NOT EXISTS "contacts" (
    "id" serial PRIMARY KEY NOT NULL,
    "updated_at" timestamp(3) with time zone,
    "created_at" timestamp(3) with time zone
  );

  CREATE TABLE IF NOT EXISTS "contacts_locales" (
    "contact_phone" varchar,
    "contact_email" varchar,
    "contact_address" varchar,
    "contact_working_hours" varchar,
    "contact_unp" varchar,
    "contacts_title" varchar,
    "contacts_subtitle" varchar,
    "contact_info_title" varchar,
    "form_title" varchar,
    "phone_placeholder" varchar,
    "id" serial PRIMARY KEY NOT NULL,
    "_locale" "_locales" NOT NULL,
    "_parent_id" integer NOT NULL
  );

  CREATE TABLE IF NOT EXISTS "pages_blocks_hero" (
    "_order" integer NOT NULL,
    "_parent_id" integer NOT NULL,
    "_path" text NOT NULL,
    "_locale" "_locales" NOT NULL,
    "id" varchar PRIMARY KEY NOT NULL,
    "title" varchar NOT NULL,
    "subtitle" varchar,
    "cta" varchar,
    "cta_link" varchar DEFAULT '/services',
    "secondary_cta" varchar,
    "secondary_cta_link" varchar DEFAULT '/training',
    "background_id" integer,
    "block_name" varchar,
    "badge" varchar
  );

  CREATE TABLE IF NOT EXISTS "pages_blocks_section" (
    "_order" integer NOT NULL,
    "_parent_id" integer NOT NULL,
    "_path" text NOT NULL,
    "_locale" "_locales" NOT NULL,
    "id" varchar PRIMARY KEY NOT NULL,
    "title" varchar NOT NULL,
    "subtitle" varchar,
    "block_name" varchar
  );

  CREATE TABLE IF NOT EXISTS "pages_blocks_rich_text" (
    "_order" integer NOT NULL,
    "_parent_id" integer NOT NULL,
    "_path" text NOT NULL,
    "_locale" "_locales" NOT NULL,
    "id" varchar PRIMARY KEY NOT NULL,
    "content" jsonb,
    "block_name" varchar
  );

  CREATE TABLE IF NOT EXISTS "pages_blocks_service_list" (
    "_order" integer NOT NULL,
    "_parent_id" integer NOT NULL,
    "_path" text NOT NULL,
    "_locale" "_locales" NOT NULL,
    "id" varchar PRIMARY KEY NOT NULL,
    "limit" numeric DEFAULT 0,
    "block_name" varchar,
    "section_tag" varchar,
    "section_title" varchar,
    "section_subtitle" varchar
  );

  CREATE TABLE IF NOT EXISTS "pages_blocks_course_list" (
    "_order" integer NOT NULL,
    "_parent_id" integer NOT NULL,
    "_path" text NOT NULL,
    "_locale" "_locales" NOT NULL,
    "id" varchar PRIMARY KEY NOT NULL,
    "block_name" varchar,
    "section_tag" varchar,
    "section_title" varchar,
    "section_subtitle" varchar
  );

  CREATE TABLE IF NOT EXISTS "pages_blocks_contact_form" (
    "_order" integer NOT NULL,
    "_parent_id" integer NOT NULL,
    "_path" text NOT NULL,
    "_locale" "_locales" NOT NULL,
    "id" varchar PRIMARY KEY NOT NULL,
    "title" varchar,
    "block_name" varchar,
    "name_label" varchar,
    "email_label" varchar,
    "phone_label" varchar,
    "message_label" varchar,
    "submit_label" varchar,
    "phone_placeholder" varchar,
    "phone_error" varchar,
    "success_message" varchar,
    "error_message" varchar,
    "sending_message" varchar,
    "security_check" varchar,
    "security_error" varchar,
    "validation_name_required" varchar,
    "validation_message_required" varchar,
    "validation_email_invalid" varchar
  );

  CREATE TABLE IF NOT EXISTS "pages_blocks_contact_info" (
    "_order" integer NOT NULL,
    "_parent_id" integer NOT NULL,
    "_path" text NOT NULL,
    "_locale" "_locales" NOT NULL,
    "id" varchar PRIMARY KEY NOT NULL,
    "block_name" varchar,
    "contact_phone" varchar,
    "contact_email" varchar,
    "contact_address" varchar,
    "contact_working_hours" varchar,
    "contact_unp" varchar,
    "section_tag" varchar,
    "section_title" varchar,
    "section_description" varchar
  );

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

  CREATE TABLE IF NOT EXISTS "pages_blocks_badge_items" (
    "_order" integer NOT NULL,
    "_parent_id" varchar NOT NULL,
    "_locale" "_locales" NOT NULL,
    "id" varchar PRIMARY KEY NOT NULL,
    "text" varchar NOT NULL
  );

  CREATE TABLE IF NOT EXISTS "pages_blocks_badge" (
    "_order" integer NOT NULL,
    "_parent_id" integer NOT NULL,
    "_path" text NOT NULL,
    "_locale" "_locales" NOT NULL,
    "id" varchar PRIMARY KEY NOT NULL,
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

  CREATE TABLE IF NOT EXISTS "pages_blocks_principles" (
    "_order" integer NOT NULL,
    "_parent_id" integer NOT NULL,
    "_path" text NOT NULL,
    "_locale" "_locales" NOT NULL,
    "id" varchar PRIMARY KEY NOT NULL,
    "section_title" varchar NOT NULL,
    "section_tag" varchar,
    "block_name" varchar
  );

  CREATE TABLE IF NOT EXISTS "pages_blocks_consultation_form" (
    "_order" integer NOT NULL,
    "_parent_id" integer NOT NULL,
    "_path" text NOT NULL,
    "_locale" "_locales" NOT NULL,
    "id" varchar PRIMARY KEY NOT NULL,
    "block_name" varchar
  );

  CREATE TABLE IF NOT EXISTS "pages_blocks_advantages" (
    "_order" integer NOT NULL,
    "_parent_id" integer NOT NULL,
    "_path" text NOT NULL,
    "_locale" "_locales" NOT NULL,
    "id" varchar PRIMARY KEY NOT NULL,
    "cta_text" varchar,
    "block_name" varchar,
    "tag" varchar,
    "title" varchar,
    "description" varchar
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

  CREATE TABLE IF NOT EXISTS "pages_blocks_pricing" (
    "_order" integer NOT NULL,
    "_parent_id" integer NOT NULL,
    "_path" text NOT NULL,
    "_locale" "_locales" NOT NULL,
    "id" varchar PRIMARY KEY NOT NULL,
    "block_name" varchar,
    "section_tag" varchar,
    "section_title" varchar,
    "section_description" varchar
  );

  CREATE TABLE IF NOT EXISTS "pages_blocks_pricing_locales" (
    "section_title" varchar,
    "section_description" varchar,
    "section_tag" varchar,
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
    "_locale" "_locales" NOT NULL,
    "id" varchar PRIMARY KEY NOT NULL,
    "text" varchar NOT NULL
  );

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

  ALTER TABLE "courses" ADD COLUMN IF NOT EXISTS "order" numeric DEFAULT 0;
  ALTER TABLE "pages" ADD COLUMN IF NOT EXISTS "show_in_nav" boolean DEFAULT false;
  ALTER TABLE "pages" ADD COLUMN IF NOT EXISTS "nav_order" numeric DEFAULT 0;
  ALTER TABLE "pages_locales" ADD COLUMN IF NOT EXISTS "meta_title" varchar;
  ALTER TABLE "pages_locales" ADD COLUMN IF NOT EXISTS "meta_description" varchar;
  ALTER TABLE "pages_locales" ADD COLUMN IF NOT EXISTS "og_image_id" integer;
  ALTER TABLE "site_settings" ADD COLUMN IF NOT EXISTS "robots_index" boolean DEFAULT true;
  ALTER TABLE "site_settings" ADD COLUMN IF NOT EXISTS "robots_follow" boolean DEFAULT true;
  ALTER TABLE "site_settings_locales" ADD COLUMN IF NOT EXISTS "meta_title" varchar;
  ALTER TABLE "site_settings_locales" ADD COLUMN IF NOT EXISTS "meta_description" varchar;
  ALTER TABLE "site_settings_locales" ADD COLUMN IF NOT EXISTS "meta_keywords" varchar;
  ALTER TABLE "site_settings_locales" ADD COLUMN IF NOT EXISTS "og_image_id" integer;
  ALTER TABLE "site_settings_locales" ADD COLUMN IF NOT EXISTS "footer_quick_links_title" varchar;
  ALTER TABLE "site_settings_locales" ADD COLUMN IF NOT EXISTS "nav_tariffs" varchar;
  ALTER TABLE "site_settings_locales" ADD COLUMN IF NOT EXISTS "nav_knowledge" varchar;
  ALTER TABLE "site_settings_locales" ADD COLUMN IF NOT EXISTS "nav_about" varchar;
  ALTER TABLE "site_settings_locales" ADD COLUMN IF NOT EXISTS "common_view_all_services" varchar;
  ALTER TABLE "site_settings_locales" ADD COLUMN IF NOT EXISTS "common_order_call" varchar;
  ALTER TABLE "site_settings_locales" ADD COLUMN IF NOT EXISTS "common_get_consultation" varchar;
  ALTER TABLE "services_locales" ADD COLUMN IF NOT EXISTS "meta_title" varchar;
  ALTER TABLE "services_locales" ADD COLUMN IF NOT EXISTS "meta_description" varchar;
  ALTER TABLE "services_locales" ADD COLUMN IF NOT EXISTS "og_image_id" integer;
  ALTER TABLE "courses_locales" ADD COLUMN IF NOT EXISTS "meta_title" varchar;
  ALTER TABLE "courses_locales" ADD COLUMN IF NOT EXISTS "meta_description" varchar;
  ALTER TABLE "courses_locales" ADD COLUMN IF NOT EXISTS "og_image_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN IF NOT EXISTS "knowledge_base_id" integer;
  ALTER TABLE "pages_blocks_hero" ADD COLUMN IF NOT EXISTS "badge" varchar;
  ALTER TABLE "pages_blocks_service_list" ADD COLUMN IF NOT EXISTS "section_tag" varchar;
  ALTER TABLE "pages_blocks_service_list" ADD COLUMN IF NOT EXISTS "section_title" varchar;
  ALTER TABLE "pages_blocks_service_list" ADD COLUMN IF NOT EXISTS "section_subtitle" varchar;
  ALTER TABLE "pages_blocks_course_list" ADD COLUMN IF NOT EXISTS "section_tag" varchar;
  ALTER TABLE "pages_blocks_course_list" ADD COLUMN IF NOT EXISTS "section_title" varchar;
  ALTER TABLE "pages_blocks_course_list" ADD COLUMN IF NOT EXISTS "section_subtitle" varchar;
  ALTER TABLE "pages_blocks_contact_info" ADD COLUMN IF NOT EXISTS "contact_phone" varchar;
  ALTER TABLE "pages_blocks_contact_info" ADD COLUMN IF NOT EXISTS "contact_email" varchar;
  ALTER TABLE "pages_blocks_contact_info" ADD COLUMN IF NOT EXISTS "contact_address" varchar;
  ALTER TABLE "pages_blocks_contact_info" ADD COLUMN IF NOT EXISTS "contact_working_hours" varchar;
  ALTER TABLE "pages_blocks_contact_info" ADD COLUMN IF NOT EXISTS "contact_unp" varchar;
  ALTER TABLE "pages_blocks_contact_info" ADD COLUMN IF NOT EXISTS "section_tag" varchar;
  ALTER TABLE "pages_blocks_contact_info" ADD COLUMN IF NOT EXISTS "section_title" varchar;
  ALTER TABLE "pages_blocks_contact_info" ADD COLUMN IF NOT EXISTS "section_description" varchar;
  ALTER TABLE "pages_blocks_contact_form" ADD COLUMN IF NOT EXISTS "name_label" varchar;
  ALTER TABLE "pages_blocks_contact_form" ADD COLUMN IF NOT EXISTS "email_label" varchar;
  ALTER TABLE "pages_blocks_contact_form" ADD COLUMN IF NOT EXISTS "phone_label" varchar;
  ALTER TABLE "pages_blocks_contact_form" ADD COLUMN IF NOT EXISTS "message_label" varchar;
  ALTER TABLE "pages_blocks_contact_form" ADD COLUMN IF NOT EXISTS "submit_label" varchar;
  ALTER TABLE "pages_blocks_contact_form" ADD COLUMN IF NOT EXISTS "phone_placeholder" varchar;
  ALTER TABLE "pages_blocks_contact_form" ADD COLUMN IF NOT EXISTS "phone_error" varchar;
  ALTER TABLE "pages_blocks_contact_form" ADD COLUMN IF NOT EXISTS "success_message" varchar;
  ALTER TABLE "pages_blocks_contact_form" ADD COLUMN IF NOT EXISTS "error_message" varchar;
  ALTER TABLE "pages_blocks_contact_form" ADD COLUMN IF NOT EXISTS "sending_message" varchar;
  ALTER TABLE "pages_blocks_contact_form" ADD COLUMN IF NOT EXISTS "security_check" varchar;
  ALTER TABLE "pages_blocks_contact_form" ADD COLUMN IF NOT EXISTS "security_error" varchar;
  ALTER TABLE "pages_blocks_contact_form" ADD COLUMN IF NOT EXISTS "validation_name_required" varchar;
  ALTER TABLE "pages_blocks_contact_form" ADD COLUMN IF NOT EXISTS "validation_message_required" varchar;
  ALTER TABLE "pages_blocks_contact_form" ADD COLUMN IF NOT EXISTS "validation_email_invalid" varchar;
  ALTER TABLE "pages_blocks_principles" ADD COLUMN IF NOT EXISTS "section_tag" varchar;
  ALTER TABLE "pages_blocks_advantages" ADD COLUMN IF NOT EXISTS "tag" varchar;
  ALTER TABLE "pages_blocks_advantages" ADD COLUMN IF NOT EXISTS "title" varchar;
  ALTER TABLE "pages_blocks_advantages" ADD COLUMN IF NOT EXISTS "description" varchar;
  ALTER TABLE "pages_blocks_pricing" ADD COLUMN IF NOT EXISTS "section_tag" varchar;
  ALTER TABLE "pages_blocks_pricing" ADD COLUMN IF NOT EXISTS "section_title" varchar;
  ALTER TABLE "pages_blocks_pricing" ADD COLUMN IF NOT EXISTS "section_description" varchar;
  ALTER TABLE "pages_blocks_pricing_locales" ADD COLUMN IF NOT EXISTS "section_tag" varchar;
  `)

  await db.execute(sql`
  DO $$ BEGIN
    ALTER TABLE "users_sessions" ADD CONSTRAINT "users_sessions_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION WHEN duplicate_object THEN NULL; END $$;
  DO $$ BEGIN
    ALTER TABLE "media_locales" ADD CONSTRAINT "media_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION WHEN duplicate_object THEN NULL; END $$;
  DO $$ BEGIN
    ALTER TABLE "services_content" ADD CONSTRAINT "services_content_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION WHEN duplicate_object THEN NULL; END $$;
  DO $$ BEGIN
    ALTER TABLE "services_tariff_items_features" ADD CONSTRAINT "services_tariff_items_features_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services_tariff_items"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION WHEN duplicate_object THEN NULL; END $$;
  DO $$ BEGIN
    ALTER TABLE "services_tariff_items" ADD CONSTRAINT "services_tariff_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION WHEN duplicate_object THEN NULL; END $$;
  DO $$ BEGIN
    ALTER TABLE "services_locales" ADD CONSTRAINT "services_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION WHEN duplicate_object THEN NULL; END $$;
  DO $$ BEGIN
    ALTER TABLE "services_locales" ADD CONSTRAINT "services_locales_og_image_id_media_id_fk" FOREIGN KEY ("og_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION WHEN duplicate_object THEN NULL; END $$;
  DO $$ BEGIN
    ALTER TABLE "courses_topics" ADD CONSTRAINT "courses_topics_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."courses"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION WHEN duplicate_object THEN NULL; END $$;
  DO $$ BEGIN
    ALTER TABLE "courses_program_sections_content" ADD CONSTRAINT "courses_program_sections_content_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."courses_program_sections"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION WHEN duplicate_object THEN NULL; END $$;
  DO $$ BEGIN
    ALTER TABLE "courses_program_sections" ADD CONSTRAINT "courses_program_sections_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."courses"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION WHEN duplicate_object THEN NULL; END $$;
  DO $$ BEGIN
    ALTER TABLE "courses_locales" ADD CONSTRAINT "courses_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."courses"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION WHEN duplicate_object THEN NULL; END $$;
  DO $$ BEGIN
    ALTER TABLE "courses_locales" ADD CONSTRAINT "courses_locales_og_image_id_media_id_fk" FOREIGN KEY ("og_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION WHEN duplicate_object THEN NULL; END $$;
  DO $$ BEGIN
    ALTER TABLE "pages_locales" ADD CONSTRAINT "pages_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION WHEN duplicate_object THEN NULL; END $$;
  DO $$ BEGIN
    ALTER TABLE "pages_locales" ADD CONSTRAINT "pages_locales_og_image_id_media_id_fk" FOREIGN KEY ("og_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION WHEN duplicate_object THEN NULL; END $$;
  DO $$ BEGIN
    ALTER TABLE "knowledge_base_locales" ADD CONSTRAINT "knowledge_base_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."knowledge_base"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION WHEN duplicate_object THEN NULL; END $$;
  DO $$ BEGIN
    ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_locked_documents"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION WHEN duplicate_object THEN NULL; END $$;
  DO $$ BEGIN
    ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION WHEN duplicate_object THEN NULL; END $$;
  DO $$ BEGIN
    ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION WHEN duplicate_object THEN NULL; END $$;
  DO $$ BEGIN
    ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_services_fk" FOREIGN KEY ("services_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION WHEN duplicate_object THEN NULL; END $$;
  DO $$ BEGIN
    ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_courses_fk" FOREIGN KEY ("courses_id") REFERENCES "public"."courses"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION WHEN duplicate_object THEN NULL; END $$;
  DO $$ BEGIN
    ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_pages_fk" FOREIGN KEY ("pages_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION WHEN duplicate_object THEN NULL; END $$;
  DO $$ BEGIN
    ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_knowledge_base_fk" FOREIGN KEY ("knowledge_base_id") REFERENCES "public"."knowledge_base"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION WHEN duplicate_object THEN NULL; END $$;
  DO $$ BEGIN
    ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_preferences"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION WHEN duplicate_object THEN NULL; END $$;
  DO $$ BEGIN
    ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION WHEN duplicate_object THEN NULL; END $$;
  DO $$ BEGIN
    ALTER TABLE "site_settings" ADD CONSTRAINT "site_settings_hero_background_id_media_id_fk" FOREIGN KEY ("hero_background_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION WHEN duplicate_object THEN NULL; END $$;
  DO $$ BEGIN
    ALTER TABLE "site_settings" ADD CONSTRAINT "site_settings_header_logo_id_media_id_fk" FOREIGN KEY ("header_logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION WHEN duplicate_object THEN NULL; END $$;
  DO $$ BEGIN
    ALTER TABLE "site_settings_locales" ADD CONSTRAINT "site_settings_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."site_settings"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION WHEN duplicate_object THEN NULL; END $$;
  DO $$ BEGIN
    ALTER TABLE "site_settings_locales" ADD CONSTRAINT "site_settings_locales_og_image_id_media_id_fk" FOREIGN KEY ("og_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION WHEN duplicate_object THEN NULL; END $$;
  DO $$ BEGIN
    ALTER TABLE "contacts_locales" ADD CONSTRAINT "contacts_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."contacts"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION WHEN duplicate_object THEN NULL; END $$;
  DO $$ BEGIN
    ALTER TABLE "pages_blocks_hero" ADD CONSTRAINT "pages_blocks_hero_background_id_media_id_fk" FOREIGN KEY ("background_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION WHEN duplicate_object THEN NULL; END $$;
  DO $$ BEGIN
    ALTER TABLE "pages_blocks_hero" ADD CONSTRAINT "pages_blocks_hero_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION WHEN duplicate_object THEN NULL; END $$;
  DO $$ BEGIN
    ALTER TABLE "pages_blocks_section" ADD CONSTRAINT "pages_blocks_section_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION WHEN duplicate_object THEN NULL; END $$;
  DO $$ BEGIN
    ALTER TABLE "pages_blocks_rich_text" ADD CONSTRAINT "pages_blocks_rich_text_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION WHEN duplicate_object THEN NULL; END $$;
  DO $$ BEGIN
    ALTER TABLE "pages_blocks_service_list" ADD CONSTRAINT "pages_blocks_service_list_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION WHEN duplicate_object THEN NULL; END $$;
  DO $$ BEGIN
    ALTER TABLE "pages_blocks_course_list" ADD CONSTRAINT "pages_blocks_course_list_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION WHEN duplicate_object THEN NULL; END $$;
  DO $$ BEGIN
    ALTER TABLE "pages_blocks_contact_form" ADD CONSTRAINT "pages_blocks_contact_form_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION WHEN duplicate_object THEN NULL; END $$;
  DO $$ BEGIN
    ALTER TABLE "pages_blocks_contact_info" ADD CONSTRAINT "pages_blocks_contact_info_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION WHEN duplicate_object THEN NULL; END $$;
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
  DO $$ BEGIN
    ALTER TABLE "pages_blocks_advantages" ADD CONSTRAINT "pages_blocks_advantages_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION WHEN duplicate_object THEN NULL; END $$;
  DO $$ BEGIN
    ALTER TABLE "pages_blocks_advantages_locales" ADD CONSTRAINT "pages_blocks_advantages_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_advantages"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION WHEN duplicate_object THEN NULL; END $$;
  DO $$ BEGIN
    ALTER TABLE "pages_blocks_advantages_items" ADD CONSTRAINT "pages_blocks_advantages_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_advantages"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION WHEN duplicate_object THEN NULL; END $$;
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
  DO $$ BEGIN
    ALTER TABLE "pages_blocks_faq" ADD CONSTRAINT "pages_blocks_faq_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION WHEN duplicate_object THEN NULL; END $$;
  DO $$ BEGIN
    ALTER TABLE "pages_blocks_faq_locales" ADD CONSTRAINT "pages_blocks_faq_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_faq"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION WHEN duplicate_object THEN NULL; END $$;
  DO $$ BEGIN
    ALTER TABLE "pages_blocks_faq_items" ADD CONSTRAINT "pages_blocks_faq_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_faq"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION WHEN duplicate_object THEN NULL; END $$;
  DO $$ BEGIN
    ALTER TABLE "pages_blocks_stats" ADD CONSTRAINT "pages_blocks_stats_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION WHEN duplicate_object THEN NULL; END $$;
  DO $$ BEGIN
    ALTER TABLE "pages_blocks_stats_items" ADD CONSTRAINT "pages_blocks_stats_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_stats"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION WHEN duplicate_object THEN NULL; END $$;
  `)

  await db.execute(sql`
  CREATE INDEX IF NOT EXISTS "users_sessions_order_idx" ON "users_sessions" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "users_sessions_parent_id_idx" ON "users_sessions" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "users_updated_at_idx" ON "users" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "users_created_at_idx" ON "users" USING btree ("created_at");
  CREATE UNIQUE INDEX IF NOT EXISTS "users_email_idx" ON "users" USING btree ("email");
  CREATE INDEX IF NOT EXISTS "media_updated_at_idx" ON "media" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "media_created_at_idx" ON "media" USING btree ("created_at");
  CREATE UNIQUE INDEX IF NOT EXISTS "media_filename_idx" ON "media" USING btree ("filename");
  CREATE UNIQUE INDEX IF NOT EXISTS "media_locales_locale_parent_id_unique" ON "media_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX IF NOT EXISTS "services_content_order_idx" ON "services_content" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "services_content_parent_id_idx" ON "services_content" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "services_content_locale_idx" ON "services_content" USING btree ("_locale");
  CREATE INDEX IF NOT EXISTS "services_tariff_items_features_order_idx" ON "services_tariff_items_features" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "services_tariff_items_features_parent_id_idx" ON "services_tariff_items_features" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "services_tariff_items_features_locale_idx" ON "services_tariff_items_features" USING btree ("_locale");
  CREATE INDEX IF NOT EXISTS "services_tariff_items_order_idx" ON "services_tariff_items" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "services_tariff_items_parent_id_idx" ON "services_tariff_items" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "services_tariff_items_locale_idx" ON "services_tariff_items" USING btree ("_locale");
  CREATE UNIQUE INDEX IF NOT EXISTS "services_key_idx" ON "services" USING btree ("key");
  CREATE INDEX IF NOT EXISTS "services_updated_at_idx" ON "services" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "services_created_at_idx" ON "services" USING btree ("created_at");
  CREATE UNIQUE INDEX IF NOT EXISTS "services_locales_locale_parent_id_unique" ON "services_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX IF NOT EXISTS "services_og_image_idx" ON "services_locales" USING btree ("og_image_id","_locale");
  CREATE INDEX IF NOT EXISTS "courses_topics_order_idx" ON "courses_topics" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "courses_topics_parent_id_idx" ON "courses_topics" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "courses_topics_locale_idx" ON "courses_topics" USING btree ("_locale");
  CREATE INDEX IF NOT EXISTS "courses_program_sections_content_order_idx" ON "courses_program_sections_content" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "courses_program_sections_content_parent_id_idx" ON "courses_program_sections_content" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "courses_program_sections_content_locale_idx" ON "courses_program_sections_content" USING btree ("_locale");
  CREATE INDEX IF NOT EXISTS "courses_program_sections_order_idx" ON "courses_program_sections" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "courses_program_sections_parent_id_idx" ON "courses_program_sections" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "courses_program_sections_locale_idx" ON "courses_program_sections" USING btree ("_locale");
  CREATE UNIQUE INDEX IF NOT EXISTS "courses_key_idx" ON "courses" USING btree ("key");
  CREATE INDEX IF NOT EXISTS "courses_updated_at_idx" ON "courses" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "courses_created_at_idx" ON "courses" USING btree ("created_at");
  CREATE UNIQUE INDEX IF NOT EXISTS "courses_locales_locale_parent_id_unique" ON "courses_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX IF NOT EXISTS "courses_og_image_idx" ON "courses_locales" USING btree ("og_image_id","_locale");
  CREATE UNIQUE INDEX IF NOT EXISTS "pages_slug_idx" ON "pages" USING btree ("slug");
  CREATE INDEX IF NOT EXISTS "pages_updated_at_idx" ON "pages" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "pages_created_at_idx" ON "pages" USING btree ("created_at");
  CREATE UNIQUE INDEX IF NOT EXISTS "pages_locales_locale_parent_id_unique" ON "pages_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_og_image_idx" ON "pages_locales" USING btree ("og_image_id","_locale");
  CREATE UNIQUE INDEX IF NOT EXISTS "payload_kv_key_idx" ON "payload_kv" USING btree ("key");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_global_slug_idx" ON "payload_locked_documents" USING btree ("global_slug");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_updated_at_idx" ON "payload_locked_documents" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_created_at_idx" ON "payload_locked_documents" USING btree ("created_at");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_order_idx" ON "payload_locked_documents_rels" USING btree ("order");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_parent_idx" ON "payload_locked_documents_rels" USING btree ("parent_id");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_path_idx" ON "payload_locked_documents_rels" USING btree ("path");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_users_id_idx" ON "payload_locked_documents_rels" USING btree ("users_id");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_media_id_idx" ON "payload_locked_documents_rels" USING btree ("media_id");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_services_id_idx" ON "payload_locked_documents_rels" USING btree ("services_id");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_courses_id_idx" ON "payload_locked_documents_rels" USING btree ("courses_id");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_pages_id_idx" ON "payload_locked_documents_rels" USING btree ("pages_id");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_knowledge_base_id_idx" ON "payload_locked_documents_rels" USING btree ("knowledge_base_id");
  CREATE INDEX IF NOT EXISTS "payload_preferences_key_idx" ON "payload_preferences" USING btree ("key");
  CREATE INDEX IF NOT EXISTS "payload_preferences_updated_at_idx" ON "payload_preferences" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "payload_preferences_created_at_idx" ON "payload_preferences" USING btree ("created_at");
  CREATE INDEX IF NOT EXISTS "payload_preferences_rels_order_idx" ON "payload_preferences_rels" USING btree ("order");
  CREATE INDEX IF NOT EXISTS "payload_preferences_rels_parent_idx" ON "payload_preferences_rels" USING btree ("parent_id");
  CREATE INDEX IF NOT EXISTS "payload_preferences_rels_path_idx" ON "payload_preferences_rels" USING btree ("path");
  CREATE INDEX IF NOT EXISTS "payload_preferences_rels_users_id_idx" ON "payload_preferences_rels" USING btree ("users_id");
  CREATE INDEX IF NOT EXISTS "payload_migrations_updated_at_idx" ON "payload_migrations" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "payload_migrations_created_at_idx" ON "payload_migrations" USING btree ("created_at");
  CREATE INDEX IF NOT EXISTS "site_settings_hero_background_idx" ON "site_settings" USING btree ("hero_background_id");
  CREATE INDEX IF NOT EXISTS "site_settings_header_logo_idx" ON "site_settings" USING btree ("header_logo_id");
  CREATE UNIQUE INDEX IF NOT EXISTS "site_settings_locales_locale_parent_id_unique" ON "site_settings_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX IF NOT EXISTS "site_settings_og_image_idx" ON "site_settings_locales" USING btree ("og_image_id","_locale");
  CREATE UNIQUE INDEX IF NOT EXISTS "contacts_locales_locale_parent_id_unique" ON "contacts_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX IF NOT EXISTS "knowledge_base_slug_idx" ON "knowledge_base" USING btree ("slug");
  CREATE INDEX IF NOT EXISTS "knowledge_base_is_featured_idx" ON "knowledge_base" USING btree ("is_featured");
  CREATE INDEX IF NOT EXISTS "knowledge_base_created_at_idx" ON "knowledge_base" USING btree ("created_at");
  CREATE UNIQUE INDEX IF NOT EXISTS "knowledge_base_locales_locale_parent_id_unique" ON "knowledge_base_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_hero_order_idx" ON "pages_blocks_hero" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_blocks_hero_parent_id_idx" ON "pages_blocks_hero" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_hero_path_idx" ON "pages_blocks_hero" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "pages_blocks_hero_locale_idx" ON "pages_blocks_hero" USING btree ("_locale");
  CREATE INDEX IF NOT EXISTS "pages_blocks_hero_background_idx" ON "pages_blocks_hero" USING btree ("background_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_section_order_idx" ON "pages_blocks_section" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_blocks_section_parent_id_idx" ON "pages_blocks_section" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_section_path_idx" ON "pages_blocks_section" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "pages_blocks_section_locale_idx" ON "pages_blocks_section" USING btree ("_locale");
  CREATE INDEX IF NOT EXISTS "pages_blocks_rich_text_order_idx" ON "pages_blocks_rich_text" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_blocks_rich_text_parent_id_idx" ON "pages_blocks_rich_text" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_rich_text_path_idx" ON "pages_blocks_rich_text" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "pages_blocks_rich_text_locale_idx" ON "pages_blocks_rich_text" USING btree ("_locale");
  CREATE INDEX IF NOT EXISTS "pages_blocks_service_list_order_idx" ON "pages_blocks_service_list" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_blocks_service_list_parent_id_idx" ON "pages_blocks_service_list" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_service_list_path_idx" ON "pages_blocks_service_list" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "pages_blocks_service_list_locale_idx" ON "pages_blocks_service_list" USING btree ("_locale");
  CREATE INDEX IF NOT EXISTS "pages_blocks_course_list_order_idx" ON "pages_blocks_course_list" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_blocks_course_list_parent_id_idx" ON "pages_blocks_course_list" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_course_list_path_idx" ON "pages_blocks_course_list" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "pages_blocks_course_list_locale_idx" ON "pages_blocks_course_list" USING btree ("_locale");
  CREATE INDEX IF NOT EXISTS "pages_blocks_contact_form_order_idx" ON "pages_blocks_contact_form" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_blocks_contact_form_parent_id_idx" ON "pages_blocks_contact_form" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_contact_form_path_idx" ON "pages_blocks_contact_form" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "pages_blocks_contact_form_locale_idx" ON "pages_blocks_contact_form" USING btree ("_locale");
  CREATE INDEX IF NOT EXISTS "pages_blocks_contact_info_order_idx" ON "pages_blocks_contact_info" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_blocks_contact_info_parent_id_idx" ON "pages_blocks_contact_info" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_contact_info_path_idx" ON "pages_blocks_contact_info" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "pages_blocks_contact_info_locale_idx" ON "pages_blocks_contact_info" USING btree ("_locale");
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
  CREATE INDEX IF NOT EXISTS "pages_blocks_consultation_form_locale_idx" ON "pages_blocks_consultation_form" USING btree ("_locale");
  CREATE INDEX IF NOT EXISTS "pages_blocks_advantages_order_idx" ON "pages_blocks_advantages" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_blocks_advantages_parent_id_idx" ON "pages_blocks_advantages" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_advantages_path_idx" ON "pages_blocks_advantages" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "pages_blocks_advantages_locale_idx" ON "pages_blocks_advantages" USING btree ("_locale");
  CREATE UNIQUE INDEX IF NOT EXISTS "pages_blocks_advantages_locales_locale_parent_id_unique" ON "pages_blocks_advantages_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_advantages_items_order_idx" ON "pages_blocks_advantages_items" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_blocks_advantages_items_parent_id_idx" ON "pages_blocks_advantages_items" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_advantages_items_locale_idx" ON "pages_blocks_advantages_items" USING btree ("_locale");
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
  CREATE INDEX IF NOT EXISTS "pages_blocks_pricing_cards_features_locale_idx" ON "pages_blocks_pricing_cards_features" USING btree ("_locale");
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
  CREATE INDEX IF NOT EXISTS "pages_blocks_faq_order_idx" ON "pages_blocks_faq" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_blocks_faq_parent_id_idx" ON "pages_blocks_faq" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_faq_path_idx" ON "pages_blocks_faq" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "pages_blocks_faq_locale_idx" ON "pages_blocks_faq" USING btree ("_locale");
  CREATE UNIQUE INDEX IF NOT EXISTS "pages_blocks_faq_locales_locale_parent_id_unique" ON "pages_blocks_faq_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_faq_items_order_idx" ON "pages_blocks_faq_items" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_blocks_faq_items_parent_id_idx" ON "pages_blocks_faq_items" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_faq_items_locale_idx" ON "pages_blocks_faq_items" USING btree ("_locale");
  CREATE INDEX IF NOT EXISTS "pages_blocks_stats_order_idx" ON "pages_blocks_stats" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_blocks_stats_parent_id_idx" ON "pages_blocks_stats" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_stats_path_idx" ON "pages_blocks_stats" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "pages_blocks_stats_locale_idx" ON "pages_blocks_stats" USING btree ("_locale");
  CREATE INDEX IF NOT EXISTS "pages_blocks_stats_items_order_idx" ON "pages_blocks_stats_items" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_blocks_stats_items_parent_id_idx" ON "pages_blocks_stats_items" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_stats_items_locale_idx" ON "pages_blocks_stats_items" USING btree ("_locale");
  `)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
  DROP TABLE IF EXISTS "pages_blocks_stats_items" CASCADE;
  DROP TABLE IF EXISTS "pages_blocks_stats" CASCADE;
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
  DROP TABLE IF EXISTS "pages_blocks_consultation_form" CASCADE;
  DROP TABLE IF EXISTS "pages_blocks_principles_items" CASCADE;
  DROP TABLE IF EXISTS "pages_blocks_principles" CASCADE;
  DROP TABLE IF EXISTS "pages_blocks_badge_items" CASCADE;
  DROP TABLE IF EXISTS "pages_blocks_badge" CASCADE;
  DROP TABLE IF EXISTS "pages_blocks_image_text_paragraphs" CASCADE;
  DROP TABLE IF EXISTS "pages_blocks_image_text" CASCADE;
  DROP TABLE IF EXISTS "pages_blocks_seo_paragraphs_paragraphs" CASCADE;
  DROP TABLE IF EXISTS "pages_blocks_seo_paragraphs" CASCADE;
  DROP TABLE IF EXISTS "pages_blocks_contact_info" CASCADE;
  DROP TABLE IF EXISTS "pages_blocks_contact_form" CASCADE;
  DROP TABLE IF EXISTS "pages_blocks_course_list" CASCADE;
  DROP TABLE IF EXISTS "pages_blocks_service_list" CASCADE;
  DROP TABLE IF EXISTS "pages_blocks_rich_text" CASCADE;
  DROP TABLE IF EXISTS "pages_blocks_section" CASCADE;
  DROP TABLE IF EXISTS "pages_blocks_hero" CASCADE;
  DROP TABLE IF EXISTS "contacts_locales" CASCADE;
  DROP TABLE IF EXISTS "contacts" CASCADE;
  DROP TABLE IF EXISTS "site_settings_locales" CASCADE;
  DROP TABLE IF EXISTS "site_settings" CASCADE;
  DROP TABLE IF EXISTS "payload_migrations" CASCADE;
  DROP TABLE IF EXISTS "payload_preferences_rels" CASCADE;
  DROP TABLE IF EXISTS "payload_preferences" CASCADE;
  DROP TABLE IF EXISTS "payload_locked_documents_rels" CASCADE;
  DROP TABLE IF EXISTS "knowledge_base_locales" CASCADE;
  DROP TABLE IF EXISTS "knowledge_base" CASCADE;
  DROP TABLE IF EXISTS "payload_locked_documents" CASCADE;
  DROP TABLE IF EXISTS "payload_kv" CASCADE;
  DROP TABLE IF EXISTS "pages_locales" CASCADE;
  DROP TABLE IF EXISTS "pages" CASCADE;
  DROP TABLE IF EXISTS "courses_locales" CASCADE;
  DROP TABLE IF EXISTS "courses_program_sections" CASCADE;
  DROP TABLE IF EXISTS "courses_program_sections_content" CASCADE;
  DROP TABLE IF EXISTS "courses_topics" CASCADE;
  DROP TABLE IF EXISTS "courses" CASCADE;
  DROP TABLE IF EXISTS "services_locales" CASCADE;
  DROP TABLE IF EXISTS "services_tariff_items" CASCADE;
  DROP TABLE IF EXISTS "services_tariff_items_features" CASCADE;
  DROP TABLE IF EXISTS "services_content" CASCADE;
  DROP TABLE IF EXISTS "services" CASCADE;
  DROP TABLE IF EXISTS "media_locales" CASCADE;
  DROP TABLE IF EXISTS "media" CASCADE;
  DROP TABLE IF EXISTS "users_sessions" CASCADE;
  DROP TABLE IF EXISTS "users" CASCADE;
  DROP TYPE IF EXISTS "public"."_locales";
  `)
}
