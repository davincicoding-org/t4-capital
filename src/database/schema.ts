import { pgEnum, pgTable } from "drizzle-orm/pg-core";

export const colorEnum = pgEnum("color", ["blue", "pink", "yellow"]);

export const strategy = pgTable(
  "strategy",
  (d) => ({
    id: d.uuid().primaryKey().defaultRandom(),
    title: d.text().notNull().unique(),
    description: d.jsonb().$type<Record<"en", string>>().notNull(),
    launchDate: d.date().notNull(),
    video: d.text(),
    order: d.integer().notNull(),
    color: colorEnum().notNull(),
    deck: d.text().notNull(),

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

// export const security = pgTable(
//   "security",
//   (d) => ({
//     isin: d.text().primaryKey(),
//     password: d.text().notNull(),
//     strategyId: d.uuid().references(() => strategy.id, {}),
//   }),
//   // (t) => [index("name_idx").on(t.name)],
// );

// export const securityPrice = pgTable(
//   "security_price",
//   (d) => ({
//     securityId: d.text().references(() => security.isin, {}),
//     date: d.date().notNull(),
//     price: d.integer().notNull(),
//   }),
//   // (t) => [index("name_idx").on(t.name)],
// );
