"use client";

import Link from "next/link";

import { Button } from "@/components/ui/button";

// =============================================================================
// LANDING PAGE CONTENTS - Public landing page UI
// =============================================================================
//
// WHY: Client component for the public landing page with interactive elements.
// Provides entry point for unauthenticated users.
//
// EXTEND THIS:
//   - Add feature highlights
//   - Add pricing information
//   - Add testimonials
//   - Add call-to-action sections
// =============================================================================

export const LandingPageContents = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen w-full gap-6">
      <h1 className="text-4xl font-bold">Welcome</h1>
      <p className="text-muted-foreground text-lg">
        Next.js + tRPC + Better Auth + Drizzle + Neon
      </p>
      <Link href="/login">
        <Button size="lg">Get Started</Button>
      </Link>
    </div>
  );
};
