import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import test from "node:test";

const ROOT = path.resolve(import.meta.dirname, "..");

test("package.json and tsconfig.json parse cleanly", () => {
  const pkg = JSON.parse(fs.readFileSync(path.join(ROOT, "package.json"), "utf8"));
  const tsconfig = JSON.parse(fs.readFileSync(path.join(ROOT, "tsconfig.json"), "utf8"));
  assert.equal(pkg.name, "nextjs-supabase-saas-mvp-starter");
  assert.equal(tsconfig.compilerOptions.strict, true);
});

test("required SaaS MVP files exist and enforce RLS", () => {
  const required = [
    ".env.example",
    "SECURITY.md",
    "next.config.ts",
    "sql/multi_tenant_rls_schema.sql",
    "supabase/migrations/0001_multi_tenant_rls.sql",
    "supabase/seed.example.sql",
    "src/app/page.tsx",
    "src/app/dashboard/page.tsx",
    "src/app/api/health/route.ts",
    "src/app/api/webhooks/stripe/route.ts",
    "src/components/BillingStatusCard.tsx",
    "src/lib/supabase/server.ts",
    "src/lib/supabase/client.ts",
    "src/middleware/rbac.example.ts"
  ];
  for (const rel of required) {
    assert.ok(fs.existsSync(path.join(ROOT, rel)), `Missing expected file: ${rel}`);
  }
  const baseSql = fs.readFileSync(path.join(ROOT, "sql/multi_tenant_rls_schema.sql"), "utf8");
  assert.match(baseSql, /ENABLE ROW LEVEL SECURITY/i);
});
