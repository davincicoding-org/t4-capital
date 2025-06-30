import type { ClassValue } from "clsx";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const ensureResolved = <T>(value: T | number): T | undefined =>
  typeof value === "number" ? undefined : value;

export const ensureResolvedArray = <T>(
  values: (T | number)[] | undefined | null,
): T[] =>
  (values ?? []).filter((value): value is T => typeof value !== "number");
