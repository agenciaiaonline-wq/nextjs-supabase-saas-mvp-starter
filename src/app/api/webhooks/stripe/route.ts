import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { processStripeWebhook, type VerifiedStripeEvent } from "@/lib/stripe-webhook.example";

const processedEvents = new Set<string>();

export async function POST(request: NextRequest) {
  const signature = request.headers.get("stripe-signature");
  const rawBody = await request.text();
  const stripeKey = process.env.STRIPE_SECRET_KEY ?? "";

  if (!stripeKey) {
    return NextResponse.json({ error: "STRIPE_SECRET_KEY is not configured" }, { status: 500 });
  }

  const stripe = new Stripe(stripeKey);

  try {
    const result = await processStripeWebhook(
      rawBody,
      signature,
      (payload, sig, secret) =>
        stripe.webhooks.constructEvent(payload, sig, secret) as unknown as VerifiedStripeEvent,
      async (eventId) => processedEvents.has(eventId),
      async (eventId) => {
        // Persist in public.stripe_webhook_events in production
        processedEvents.add(eventId);
      },
      async () => {
        // Sync subscription status into public.organizations
      }
    );

    return NextResponse.json({ message: result.body }, { status: result.status });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Invalid Stripe webhook signature";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
