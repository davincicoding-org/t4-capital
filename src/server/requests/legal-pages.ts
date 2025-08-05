"use server";

import type { TypedLocale } from "payload";

import type { LegalPage } from "@/payload-types";

import { cachedRequest } from "../cache";
import { getPayloadClient } from "../payload";

export const fetchLegalPage = cachedRequest(
  async (slug: LegalPage["slug"], locale: TypedLocale) => {
    const payload = await getPayloadClient();
    const {
      docs: [data],
    } = await payload.find({
      collection: "legal-pages",
      where: {
        slug: {
          equals: slug,
        },
      },
      locale,
    });

    return data;
  },
  ["legal-pages"],
);

export const fetchLegalPagesLinks = cachedRequest(
  async (locale: TypedLocale) => {
    const payload = await getPayloadClient();
    const { docs } = await payload.find({
      collection: "legal-pages",
      sort: "navigation.order",
      locale,
      select: {
        title: true,
        slug: true,
        navigation: true,
      },
    });

    return docs.map(({ title, slug, navigation }) => ({
      label: navigation.label ?? title,
      slug,
    }));
  },
  ["legal-pages"],
);
