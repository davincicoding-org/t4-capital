import type { ClassValue } from "clsx";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const isResolved = <T>(value: T | number): value is T =>
  typeof value !== "number";

export const ensureResolved = <T>(value: T | number): T | undefined =>
  isResolved(value) ? value : undefined;

export const ensureResolvedArray = <T>(
  values: (T | number)[] | undefined | null,
): T[] =>
  (values ?? []).filter((value): value is T => typeof value !== "number");
