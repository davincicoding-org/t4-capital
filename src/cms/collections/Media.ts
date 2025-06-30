import type { CollectionConfig } from "payload";

import type { Media as MediaType } from "@/payload-types";
import { withAccess } from "@/cms/access";

export const Media: CollectionConfig = {
  slug: "media",
  access: {
    read: withAccess("content"),
    create: withAccess("content"),
    update: withAccess("content"),
    delete: withAccess("content"),
  },
  admin: {
    group: "Assets",
    defaultColumns: [
      "thumbnail",
      "filename",
      "mimeType",
      "description",
      "filesize",
      "updatedAt",
    ],
  },
  fields: [
    {
      name: "description",
      type: "text",
      localized: true,
    },
  ],
  hooks: {
    afterDelete: [
      async ({ doc }) => {
        const { url } = doc as MediaType;
        if (!url) return;
        await fetch(url, { method: "DELETE" });
      },
    ],
  },
  upload: {
    adminThumbnail: "thumbnail",
    focalPoint: true,
    formatOptions: {
      format: "webp",
      options: {
        preset: "photo",
        smartSubsample: true,
      },
    },
    resizeOptions: {
      width: 2048,
      withoutEnlargement: true,
    },
    withMetadata: true,
    imageSizes: [
      { name: "thubmnail", width: 300 },
      {
        name: "og",
        width: 1200,
        height: 630,
      },
    ],
  },
};
