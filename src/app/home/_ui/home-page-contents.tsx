"use client";

import { SignoutButton } from "@/components/auth/signout-button";

// =============================================================================
// HOME PAGE CONTENTS - Client component for the authenticated home page
// =============================================================================
//
// WHY: Separates client-side interactivity from server-side auth checks.
// This component can use hooks and handle user interactions.
//
// EXTEND THIS:
//   - Add user profile display
//   - Show tRPC data with useTRPC hook
//   - Add navigation to other protected routes
// =============================================================================

export const HomePageContents = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen w-full gap-4">
      <h1 className="text-2xl font-bold">Welcome to the Home Page</h1>
      <p className="text-muted-foreground">You are now authenticated!</p>
      <SignoutButton />
    </div>
  );
};
