import { NextResponse } from "next/server";

export async function GET() {
  const checks = {
    supabaseUrlConfigured: Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL),
    stripeConfigured: Boolean(process.env.STRIPE_WEBHOOK_SECRET)
  };

  return NextResponse.json(
    {
      status: "ok",
      service: "nextjs-supabase-saas-mvp-starter",
      checks,
      timestamp: new Date().toISOString()
    },
    { status: 200 }
  );
}
