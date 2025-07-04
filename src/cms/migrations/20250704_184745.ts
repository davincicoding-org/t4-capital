import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE "disclaimers" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"strategy_id" integer NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "disclaimers_locales" (
  	"content" jsonb NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "disclaimers_id" integer;
  ALTER TABLE "disclaimers" ADD CONSTRAINT "disclaimers_strategy_id_strategies_id_fk" FOREIGN KEY ("strategy_id") REFERENCES "public"."strategies"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "disclaimers_locales" ADD CONSTRAINT "disclaimers_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."disclaimers"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "disclaimers_strategy_idx" ON "disclaimers" USING btree ("strategy_id");
  CREATE INDEX "disclaimers_updated_at_idx" ON "disclaimers" USING btree ("updated_at");
  CREATE INDEX "disclaimers_created_at_idx" ON "disclaimers" USING btree ("created_at");
  CREATE UNIQUE INDEX "strategy_idx" ON "disclaimers" USING btree ("strategy_id");
  CREATE UNIQUE INDEX "disclaimers_locales_locale_parent_id_unique" ON "disclaimers_locales" USING btree ("_locale","_parent_id");
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_disclaimers_fk" FOREIGN KEY ("disclaimers_id") REFERENCES "public"."disclaimers"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "payload_locked_documents_rels_disclaimers_id_idx" ON "payload_locked_documents_rels" USING btree ("disclaimers_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "disclaimers" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "disclaimers_locales" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "disclaimers" CASCADE;
  DROP TABLE "disclaimers_locales" CASCADE;
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_disclaimers_fk";
  
  DROP INDEX "payload_locked_documents_rels_disclaimers_id_idx";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "disclaimers_id";`)
}
