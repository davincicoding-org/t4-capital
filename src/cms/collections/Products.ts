import type { CollectionConfig } from "payload";

import { withAccess } from "@/cms/access";
import { revalidateCache } from "@/server/actions";

export const Products: CollectionConfig = {
  slug: "products",
  access: {
    read: withAccess("content"),
    create: withAccess("content"),
    update: withAccess("content"),
    delete: withAccess("content"),
  },
  admin: {
    useAsTitle: "name",
    defaultColumns: ["name", "isin", "password", "strategy", "updatedAt"],
  },
  defaultSort: "name",
  fields: [
    {
      name: "name",
      type: "text",
      required: true,
      unique: true,
    },
    {
      name: "isin",
      type: "text",
      required: true,
      unique: true,
    },
    {
      name: "password",
      type: "text",
      required: true,
      unique: true,
    },
    {
      name: "strategy",
      type: "relationship",
      relationTo: "strategies",
      required: true,
    },
  ],
  indexes: [
    {
      fields: ["password"],
      unique: true,
    },
  ],
  hooks: {
    afterChange: [() => revalidateCache("products")],
  },
};
