"use client";

import type { TooltipProps } from "recharts";
import { useCallback, useEffect, useState } from "react";
import dayjs from "dayjs";
import { Line, LineChart, ResponsiveContainer, Tooltip, YAxis } from "recharts";

import { type PricePoint } from "../../types";

export interface PriceChartProps {
  prices: Array<PricePoint>;
  color: string;
}

export function PriceChart({ prices, color }: PriceChartProps) {
  const currentPrice = prices[prices.length - 1];
  const [hoveredData, setHoveredData] = useState<PricePoint | undefined>();
  const minPrice = Math.min(...prices.map(({ price }) => price));
  const maxPrice = Math.max(...prices.map(({ price }) => price));
  const priceDelta = maxPrice - minPrice;

  const PriceUpdater = useCallback(
    ({ payload }: TooltipProps<number, string>) => {
      const data = payload?.[0]?.payload as PricePoint | undefined;

      // eslint-disable-next-line react-hooks/rules-of-hooks
      useEffect(() => {
        setHoveredData(data);
      }, [data]);

      return null;
    },
    [],
  );

  const displayedData = hoveredData ?? currentPrice;

  return (
    <div className="grid pt-4">
      {displayedData ? (
        <div className="flex justify-between px-3">
          <span className="text-medium text-xl">${displayedData.price}</span>
          <span>{dayjs(displayedData.date).format("DD.MM.YYYY")}</span>
        </div>
      ) : null}
      <div className="h-36" onPointerLeave={() => setHoveredData(undefined)}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={prices} dataKey="date">
            <Line
              dataKey="price"
              // stroke={color}
              strokeWidth={2}
              dot={false}
              animationDuration={500}
              animationEasing="ease-in-out"
            />
            <YAxis
              hide
              dataKey="price"
              domain={[
                minPrice - priceDelta * 0.1,
                maxPrice + priceDelta * 0.1,
              ]}
            />
            <Tooltip content={PriceUpdater} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
