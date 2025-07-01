import type { MessagesSchema } from "payload-polyglot";

export const SUPPORTED_LOCALES = ["en"] as const;

export type SupportedLocale = (typeof SUPPORTED_LOCALES)[number];

export const MESSAGES_SCHEMA = {
  header: {
    login: "short",
    newsletter: "short",
  },
  headline: "long",
  strategies: {
    title: "short",
    headline: "long",
    "attachment-button": "short",
    "video-button": "short",
  },
  about: {
    title: "short",
    content: ["long", "<Logo></Logo>"],
    founders: "long",
  },
  advisors: {
    title: "short",
    description: "long",
  },
  footer: {
    contact: "short",
    copyright: "short",
    cta: {
      newsletter: "short",
      follow: "short",
    },
  },
  newsletter: {
    title: "short",
    description: "long",
    fields: {
      firstname: "short",
      lastname: "short",
      email: "short",
    },
    submit: "short",
    success: "short",
    error: "short",
  },
} satisfies MessagesSchema;
