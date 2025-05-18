"use server";

import { extend } from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { google } from "googleapis";
import { groupBy } from "lodash-es";
import { z } from "zod";

import type { SecurityData, YearlyReturn } from "@/ui/types";
import { env } from "@/env";

extend(customParseFormat);

// MARK: Schema
const TableRowSchema = z.array(z.string().optional());

const TableDataSchema = z.tuple([TableRowSchema]).rest(TableRowSchema);

const PricesDataSchema = TableDataSchema.transform(
  ([[_date, ...ids], ...rows]) =>
    rows.flatMap(([date, ...prices]) => {
      if (!date) return [];
      return ids.flatMap((id, index) => {
        const priceString = prices[index];
        if (!priceString) return [];
        const price = parseFloat(priceString.replace(/’/g, ""));
        return [
          {
            date,
            id,
            price,
          },
        ];
      });
    }),
);

const ReturnsDataSchema = TableDataSchema.transform(
  ([[_date, ...ids], ...rows]) =>
    rows.flatMap(([date, ...values]) => {
      if (!date) return [];
      return ids.flatMap((id, index) => {
        const valueString = values[index];

        if (!valueString) return [];
        return [
          {
            date,
            id,
            percentage: parseFloat(valueString),
          },
        ];
      });
    }),
);

// MARK: Fetch

export async function fetchSecurityPrices(
  securityId: string,
): Promise<SecurityData> {
  const authClient = await google.auth.getClient({
    credentials: {
      type: "service_account",
      project_id: env.GOOGLE_CLOUD_PROJECT_ID,
      private_key_id: env.GOOGLE_CLOUD_PRIVATE_KEY_ID,
      private_key: env.GOOGLE_CLOUD_PRIVATE_KEY,
      client_email: env.GOOGLE_CLOUD_CLIENT_EMAIL,
      client_id: env.GOOGLE_CLOUD_CLIENT_ID,
      universe_domain: "googleapis.com",
    },
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });
  const glSheets = google.sheets({
    version: "v4",
    auth: authClient,
  });

  const [pricesData, monthlyReturnsData, yearlyReturnsData] = await Promise.all(
    [
      glSheets.spreadsheets.values
        .get({
          spreadsheetId: "1Ejb3nzBk1v9Bxf8rlLjMHz0vS7hpyWbNkz8vzwfbw4Y",
          range: "Prices",
        })
        .then(({ data }) => PricesDataSchema.parse(data.values)),
      glSheets.spreadsheets.values
        .get({
          spreadsheetId: "1Ejb3nzBk1v9Bxf8rlLjMHz0vS7hpyWbNkz8vzwfbw4Y",
          range: "Monthly Returns",
        })
        .then(({ data }) => ReturnsDataSchema.parse(data.values)),
      glSheets.spreadsheets.values
        .get({
          spreadsheetId: "1Ejb3nzBk1v9Bxf8rlLjMHz0vS7hpyWbNkz8vzwfbw4Y",
          range: "Yearly Returns",
        })
        .then(({ data }) => ReturnsDataSchema.parse(data.values)),
    ],
  );

  const monthlyReturns = monthlyReturnsData.filter((p) => p.id === securityId);
  const yearlyReturns = yearlyReturnsData.filter((p) => p.id === securityId);

  return {
    prices: pricesData.filter((p) => p.id === securityId),
    returns: Object.entries(
      groupBy(monthlyReturns, (p) => p.date.substring(0, 4)),
    )
      .map<YearlyReturn>(([year, months]) => ({
        year: parseInt(year),
        months: [
          months.find((p) => p.date.substring(5) === "01")?.percentage ?? null,
          months.find((p) => p.date.substring(5) === "02")?.percentage ?? null,
          months.find((p) => p.date.substring(5) === "03")?.percentage ?? null,
          months.find((p) => p.date.substring(5) === "04")?.percentage ?? null,
          months.find((p) => p.date.substring(5) === "05")?.percentage ?? null,
          months.find((p) => p.date.substring(5) === "06")?.percentage ?? null,
          months.find((p) => p.date.substring(5) === "07")?.percentage ?? null,
          months.find((p) => p.date.substring(5) === "08")?.percentage ?? null,
          months.find((p) => p.date.substring(5) === "09")?.percentage ?? null,
          months.find((p) => p.date.substring(5) === "10")?.percentage ?? null,
          months.find((p) => p.date.substring(5) === "11")?.percentage ?? null,
          months.find((p) => p.date.substring(5) === "12")?.percentage ?? null,
        ],
        overall:
          yearlyReturns.find((entry) => entry.date === year)?.percentage ??
          null,
      }))
      .filter(({ months }) => months.some((value) => value !== null)),
  };
}
