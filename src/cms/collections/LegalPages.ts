import type { CollectionConfig } from "payload";

import { revalidateCache } from "@/server/actions";

import { authenticated, withAccess } from "../access";

export const LegalPages: CollectionConfig = {
  slug: "legal-pages",
  access: {
    read: authenticated,
    create: withAccess("users"),
    update: authenticated,
    delete: withAccess("users"),
  },
  admin: {
    useAsTitle: "title",
    group: "Pages",
    defaultColumns: ["title", "slug", "updatedAt"],
  },
  labels: {
    singular: "Legal Page",
    plural: "Legal",
  },
  fields: [
    {
      type: "row",
      fields: [
        {
          name: "slug",
          type: "text",
          required: true,
          unique: true,
          // TODO maybe localize
          admin: {
            width: 120,
          },
        },
        {
          name: "title",
          type: "text",
          required: true,
          localized: true,
        },
      ],
    },
    {
      name: "content",
      type: "richText",
      required: true,
      localized: true,
    },
    {
      name: "navigation",
      type: "group",
      required: true,
      fields: [
        {
          type: "row",
          fields: [
            {
              name: "label",
              type: "text",
            },
            {
              name: "order",
              type: "number",
              min: 0,
            },
          ],
        },
      ],
    },
  ],
  hooks: {
    afterChange: [() => revalidateCache("legal-pages")],
  },
};
