import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

/**
 * 1) Payload expects _locale on nested arrays inside localized arrays.
 *    pages_blocks_pricing_cards_features must have _locale.
 * 2) Payload expects section_tag, section_title, section_description on the main
 *    pages_blocks_pricing table (like advantages block).
 */
export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
  -- Add _locale to pages_blocks_pricing_cards_features
  ALTER TABLE "pages_blocks_pricing_cards_features" ADD COLUMN IF NOT EXISTS "_locale" "_locales";

  UPDATE "pages_blocks_pricing_cards_features" f
  SET "_locale" = c."_locale"
  FROM "pages_blocks_pricing_cards" c
  WHERE f."_parent_id" = c."id" AND f."_locale" IS NULL;

  UPDATE "pages_blocks_pricing_cards_features"
  SET "_locale" = 'ru'::"_locales"
  WHERE "_locale" IS NULL;

  ALTER TABLE "pages_blocks_pricing_cards_features" ALTER COLUMN "_locale" SET NOT NULL;

  CREATE INDEX IF NOT EXISTS "pages_blocks_pricing_cards_features_locale_idx"
  ON "pages_blocks_pricing_cards_features" USING btree ("_locale");

  -- Add section fields to pages_blocks_pricing (Payload expects them on main table)
  ALTER TABLE "pages_blocks_pricing" ADD COLUMN IF NOT EXISTS "section_tag" varchar;
  ALTER TABLE "pages_blocks_pricing" ADD COLUMN IF NOT EXISTS "section_title" varchar;
  ALTER TABLE "pages_blocks_pricing" ADD COLUMN IF NOT EXISTS "section_description" varchar;
  `)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
  DROP INDEX IF EXISTS "pages_blocks_pricing_cards_features_locale_idx";
  ALTER TABLE "pages_blocks_pricing_cards_features" DROP COLUMN IF EXISTS "_locale";

  ALTER TABLE "pages_blocks_pricing" DROP COLUMN IF EXISTS "section_tag";
  ALTER TABLE "pages_blocks_pricing" DROP COLUMN IF EXISTS "section_title";
  ALTER TABLE "pages_blocks_pricing" DROP COLUMN IF EXISTS "section_description";
  `)
}
