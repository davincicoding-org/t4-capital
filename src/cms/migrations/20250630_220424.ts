import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE "landing_page_locales" (
  	"meta_title" varchar,
  	"meta_description" varchar,
  	"meta_image_id" integer,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  ALTER TABLE "prices_page_locales" ADD COLUMN "meta_title" varchar;
  ALTER TABLE "prices_page_locales" ADD COLUMN "meta_description" varchar;
  ALTER TABLE "prices_page_locales" ADD COLUMN "meta_image_id" integer;
  ALTER TABLE "landing_page_locales" ADD CONSTRAINT "landing_page_locales_meta_image_id_media_id_fk" FOREIGN KEY ("meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "landing_page_locales" ADD CONSTRAINT "landing_page_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."landing_page"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "landing_page_meta_meta_image_idx" ON "landing_page_locales" USING btree ("meta_image_id","_locale");
  CREATE UNIQUE INDEX "landing_page_locales_locale_parent_id_unique" ON "landing_page_locales" USING btree ("_locale","_parent_id");
  ALTER TABLE "prices_page_locales" ADD CONSTRAINT "prices_page_locales_meta_image_id_media_id_fk" FOREIGN KEY ("meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "prices_page_meta_meta_image_idx" ON "prices_page_locales" USING btree ("meta_image_id","_locale");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "landing_page_locales" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "landing_page_locales" CASCADE;
  ALTER TABLE "prices_page_locales" DROP CONSTRAINT "prices_page_locales_meta_image_id_media_id_fk";
  
  DROP INDEX "prices_page_meta_meta_image_idx";
  ALTER TABLE "prices_page_locales" DROP COLUMN "meta_title";
  ALTER TABLE "prices_page_locales" DROP COLUMN "meta_description";
  ALTER TABLE "prices_page_locales" DROP COLUMN "meta_image_id";`)
}
