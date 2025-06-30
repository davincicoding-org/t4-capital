import type { GlobalConfig } from "payload";

import { revalidateCache } from "@/server/actions";

import { withAccess } from "../access";

export const PricesPage: GlobalConfig = {
  slug: "prices-page",
  admin: {
    group: "Pages",
  },
  label: "Prices",
  access: {
    read: withAccess("content"),
    update: withAccess("content"),
  },
  fields: [
    {
      name: "content",
      label: false,
      type: "richText",
      localized: true,
      required: true,
    },
  ],
  hooks: {
    afterChange: [() => revalidateCache("prices-page")],
  },
};
