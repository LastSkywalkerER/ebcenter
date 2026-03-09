import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
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

  DO $$ BEGIN
    ALTER TABLE "contacts_locales" ADD CONSTRAINT "contacts_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."contacts"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION WHEN duplicate_object THEN NULL; END $$;

  CREATE UNIQUE INDEX IF NOT EXISTS "contacts_locales_locale_parent_id_unique" ON "contacts_locales" USING btree ("_locale","_parent_id");`)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE IF EXISTS "contacts_locales" CASCADE;
  DROP TABLE IF EXISTS "contacts" CASCADE;`)
}
