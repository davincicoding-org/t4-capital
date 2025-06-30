import type { GlobalConfig } from "payload";

import { revalidateCache } from "@/server/actions";

import { withAccess } from "../access";

export const LandingPage: GlobalConfig = {
  slug: "landing-page",
  admin: {
    group: "Pages",
  },
  label: "Landing",
  access: {
    read: withAccess("content"),
    update: withAccess("content"),
  },
  fields: [
    {
      type: "group",
      label: "Team",
      fields: [
        {
          name: "teamMembers",
          label: "Members",
          type: "array",
          dbName: "team_members",
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
    },
  ],
  hooks: {
    afterChange: [() => revalidateCache("landing-page")],
  },
};
