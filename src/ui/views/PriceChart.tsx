"use client";

import { useEffect, useState } from "react";
import { LineChart } from "@mantine/charts";
import dayjs from "dayjs";

import { type PricePoint } from "../types";

export function PriceChart({
  prices,
  color,
}: {
  prices: Array<PricePoint>;
  color: string;
}) {
  const currentPrice = prices[prices.length - 1];
  const [displayedData, setDisplayedData] = useState(currentPrice);

  return (
    <div className="grid py-4">
      {displayedData ? (
        <div className="flex justify-between px-3">
          <span className="text-medium text-xl">${displayedData.price}</span>
          <span>{dayjs(displayedData.date).format("DD.MM.YYYY")}</span>
        </div>
      ) : null}
      <LineChart
        onPointerLeave={() => setDisplayedData(currentPrice)}
        h={150}
        lineProps={{
          animationDuration: 800,
          animationEasing: "ease-in-out",
        }}
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
            const hoveredData = payload?.[0]?.payload as PricePoint | undefined;

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
