import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "prices_page" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "prices_page_locales" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "prices_page" CASCADE;
  DROP TABLE "prices_page_locales" CASCADE;
  ALTER TABLE "strategies_locales" ALTER COLUMN "prices_disclaimer" SET NOT NULL;`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE "prices_page" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "prices_page_locales" (
  	"disclaimer" jsonb NOT NULL,
  	"meta_title" varchar,
  	"meta_description" varchar,
  	"meta_image_id" integer,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  ALTER TABLE "strategies_locales" ALTER COLUMN "prices_disclaimer" DROP NOT NULL;
  ALTER TABLE "prices_page_locales" ADD CONSTRAINT "prices_page_locales_meta_image_id_media_id_fk" FOREIGN KEY ("meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "prices_page_locales" ADD CONSTRAINT "prices_page_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."prices_page"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "prices_page_meta_meta_image_idx" ON "prices_page_locales" USING btree ("meta_image_id","_locale");
  CREATE UNIQUE INDEX "prices_page_locales_locale_parent_id_unique" ON "prices_page_locales" USING btree ("_locale","_parent_id");`)
}
