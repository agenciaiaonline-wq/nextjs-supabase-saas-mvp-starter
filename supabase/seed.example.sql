-- Sanitized seed data for local staging verification (non-production example IDs)
INSERT INTO public.organizations (id, name, slug, plan_tier, subscription_status)
VALUES (
    '11111111-1111-1111-1111-111111111111',
    'Example SaaS Workspace',
    'example-saas-workspace',
    'pro',
    'active'
)
ON CONFLICT (slug) DO NOTHING;
