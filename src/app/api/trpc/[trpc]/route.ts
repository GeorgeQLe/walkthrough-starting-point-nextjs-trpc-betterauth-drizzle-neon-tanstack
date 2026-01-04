import { fetchRequestHandler } from "@trpc/server/adapters/fetch";

import { appRouter } from "@/trpc/server/routers/_app";
import { createTRPCContext } from "@/trpc/server/init";

// =============================================================================
// TRPC API ROUTE - HTTP handler for tRPC requests
// =============================================================================
//
// WHY: This route handles all tRPC procedure calls from the client.
// The [trpc] dynamic segment captures the procedure path.
//
// HOW IT WORKS:
//   - Client calls /api/trpc/user.getProfile
//   - fetchRequestHandler routes to the correct procedure
//   - Response is serialized and sent back to client
//
// FETCH ADAPTER:
//   - Works with Next.js App Router's fetch-based request handling
//   - Handles both GET (queries) and POST (mutations) requests
// =============================================================================

const handler = (req: Request) =>
  fetchRequestHandler({
    createContext: createTRPCContext,
    endpoint: "/api/trpc",
    req,
    router: appRouter,
  });

export { handler as GET, handler as POST };
