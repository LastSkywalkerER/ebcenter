import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
  ALTER TABLE "pages_blocks_principles" ADD COLUMN IF NOT EXISTS "section_tag" varchar;
  `)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
  ALTER TABLE "pages_blocks_principles" DROP COLUMN IF EXISTS "section_tag";
  `)
}
