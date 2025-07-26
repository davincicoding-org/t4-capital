import type { Metadata } from "next";
import { cookies } from "next/headers";
import { getLocale } from "next-intl/server";

import {
  fetchDisclaimer,
  fetchProductMetadata,
  fetchProductPriceData,
} from "@/server/actions";
import { ProductLogin, ProductPrices } from "@/ui/prices";
import { isResolved } from "@/ui/utils";

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
  if (!isResolved(strategy)) throw new Error("Strategy is missing");
  const disclaimer = await fetchDisclaimer(strategy.id, locale);

  const { prices, returns, performance } =
    await fetchProductPriceData(productId);

  return (
    <main className="grid h-screen p-4 sm:p-8 md:p-12">
      <ProductPrices
        isin={isin}
        strategy={strategy}
        prices={prices}
        returns={returns}
        performance={performance}
        disclaimer={disclaimer}
        className="m-auto h-full min-h-0"
      />
    </main>
  );
}
