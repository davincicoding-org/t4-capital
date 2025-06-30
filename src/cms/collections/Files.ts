import type { CollectionConfig } from "payload";

import { withAccess } from "@/cms/access";

export const Files: CollectionConfig = {
  slug: "files",
  access: {
    read: withAccess("content"),
    create: withAccess("content"),
    update: withAccess("content"),
    delete: withAccess("content"),
  },
  admin: {
    group: "Assets",
    defaultColumns: ["filename", "filesize", "updatedAt"],
  },
  fields: [],
  typescript: {
    interface: "UploadedFile",
  },
  upload: {
    mimeTypes: ["application/pdf"],
  },
};
