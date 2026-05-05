import { config } from 'dotenv;
import { defineConfig } from "drizzle-kit";

// =============================================================================
// DRIZZLE KIT CONFIGURATION - Database migrations and introspection
// =============================================================================
//
// WHY: drizzle-kit needs this config to know where your schema is and how to
// connect to your database for migrations, pushing schema, and studio.
//
// COMMANDS:
//   - npx drizzle-kit push: Push schema changes directly to database
//   - npx drizzle-kit generate: Generate migration SQL files
//   - npx drizzle-kit migrate: Run pending migrations
//   - npx drizzle-kit studio: Open Drizzle Studio GUI
//
// PUSH VS MIGRATE:
//   - push: Great for development, applies changes directly
//   - migrate: Better for production, creates versioned migration files
// =============================================================================

config({path: "./env.local"});

export default defineConfig({
  out: "./drizzle",
  schema: "./src/db/schema.ts",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
});
