import type { Metadata } from "next";
import { Suspense } from "react";

import "./globals.css";
import { AppShell } from "@/components/AppShell";

export const metadata: Metadata = {
  title: "Housing Price Platform",
  description: "Unified portal for housing price estimation and market analysis.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <Suspense fallback={<main className="main"><div className="panel">Loading platform data...</div></main>}>
          <AppShell>{children}</AppShell>
        </Suspense>
      </body>
    </html>
  );
}
