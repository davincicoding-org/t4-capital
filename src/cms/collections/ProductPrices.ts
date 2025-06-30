import type { CollectionConfig } from "payload";

import { withAccess } from "@/cms/access";
import { revalidateCache } from "@/server/actions";

export const ProductPrices: CollectionConfig = {
  slug: "product-prices",
  access: {
    read: withAccess("prices"),
    create: withAccess("prices"),
    update: withAccess("prices"),
    delete: withAccess("prices"),
  },
  admin: {
    components: {
      views: {
        list: {
          Component: "@/cms/components/PricesAdder",
        },
      },
    },
  },
  labels: {
    singular: "Price",
    plural: "Prices",
  },
  fields: [
    {
      name: "date",
      type: "date",
      required: true,
    },
    {
      name: "price",
      type: "number",
      required: true,
      min: 0,
    },
    {
      name: "product",
      type: "relationship",
      relationTo: "products",
      required: true,
    },
  ],
  indexes: [
    {
      fields: ["product"],
    },
  ],

  hooks: {
    afterChange: [() => revalidateCache("prices")],
  },
};
