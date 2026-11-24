export default function HomePage() {
  const modules = [
    { name: "Multi-Tenant Organizations", status: "RLS Enforced", detail: "Tenant isolation at PostgreSQL row level" },
    { name: "Role-Based Access Control", status: "Owner / Admin / Member", detail: "Strict membership validation middleware" },
    { name: "Idempotent Stripe Billing", status: "Signature Verified", detail: "Replay-safe webhook event ledger" },
    { name: "Security Headers", status: "Active", detail: "X-Frame-Options DENY + strict referrer policy" }
  ];

  return (
    <main className="mx-auto max-w-4xl px-6 py-16">
      <h1 className="text-3xl font-bold tracking-tight">B2B SaaS MVP Production Starter</h1>
      <p className="mt-3 text-slate-300">
        Modular Next.js App Router foundation engineered for 7-to-14-day investor-grade launches.
      </p>
      <section className="mt-8 grid gap-4 sm:grid-cols-2">
        {modules.map((item) => (
          <article key={item.name} className="rounded-lg border border-slate-800 bg-slate-900/60 p-5">
            <div className="flex items-center justify-between">
              <h2 className="font-semibold">{item.name}</h2>
              <span className="rounded bg-emerald-500/15 px-2 py-0.5 text-xs text-emerald-300">{item.status}</span>
            </div>
            <p className="mt-2 text-sm text-slate-400">{item.detail}</p>
          </article>
        ))}
      </section>
    </main>
  );
}
