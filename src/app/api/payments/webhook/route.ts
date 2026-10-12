import { NextResponse } from "next/server";
import { PaymentService } from "@/services/payment.service";
import { logger } from "@/lib/logger";

/**
 * Payment provider webhook. With PAYMENT_PROVIDER=none this route is
 * unreachable in practice — bookings confirm synchronously. Once a real
 * provider (e.g. Stripe) is configured, point its webhook at this URL.
 */
export async function POST(request: Request) {
  const signature = request.headers.get("stripe-signature") ?? "";
  const rawBody = await request.text();

  let verified: boolean;
  try {
    verified = PaymentService.provider.verifyWebhookSignature(rawBody, signature);
  } catch (err) {
    logger.error("payment.webhook.verify_failed", { error: String(err) });
    return NextResponse.json({ error: "Webhook not configured" }, { status: 501 });
  }

  if (!verified) {
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  // Real implementation: parse the provider's event payload and extract
  // its payment id, then:
  // await PaymentService.confirmByProviderPaymentId(providerPaymentId);
  return NextResponse.json({ received: true });
}
