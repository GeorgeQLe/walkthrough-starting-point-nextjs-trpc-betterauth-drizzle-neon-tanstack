"use client";

import { useRouter } from "next/navigation";

import { authClient } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";

// =============================================================================
// SIGNOUT BUTTON - Client component for signing out
// =============================================================================
//
// WHY: Provides a clean way to sign out and redirect to login.
// Uses Better Auth's client-side signOut method.
//
// FLOW:
//   1. User clicks button
//   2. authClient.signOut() clears session
//   3. onSuccess callback redirects to /login
// =============================================================================

export const SignoutButton = () => {
  const router = useRouter();

  const signout = async () =>
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => router.push("/login"),
      },
    });

  return (
    <Button onClick={signout} variant="outline">
      Sign Out
    </Button>
  );
};
