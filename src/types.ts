import type * as Payload from "@/payload-types";

type ExcludeMeta<T> = Omit<T, "createdAt" | "updatedAt">;

export type Media = ExcludeMeta<Payload.Media>;

export interface PressArticle {
  id?: string | null;
  url: string;
  logo: ExcludeMeta<Payload.Media>;
}

export type Advisor = ExcludeMeta<Payload.Advisors[number]>;
export type TeamMember = ExcludeMeta<Payload.TeamMembers[number]>;

export interface Strategy
  extends Pick<
    ExcludeMeta<Payload.Strategy>,
    "id" | "title" | "description" | "launchDate" | "color" | "deck"
  > {
  image: string;
  presentationUrl: string;
  video: string | null;
}

// MARK: Prices

export type PricePoint = Pick<
  ExcludeMeta<Payload.ProductPrice>,
  "date" | "price"
>;

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

export interface ExportedProductPrices {
  isin: string;
  prices: {
    date: string;
    price: number;
  }[];
}
