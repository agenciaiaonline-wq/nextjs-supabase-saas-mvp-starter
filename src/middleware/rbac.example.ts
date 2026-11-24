// Server-side Tenant & RBAC Enforcement Pattern (Example)

export type TenantRole = "owner" | "admin" | "member";

const ROLE_WEIGHT: Record<TenantRole, number> = {
  member: 1,
  admin: 2,
  owner: 3,
};

export interface MembershipContext {
  userId: string;
  orgId: string;
  role: TenantRole;
}

export function assertTenantRole(
  membership: MembershipContext | null,
  minimumRole: TenantRole
): asserts membership is MembershipContext {
  if (!membership) {
    throw new Error("FORBIDDEN_NOT_A_TENANT_MEMBER");
  }
  if (ROLE_WEIGHT[membership.role] < ROLE_WEIGHT[minimumRole]) {
    throw new Error(`FORBIDDEN_REQUIRES_${minimumRole.toUpperCase()}`);
  }
}
