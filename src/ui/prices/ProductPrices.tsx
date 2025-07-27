"use client";

import type { DateRange } from "react-day-picker";
import { useMemo, useState } from "react";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import relativeTime from "dayjs/plugin/relativeTime";
import { useTranslations } from "next-intl";
import { DayPicker } from "react-day-picker";

import type { Disclaimer, Product, Strategy } from "@/payload-types";
import {
  type PricePoint,
  type ProductPerformance,
  type YearlyReturn,
} from "@/types";

import RichText from "../components/RichText";
import { cn } from "../utils";
import { PriceChart } from "./PriceChart";
import { ReturnsSummary } from "./ReturnsSummary";

dayjs.extend(relativeTime);
dayjs.extend(customParseFormat);

export type ProductPricesProps = {
  isin: Product["isin"];
  strategy: Pick<Strategy, "title" | "color">;
  prices: PricePoint[];
  returns: YearlyReturn[];
  performance: ProductPerformance;
  disclaimer: Pick<Disclaimer, "content" | "updatedAt"> | null;
  className?: string;
};

export function ProductPrices({
  isin,
  strategy,
  performance,
  prices,
  returns,
  disclaimer,
  className,
}: ProductPricesProps) {
  const t = useTranslations("prices");
  const [dateRangeSelection, setDateRangeSelection] = useState<
    "ALL" | "1M" | "3M" | "1Y" | "CUSTOM"
  >("ALL");

  const [dateRange, setDateRange] = useState<DateRange | undefined>();
  const filteredPrices = useMemo(() => {
    const startDate = dateRange?.from?.toISOString();
    const endDate = dateRange?.to?.toISOString();
    if (!startDate && !endDate) return prices;
    return prices.filter(({ date }) => {
      if (startDate && date < startDate) return false;
      if (endDate && date > endDate) return false;
      return true;
    });
  }, [prices, dateRange]);

  const launchDate = useMemo(() => {
    const [firstPrice] = prices;
    if (!firstPrice) return null;
    return dayjs(firstPrice.date);
  }, [prices]);

  return (
    <div
      className={cn(
        "border-base-300 flex max-w-2xl flex-col overflow-clip rounded-2xl border-2",
        className,
      )}
    >
      <div
        className="flex items-center justify-between rounded-b-none bg-cover px-5 py-3 text-black shadow-sm"
        style={{
          backgroundImage: `url("/gradients/${strategy.color}.webp")`,
        }}
      >
        <div className="grid">
          <span className="mb-1 text-xl leading-tight font-bold text-pretty">
            {strategy.title}
          </span>
          <span className="text-sm text-neutral-800">{isin}</span>
        </div>

        <ReturnsSummary data={returns} />
      </div>
      <PriceChart prices={filteredPrices} color={strategy.color} />
      {launchDate && (
        <p className="text-center text-sm text-neutral-600 uppercase">
          {t("liveFor", { time: launchDate.fromNow(true) })}
        </p>
      )}
      <div className="divider">
        <div className="flex gap-2">
          <button
            tabIndex={0}
            className={cn("btn btn-sm border-base-300 rounded-md", {
              "btn-primary": dateRangeSelection === "ALL",
            })}
            onClick={() => {
              setDateRangeSelection("ALL");
              setDateRange(undefined);
            }}
          >
            {t("rangeLabels.all")}
          </button>
          <button
            tabIndex={0}
            className={cn("btn btn-sm border-base-300 rounded-md", {
              "btn-primary": dateRangeSelection === "1M",
            })}
            onClick={() => {
              setDateRangeSelection("1M");
              setDateRange({
                from: dayjs().subtract(1, "month").toDate(),
                to: new Date(),
              });
            }}
          >
            {t("rangeLabels.1M")}
          </button>
          <button
            tabIndex={0}
            className={cn("btn btn-sm border-base-300 rounded-md", {
              "btn-primary": dateRangeSelection === "3M",
            })}
            onClick={() => {
              setDateRangeSelection("3M");
              setDateRange({
                from: dayjs().subtract(3, "month").toDate(),
                to: new Date(),
              });
            }}
          >
            {t("rangeLabels.3M")}
          </button>
          <button
            tabIndex={0}
            className={cn("btn btn-sm border-base-300 rounded-md", {
              "btn-primary": dateRangeSelection === "1Y",
            })}
            onClick={() => {
              setDateRangeSelection("1Y");
              setDateRange({
                from: dayjs().subtract(1, "year").toDate(),
                to: new Date(),
              });
            }}
          >
            {t("rangeLabels.1Y")}
          </button>

          <div className="dropdown dropdown-bottom dropdown-center">
            <div
              tabIndex={0}
              role="button"
              className={cn("btn btn-sm border-base-300 rounded-md", {
                "btn-primary": dateRangeSelection === "CUSTOM",
              })}
            >
              <span
                className={cn({
                  "tooltip tooltip-top": dateRangeSelection === "CUSTOM",
                })}
                data-tip={`${dayjs(dateRange?.from).format("DD/MM/YYYY")} - ${dayjs(dateRange?.to).format("DD/MM/YYYY")}`}
              >
                {t("rangeLabels.custom")}
              </span>
            </div>
            <div
              tabIndex={0}
              className="dropdown-content bg-base-100 rounded-box z-1 shadow-sm"
            >
              <DayPicker
                className="react-day-picker"
                mode="range"
                selected={dateRange}
                startMonth={launchDate?.toDate()}
                endMonth={new Date()}
                onSelect={(date) => {
                  setDateRange(date);
                  setDateRangeSelection("CUSTOM");
                }}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-wrap gap-4 p-5">
        <div className="border-base-200 grid flex-1 rounded-lg border-2 p-4">
          <span>MTD</span>
          <span className="text-lg font-medium sm:text-2xl">
            {performance.MTD === null ? "-" : `${performance.MTD.toFixed(1)}%`}
          </span>
        </div>
        <div className="border-base-200 grid flex-1 rounded-lg border-2 p-4">
          <span>YTD</span>
          <span className="text-lg font-medium sm:text-2xl">
            {performance.YTD === null ? "-" : `${performance.YTD.toFixed(1)}%`}
          </span>
        </div>
        <div className="border-base-200 grid flex-1 rounded-lg border-2 p-4">
          <span>ITD</span>
          <span className="text-lg font-medium sm:text-2xl">
            {performance.ITD === null ? "-" : `${performance.ITD.toFixed(1)}%`}
          </span>
        </div>
      </div>
      {disclaimer && (
        <>
          <div className="divider my-0" />
          <div className="-mt-1.5 overflow-y-auto">
            <div className="p-6">
              <div className="mb-3 flex items-center justify-between">
                <span className="text-xl font-medium">
                  {t("disclaimer.title")}
                </span>
                <div
                  className="tooltip"
                  data-tip={dayjs(disclaimer.updatedAt).format(
                    "DD/MM/YYYY HH:mm",
                  )}
                >
                  <div className="badge badge-neutral">
                    {t("disclaimer.updatedAt", {
                      time: dayjs(disclaimer.updatedAt).fromNow(true),
                    })}
                  </div>
                </div>
              </div>

              <RichText data={disclaimer.content} />
            </div>
          </div>
        </>
      )}
    </div>
  );
}
