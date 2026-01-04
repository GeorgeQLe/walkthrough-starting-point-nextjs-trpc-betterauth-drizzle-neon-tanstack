import { redirect } from "next/navigation";
import { Suspense } from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getSession } from "@/lib/auth";
import { LoginButtons } from "@/components/auth/login-buttons";

// =============================================================================
// LOGIN PAGE - Authentication entry point
// =============================================================================
//
// WHY: Provides a clean login UI with social OAuth options.
// Server component checks session and redirects authenticated users.
//
// FLOW:
//   1. User visits /login (or is redirected here from protected route)
//   2. Server checks if already authenticated
//   3. If authenticated, redirect to /home
//   4. If not, show login options
//   5. User clicks OAuth button, completes flow
//   6. Redirected back to returnTo URL or /home
//
// SUSPENSE:
//   - LoginButtons uses useSearchParams which needs Suspense
//   - Fallback shows empty space to prevent layout shift
// =============================================================================

const LoginPage = async () => {
  const session = await getSession();

  if (session) redirect("/home");

  return (
    <div className="flex items-center justify-center min-h-screen w-full">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>Create an account</CardTitle>
          <CardDescription>Using your preferred login method</CardDescription>
        </CardHeader>
        <CardContent>
          <Suspense fallback={<div className="h-9" />}>
            <LoginButtons />
          </Suspense>
        </CardContent>
      </Card>
    </div>
  );
};

export default LoginPage;
