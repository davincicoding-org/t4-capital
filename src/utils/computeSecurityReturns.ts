import dayjs from "dayjs";
import { groupBy } from "lodash-es";

import type { PricePoint, YearlyReturn } from "@/ui/types";

export function computeSecurityReturns(prices: PricePoint[]): YearlyReturn[] {
  const monthlyClosingPrices = Object.entries(
    groupBy(prices, (price) => dayjs(price.date).year()),
  ).flatMap(([year, pricesByYear]) => {
    return Object.entries(
      groupBy(pricesByYear, (price) => dayjs(price.date).month()),
    ).map(([month, pricesByMonth]) => {
      return {
        year: parseInt(year),
        month: parseInt(month),
        closingPrice: pricesByMonth[pricesByMonth.length - 1]!.price,
      };
    });
  });

  return monthlyClosingPrices.reduce<YearlyReturn[]>(
    (acc, { year, month, closingPrice }, index) => {
      if (acc.every(({ year: y }) => y !== year)) {
        const prevYearClosing =
          monthlyClosingPrices.findLast(({ year: y }) => y < year)
            ?.closingPrice ?? prices[0]!.price;

        const currentYearClosing = monthlyClosingPrices.findLast(
          ({ year: y }) => y === year,
        )!.closingPrice;

        const overall = (currentYearClosing / prevYearClosing - 1) * 100;

        acc.push({
          year,
          months: [
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
          ],
          overall,
        });
      }

      return acc.map((entry) => {
        if (entry.year !== year) return entry;

        const previousPrice =
          monthlyClosingPrices[index - 1]?.closingPrice ?? prices[0]!.price;

        const monthlyReturn = (closingPrice / previousPrice - 1) * 100;

        entry.months[month] = monthlyReturn;

        return entry;
      });
    },
    [],
  );
}
