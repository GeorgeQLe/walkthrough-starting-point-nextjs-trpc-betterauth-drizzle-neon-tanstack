import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { db } from "@/db";

// =============================================================================
// BETTER AUTH CONFIGURATION - Server-side auth setup
// =============================================================================
//
// WHY: Better Auth provides a modern, flexible authentication system that works
// seamlessly with Drizzle ORM. It handles OAuth flows, session management, and
// user data persistence.
//
// DRIZZLE ADAPTER:
//   - Connects Better Auth to our Drizzle database
//   - provider: "pg" tells it we're using Postgres
//   - Automatically uses the schema tables we defined
//
// SOCIAL PROVIDERS:
//   - GitHub and Google OAuth configured via environment variables
//   - Callback URLs are automatically handled at /api/auth/callback/[provider]
//   - Add more providers as needed (Discord, Twitter, etc.)
// =============================================================================

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg",
  }),
  pages: {
    signIn: "/login",
  },
  socialProviders: {
    github: {
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
    },
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    },
  },
});

// =============================================================================
// HELPER FUNCTIONS - Server-side auth utilities
// =============================================================================

/**
 * Get the current session on the server
 * Use this in Server Components and API routes
 */
export const getSession = async () =>
  auth.api.getSession({
    headers: await headers(),
  });

/**
 * Redirects to login with the current path as returnTo parameter
 *
 * This function is used to redirect unauthenticated users to the login page
 * while preserving their intended destination and any query parameters.
 * After successful login, the user will be redirected back to the original page.
 *
 * @param currentPath - The current page path that user should return to after login
 * @param searchParams - Optional search parameters to preserve in the redirect
 * @returns never - This function always redirects and never returns
 */
export function redirectToLogin(
  currentPath: string,
  searchParams?: { [key: string]: string | string[] | undefined }
): never {
  let fullPath = currentPath;

  if (searchParams) {
    const params = new URLSearchParams();

    Object.entries(searchParams).forEach(([key, value]) => {
      if (value !== undefined) {
        if (Array.isArray(value)) {
          value.forEach((v) => params.append(key, v));
        } else {
          params.set(key, value);
        }
      }
    });

    const queryString = params.toString();
    if (queryString) {
      fullPath = `${currentPath}?${queryString}`;
    }
  }

  const returnTo = encodeURIComponent(fullPath);
  redirect(`/login?returnTo=${returnTo}`);
}
