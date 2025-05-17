import type { product } from "./schema";

export type Product = typeof product.$inferSelect;
export type ProductInsert = typeof product.$inferInsert;
