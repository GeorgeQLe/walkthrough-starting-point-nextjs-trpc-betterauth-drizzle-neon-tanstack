import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";

import { Provider } from "@/providers";

import "./globals.css";

// =============================================================================
// ROOT LAYOUT - App-wide layout with providers and global styles
// =============================================================================

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Next.js + tRPC + Better Auth + Drizzle + Neon",
  description: "Full-stack TypeScript starter with end-to-end type safety",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Provider>{children}</Provider>
      </body>
    </html>
  );
}
