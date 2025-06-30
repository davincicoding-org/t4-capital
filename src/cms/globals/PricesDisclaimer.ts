import type { GlobalConfig } from "payload";

import { revalidateCache } from "@/server/actions";

import { withAccess } from "../access";

export const PricesDisclaimer: GlobalConfig = {
  slug: "prices-disclaimer",
  access: {
    read: withAccess("content"),
    update: withAccess("content"),
  },
  admin: {
    hidden: true,
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
    afterChange: [() => revalidateCache("team")],
  },
};
