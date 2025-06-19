/* eslint-disable */
import dayjs from "dayjs";
import { groupBy } from "lodash-es";

import type { PricePoint, YearlyReturn } from "@/ui/types";

export function computeSecurityReturns(prices: PricePoint[]): YearlyReturn[] {
  return Object.entries(
    groupBy(prices, (price) => dayjs(price.date).year()),
  ).reduce<YearlyReturn[]>((acc, [groupLabel, pricesByYear]) => {
    const year = parseInt(groupLabel);
    const closingPrice =
      pricesByYear.findLast(({ date }) => dayjs(date).year() < year)?.price ||
      pricesByYear[0]!.price;

    const openingPrice = pricesByYear[0]!.price;
    const returnByYear =
      ((closingPrice - openingPrice) / openingPrice) * 100 || null;

    return [
      ...acc,
      {
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
        overall: returnByYear,
      },
    ];
  }, []);
}
