interface BillingStatusCardProps {
  orgName: string;
  planTier: "free" | "pro" | "enterprise";
  subscriptionStatus: "active" | "trialing" | "past_due" | "inactive";
}

export function BillingStatusCard({
  orgName,
  planTier,
  subscriptionStatus
}: BillingStatusCardProps) {
  const isHealthy = subscriptionStatus === "active" || subscriptionStatus === "trialing";

  return (
    <section className="rounded-xl border border-slate-800 bg-slate-900/70 p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs uppercase tracking-wider text-slate-400">Workspace</p>
          <h2 className="mt-1 text-xl font-semibold text-white">{orgName}</h2>
        </div>
        <span
          className={`rounded-full px-3 py-1 text-xs font-medium ${
            isHealthy ? "bg-emerald-500/15 text-emerald-300" : "bg-amber-500/15 text-amber-300"
          }`}
        >
          {planTier.toUpperCase()} · {subscriptionStatus}
        </span>
      </div>
    </section>
  );
}
