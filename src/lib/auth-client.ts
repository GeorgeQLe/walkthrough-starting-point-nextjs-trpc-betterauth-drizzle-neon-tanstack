import { createAuthClient } from "better-auth/react";

// =============================================================================
// BETTER AUTH CLIENT - Client-side auth utilities
// =============================================================================
//
// WHY: The auth client provides React hooks and methods for client-side
// authentication operations like signing in, signing out, and checking session.
//
// USAGE:
//   import { authClient } from "@/lib/auth-client";
//
//   // Sign in with OAuth
//   authClient.signIn.social({ provider: "github" });
//
//   // Sign out
//   authClient.signOut();
//
//   // Get session (hook)
//   const { data: session } = authClient.useSession();
// =============================================================================

export const authClient = createAuthClient({
  // Client configuration options can be added here
  // baseURL is automatically inferred from the current origin
});
