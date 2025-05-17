"use client";

import { useEffect, useState } from "react";
import { LineChart } from "@mantine/charts";
import {
  Button,
  Divider,
  Flex,
  Modal,
  Paper,
  ScrollArea,
  Table,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useTranslations } from "next-intl";

import {
  type PricePointType,
  type ProductSummaryType,
  type YearlyReturnType,
} from "./schema";

export type IProductSummaryProps = ProductSummaryType;

export function ProductSummary({
  title,
  isin,
  color,
  prices,
  returns,
  inception,
  ITD,
  YTD,
  MTD,
}: IProductSummaryProps) {
  const t = useTranslations();

  return (
    <Paper withBorder radius="md" className="mx-auto max-w-2xl overflow-clip">
      <Paper
        className="flex items-center justify-between bg-cover px-3 py-2"
        style={{
          backgroundImage: `url("/gradients/${color}.webp")`,
        }}
        shadow="xs"
      >
        <div className="grid">
          <span className="text-xl font-bold">{title}</span>
          <span className="text-xs text-neutral-800">{isin}</span>
        </div>

        <ReturnsSummary data={returns} />
      </Paper>
      <PriceChart prices={prices} color={color} />
      <p className="mb-3 text-center text-sm uppercase text-neutral-600">
        live for {inception}
      </p>
      <Divider />
      <KPISummary ITD={ITD} YTD={YTD} MTD={MTD} />
      <Divider />
      <p className="whitespace-pre-wrap text-balance p-4 text-center text-xs text-neutral-500">
        {t("prices.disclaimer")}
      </p>
    </Paper>
  );
}

function PriceChart({
  prices,
  color,
}: {
  prices: Array<PricePointType>;
  color: string;
}) {
  const currentPrice = prices[prices.length - 1];
  const [displayedData, setDisplayedData] = useState(currentPrice);

  return (
    <div className="grid py-4">
      {displayedData ? (
        <div className="flex justify-between px-3">
          <span className="text-medium text-xl">${displayedData.price}</span>
          <span>{displayedData.date}</span>
        </div>
      ) : null}
      <LineChart
        onPointerLeave={() => setDisplayedData(currentPrice)}
        h={150}
        data={prices}
        dataKey="date"
        series={[{ name: "price", color: `${color}.4` }]}
        curveType="linear"
        tickLine="none"
        gridAxis="none"
        withXAxis={false}
        withYAxis={false}
        withDots={false}
        tooltipProps={{
          content: ({ payload }) => {
            const hoveredData = payload?.[0]?.payload as
              | PricePointType
              | undefined;

            // eslint-disable-next-line react-hooks/rules-of-hooks
            useEffect(() => {
              setDisplayedData(hoveredData ?? currentPrice);
              // eslint-disable-next-line react-hooks/exhaustive-deps
            }, [hoveredData?.date]);

            return null;
          },
        }}
      />
    </div>
  );
}

function ReturnsSummary({ data }: { data: Array<YearlyReturnType> }) {
  const [isOpen, { open, close }] = useDisclosure();

  return (
    <>
      <Button size="compact-sm" variant="outline" color="black" onClick={open}>
        RETURNS
      </Button>
      <Modal opened={isOpen} centered size="auto" radius="md" onClose={close}>
        <ScrollArea scrollbars="x">
          <Table>
            <Table.Thead>
              <Table.Tr>
                <Table.Th className="sticky left-0 backdrop-blur">
                  Year
                </Table.Th>
                <Table.Th className="text-center">JAN</Table.Th>
                <Table.Th className="text-center">FEB</Table.Th>
                <Table.Th className="text-center">MAR</Table.Th>
                <Table.Th className="text-center">APR</Table.Th>
                <Table.Th className="text-center">MAY</Table.Th>
                <Table.Th className="text-center">JUN</Table.Th>
                <Table.Th className="text-center">JUL</Table.Th>
                <Table.Th className="text-center">AUG</Table.Th>
                <Table.Th className="text-center">SEP</Table.Th>
                <Table.Th className="text-center">OCT</Table.Th>
                <Table.Th className="text-center">NOV</Table.Th>
                <Table.Th className="text-center">DEC</Table.Th>
                <Table.Th className="text-center">Overall</Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
              {data.map(({ year, months, overall }) => (
                <Table.Tr key={year}>
                  <Table.Td className="sticky left-0 font-medium backdrop-blur">
                    {year}
                  </Table.Td>
                  {months.map((value, index) => (
                    <Table.Td className="text-center" key={index}>
                      {value ?? ""}
                    </Table.Td>
                  ))}
                  <Table.Td className="font-bold">{overall ?? ""}</Table.Td>
                </Table.Tr>
              ))}
            </Table.Tbody>
          </Table>
        </ScrollArea>
      </Modal>
    </>
  );
}

function KPISummary({
  ITD,
  YTD,
  MTD,
}: Pick<ProductSummaryType, "ITD" | "YTD" | "MTD">) {
  return (
    <Flex gap="sm" p="md" wrap="wrap">
      <Paper className="grid flex-1" withBorder radius="md" p="sm">
        <span>MTD</span>
        <span className="text-lg font-medium sm:text-2xl">
          {MTD === null ? "-" : `${MTD.toFixed(1)}%`}
        </span>
      </Paper>
      <Paper className="grid flex-1" withBorder radius="md" p="sm">
        <span>YTD</span>
        <span className="text-lg font-medium sm:text-2xl">
          {YTD === null ? "-" : `${YTD.toFixed(1)}%`}
        </span>
      </Paper>
      <Paper className="grid flex-1" withBorder radius="md" p="sm">
        <span>ITD</span>
        <span className="text-lg font-medium sm:text-2xl">
          {ITD === null ? "-" : `${ITD.toFixed(1)}%`}
        </span>
      </Paper>
    </Flex>
  );
}
