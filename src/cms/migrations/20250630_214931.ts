import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE "legal_pages" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"slug" varchar NOT NULL,
  	"navigation_label" varchar,
  	"navigation_order" numeric,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "legal_pages_locales" (
  	"title" varchar NOT NULL,
  	"content" jsonb NOT NULL,
  	"meta_title" varchar,
  	"meta_description" varchar,
  	"meta_image_id" integer,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "prices_page" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "prices_page_locales" (
  	"content" jsonb NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  ALTER TABLE "prices_disclaimer" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "prices_disclaimer_locales" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "prices_disclaimer" CASCADE;
  DROP TABLE "prices_disclaimer_locales" CASCADE;
  ALTER TABLE "team" RENAME TO "landing_page";
  ALTER TABLE "team_members" DROP CONSTRAINT "team_members_parent_id_fk";
  
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "legal_pages_id" integer;
  ALTER TABLE "legal_pages_locales" ADD CONSTRAINT "legal_pages_locales_meta_image_id_media_id_fk" FOREIGN KEY ("meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "legal_pages_locales" ADD CONSTRAINT "legal_pages_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."legal_pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "prices_page_locales" ADD CONSTRAINT "prices_page_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."prices_page"("id") ON DELETE cascade ON UPDATE no action;
  CREATE UNIQUE INDEX "legal_pages_slug_idx" ON "legal_pages" USING btree ("slug");
  CREATE INDEX "legal_pages_updated_at_idx" ON "legal_pages" USING btree ("updated_at");
  CREATE INDEX "legal_pages_created_at_idx" ON "legal_pages" USING btree ("created_at");
  CREATE INDEX "legal_pages_meta_meta_image_idx" ON "legal_pages_locales" USING btree ("meta_image_id","_locale");
  CREATE UNIQUE INDEX "legal_pages_locales_locale_parent_id_unique" ON "legal_pages_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "prices_page_locales_locale_parent_id_unique" ON "prices_page_locales" USING btree ("_locale","_parent_id");
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_legal_pages_fk" FOREIGN KEY ("legal_pages_id") REFERENCES "public"."legal_pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "team_members" ADD CONSTRAINT "team_members_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."landing_page"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "payload_locked_documents_rels_legal_pages_id_idx" ON "payload_locked_documents_rels" USING btree ("legal_pages_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE "prices_disclaimer" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "prices_disclaimer_locales" (
  	"content" jsonb NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "team" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  ALTER TABLE "legal_pages" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "legal_pages_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "landing_page" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "prices_page" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "prices_page_locales" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "legal_pages" CASCADE;
  DROP TABLE "legal_pages_locales" CASCADE;
  DROP TABLE "landing_page" CASCADE;
  DROP TABLE "prices_page" CASCADE;
  DROP TABLE "prices_page_locales" CASCADE;
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_legal_pages_fk";
  
  ALTER TABLE "team_members" DROP CONSTRAINT "team_members_parent_id_fk";
  
  DROP INDEX "payload_locked_documents_rels_legal_pages_id_idx";
  ALTER TABLE "prices_disclaimer_locales" ADD CONSTRAINT "prices_disclaimer_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."prices_disclaimer"("id") ON DELETE cascade ON UPDATE no action;
  CREATE UNIQUE INDEX "prices_disclaimer_locales_locale_parent_id_unique" ON "prices_disclaimer_locales" USING btree ("_locale","_parent_id");
  ALTER TABLE "team_members" ADD CONSTRAINT "team_members_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."team"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "legal_pages_id";`)
}
