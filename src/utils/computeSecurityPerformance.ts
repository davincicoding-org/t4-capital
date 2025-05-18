import dayjs, { extend } from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

import type { PricePoint, SecurityPerformance } from "@/ui/types";

extend(relativeTime);

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

  // Calculate inception date
  // const inception = dayjs(firstPrice.date, "DD.MM.YYYY").fromNow(true);

  // Calculate ITD return
  const ITD = ((lastPriceValue - firstPrice.price) / firstPrice.price) * 100;

  // Find first price of current year or last available price from previous year
  const currentYear = dayjs().year();
  const firstPriceThisYear = prices.find(
    (p) => dayjs(p.date, "DD.MM.YYYY").year() === currentYear,
  );

  const YTD = (() => {
    if (!firstPriceThisYear) return null;
    if (firstPriceThisYear === lastPrice) return null;

    return (
      ((lastPriceValue - firstPriceThisYear.price) / firstPriceThisYear.price) *
      100
    );
  })();

  // Find first price of current month or last available price from previous month
  const currentDate = dayjs();
  const firstPriceThisMonth = prices.find((p) => {
    const date = dayjs(p.date, "DD.MM.YYYY");
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
    // inception,
    ITD,
    YTD,
    MTD,
  };
}
