"use client";

import { useSearchParams } from "next/navigation";
import { FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";

import { authClient } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";

// =============================================================================
// LOGIN BUTTONS - OAuth provider sign-in buttons
// =============================================================================
//
// WHY: Provides social login options for GitHub and Google OAuth.
// Uses Better Auth's client-side signIn.social method.
//
// RETURN TO:
//   - Reads returnTo from URL search params
//   - After login, user is redirected to their original destination
//   - Defaults to /home if no returnTo specified
//
// ADDING MORE PROVIDERS:
//   1. Configure provider in src/lib/auth.ts
//   2. Add button here with appropriate icon
//   3. Call authClient.signIn.social({ provider: "provider-name" })
// =============================================================================

export const LoginButtons = () => {
  const searchParams = useSearchParams();
  const returnTo = searchParams.get("returnTo") || "/home";

  const signinWithGithub = async () =>
    await authClient.signIn.social({
      callbackURL: decodeURIComponent(returnTo),
      provider: "github",
    });

  const signinWithGoogle = async () =>
    await authClient.signIn.social({
      callbackURL: decodeURIComponent(returnTo),
      provider: "google",
    });

  return (
    <div className="flex items-center justify-between">
      <Button className="w-[45%]" onClick={signinWithGithub} variant="outline">
        <FaGithub />
        Github
      </Button>
      <Button className="w-[45%]" onClick={signinWithGoogle} variant="outline">
        <FcGoogle />
        Google
      </Button>
    </div>
  );
};
