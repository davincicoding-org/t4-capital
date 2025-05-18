import { Divider, Flex, Paper } from "@mantine/core";
import dayjs from "dayjs";
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

  return (
    <Paper withBorder radius="md" className="mx-auto max-w-2xl overflow-clip">
      <Paper
        className="flex items-center justify-between bg-cover px-3 py-2"
        style={{
          backgroundImage: `url("/gradients/${strategy.color}.webp")`,
        }}
        shadow="xs"
      >
        <div className="grid">
          <span className="text-xl font-bold">{strategy.title}</span>
          <span className="text-xs text-neutral-800">{isin}</span>
        </div>

        <ReturnsSummary data={returns} />
      </Paper>
      <PriceChart prices={prices} color={strategy.color} />
      <p className="mb-3 text-center text-sm text-neutral-600 uppercase">
        live for {dayjs(strategy.launchDate).fromNow(true)}
      </p>
      <Divider />
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
