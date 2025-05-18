"use client";

import type { PropsWithChildren } from "react";
import {
  QueryClientProvider as Provider,
  QueryClient,
} from "@tanstack/react-query";

const queryClient = new QueryClient();

export function QueryClientProvider({ children }: PropsWithChildren) {
  return <Provider client={queryClient}>{children}</Provider>;
}
