import type { CreateCheckoutInput, CreateCheckoutResult, PaymentProvider } from "./payment-provider";

/**
 * Stripe adapter boundary. Left unimplemented on purpose: requires
 * PAYMENT_SECRET_KEY / PAYMENT_WEBHOOK_SECRET, which are not available
 * in this environment. Implement against the Stripe SDK
 * (Checkout Sessions + webhook signature verification) once configured.
 */
export class StripePaymentProvider implements PaymentProvider {
  readonly name = "stripe";

  async createCheckout(_input: CreateCheckoutInput): Promise<CreateCheckoutResult> {
    throw new Error(
      "StripePaymentProvider is not configured. Set PAYMENT_SECRET_KEY and implement createCheckout against the Stripe API."
    );
  }

  verifyWebhookSignature(_rawBody: string, _signature: string): boolean {
    throw new Error("StripePaymentProvider is not configured.");
  }
}

/** Used when PAYMENT_PROVIDER=none — bookings confirm without a payment step. */
export class NoPaymentProvider implements PaymentProvider {
  readonly name = "none";

  async createCheckout(): Promise<CreateCheckoutResult> {
    throw new Error("Payments are disabled (PAYMENT_PROVIDER=none).");
  }

  verifyWebhookSignature(): boolean {
    return false;
  }
}
