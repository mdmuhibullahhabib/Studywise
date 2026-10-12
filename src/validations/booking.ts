import { z } from "zod";

const timeString = z.string().regex(/^([01]\d|2[0-3]):[0-5]\d$/, "Use HH:mm 24-hour format");

export const createBookingSchema = z.object({
  mentorProfileId: z.string().cuid(),
  conversationId: z.string().cuid().optional(),
  subject: z.string().min(2).max(120),
  date: z.string().date(), // "YYYY-MM-DD"
  startTime: timeString,
  endTime: timeString,
  timezone: z.string().min(1),
  duration: z.number().int().min(15).max(240)
});

export const cancelBookingSchema = z.object({
  bookingId: z.string().cuid(),
  reason: z.string().min(1).max(500).optional()
});

export const availabilitySlotSchema = z.object({
  dayOfWeek: z.number().int().min(0).max(6),
  startTime: timeString,
  endTime: timeString,
  timezone: z.string().min(1)
});

export type CreateBookingInput = z.infer<typeof createBookingSchema>;
