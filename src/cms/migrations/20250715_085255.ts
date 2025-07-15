import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE "landing_page_articles" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"url" varchar NOT NULL,
  	"logo_id" integer NOT NULL
  );
  
  ALTER TABLE "media" RENAME COLUMN "sizes_thubmnail_url" TO "sizes_thumbnail_url";
  ALTER TABLE "media" RENAME COLUMN "sizes_thubmnail_width" TO "sizes_thumbnail_width";
  ALTER TABLE "media" RENAME COLUMN "sizes_thubmnail_height" TO "sizes_thumbnail_height";
  ALTER TABLE "media" RENAME COLUMN "sizes_thubmnail_mime_type" TO "sizes_thumbnail_mime_type";
  ALTER TABLE "media" RENAME COLUMN "sizes_thubmnail_filesize" TO "sizes_thumbnail_filesize";
  ALTER TABLE "media" RENAME COLUMN "sizes_thubmnail_filename" TO "sizes_thumbnail_filename";
  DROP INDEX "media_sizes_thubmnail_sizes_thubmnail_filename_idx";
  ALTER TABLE "landing_page_articles" ADD CONSTRAINT "landing_page_articles_logo_id_media_id_fk" FOREIGN KEY ("logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "landing_page_articles" ADD CONSTRAINT "landing_page_articles_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."landing_page"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "landing_page_articles_order_idx" ON "landing_page_articles" USING btree ("_order");
  CREATE INDEX "landing_page_articles_parent_id_idx" ON "landing_page_articles" USING btree ("_parent_id");
  CREATE INDEX "landing_page_articles_logo_idx" ON "landing_page_articles" USING btree ("logo_id");
  CREATE INDEX "media_sizes_thumbnail_sizes_thumbnail_filename_idx" ON "media" USING btree ("sizes_thumbnail_filename");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "landing_page_articles" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "landing_page_articles" CASCADE;
  ALTER TABLE "media" RENAME COLUMN "sizes_thumbnail_url" TO "sizes_thubmnail_url";
  ALTER TABLE "media" RENAME COLUMN "sizes_thumbnail_width" TO "sizes_thubmnail_width";
  ALTER TABLE "media" RENAME COLUMN "sizes_thumbnail_height" TO "sizes_thubmnail_height";
  ALTER TABLE "media" RENAME COLUMN "sizes_thumbnail_mime_type" TO "sizes_thubmnail_mime_type";
  ALTER TABLE "media" RENAME COLUMN "sizes_thumbnail_filesize" TO "sizes_thubmnail_filesize";
  ALTER TABLE "media" RENAME COLUMN "sizes_thumbnail_filename" TO "sizes_thubmnail_filename";
  DROP INDEX "media_sizes_thumbnail_sizes_thumbnail_filename_idx";
  CREATE INDEX "media_sizes_thubmnail_sizes_thubmnail_filename_idx" ON "media" USING btree ("sizes_thubmnail_filename");`)
}
