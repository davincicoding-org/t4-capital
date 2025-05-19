import type { MessagesSchema } from "ra-messages";

export const SUPPORTED_LOCALES: [string, ...string[]] = ["en"];

export const MESSAGES_SCHEMA = {
  meta: {
    title: "short",
    description: "long",
  },
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
  prices: {
    disclaimer: "rich",
  },
  imprint: {
    title: "short",
    content: "rich",
  },
  privacy: {
    title: "short",
    content: "rich",
  },
} satisfies MessagesSchema;
