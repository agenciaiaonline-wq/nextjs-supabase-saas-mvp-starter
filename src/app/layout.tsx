import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Multi-Tenant SaaS MVP Starter | Golden Nodalix",
  description: "Investor-grade B2B SaaS boilerplate with Next.js App Router, Supabase RLS, RBAC, and Stripe billing."
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-slate-950 text-slate-100 antialiased">
        {children}
      </body>
    </html>
  );
}
