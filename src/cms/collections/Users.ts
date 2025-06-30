import type { CollectionConfig } from "payload";

import { withAccess } from "../access";

export const Users: CollectionConfig = {
  slug: "users",
  access: {
    read: withAccess("users"),
    create: withAccess("users"),
    update: withAccess("users"),
    delete: withAccess("users"),
  },
  admin: {
    useAsTitle: "email",
    group: "Admin",
  },
  auth: true,
  fields: [
    {
      name: "access",
      type: "group",
      fields: [
        {
          name: "users",
          type: "checkbox",
        },
        {
          name: "content",
          type: "checkbox",
        },
        {
          name: "prices",
          type: "checkbox",
        },
      ],
    },
  ],
};
