import { unstable_cache } from "next/cache";

export type CacheTag = "cms" | "messages" | "strategies" | "team-members";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const cachedRequest = <T extends (...args: any[]) => Promise<any>>(
  fn: T,
  tags: CacheTag[],
): T =>
  unstable_cache(fn, undefined, {
    tags,
  });
