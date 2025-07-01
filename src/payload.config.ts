import path from "path";
import { fileURLToPath } from "url";
import { postgresAdapter } from "@payloadcms/db-postgres";
import { resendAdapter } from "@payloadcms/email-resend";
import { seoPlugin } from "@payloadcms/plugin-seo";
import {
  AlignFeature,
  BlockquoteFeature,
  BoldFeature,
  ChecklistFeature,
  HeadingFeature,
  HorizontalRuleFeature,
  IndentFeature,
  InlineToolbarFeature,
  ItalicFeature,
  lexicalEditor,
  LinkFeature,
  OrderedListFeature,
  ParagraphFeature,
  UnderlineFeature,
  UnorderedListFeature,
} from "@payloadcms/richtext-lexical";
import { s3Storage } from "@payloadcms/storage-s3";
import { buildConfig } from "payload";
import { polyglotPlugin } from "payload-polyglot";
import sharp from "sharp";

import {
  Files,
  LegalPages,
  Media,
  ProductPrices,
  Products,
  Strategies,
  Users,
} from "@/cms/collections";
import { LandingPage, PricesPage } from "@/cms/globals";
import { env } from "@/env";
import { MESSAGES_SCHEMA, SUPPORTED_LOCALES } from "@/i18n/config";
import { revalidateCache } from "@/server/actions";

import { withAccess } from "./cms/access";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
    components: {
      graphics: {
        Logo: "@/cms/components/AdminLogo",
      },
    },
  },
  localization: {
    locales: [...SUPPORTED_LOCALES],
    defaultLocale: SUPPORTED_LOCALES[0],
  },
  globals: [LandingPage, PricesPage],
  collections: [
    Media,
    Files,
    Strategies,
    Products,
    ProductPrices,
    Users,
    LegalPages,
  ],
  editor: lexicalEditor({
    features: [
      BoldFeature(),
      ItalicFeature(),
      UnderlineFeature(),
      ParagraphFeature(),
      HeadingFeature(),
      AlignFeature(),
      IndentFeature(),
      UnorderedListFeature(),
      OrderedListFeature(),
      ChecklistFeature(),
      LinkFeature(),
      BlockquoteFeature(),
      HorizontalRuleFeature(),
      InlineToolbarFeature(),
    ],
  }),
  secret: env.PAYLOAD_SECRET,
  typescript: {
    outputFile: path.resolve(dirname, "payload-types.ts"),
  },
  db: postgresAdapter({
    pool: {
      connectionString: env.POSTGRES_URL,
    },
    migrationDir: path.resolve(dirname, "cms/migrations"),
  }),
  sharp,
  email: resendAdapter({
    defaultFromAddress: "no-reply@davincicoding.ch",
    defaultFromName: "t4-capital.ch",
    apiKey: env.RESEND_API_KEY,
  }),
  plugins: [
    polyglotPlugin({
      access: {
        read: withAccess("content"),
        create: withAccess("content"),
        update: withAccess("content"),
        delete: withAccess("content"),
      },
      locales: [...SUPPORTED_LOCALES],
      schema: MESSAGES_SCHEMA,
      collection: {
        admin: {
          group: "Assets",
        },
        hooks: {
          afterUpdate: () => revalidateCache("messages"),
        },
      },
    }),
    seoPlugin({
      globals: ["landing-page", "prices-page"],
      collections: ["legal-pages"],
      uploadsCollection: "media",
      tabbedUI: true,
    }),
    s3Storage({
      collections: {
        media: {
          prefix: "media",
          generateFileURL: async ({ filename, prefix }) =>
            `${env.SUPABASE_URL}/storage/v1/object/public/${env.S3_BUCKET}/${prefix}/${filename}`,
        },
        files: {
          prefix: "files",
          generateFileURL: async ({ filename, prefix }) =>
            `${env.SUPABASE_URL}/storage/v1/object/public/${env.S3_BUCKET}/${prefix}/${filename}`,
        },
      },
      bucket: env.S3_BUCKET,
      config: {
        forcePathStyle: true,
        credentials: {
          accessKeyId: env.S3_ACCESS_KEY_ID,
          secretAccessKey: env.S3_SECRET_ACCESS_KEY,
        },
        region: env.S3_REGION,
        endpoint: env.S3_ENDPOINT,
      },
    }),
  ],
});
