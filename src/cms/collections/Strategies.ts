import type { CollectionConfig } from "payload";

import { withAccess } from "@/cms/access";
import { revalidateCache } from "@/server/actions";

export const Strategies: CollectionConfig = {
  slug: "strategies",
  access: {
    read: withAccess("content"),
    create: withAccess("content"),
    update: withAccess("content"),
    delete: withAccess("content"),
  },
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "launchDate", "updatedAt"],
  },
  fields: [
    {
      name: "title",
      type: "text",
      required: true,
      unique: true,
    },
    {
      name: "description",
      type: "text",
      required: true,
      localized: true,
    },
    {
      name: "launchDate",
      type: "date",
      required: true,
      admin: {
        date: {
          displayFormat: "dd.MM.yyyy",
        },
      },
    },

    // TODO delete file when deck changes
    {
      name: "deck",
      type: "relationship",
      relationTo: "files",
      required: true,
      // TODO ensure only pdfs can be selected
    },
    {
      type: "row",
      fields: [
        {
          name: "order",
          type: "number",
          required: true,
        },
        {
          name: "color",
          type: "select",
          required: true,
          options: ["blue", "pink", "yellow"],
        },
        {
          name: "video",
          type: "relationship",
          relationTo: "media",
          // TODO ensure only videos can be selected
        },
      ],
    },
    {
      name: "pricesDisclaimer",
      type: "richText",
      localized: true,
      required: true,
    },
  ],
  hooks: {
    afterChange: [() => revalidateCache("strategies")],
  },
};
