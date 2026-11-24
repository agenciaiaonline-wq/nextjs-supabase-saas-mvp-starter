import { BillingStatusCard } from "@/components/BillingStatusCard";

export default function DashboardPage() {
  return (
    <main className="mx-auto max-w-4xl px-6 py-12">
      <h1 className="text-2xl font-bold">Tenant Operations Dashboard</h1>
      <p className="mt-2 text-sm text-slate-400">
        Backed by Supabase SSR cookie auth and PostgreSQL Row-Level Security policies.
      </p>
      <div className="mt-6">
        <BillingStatusCard
          orgName="Example Studio Workspace"
          planTier="pro"
          subscriptionStatus="active"
        />
      </div>
    </main>
  );
}
