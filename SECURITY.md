# Security Policy

- Enforce PostgreSQL Row-Level Security (`ENABLE ROW LEVEL SECURITY`) on every tenant table before connecting client auth.
- Never place `SUPABASE_SERVICE_ROLE_KEY`, `STRIPE_SECRET_KEY`, or `STRIPE_WEBHOOK_SECRET` inside `NEXT_PUBLIC_*` variables.
- Always verify Stripe webhook signatures and record `event.id` in `stripe_webhook_events` to block replay/duplicate provisioning.
- Report vulnerabilities via [Golden Nodalix Studio on LinkedIn](https://www.linkedin.com/in/agency-golden-nodalix-880598438/).
