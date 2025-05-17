import { pgEnum, pgTable } from "drizzle-orm/pg-core";

const gradient = pgEnum("gradient", ["blue", "pink", "yellow"]);

export const product = pgTable(
  "product",
  (d) => ({
    id: d.uuid().primaryKey().defaultRandom(),
    title: d.text().notNull().unique(),
    description: d.jsonb().$type<Record<string, string>>(),
    launchDate: d.date().notNull(),
    video: d.text(),
    // TODO replac with image url
    gradient: gradient().notNull(),
    docs: d.jsonb().$type<{
      title: Record<string, string>;
      url: string;
    }>(),
    // docs
  }),
  // (t) => [index("name_idx").on(t.name)],
);

export const teamMember = pgTable(
  "team_member",
  (d) => ({
    id: d.uuid().primaryKey().defaultRandom(),
    name: d.text().notNull(),
    linkedInUrl: d.text().notNull(),
    order: d.integer().notNull(),
  }),
  // (t) => [index("name_idx").on(t.name)],
);

export const security = pgTable(
  "security",
  (d) => ({
    isin: d.text().primaryKey(),
    productId: d.uuid().references(() => product.id, {}),
  }),
  // (t) => [index("name_idx").on(t.name)],
);

export const securityPrice = pgTable(
  "security",
  (d) => ({
    securityId: d.uuid().references(() => security.isin, {}),
    date: d.date().notNull(),
    price: d.integer().notNull(),
  }),
  // (t) => [index("name_idx").on(t.name)],
);
