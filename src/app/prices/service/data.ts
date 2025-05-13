/* eslint-disable @typescript-eslint/prefer-nullish-coalescing -- ignore */

import dayjs, { extend } from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { google } from "googleapis";
import { groupBy } from "lodash-es";

import { getGoogleClient } from "@/services/googleapi";

import {
  type ProductDataType,
  type RawSheetData,
  RawSheetDataSchema,
  type YearlyReturnType,
} from "../schema";

extend(customParseFormat);

export async function fetchSheetData(): Promise<RawSheetData> {
  const glSheets = google.sheets({
    version: "v4",
    auth: await getGoogleClient(),
  });

  const [
    { data: metaData },
    { data: pricesData },
    { data: monthlyReturnsData },
    { data: yearlyReturnsData },
  ] = await Promise.all([
    glSheets.spreadsheets.values.get({
      spreadsheetId: "1Ejb3nzBk1v9Bxf8rlLjMHz0vS7hpyWbNkz8vzwfbw4Y",
      range: "Meta",
    }),
    glSheets.spreadsheets.values.get({
      spreadsheetId: "1Ejb3nzBk1v9Bxf8rlLjMHz0vS7hpyWbNkz8vzwfbw4Y",
      range: "Prices",
    }),
    glSheets.spreadsheets.values.get({
      spreadsheetId: "1Ejb3nzBk1v9Bxf8rlLjMHz0vS7hpyWbNkz8vzwfbw4Y",
      range: "Monthly Returns",
    }),
    glSheets.spreadsheets.values.get({
      spreadsheetId: "1Ejb3nzBk1v9Bxf8rlLjMHz0vS7hpyWbNkz8vzwfbw4Y",
      range: "Yearly Returns",
    }),
  ]);

  const rawData = {
    meta: metaData.values ?? [],
    prices: pricesData.values ?? [],
    monthlyReturns: monthlyReturnsData.values ?? [],
    yearlyReturns: yearlyReturnsData.values ?? [],
  };

  return RawSheetDataSchema.parse(rawData);
}

export function parseSheetData(rawData: RawSheetData): Array<ProductDataType> {
  // Extract product metadata from header row
  const [headerRow, ...metaRows] = rawData.meta;
  if (!headerRow) throw new Error("Missing headers in meta data");

  const [, ...monthlyReturnsRows] = rawData.monthlyReturns;
  const [, ...yearlyReturnsRows] = rawData.yearlyReturns;

  const productIds = headerRow
    .slice(1)
    .filter((id): id is string => typeof id === "string");

  return productIds.map<ProductDataType>((id) => {
    const index = headerRow.indexOf(id);
    if (index === -1) throw new Error(`Invalid product ID: ${id}`);

    const monthlyReturns = monthlyReturnsRows.map((row) => {
      const date = dayjs(row[0], "YYYY-MM");

      return {
        year: date.year(),
        month: date.month(),
        value: row[index] || null,
      };
    });
    const yearlyReturns = yearlyReturnsRows.map((row) => {
      const date = dayjs(row[0], "YYYY");

      return {
        year: date.year(),
        value: row[index],
      };
    });

    // Extract metadata for this product
    return {
      id,
      title: metaRows[0]?.[index] ?? id,
      isin: metaRows[1]?.[index] ?? "",
      color: metaRows[2]?.[index] ?? "blue",

      returns: Object.entries(groupBy(monthlyReturns, "year"))
        .map<YearlyReturnType>(([year, months]) => ({
          year: parseInt(year),
          months: [
            months[0]?.value || null,
            months[1]?.value || null,
            months[2]?.value || null,
            months[3]?.value || null,
            months[4]?.value || null,
            months[5]?.value || null,
            months[6]?.value || null,
            months[7]?.value || null,
            months[8]?.value || null,
            months[9]?.value || null,
            months[10]?.value || null,
            months[11]?.value || null,
          ],
          overall:
            yearlyReturns.find((entry) => entry.year === parseInt(year))
              ?.value ?? null,
        }))
        .filter(({ months }) => months.some((value) => value !== null)),
      // Extract prices
      prices: rawData.prices
        .slice(1)
        .map((row) => {
          const dateStr = row[0];
          const priceStr = row[index];
          if (!dateStr || !priceStr) return null;
          const price = parseFloat(priceStr.replace(/’/g, ""));
          if (isNaN(price)) return null;
          return { date: dateStr, price };
        })
        .filter((p): p is { date: string; price: number } => p !== null),

      // Extract returns
      monthlyReturns: Object.fromEntries(
        rawData.monthlyReturns
          .slice(1)
          .map((row) => {
            const date = row[0];
            const value = row[index];
            if (!date || !value) return null;
            const returnValue = parseFloat(value.replace(/[%']/g, "")) / 100;
            if (isNaN(returnValue)) return null;
            return [date, returnValue];
          })
          .filter((entry): entry is [string, number] => entry !== null),
      ),

      yearlyReturns: Object.fromEntries(
        rawData.yearlyReturns
          .slice(1)
          .map((row) => {
            const date = row[0];
            const value = row[index];
            if (!date || !value) return null;
            const returnValue = parseFloat(value.replace(/[%']/g, "")) / 100;
            if (isNaN(returnValue)) return null;
            return [date, returnValue];
          })
          .filter((entry): entry is [string, number] => entry !== null),
      ),
    };
  });
}
