import { ErrorBoundary } from "react-error-boundary";
import { Suspense } from "react";

import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { getQueryClient } from "@/trpc/server";
import { getSession, redirectToLogin } from "@/lib/auth";

import { HomePageContents } from "./_ui/home-page-contents";

// =============================================================================
// HOME PAGE - Protected authenticated page
// =============================================================================
//
// WHY: Demonstrates the pattern for protected pages with tRPC data fetching.
// Server component handles auth check and prefetching.
//
// PROTECTION:
//   - getSession() checks authentication on the server
//   - redirectToLogin() redirects unauthenticated users with returnTo
//
// HYDRATION:
//   - HydrationBoundary transfers server-prefetched data to client
//   - getQueryClient() provides the server-side query client
//   - dehydrate() serializes the cache for transfer
//
// ERROR HANDLING:
//   - ErrorBoundary catches rendering errors
//   - Suspense handles async loading states
// =============================================================================

const HomePage = async () => {
  const session = await getSession();

  if (!session) redirectToLogin("/home");

  const queryClient = getQueryClient();

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ErrorBoundary fallback={<div>There was an error</div>}>
        <Suspense fallback={<div>Loading...</div>}>
          <HomePageContents />
        </Suspense>
      </ErrorBoundary>
    </HydrationBoundary>
  );
};

export default HomePage;
