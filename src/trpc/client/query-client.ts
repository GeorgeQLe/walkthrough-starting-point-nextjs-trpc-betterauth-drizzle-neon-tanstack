import superjson from "superjson";
import {
  defaultShouldDehydrateQuery,
  QueryClient,
} from "@tanstack/react-query";

// =============================================================================
// QUERY CLIENT FACTORY - Creates TanStack Query clients
// =============================================================================
//
// WHY: TanStack Query manages server state caching, background updates,
// and data synchronization. This factory creates properly configured clients.
//
// SUPERJSON SERIALIZATION:
//   - Needed for Server Component -> Client Component data transfer
//   - Handles complex types that JSON.stringify can't (Dates, Maps, etc.)
//
// DEHYDRATION:
//   - shouldDehydrateQuery includes pending queries for streaming SSR
//   - Allows data to be serialized and sent to client before query completes
//
// STALE TIME:
//   - 30 seconds means data won't refetch if accessed within 30s
//   - Adjust based on how fresh your data needs to be
// =============================================================================

export const makeQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      dehydrate: {
        serializeData: superjson.serialize,
        shouldDehydrateQuery: (query) =>
          defaultShouldDehydrateQuery(query) ||
          query.state.status === "pending",
      },
      hydrate: {
        deserializeData: superjson.deserialize,
      },
      queries: {
        staleTime: 30 * 1000,
      },
    },
  });
