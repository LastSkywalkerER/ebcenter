import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "site_settings_locales" ADD COLUMN "common_organization_name" varchar DEFAULT 'Наименование организации';
  ALTER TABLE "site_settings_locales" ADD COLUMN "common_postal_address" varchar DEFAULT 'Почтовый адрес';
  ALTER TABLE "contacts_locales" ADD COLUMN "contact_organization_name" varchar;
  ALTER TABLE "contacts_locales" ADD COLUMN "contact_postal_address" varchar;`)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "site_settings_locales" DROP COLUMN "common_organization_name";
  ALTER TABLE "site_settings_locales" DROP COLUMN "common_postal_address";
  ALTER TABLE "contacts_locales" DROP COLUMN "contact_organization_name";
  ALTER TABLE "contacts_locales" DROP COLUMN "contact_postal_address";`)
}
