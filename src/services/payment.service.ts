import "server-only";
import { db } from "@/lib/db";
import type { PaymentProvider } from "@/providers/payment/payment-provider";
import { NoPaymentProvider, StripePaymentProvider } from "@/providers/payment/stripe-provider";
import { MeetingService } from "./meeting.service";
import { NotificationService } from "./notification.service";

function resolveProvider(): PaymentProvider {
  switch (process.env.PAYMENT_PROVIDER) {
    case "stripe":
      return new StripePaymentProvider();
    case "none":
    default:
      return new NoPaymentProvider();
  }
}

const provider = resolveProvider();
const PLATFORM_FEE_PERCENT = Number(process.env.PLATFORM_FEE_PERCENT ?? "15");

export const PaymentService = {
  provider,
  paymentsEnabled: provider.name !== "none",

  calculateSplit(amount: number) {
    const platformFee = Math.round(amount * (PLATFORM_FEE_PERCENT / 100) * 100) / 100;
    const mentorAmount = Math.round((amount - platformFee) * 100) / 100;
    return { platformFee, mentorAmount };
  },

  /** Creates a pending Payment row and, if a real provider is configured, a checkout session. */
  async initiateForBooking(bookingId: string) {
    const booking = await db.booking.findUniqueOrThrow({ where: { id: bookingId } });
    const amount = Number(booking.price);
    const { platformFee, mentorAmount } = this.calculateSplit(amount);

    const payment = await db.payment.create({
      data: {
        bookingId: booking.id,
        studentId: booking.studentId,
        mentorId: booking.mentorId,
        amount,
        platformFee,
        mentorAmount,
        currency: booking.currency,
        provider: provider.name,
        status: this.paymentsEnabled ? "PENDING" : "SUCCEEDED"
      }
    });

    if (!this.paymentsEnabled) {
      // No payment provider configured — booking confirms immediately.
      await db.booking.update({ where: { id: booking.id }, data: { status: "CONFIRMED" } });
      return { payment, checkoutUrl: null };
    }

    const checkout = await provider.createCheckout({
      bookingId: booking.id,
      amount,
      currency: booking.currency,
      description: `StudyWise session — ${booking.subject}`,
      successUrl: `${process.env.NEXTAUTH_URL}/student/booked/${booking.id}?payment=success`,
      cancelUrl: `${process.env.NEXTAUTH_URL}/student/booked/${booking.id}?payment=cancelled`
    });

    await db.payment.update({
      where: { id: payment.id },
      data: { providerPaymentId: checkout.providerPaymentId }
    });

    return { payment, checkoutUrl: checkout.checkoutUrl };
  },

  /**
   * Called from the payment provider's webhook once a checkout succeeds.
   * Confirms the booking, schedules the meeting, and notifies the mentor —
   * the same downstream steps the no-payment path runs synchronously.
   */
  async confirmByProviderPaymentId(providerPaymentId: string) {
    const payment = await db.payment.findFirst({ where: { providerPaymentId } });
    if (!payment) return null;

    await db.payment.update({ where: { id: payment.id }, data: { status: "SUCCEEDED" } });
    const booking = await db.booking.update({
      where: { id: payment.bookingId },
      data: { status: "CONFIRMED" }
    });

    const meeting = await MeetingService.scheduleForBooking(booking.id);

    if (booking.conversationId) {
      await db.message.create({
        data: {
          conversationId: booking.conversationId,
          senderId: booking.studentId,
          type: "MEETING",
          content: `Payment received. Meeting scheduled for ${booking.date.toISOString().slice(0, 10)} at ${booking.startTime}.`,
          relatedId: meeting.id
        }
      });
    }

    await NotificationService.create(
      booking.mentorId,
      "PAYMENT_SUCCESS",
      "Booking confirmed",
      `${booking.subject} is confirmed and paid.`,
      booking.id
    );
    await NotificationService.create(
      booking.studentId,
      "PAYMENT_SUCCESS",
      "Payment received",
      `Your session "${booking.subject}" is confirmed.`,
      booking.id
    );

    return booking;
  }
};
