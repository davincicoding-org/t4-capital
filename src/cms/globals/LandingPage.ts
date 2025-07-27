import type { GlobalConfig } from "payload";

import { revalidateCache } from "@/server/cache";

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
          label: "Articles",
          fields: [
            {
              name: "articles",
              type: "array",
              label: false,
              fields: [
                {
                  name: "url",
                  type: "text",
                  required: true,
                },
                {
                  name: "logo",
                  type: "upload",
                  relationTo: "media",
                  required: true,
                },
              ],
            },
          ],
        },
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
              interfaceName: "TeamMembers",
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
        {
          label: "Advisors",
          fields: [
            {
              name: "advisors",
              label: "Members",
              type: "array",
              dbName: "advisors",
              required: true,
              interfaceName: "Advisors",
              fields: [
                {
                  name: "name",
                  type: "text",
                  required: true,
                },
                {
                  name: "description",
                  type: "textarea",
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
