"use server";

import { revalidateTag } from "next/cache";

import type { SupportedLocale } from "@/i18n/config";
import type { LegalPage, Product, ProductPrice } from "@/payload-types";
import { computeSecurityPerformance } from "@/utils/computeSecurityPerformance";
import { computeSecurityReturns } from "@/utils/computeSecurityReturns";

import type { CacheTag } from "./cache";
import { cachedRequest } from "./cache";
import { getPayloadClient } from "./payload";

export const revalidateCache = async (tag: CacheTag) => revalidateTag(tag);

// MARK: Requests

export const fetchStrategies = cachedRequest(
  async (locale: SupportedLocale) => {
    const payload = await getPayloadClient();
    const { docs } = await payload.find({
      collection: "strategies",
      sort: "order",
      locale,
      pagination: false,
    });
    return docs;
  },
  ["cms", "strategies"],
);

export const addProductPrice = async (
  prices: Pick<ProductPrice, "product" | "date" | "price">,
) => {
  // TODO secure this endpoint
  const payload = await getPayloadClient();
  await payload.create({
    collection: "product-prices",
    data: prices,
  });
};

export const fetchLandingPage = cachedRequest(
  async (locale: SupportedLocale) => {
    const payload = await getPayloadClient();
    return payload.findGlobal({
      slug: "landing-page",
      locale,
    });
  },
  ["landing-page"],
);

export const fetchLegalPage = cachedRequest(
  async (slug: LegalPage["slug"], locale: SupportedLocale) => {
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
  async (locale: SupportedLocale) => {
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

export const fetchProductByPassword = cachedRequest(
  async (password: Product["password"]) => {
    const payload = await getPayloadClient();
    const {
      docs: [product],
    } = await payload.find({
      collection: "products",
      select: {
        isin: true,
        id: true,
        strategy: true,
      },
      where: {
        password: {
          equals: password,
        },
      },
    });
    return product;
  },
  ["cms", "products"],
);

export const fetchProductPrices = cachedRequest(
  async (productId: Product["id"]) => {
    const payload = await getPayloadClient();
    return payload.find({
      collection: "product-prices",
      select: {
        date: true,
        price: true,
      },
      pagination: false,
      where: {
        product: {
          equals: productId,
        },
      },
      sort: "date",
    });
  },
  ["prices"],
);

export const fetchProductData = cachedRequest(
  async (productId: Product["id"]) => {
    const { docs: prices } = await fetchProductPrices(productId);
    const returns = computeSecurityReturns(prices);

    const performance = computeSecurityPerformance(prices);

    return {
      prices,
      returns,
      performance,
    };
  },
  ["prices", "products"],
);
