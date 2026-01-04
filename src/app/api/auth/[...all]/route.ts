import { auth } from "@/lib/auth";
import { toNextJsHandler } from "better-auth/next-js";

// =============================================================================
// BETTER AUTH API ROUTE - Catch-all handler for auth endpoints
// =============================================================================
//
// WHY: Better Auth needs a catch-all route to handle all authentication
// endpoints like sign-in, sign-out, callbacks, and session management.
//
// ENDPOINTS HANDLED:
//   - GET/POST /api/auth/session - Get current session
//   - POST /api/auth/sign-in/* - Sign in with various providers
//   - POST /api/auth/sign-out - Sign out
//   - GET /api/auth/callback/* - OAuth callback handlers
//
// HOW IT WORKS:
//   - toNextJsHandler converts Better Auth's handler to Next.js format
//   - The [...all] catch-all segment captures all /api/auth/* requests
//   - Both GET and POST are exported to handle different auth operations
// =============================================================================

export const { GET, POST } = toNextJsHandler(auth.handler);
