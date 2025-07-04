import type { Metadata } from "next";
import { cookies } from "next/headers";
import { getLocale } from "next-intl/server";

import { fetchPricesPage, fetchProductData } from "@/server/actions";
import { ProductLogin, ProductPrices } from "@/ui/prices";
import { resolveMetadata } from "@/utils/resolveMetadata";

export const generateMetadata = async (): Promise<Metadata> => {
  const locale = await getLocale();
  const { meta } = await fetchPricesPage(locale);
  return resolveMetadata(meta);
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

  const data = await fetchProductData(Number(productCookie.value));

  const locale = await getLocale();
  const { disclaimer } = await fetchPricesPage(locale);

  return (
    <main className="grid min-h-screen p-8 max-sm:p-4">
      <ProductPrices
        isin={data.isin}
        strategy={data.strategy}
        prices={data.prices}
        returns={data.returns}
        performance={data.performance}
        className="m-auto"
        disclaimer={disclaimer}
      />
    </main>
  );
}
