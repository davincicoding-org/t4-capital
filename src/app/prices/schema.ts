import { z } from "zod";

// Parsed data schemas
export const PricePointSchema = z.object({
  date: z.string(),
  price: z.number(),
});

export const YearlyReturnSchema = z.object({
  year: z.number(),
  months: z.tuple([
    z.union([z.string(), z.null()]),
    z.union([z.string(), z.null()]),
    z.union([z.string(), z.null()]),
    z.union([z.string(), z.null()]),
    z.union([z.string(), z.null()]),
    z.union([z.string(), z.null()]),
    z.union([z.string(), z.null()]),
    z.union([z.string(), z.null()]),
    z.union([z.string(), z.null()]),
    z.union([z.string(), z.null()]),
    z.union([z.string(), z.null()]),
    z.union([z.string(), z.null()]),
  ]),
  overall: z.union([z.string(), z.null()]),
});

export const ProductDataSchema = z.object({
  id: z.string(),
  title: z.string(),
  isin: z.string(),
  color: z.string(),
  prices: z.array(PricePointSchema),
  returns: z.array(YearlyReturnSchema),
});

export const ProductStatsSchema = z.object({
  inception: z.union([z.string(), z.null()]),
  ITD: z.union([z.number(), z.null()]),
  YTD: z.union([z.number(), z.null()]),
  MTD: z.union([z.number(), z.null()]),
});

export const ProductSummarySchema = ProductDataSchema.and(ProductStatsSchema);

// Raw data schemas
export const TableRowSchema = z.array(z.string().optional());

export const TableDataSchema = z.array(TableRowSchema);

export const RawSheetDataSchema = z.object({
  meta: TableDataSchema,
  prices: TableDataSchema,
  monthlyReturns: TableDataSchema,
  yearlyReturns: TableDataSchema,
});

export const ParsedSheetDataSchema = z.array(ProductDataSchema);

// Types
export type RawSheetData = z.infer<typeof RawSheetDataSchema>;
export type ParsedSheetData = z.infer<typeof ParsedSheetDataSchema>;

export type PricePointType = z.infer<typeof PricePointSchema>;
export type YearlyReturnType = z.infer<typeof YearlyReturnSchema>;
export type ProductDataType = z.infer<typeof ProductDataSchema>;
export type ProductStatsType = z.infer<typeof ProductStatsSchema>;

export type ProductSummaryType = z.infer<typeof ProductSummarySchema>;
