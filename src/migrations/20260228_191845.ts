import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
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
  ALTER TABLE "pages_blocks_contact_info" ADD COLUMN IF NOT EXISTS "contact_phone" varchar;
  ALTER TABLE "pages_blocks_contact_info" ADD COLUMN IF NOT EXISTS "contact_email" varchar;
  ALTER TABLE "pages_blocks_contact_info" ADD COLUMN IF NOT EXISTS "contact_address" varchar;
  ALTER TABLE "pages_blocks_contact_info" ADD COLUMN IF NOT EXISTS "contact_working_hours" varchar;
  ALTER TABLE "pages_blocks_contact_info" ADD COLUMN IF NOT EXISTS "contact_unp" varchar;`)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages_blocks_contact_form" DROP COLUMN "name_label";
  ALTER TABLE "pages_blocks_contact_form" DROP COLUMN "email_label";
  ALTER TABLE "pages_blocks_contact_form" DROP COLUMN "phone_label";
  ALTER TABLE "pages_blocks_contact_form" DROP COLUMN "message_label";
  ALTER TABLE "pages_blocks_contact_form" DROP COLUMN "submit_label";
  ALTER TABLE "pages_blocks_contact_form" DROP COLUMN "phone_placeholder";
  ALTER TABLE "pages_blocks_contact_form" DROP COLUMN "phone_error";
  ALTER TABLE "pages_blocks_contact_form" DROP COLUMN "success_message";
  ALTER TABLE "pages_blocks_contact_form" DROP COLUMN "error_message";
  ALTER TABLE "pages_blocks_contact_form" DROP COLUMN "sending_message";
  ALTER TABLE "pages_blocks_contact_form" DROP COLUMN "security_check";
  ALTER TABLE "pages_blocks_contact_form" DROP COLUMN "security_error";
  ALTER TABLE "pages_blocks_contact_form" DROP COLUMN "validation_name_required";
  ALTER TABLE "pages_blocks_contact_form" DROP COLUMN "validation_message_required";
  ALTER TABLE "pages_blocks_contact_form" DROP COLUMN "validation_email_invalid";
  ALTER TABLE "pages_blocks_contact_info" DROP COLUMN "contact_phone";
  ALTER TABLE "pages_blocks_contact_info" DROP COLUMN "contact_email";
  ALTER TABLE "pages_blocks_contact_info" DROP COLUMN "contact_address";
  ALTER TABLE "pages_blocks_contact_info" DROP COLUMN "contact_working_hours";
  ALTER TABLE "pages_blocks_contact_info" DROP COLUMN "contact_unp";`)
}
