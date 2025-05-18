import { relations } from "drizzle-orm";
import { index, pgEnum, pgTable } from "drizzle-orm/pg-core";

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
  }),
  // (t) => [index("name_idx").on(t.name)],
);

export const strategyRelations = relations(strategy, ({ many }) => ({
  securities: many(security),
}));

export const security = pgTable(
  "security",
  (d) => ({
    id: d.uuid().primaryKey().defaultRandom(),
    isin: d.text().notNull().unique(),
    name: d.text().notNull().unique(),
    password: d.text().notNull(),
    strategyId: d
      .uuid()
      .references(() => strategy.id, {})
      .notNull(),
  }),
  (t) => [index("isin_idx").on(t.isin), index("password_idx").on(t.password)],
);

export const securityRelations = relations(security, ({ one }) => ({
  strategy: one(strategy, {
    fields: [security.strategyId],
    references: [strategy.id],
  }),
}));

// export const securityPrice = pgTable(
//   "security_price",
//   (d) => ({
//     securityId: d.text().references(() => security.isin, {}),
//     date: d.date().notNull(),
//     price: d.integer().notNull(),
//   }),
//   // (t) => [index("name_idx").on(t.name)],
// );

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
