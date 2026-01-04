"use client";

import React, { useState } from "react";
import superjson from "superjson";
import { createTRPCClient, httpBatchLink } from "@trpc/client";
import { createTRPCContext } from "@trpc/tanstack-react-query";
import type { QueryClient } from "@tanstack/react-query";
import { QueryClientProvider } from "@tanstack/react-query";

import { AppRouter } from "../server/routers/_app";
import { makeQueryClient } from "./query-client";

// =============================================================================
// CLIENT-SIDE TRPC - React hooks and providers for tRPC
// =============================================================================
//
// WHY: This sets up tRPC for use in Client Components with React hooks.
// It creates the provider that wraps your app and the hooks for data fetching.
//
// TRPC CONTEXT:
//   - createTRPCContext creates useTRPC hook and TRPCProvider
//   - useTRPC gives access to all your typed procedures
//
// QUERY CLIENT SINGLETON:
//   - On server: new client each request (no shared state)
//   - On client: reuse same client (caching works)
//
// HTTP BATCH LINK:
//   - Batches multiple tRPC calls into single HTTP request
//   - Reduces network overhead when fetching multiple queries
// =============================================================================

export const { TRPCProvider, useTRPC } = createTRPCContext<AppRouter>();

let clientQueryClientSingleton: QueryClient;

function getQueryClient() {
  if (typeof window === "undefined") {
    // Server: always make a new query client
    return makeQueryClient();
  }
  // Browser: reuse the same query client
  return (clientQueryClientSingleton ??= makeQueryClient());
}

function getUrl() {
  const base = (() => {
    if (typeof window !== "undefined") return "";
    if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
    return "http://localhost:3000";
  })();
  return `${base}/api/trpc`;
}

export const TRPCReactProvider = (
  props: Readonly<{
    children: React.ReactNode;
  }>
) => {
  const queryClient = getQueryClient();
  const [trpcClient] = useState(() =>
    createTRPCClient<AppRouter>({
      links: [
        httpBatchLink({
          transformer: superjson,
          url: getUrl(),
        }),
      ],
    })
  );

  return (
    <QueryClientProvider client={queryClient}>
      <TRPCProvider queryClient={queryClient} trpcClient={trpcClient}>
        {props.children}
      </TRPCProvider>
    </QueryClientProvider>
  );
};
