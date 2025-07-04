import type { Metadata } from "next";
import { cookies } from "next/headers";
import { getLocale } from "next-intl/server";

import { fetchProductMetadata, fetchProductPriceData } from "@/server/actions";
import { ProductLogin, ProductPrices } from "@/ui/prices";
import { ensureResolved } from "@/ui/utils";

export const metadata: Metadata = {
  robots: {
    index: false,
  },
};

export default async function PricesPage() {
  const cookieStore = await cookies();
  const productCookie = cookieStore.get("product-id");

  if (!productCookie)
    return (
      <main className="h-screen">
        <ProductLogin />
      </main>
    );

  const productId = Number(productCookie.value);

  const locale = await getLocale();
  const { isin, strategy } = await fetchProductMetadata(productId, locale);
  const strategyData = ensureResolved(strategy);
  if (!strategyData) throw new Error("Strategy data is missing");

  const { prices, returns, performance } =
    await fetchProductPriceData(productId);

  return (
    <main className="grid min-h-screen p-8 max-sm:p-4">
      <ProductPrices
        isin={isin}
        strategy={strategyData}
        prices={prices}
        returns={returns}
        performance={performance}
        className="m-auto"
      />
    </main>
  );
}
