import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "landing_page" ADD COLUMN "team_image_id" integer;
  ALTER TABLE "landing_page" ADD CONSTRAINT "landing_page_team_image_id_media_id_fk" FOREIGN KEY ("team_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "landing_page_team_image_idx" ON "landing_page" USING btree ("team_image_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "landing_page" DROP CONSTRAINT "landing_page_team_image_id_media_id_fk";
  
  DROP INDEX "landing_page_team_image_idx";
  ALTER TABLE "landing_page" DROP COLUMN "team_image_id";`)
}
