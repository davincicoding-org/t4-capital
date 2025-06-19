"use client";

import { useMemo, useState } from "react";
import { Button, Divider, Flex, Paper, Popover } from "@mantine/core";
import { DatePicker } from "@mantine/dates";
import { useClickOutside } from "@mantine/hooks";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import relativeTime from "dayjs/plugin/relativeTime";
import { useTranslations } from "next-intl";

import type { Security, Strategy } from "@/database/types";

import {
  type PricePoint,
  type SecurityPerformance,
  type YearlyReturn,
} from "../types";
import { PriceChart } from "./PriceChart";
import { ReturnsSummary } from "./ReturnsSummary";

dayjs.extend(relativeTime);
dayjs.extend(customParseFormat);

export type ISecurityPricesProps = {
  isin: Security["isin"];
  strategy: Pick<Strategy, "title" | "color" | "launchDate">;
  prices: PricePoint[];
  returns: YearlyReturn[];
  performance: SecurityPerformance;
};

export function SecurityPrices({
  isin,
  strategy,
  performance,
  prices,
  returns,
}: ISecurityPricesProps) {
  const t = useTranslations();

  const [dateRange, setDateRange] = useState<
    "ALL" | "1M" | "3M" | "1Y" | "DATE"
  >("ALL");

  const [startDate, setStartDate] = useState<Date | null>(null);
  const [isSelectingDate, setIsSelectingDate] = useState(false);
  const datePickerRef = useClickOutside(() => setIsSelectingDate(false));
  const filteredPrices = useMemo(() => {
    if (startDate === null) return prices;
    return prices.filter(({ date }) => dayjs(date).isAfter(dayjs(startDate)));
  }, [prices, startDate]);

  return (
    <Paper withBorder radius="md" className="mx-auto max-w-2xl overflow-clip">
      <Paper
        className="flex items-center justify-between rounded-b-none bg-cover px-3 py-2"
        style={{
          backgroundImage: `url("/gradients/${strategy.color}.webp")`,
        }}
        shadow="xs"
      >
        <div className="grid">
          <span className="text-xl font-bold">{strategy.title}</span>
          <span className="text-xs text-neutral-800">{isin}</span>
        </div>

        {/* <ReturnsSummary data={returns} /> */}
      </Paper>
      <PriceChart prices={filteredPrices} color={strategy.color} />
      <p className="mb-3 text-center text-sm text-neutral-600 uppercase">
        live for {dayjs(strategy.launchDate).fromNow(true)}
      </p>
      <Divider
        label={
          <Flex gap={8}>
            <Button
              variant={dateRange === "ALL" ? "filled" : "default"}
              size="compact-sm"
              onClick={() => {
                setDateRange("ALL");
                setStartDate(null);
              }}
            >
              All
            </Button>
            <Button
              variant={dateRange === "1M" ? "filled" : "default"}
              size="compact-sm"
              onClick={() => {
                setDateRange("1M");
                setStartDate(dayjs().subtract(1, "month").toDate());
              }}
            >
              1M
            </Button>
            <Button
              variant={dateRange === "3M" ? "filled" : "default"}
              size="compact-sm"
              onClick={() => {
                setDateRange("3M");
                setStartDate(dayjs().subtract(3, "month").toDate());
              }}
            >
              3M
            </Button>
            <Button
              variant={dateRange === "1Y" ? "filled" : "default"}
              size="compact-sm"
              onClick={() => {
                setDateRange("1Y");
                setStartDate(dayjs().subtract(1, "year").toDate());
              }}
            >
              1Y
            </Button>
            <Popover
              opened={isSelectingDate}
              onClose={() => setIsSelectingDate(false)}
            >
              <Popover.Target>
                <Button
                  variant={dateRange === "DATE" ? "filled" : "default"}
                  size="compact-sm"
                  onClick={() => setIsSelectingDate(true)}
                >
                  {dateRange === "DATE"
                    ? dayjs(startDate).format("DD/MM/YY")
                    : "Custom"}
                </Button>
              </Popover.Target>
              <Popover.Dropdown p={4}>
                <DatePicker
                  size="xs"
                  ref={datePickerRef}
                  value={startDate}
                  onChange={(value) => {
                    if (!value) return;
                    setDateRange("DATE");
                    setStartDate(new Date(value));
                    setIsSelectingDate(false);
                  }}
                  minDate={dayjs(strategy.launchDate).toDate()}
                  maxDate={new Date()}
                />
              </Popover.Dropdown>
            </Popover>
          </Flex>
        }
      />
      <Flex gap="sm" p="md" wrap="wrap">
        <Paper className="grid flex-1" withBorder radius="md" p="sm">
          <span>MTD</span>
          <span className="text-lg font-medium sm:text-2xl">
            {performance.MTD === null ? "-" : `${performance.MTD.toFixed(1)}%`}
          </span>
        </Paper>
        <Paper className="grid flex-1" withBorder radius="md" p="sm">
          <span>YTD</span>
          <span className="text-lg font-medium sm:text-2xl">
            {performance.YTD === null ? "-" : `${performance.YTD.toFixed(1)}%`}
          </span>
        </Paper>
        <Paper className="grid flex-1" withBorder radius="md" p="sm">
          <span>ITD</span>
          <span className="text-lg font-medium sm:text-2xl">
            {performance.ITD === null ? "-" : `${performance.ITD.toFixed(1)}%`}
          </span>
        </Paper>
      </Flex>
      <Divider />
      <div
        className="prose prose-sm max-w-none p-4 opacity-70"
        // className=" text-center text-xs "
        dangerouslySetInnerHTML={{
          __html: t.raw("prices.disclaimer") as string,
        }}
      />
    </Paper>
  );
}
