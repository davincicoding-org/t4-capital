import type { ProductPrice } from "@/payload-types";

export type PricePoint = Pick<ProductPrice, "date" | "price">;

export interface YearlyReturn {
  year: number;
  months: [
    jan: number | null,
    feb: number | null,
    mar: number | null,
    apr: number | null,
    may: number | null,
    jun: number | null,
    jul: number | null,
    aug: number | null,
    sep: number | null,
    oct: number | null,
    nov: number | null,
    dec: number | null,
  ];
  overall: number | null;
}

export interface ProductData {
  prices: PricePoint[];
  returns: YearlyReturn[];
}

export interface ProductPerformance {
  ITD: number | null;
  YTD: number | null;
  MTD: number | null;
}
