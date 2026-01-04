"use client";

import { useEffect, useState } from "react";

import { TRPCReactProvider } from "@/trpc/client";

// =============================================================================
// ROOT PROVIDERS - Wraps the app with all necessary context providers
// =============================================================================
//
// WHY: Client components need providers for tRPC, React Query, and other
// client-side state. This component combines them all in one place.
//
// HYDRATION HANDLING:
//   - isMounted check prevents hydration mismatches
//   - Server renders nothing, client renders after mount
//   - This is a common pattern for client-only providers
//
// WHAT'S INCLUDED:
//   - TRPCReactProvider: tRPC + React Query context
//   - Add more providers here as needed (ThemeProvider, etc.)
// =============================================================================

interface ProviderProps {
  children: React.ReactNode;
}

export const Provider = ({ children }: ProviderProps) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return <TRPCReactProvider>{children}</TRPCReactProvider>;
};
