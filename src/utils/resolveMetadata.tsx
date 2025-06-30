import type { Metadata } from "next";

import type { Media } from "@/payload-types";
import { env } from "@/env";
import { ensureResolved } from "@/ui/utils";

export const resolveMetadata = (
  meta:
    | {
        title?: string | null;
        description?: string | null;
        image?: (number | null) | Media;
      }
    | undefined,
): Metadata => {
  if (!meta) return {};

  const image = ensureResolved(meta?.image);

  return {
    metadataBase: new URL(env.BASE_URL),
    title: meta.title ?? undefined,
    description: meta.description ?? undefined,
    openGraph: {
      title: meta.title ?? undefined,
      description: meta.description ?? undefined,
      images: image?.url
        ? [
            {
              url: image.url,
              width: image.width ?? undefined,
              height: image.height ?? undefined,
            },
          ]
        : undefined,
    },
  };
};
