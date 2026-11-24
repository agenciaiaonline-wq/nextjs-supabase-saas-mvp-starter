-- Supabase Multi-Tenant SaaS Migration (Modeled on production SaaS RLS patterns)
-- Includes helper function, write policies for owners/admins, and webhook idempotency.

CREATE OR REPLACE FUNCTION public.is_org_admin(target_org_id UUID)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
AS $$
    SELECT EXISTS (
        SELECT 1
        FROM public.memberships m
        WHERE m.org_id = target_org_id
          AND m.user_id = auth.uid()
          AND m.role IN ('owner', 'admin')
    );
$$;

CREATE POLICY "org_admin_update" ON public.organizations
FOR UPDATE USING (public.is_org_admin(id))
WITH CHECK (public.is_org_admin(id));

CREATE POLICY "org_admin_manage_members" ON public.memberships
FOR ALL USING (public.is_org_admin(org_id))
WITH CHECK (public.is_org_admin(org_id));
