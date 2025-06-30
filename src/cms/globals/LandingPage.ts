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
      type: "tabs",
      tabs: [
        {
          label: "Team",
          fields: [
            {
              name: "teamImage",
              type: "upload",
              relationTo: "media",
              // required: true,
            },
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
    },
  ],
  hooks: {
    afterChange: [() => revalidateCache("landing-page")],
  },
};
