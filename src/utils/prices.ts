import dayjs from "dayjs";
import { groupBy } from "lodash-es";

import type { PricePoint, ProductPerformance, YearlyReturn } from "@/types";

export function computeSecurityPerformance(
  prices: PricePoint[],
): ProductPerformance {
  const firstPrice = prices[0];
  const lastPrice = prices[prices.length - 1];

  if (!prices.length || !firstPrice || !lastPrice) {
    return {
      // inception: null,
      ITD: null,
      YTD: null,
      MTD: null,
    };
  }

  const lastPriceValue = lastPrice.price;

  const ITD = ((lastPriceValue - firstPrice.price) / firstPrice.price) * 100;

  const currentYear = dayjs().year();
  const firstPriceThisYear = prices.find(
    (p) => dayjs(p.date).year() === currentYear,
  );

  const YTD = (() => {
    if (!firstPriceThisYear) return null;
    if (firstPriceThisYear === lastPrice) return null;

    return (
      ((lastPriceValue - firstPriceThisYear.price) / firstPriceThisYear.price) *
      100
    );
  })();

  const currentDate = dayjs();
  const firstPriceThisMonth = prices.find((p) => {
    const date = dayjs(p.date);
    return (
      date.year() === currentDate.year() && date.month() === currentDate.month()
    );
  });

  const MTD = (() => {
    if (!firstPriceThisMonth) return null;
    if (firstPriceThisMonth === lastPrice) return null;

    return (
      ((lastPriceValue - firstPriceThisMonth.price) /
        firstPriceThisMonth.price) *
      100
    );
  })();

  return {
    ITD,
    YTD,
    MTD,
  };
}

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
