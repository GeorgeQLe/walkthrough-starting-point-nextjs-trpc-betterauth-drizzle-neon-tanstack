import { drizzle } from "drizzle-orm/neon-http";

import * as schema from "./schema";

// =============================================================================
// DATABASE CONNECTION - Drizzle ORM with Neon Serverless
// =============================================================================
//
// WHY: Creates a single database instance that can be imported throughout the app.
// Neon's HTTP driver is designed for serverless environments where connections
// are short-lived and you can't maintain persistent connection pools.
//
// NEON HTTP VS WEBSOCKET:
//   - neon-http: Best for serverless, each query is an HTTP request
//   - neon-websocket: Better for long-running processes, maintains connection
//   - We use HTTP because Next.js API routes are serverless by default
//
// SCHEMA IMPORT:
//   - Importing schema enables type-safe queries with relations
//   - db.query.user.findMany() works because schema is passed to drizzle()
// =============================================================================

export const db = drizzle(process.env.DATABASE_URL as string, { schema });
