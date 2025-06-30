import type { GlobalConfig } from "payload";

import { revalidateCache } from "@/server/actions";

import { withAccess } from "../access";

export const Team: GlobalConfig = {
  slug: "team",
  access: {
    read: withAccess("content"),
    update: withAccess("content"),
  },
  fields: [
    {
      name: "members",
      type: "array",
      required: true,
      fields: [
        {
          name: "name",
          type: "text",
          required: true,
        },
        {
          name: "linkedIn",
          type: "text",
          label: "LinkedIn",
          required: true,
        },
      ],
    },
  ],
  hooks: {
    afterChange: [() => revalidateCache("team")],
  },
};
