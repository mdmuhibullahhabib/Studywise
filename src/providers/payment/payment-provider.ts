export interface CreateCheckoutInput {
  bookingId: string;
  amount: number; // in the currency's smallest unit is provider-specific; keep as decimal here
  currency: string;
  description: string;
  successUrl: string;
  cancelUrl: string;
}

export interface CreateCheckoutResult {
  checkoutUrl: string;
  providerPaymentId: string;
}

export interface PaymentProvider {
  readonly name: string;
  createCheckout(input: CreateCheckoutInput): Promise<CreateCheckoutResult>;
  verifyWebhookSignature(rawBody: string, signature: string): boolean;
}
