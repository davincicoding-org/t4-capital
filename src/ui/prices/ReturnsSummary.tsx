"use client";

import { Button, Modal, ScrollArea, Table } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

import type { Product, Strategy } from "@/payload-types";

import {
  type PricePoint,
  type ProductPerformance,
  type YearlyReturn,
} from "../types";

dayjs.extend(relativeTime);

export interface ProductSummaryProps {
  isin: Product["isin"];
  strategy: Pick<Strategy, "title" | "color" | "launchDate">;
  prices: PricePoint[];
  returns: YearlyReturn[];
  performance: ProductPerformance;
}

export function ReturnsSummary({ data }: { data: Array<YearlyReturn> }) {
  const [isOpen, { open, close }] = useDisclosure();

  return (
    <>
      <Button size="compact-sm" variant="outline" color="black" onClick={open}>
        RETURNS
      </Button>
      <Modal
        opened={isOpen}
        centered
        size="auto"
        radius="md"
        withCloseButton={false}
        onClose={close}
        classNames={{ body: "p-0" }}
      >
        <ScrollArea scrollbars="x" classNames={{ viewport: "pb-2" }}>
          <Table highlightOnHover>
            <Table.Thead>
              <Table.Tr>
                <Table.Th className="sticky left-0 backdrop-blur-sm" />
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
                <Table.Th className="text-center" />
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
              {data.map(({ year, months, overall }) => (
                <Table.Tr key={year}>
                  <Table.Td className="sticky left-0 font-medium backdrop-blur-sm">
                    {year}
                  </Table.Td>
                  {months.map((value, index) => (
                    <Table.Td className="text-right" key={index}>
                      {value !== null ? `${value.toFixed(1)}%` : ""}
                    </Table.Td>
                  ))}
                  <Table.Td className="text-right font-bold">
                    {overall !== null ? `${overall.toFixed(1)}%` : ""}
                  </Table.Td>
                </Table.Tr>
              ))}
            </Table.Tbody>
          </Table>
        </ScrollArea>
      </Modal>
    </>
  );
}
