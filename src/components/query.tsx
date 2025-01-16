"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export const qc = new QueryClient();

export default function QueryClientProviderWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return <QueryClientProvider client={qc}>{children}</QueryClientProvider>;
}
