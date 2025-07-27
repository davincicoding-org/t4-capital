import type { ListViewServerProps } from "payload";
import { Gutter } from "@payloadcms/ui";

import { addProductPrice, deleteProductPrices } from "@/server/requests/prices";

import { DailyPriceForm } from "./DailyPriceForm";

export default async function PricesAdder({ payload }: ListViewServerProps) {
  const { docs } = await payload.find({
    collection: "products",
    limit: 100,
    select: {
      id: true,
      name: true,
      isin: true,
    },
  });

  const { docs: savedPrices } = await payload.find({
    collection: "product-prices",
    limit: 3 * docs.length,
    where: {
      product: {
        in: docs.map((doc) => doc.id),
      },
    },
    select: {
      id: true,
      date: true,
      price: true,
      product: true,
    },
    depth: 0,
    sort: "-date",
  });

  return (
    <Gutter>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <DailyPriceForm
          products={docs}
          savedPrices={savedPrices}
          onAddPrice={addProductPrice}
          onDeletePrices={deleteProductPrices}
        />
      </div>
    </Gutter>
  );
}
