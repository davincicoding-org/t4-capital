import type { CollectionConfig } from "payload";

import { revalidateCache } from "@/server/actions";

import { withAccess } from "../access";

export const Disclaimers: CollectionConfig = {
  slug: "disclaimers",
  access: {
    read: withAccess("content"),
    create: withAccess("content"),
    update: withAccess("content"),
    delete: withAccess("content"),
  },
  admin: {
    useAsTitle: "strategy",
    defaultColumns: ["strategy", "updatedAt"],
  },
  fields: [
    {
      name: "strategy",
      type: "relationship",
      relationTo: "strategies",
      required: true,
      unique: true,
    },
    {
      name: "content",
      type: "richText",
      required: true,
      localized: true,
    },
  ],
  hooks: {
    afterChange: [() => revalidateCache("disclaimers")],
  },
};
