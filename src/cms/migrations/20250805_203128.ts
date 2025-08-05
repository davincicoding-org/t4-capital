import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE "messages" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"locale" varchar NOT NULL,
  	"prefix" varchar DEFAULT 'messages',
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"url" varchar,
  	"thumbnail_u_r_l" varchar,
  	"filename" varchar,
  	"mime_type" varchar,
  	"filesize" numeric,
  	"width" numeric,
  	"height" numeric,
  	"focal_x" numeric,
  	"focal_y" numeric
  );
  
  ALTER TABLE "polyglot_messages" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "polyglot_messages" CASCADE;
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_polyglot_messages_fk";
  
  DROP INDEX "payload_locked_documents_rels_polyglot_messages_id_idx";
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "messages_id" integer;
  CREATE INDEX "messages_updated_at_idx" ON "messages" USING btree ("updated_at");
  CREATE INDEX "messages_created_at_idx" ON "messages" USING btree ("created_at");
  CREATE UNIQUE INDEX "messages_filename_idx" ON "messages" USING btree ("filename");
  CREATE INDEX "locale_idx" ON "messages" USING btree ("locale");
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_messages_fk" FOREIGN KEY ("messages_id") REFERENCES "public"."messages"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "payload_locked_documents_rels_messages_id_idx" ON "payload_locked_documents_rels" USING btree ("messages_id");
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "polyglot_messages_id";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE "polyglot_messages" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"locale" varchar NOT NULL,
  	"content" jsonb NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  ALTER TABLE "messages" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "messages" CASCADE;
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_messages_fk";
  
  DROP INDEX "payload_locked_documents_rels_messages_id_idx";
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "polyglot_messages_id" integer;
  CREATE INDEX "polyglot_messages_updated_at_idx" ON "polyglot_messages" USING btree ("updated_at");
  CREATE INDEX "polyglot_messages_created_at_idx" ON "polyglot_messages" USING btree ("created_at");
  CREATE INDEX "locale_idx" ON "polyglot_messages" USING btree ("locale");
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_polyglot_messages_fk" FOREIGN KEY ("polyglot_messages_id") REFERENCES "public"."polyglot_messages"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "payload_locked_documents_rels_polyglot_messages_id_idx" ON "payload_locked_documents_rels" USING btree ("polyglot_messages_id");
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "messages_id";`)
}
