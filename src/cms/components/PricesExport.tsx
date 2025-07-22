"use client";

import { Button } from "@payloadcms/ui";

import type { ExportedProductPrices } from "@/types";
import { downloadFile, generateCsvFile, zipFiles } from "@/utils/csv";

export default function ExportPricesButton({
  exportGenerator,
}: {
  exportGenerator: () => Promise<ExportedProductPrices[]>;
}) {
  const handleExport = async () => {
    const products = await exportGenerator();
    const files = products.map((product) =>
      generateCsvFile(product.isin, product.prices, ["date", "price"]),
    );
    const zip = await zipFiles("prices", files);
    downloadFile(zip);
  };

  return (
    <Button size="small" onClick={handleExport}>
      Export
    </Button>
  );
}
