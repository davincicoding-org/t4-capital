"use server";

import type { TypedLocale } from "payload";
import { cookies } from "next/headers";
import { groupBy } from "lodash-es";

import type { Product, ProductPrice, Strategy } from "@/payload-types";
import type { ExportedProductPrices } from "@/types";
import {
  computeSecurityPerformance,
  computeSecurityReturns,
} from "@/utils/prices";

import { cachedRequest } from "../cache";
import { getPayloadClient } from "../payload";

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

export const deleteProductPrices = async (ids: ProductPrice["id"][]) => {
  // TODO secure this endpoint
  // TODO prevent duplicate prices

  const payload = await getPayloadClient();

  await payload.delete({
    collection: "product-prices",
    where: {
      id: { in: ids },
    },
  });
};

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
  async (productId: Product["id"], locale: TypedLocale) => {
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

export const fetchDisclaimer = cachedRequest(
  async (strategyId: Strategy["id"], locale: TypedLocale) => {
    const payload = await getPayloadClient();
    const {
      docs: [disclaimer],
    } = await payload.find({
      collection: "disclaimers",
      select: {
        content: true,
        updatedAt: true,
      },
      where: {
        strategy: {
          equals: strategyId,
        },
      },
      locale,
    });

    return disclaimer ?? null;
  },
  ["disclaimers"],
);

export const fetchProductPriceData = cachedRequest(
  async (productId: Product["id"]) => {
    console.log(
      `[Cache] Fetching product price data for productId: ${productId} at ${new Date().toISOString()}`,
    );
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
  { revalidate: 60 * 60 * 24 },
);

export const exportPrices = async (): Promise<ExportedProductPrices[]> => {
  const payload = await getPayloadClient();
  const { docs: prices } = await payload.find({
    collection: "product-prices",
    pagination: false,
    sort: "date",
  });

  return Object.entries(
    groupBy(prices, ({ product }) => (product as Product).isin),
  ).map(([isin, prices]) => ({
    isin,
    prices: prices.map((price) => ({
      date: price.date.substring(0, 10),
      price: price.price,
    })),
  }));
};
