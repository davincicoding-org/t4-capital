import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   DROP INDEX "strategy_idx";
  DROP INDEX "disclaimers_strategy_idx";
  CREATE UNIQUE INDEX "disclaimers_strategy_idx" ON "disclaimers" USING btree ("strategy_id");
  ALTER TABLE "strategies_locales" DROP COLUMN "prices_disclaimer";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP INDEX "disclaimers_strategy_idx";
  ALTER TABLE "strategies_locales" ADD COLUMN "prices_disclaimer" jsonb NOT NULL;
  CREATE UNIQUE INDEX "strategy_idx" ON "disclaimers" USING btree ("strategy_id");
  CREATE INDEX "disclaimers_strategy_idx" ON "disclaimers" USING btree ("strategy_id");`)
}
