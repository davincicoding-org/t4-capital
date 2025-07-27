import { revalidateTag, unstable_cache } from "next/cache";

export type CacheTag =
  | "cms"
  | "messages"
  | "prices"
  | "strategies"
  | "disclaimers"
  | "products"
  | "landing-page"
  | "legal-pages";

export const revalidateCache = async (tag: CacheTag) => revalidateTag(tag);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const cachedRequest = <T extends (...args: any[]) => Promise<any>>(
  fn: T,
  tags?: CacheTag[],
): T =>
  unstable_cache(fn, undefined, {
    revalidate: false,
    tags,
  });
