import superjson from "superjson";
import { cache } from "react";
import { initTRPC, TRPCError } from "@trpc/server";

import { db } from "@/db";
import { getSession } from "@/lib/auth";

// =============================================================================
// TRPC INITIALIZATION - Server-side tRPC setup
// =============================================================================
//
// WHY: tRPC provides end-to-end type safety between client and server.
// This file sets up the core tRPC infrastructure including context,
// procedures, and middleware.
//
// CONTEXT:
//   - Provides shared data to all procedures (database connection, etc.)
//   - cache() ensures the context is created once per request
//
// SUPERJSON:
//   - Serializes complex types (Dates, Maps, Sets) that JSON can't handle
//   - Enables passing rich data types between client and server
//
// PROCEDURES:
//   - baseProcedure: No auth required, for public endpoints
//   - protectedProcedure: Requires auth, adds user to context
// =============================================================================

export const createTRPCContext = cache(() => ({ db }));

type Context = {
  db: typeof db;
};

const t = initTRPC.context<Context>().create({
  transformer: superjson,
});

export const createTRPCRouter = t.router;
export const createCallerFactory = t.createCallerFactory;
export const baseProcedure = t.procedure;

// Protected procedure that requires authentication
export const protectedProcedure = t.procedure.use(
  t.middleware(async ({ ctx, next }) => {
    const session = await getSession();

    if (!session) {
      throw new TRPCError({
        code: "UNAUTHORIZED",
      });
    }

    return next({
      ctx: {
        ...ctx,
        user: session.user,
      },
    });
  })
);
