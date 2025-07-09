"use client";

import { useState } from "react";
import { DateTimeField, Form, FormSubmit, NumberField } from "@payloadcms/ui";
import dayjs from "dayjs";
import { groupBy } from "lodash-es";

import type { Product, ProductPrice } from "@/payload-types";

export interface DailyPriceFormProps {
  products: Pick<Product, "id" | "name" | "isin">[];
  savedPrices: Pick<ProductPrice, "id" | "date" | "price" | "product">[];
  onAddPrice: (data: {
    date: string;
    price: number;
    product: number;
  }) => Promise<ProductPrice>;
  onDeletePrices: (ids: ProductPrice["id"][]) => Promise<void>;
}

export function DailyPriceForm({
  products,
  savedPrices,
  onAddPrice,
  onDeletePrices,
}: DailyPriceFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const groupedSavedPrices = groupBy(savedPrices, "date");
  const dateRows = Object.entries(groupedSavedPrices).map(([date, prices]) => {
    return {
      date,
      prices: prices.reduce<Record<Product["id"], ProductPrice["price"]>>(
        (acc, price) => ({
          ...acc,
          [price.product as number]: price.price,
        }),
        {},
      ),
      ids: prices.map((price) => price.id),
    };
  });

  return (
    <div>
      <Form
        onSubmit={async ({ date: dateField, ...rest }) => {
          const { value: date } = dateField as { value: string };

          const priceFields = rest as Record<
            `prices.${number}`,
            { value: number }
          >;

          setIsLoading(true);
          for (const [key, { value }] of Object.entries(priceFields)) {
            if (value === undefined) continue;
            const [, productId] = key.split(".");
            await onAddPrice({
              date,
              price: value,
              product: Number(productId),
            });
          }
          setIsLoading(false);
          window.location.reload();
        }}
      >
        <div style={{ display: "grid", gap: "1rem" }}>
          <DateTimeField
            path="date"
            field={{
              name: "date",
              label: "Date",
              type: "date",
              required: true,
              admin: {
                placeholder: "Select Date",
                date: {
                  displayFormat: "dd.MM.yyyy",
                  pickerAppearance: "dayOnly",
                  maxDate: new Date(),
                },
              },
            }}
            validate={(value) => {
              if (!value) return "Date is required";
              return true;
            }}
          />

          <fieldset
            style={{
              display: "grid",
              gap: "1rem",
              borderRadius: "0.5rem",
              padding: "1rem",
            }}
          >
            {products.map((product) => (
              <NumberField
                key={product.id}
                path={`prices.${product.id}`}
                field={{
                  label: `${product.isin} (${product.name})`,
                  name: product.id.toString(),
                  type: "number",
                  required: true,
                  admin: {
                    autoComplete: false,
                    placeholder: "Enter Price",
                    step: 1,
                  },
                }}
                validate={(value) => {
                  if (!value) return "Price is required";
                  return true;
                }}
              />
            ))}
          </fieldset>
        </div>
        <FormSubmit disabled={isLoading}>Save</FormSubmit>
      </Form>

      <table>
        <thead>
          <tr>
            <th style={{ textAlign: "left", paddingInline: "0.5rem" }}>Date</th>
            {products.map((product) => (
              <th
                key={product.id}
                style={{
                  paddingInline: "0.5rem",
                  textAlign: "right",
                }}
              >
                {product.name}
              </th>
            ))}
            <th />
          </tr>
        </thead>
        <tbody>
          {dateRows.map((row) => (
            <tr key={row.date}>
              <td style={{ paddingInline: "0.5rem" }}>
                {dayjs(row.date).format("DD.MM.YYYY")}
              </td>
              {products.map((product) => (
                <td
                  key={product.id}
                  style={{
                    paddingInline: "0.5rem",
                    textAlign: "right",
                  }}
                >
                  {row.prices[product.id]?.toFixed(0)}
                </td>
              ))}
              <td>
                <button
                  style={{
                    cursor: "pointer",
                  }}
                  onClick={async () => {
                    await onDeletePrices(row.ids);
                    window.location.reload();
                  }}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
