import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

/**
 * Payload expects _locale on nested arrays inside localized arrays.
 * pages_blocks_pricing_cards is localized, so pages_blocks_pricing_cards_features
 * must have _locale to match the parent card's locale.
 */
export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
  -- Add _locale column (nullable first for existing rows)
  ALTER TABLE "pages_blocks_pricing_cards_features" ADD COLUMN IF NOT EXISTS "_locale" "_locales";

  -- Backfill _locale from parent cards
  UPDATE "pages_blocks_pricing_cards_features" f
  SET "_locale" = c."_locale"
  FROM "pages_blocks_pricing_cards" c
  WHERE f."_parent_id" = c."id" AND f."_locale" IS NULL;

  -- Set default for any remaining nulls (e.g. orphaned rows)
  UPDATE "pages_blocks_pricing_cards_features"
  SET "_locale" = 'ru'::"_locales"
  WHERE "_locale" IS NULL;

  -- Make NOT NULL
  ALTER TABLE "pages_blocks_pricing_cards_features" ALTER COLUMN "_locale" SET NOT NULL;

  -- Add index for locale queries
  CREATE INDEX IF NOT EXISTS "pages_blocks_pricing_cards_features_locale_idx"
  ON "pages_blocks_pricing_cards_features" USING btree ("_locale");
  `)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
  DROP INDEX IF EXISTS "pages_blocks_pricing_cards_features_locale_idx";
  ALTER TABLE "pages_blocks_pricing_cards_features" DROP COLUMN IF EXISTS "_locale";
  `)
}
