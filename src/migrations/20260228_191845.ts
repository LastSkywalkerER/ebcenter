import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages_blocks_contact_form" ADD COLUMN "name_label" varchar;
  ALTER TABLE "pages_blocks_contact_form" ADD COLUMN "email_label" varchar;
  ALTER TABLE "pages_blocks_contact_form" ADD COLUMN "phone_label" varchar;
  ALTER TABLE "pages_blocks_contact_form" ADD COLUMN "message_label" varchar;
  ALTER TABLE "pages_blocks_contact_form" ADD COLUMN "submit_label" varchar;
  ALTER TABLE "pages_blocks_contact_form" ADD COLUMN "phone_placeholder" varchar;
  ALTER TABLE "pages_blocks_contact_form" ADD COLUMN "phone_error" varchar;
  ALTER TABLE "pages_blocks_contact_form" ADD COLUMN "success_message" varchar;
  ALTER TABLE "pages_blocks_contact_form" ADD COLUMN "error_message" varchar;
  ALTER TABLE "pages_blocks_contact_form" ADD COLUMN "sending_message" varchar;
  ALTER TABLE "pages_blocks_contact_form" ADD COLUMN "security_check" varchar;
  ALTER TABLE "pages_blocks_contact_form" ADD COLUMN "security_error" varchar;
  ALTER TABLE "pages_blocks_contact_form" ADD COLUMN "validation_name_required" varchar;
  ALTER TABLE "pages_blocks_contact_form" ADD COLUMN "validation_message_required" varchar;
  ALTER TABLE "pages_blocks_contact_form" ADD COLUMN "validation_email_invalid" varchar;
  ALTER TABLE "pages_blocks_contact_info" ADD COLUMN "contact_phone" varchar;
  ALTER TABLE "pages_blocks_contact_info" ADD COLUMN "contact_email" varchar;
  ALTER TABLE "pages_blocks_contact_info" ADD COLUMN "contact_address" varchar;
  ALTER TABLE "pages_blocks_contact_info" ADD COLUMN "contact_working_hours" varchar;
  ALTER TABLE "pages_blocks_contact_info" ADD COLUMN "contact_unp" varchar;`)
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
