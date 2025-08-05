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
import { intlPlugin } from "payload-intl";
import sharp from "sharp";

import {
  Disclaimers,
  Files,
  LegalPages,
  Media,
  ProductPrices,
  Products,
  Strategies,
  Users,
} from "@/cms/collections";
import { LandingPage } from "@/cms/globals";
import { env } from "@/env";
import { revalidateCache } from "@/server/cache";

import { withAccess } from "./cms/access";
import { MESSAGES } from "./i18n/messages";

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
    locales: ["en"],
    defaultLocale: "en",
  },
  globals: [LandingPage],
  collections: [
    Media,
    Files,
    Strategies,
    Products,
    Disclaimers,
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
    intlPlugin({
      schema: MESSAGES,
      editorAccess: (req) => withAccess("content")({ req }),
      hooks: {
        afterUpdate: () => revalidateCache("messages"),
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
        messages: {
          prefix: "messages",
          generateFileURL: async ({ filename, prefix }) =>
            `${env.SUPABASE_URL}/storage/v1/object/public/${env.S3_BUCKET}/${prefix}/${filename}`,
        },
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
