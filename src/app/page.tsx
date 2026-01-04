import { ErrorBoundary } from "react-error-boundary";
import { redirect } from "next/navigation";
import { Suspense } from "react";

import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { getQueryClient } from "@/trpc/server";
import { getSession } from "@/lib/auth";

import { LandingPageContents } from "./_ui/landing-page-contents";

// =============================================================================
// LANDING PAGE - Public entry point
// =============================================================================
//
// WHY: The main landing page that redirects authenticated users to /home.
// Unauthenticated users see the public landing content.
//
// AUTH CHECK:
//   - getSession() checks if user is logged in
//   - If authenticated, redirect to /home immediately
//   - If not, show the landing page
//
// PATTERN:
//   - Same structure as protected pages for consistency
//   - HydrationBoundary, ErrorBoundary, Suspense
//   - Easy to add prefetched data if needed
// =============================================================================

const LandingPage = async () => {
  const session = await getSession();

  if (session) redirect("/home");

  const queryClient = getQueryClient();

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ErrorBoundary fallback={<div>There was an error</div>}>
        <Suspense fallback={<div>Loading...</div>}>
          <LandingPageContents />
        </Suspense>
      </ErrorBoundary>
    </HydrationBoundary>
  );
};

export default LandingPage;
