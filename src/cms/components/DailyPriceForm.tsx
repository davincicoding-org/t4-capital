"use client";

import { DateTimeField, Form, FormSubmit, NumberField } from "@payloadcms/ui";

import type { Product } from "@/payload-types";

export interface DailyPriceFormProps {
  products: Pick<Product, "id" | "name" | "isin">[];
  onAddPrice: (data: { date: string; price: number; product: number }) => void;
}

export function DailyPriceForm({ products, onAddPrice }: DailyPriceFormProps) {
  return (
    <Form
      onSubmit={async ({ date: dateField, ...rest }) => {
        const { value: date } = dateField as { value: string };

        const priceFields = rest as Record<
          `prices.${number}`,
          { value: number }
        >;

        for (const [key, { value }] of Object.entries(priceFields)) {
          if (value === undefined) continue;
          const [, productId] = key.split(".");
          void onAddPrice({
            date,
            price: value,
            product: Number(productId),
          });
        }
        alert("Saved");
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
      <FormSubmit>Save</FormSubmit>
    </Form>
  );
}
