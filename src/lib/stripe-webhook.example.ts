// Signature-Verified & Idempotent Stripe Webhook Pattern (Example)

export interface VerifiedStripeEvent {
  id: string;
  type: string;
  data: { object: Record<string, unknown> };
}

export async function processStripeWebhook(
  rawBody: string,
  signatureHeader: string | null,
  constructEvent: (payload: string, sig: string, secret: string) => VerifiedStripeEvent,
  hasProcessedEvent: (eventId: string) => Promise<boolean>,
  markEventProcessed: (eventId: string, type: string) => Promise<void>,
  syncSubscription: (obj: Record<string, unknown>) => Promise<void>
): Promise<{ status: number; body: string }> {
  if (!signatureHeader) {
    return { status: 400, body: "Missing stripe-signature header" };
  }

  const secret = process.env.STRIPE_WEBHOOK_SECRET ?? "";
  const event = constructEvent(rawBody, signatureHeader, secret);

  // Idempotency guard prevents double-provisioning on Stripe retries
  if (await hasProcessedEvent(event.id)) {
    return { status: 200, body: "Already processed" };
  }

  if (
    event.type === "customer.subscription.created" ||
    event.type === "customer.subscription.updated" ||
    event.type === "customer.subscription.deleted"
  ) {
    await syncSubscription(event.data.object);
  }

  await markEventProcessed(event.id, event.type);
  return { status: 200, body: "Processed" };
}
