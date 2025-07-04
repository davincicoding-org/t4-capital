"use server";

import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";

import type { SupportedLocale } from "@/i18n/config";
import type { LegalPage, Product } from "@/payload-types";
import {
  computeSecurityPerformance,
  computeSecurityReturns,
} from "@/utils/prices";

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

export const addProductPrice = async (data: {
  date: string;
  price: number;
  product: number;
}) => {
  // TODO secure this endpoint
  // TODO prevent duplicate prices

  const payload = await getPayloadClient();

  return payload.create({
    collection: "product-prices",
    data,
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

export const fetchProductIdByPassword = cachedRequest(
  async (password: Product["password"]) => {
    const payload = await getPayloadClient();
    const {
      docs: [product],
    } = await payload.find({
      collection: "products",
      select: {},
      where: {
        password: {
          equals: password,
        },
      },
    });

    return product?.id;
  },
  ["products"],
);

export const unlockProductData = async (password: Product["password"]) => {
  const productId = await fetchProductIdByPassword(password);

  if (!productId)
    return {
      success: false,
    };

  const cookieStore = await cookies();

  cookieStore.set("product-id", productId.toString(), {
    httpOnly: true,
    maxAge: 10,
    sameSite: "lax",
    path: "/prices",
  });

  return {
    success: true,
  };
};

export const fetchProductMetadata = cachedRequest(
  async (productId: Product["id"], locale: SupportedLocale) => {
    const payload = await getPayloadClient();
    return await payload.findByID({
      collection: "products",
      select: {
        strategy: true,
        isin: true,
      },
      id: productId,
      locale,
    });
  },
  ["products", "strategies"],
);

export const fetchProductPriceData = cachedRequest(
  async (productId: Product["id"]) => {
    const payload = await getPayloadClient();
    const { docs: prices } = await payload.find({
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

    const returns = computeSecurityReturns(prices);
    const performance = computeSecurityPerformance(prices);

    return {
      prices,
      returns,
      performance,
    };
  },
  ["prices"],
);
