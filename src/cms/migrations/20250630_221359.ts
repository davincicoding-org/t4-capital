import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "prices_page_locales" RENAME COLUMN "content" TO "disclaimer";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "prices_page_locales" ADD COLUMN "content" jsonb NOT NULL;
  ALTER TABLE "prices_page_locales" DROP COLUMN "disclaimer";`)
}
