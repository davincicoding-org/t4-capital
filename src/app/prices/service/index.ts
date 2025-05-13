import { type ProductSummaryType } from "../schema";

import { calculatePriceStats } from "./calculation";
import { fetchSheetData, parseSheetData } from "./data";

export async function getProductSummaries(): Promise<ProductSummaryType[]> {
  const data = await fetchSheetData();
  const parsedData = parseSheetData(data);

  return parsedData.map((product) => ({
    ...product,
    ...calculatePriceStats(product.prices),
  }));
}
