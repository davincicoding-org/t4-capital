import type { ListViewServerProps } from "payload";
import { Gutter } from "@payloadcms/ui";

import { addProductPrice } from "@/server/actions";

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

  return (
    <Gutter>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <DailyPriceForm products={docs} onAddPrice={addProductPrice} />
      </div>
    </Gutter>
  );
}
