import dayjs from "dayjs";

import type { PricePoint, SecurityPerformance } from "@/ui/types";

export function computeSecurityPerformance(
  prices: PricePoint[],
): SecurityPerformance {
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
