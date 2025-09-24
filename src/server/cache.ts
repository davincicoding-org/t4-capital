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

export const revalidateCache = async (tag: CacheTag) => {
  try {
    console.log(
      `[Cache] Revalidating tag: ${tag} at ${new Date().toISOString()}`,
    );
    revalidateTag(tag);
    console.log(`[Cache] Successfully revalidated tag: ${tag}`);
  } catch (error) {
    console.error(`[Cache] Failed to revalidate tag: ${tag}`, error);
  }
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const cachedRequest = <T extends (...args: any[]) => Promise<any>>(
  fn: T,
  tags?: CacheTag[],
  options?: { revalidate?: number | false },
): T =>
  unstable_cache(fn, undefined, {
    tags,
    revalidate: options?.revalidate ?? false,
  });
