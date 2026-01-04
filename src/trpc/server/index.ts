import "server-only";

import { cache } from "react";
import { createTRPCOptionsProxy } from "@trpc/tanstack-react-query";

import { appRouter } from "./routers/_app";
import { createTRPCContext } from "./init";
import { makeQueryClient } from "../client/query-client";

// =============================================================================
// SERVER-SIDE TRPC - For use in Server Components
// =============================================================================
//
// WHY: This creates a tRPC client that can be used directly in Server
// Components without making HTTP requests. It calls procedures directly.
//
// HOW IT WORKS:
//   - createTRPCOptionsProxy creates a proxy that looks like the client API
//   - But instead of HTTP calls, it invokes procedures directly on the server
//   - This enables data fetching in Server Components with full type safety
//
// USAGE IN SERVER COMPONENTS:
//   import { trpc } from "@/trpc/server";
//
//   export default async function Page() {
//     const data = await trpc.user.getProfile.query();
//     return <div>{data.name}</div>;
//   }
// =============================================================================

export const getQueryClient = cache(makeQueryClient);

export const trpc = createTRPCOptionsProxy({
  ctx: createTRPCContext,
  router: appRouter,
  queryClient: getQueryClient,
});
