import "@mantine/charts/styles.css";
import type { Metadata } from "next";

import { auth } from "@/auth";

import { PasswordDialog } from "./PasswordDialog";
import { ProductSummary } from "./ProductSummary";
import { getProductSummaries } from "./service";

export const metadata: Metadata = {
  robots: {
    index: false,
  },
};

export default async function PricesPage() {
  const session = await auth();

  const products =
    session &&
    (await getProductSummaries()).filter(({ isin }) =>
      session.user?.name ? isin.endsWith(session.user.name) : false,
    );

  return (
    <main className="container grid min-h-screen py-8 max-sm:px-4">
      <PasswordDialog open={!session} />
      {products ? (
        <div className="m-auto grid w-full gap-6">
          {products.map((product) => (
            <ProductSummary key={product.id} {...product} />
          ))}
        </div>
      ) : null}
    </main>
  );
}
