
import "server-only";
import { db } from "@/lib/db";

export interface TimeSlot {
  date: string;
  startTime: string;
  endTime: string;
  timezone: string;
}

function addMinutes(hhmm: string, minutes: number): string {
  const parts = hhmm.split(":");

  if (parts.length !== 2) {
    throw new Error(`Invalid time format: ${hhmm}`);
  }

  const hourPart = parts[0];
  const minutePart = parts[1];

  if (hourPart === undefined || minutePart === undefined) {
    throw new Error(`Invalid time format: ${hhmm}`);
  }

  const h: number = Number(hourPart);
  const m: number = Number(minutePart);

  if (
    !Number.isInteger(h) ||
    !Number.isInteger(m) ||
    h < 0 ||
    h > 23 ||
    m < 0 ||
    m > 59
  ) {
    throw new Error(`Invalid time format: ${hhmm}`);
  }

  const total = h * 60 + m + minutes;
  const hh = Math.floor(total / 60) % 24;
  const mm = total % 60;

  return `${String(hh).padStart(2, "0")}:${String(mm).padStart(2, "0")}`;
}

function isBefore(a: string, b: string): boolean {
  return a < b;
}

export const AvailabilityService = {
  /**
   * Returns bookable slots for a mentor between fromDate and toDate,
   * excluding blocked dates and overlapping bookings.
   */
  async getAvailableSlots(
    mentorProfileId: string,
    fromDate: Date,
    toDate: Date,
    durationMinutes: number
  ): Promise<TimeSlot[]> {
    if (!Number.isInteger(durationMinutes) || durationMinutes <= 0) {
      throw new Error("durationMinutes must be a positive integer.");
    }

    const mentorProfile = await db.mentorProfile.findUniqueOrThrow({
      where: { id: mentorProfileId },
      select: { userId: true },
    });

    const [
      weeklyAvailability,
      exceptions,
      existingBookings,
    ] = await Promise.all([
      db.availability.findMany({
        where: {
          mentorId: mentorProfileId,
          isActive: true,
        },
      }),

      db.availabilityException.findMany({
        where: {
          mentorId: mentorProfileId,
          date: {
            gte: fromDate,
            lte: toDate,
          },
        },
      }),

      db.booking.findMany({
        where: {
          mentorId: mentorProfile.userId,
          status: {
            in: ["PENDING", "CONFIRMED"],
          },
          date: {
            gte: fromDate,
            lte: toDate,
          },
        },
        select: {
          date: true,
          startTime: true,
          endTime: true,
        },
      }),
    ]);

    const blockedDates = new Set(
      exceptions
        .filter((exception) => exception.isBlocked)
        .map((exception) =>
          exception.date.toISOString().slice(0, 10)
        )
    );

    const slots: TimeSlot[] = [];

    for (
      let d = new Date(fromDate);
      d <= toDate;
      d.setDate(d.getDate() + 1)
    ) {
      const dateStr = d.toISOString().slice(0, 10);

      if (blockedDates.has(dateStr)) {
        continue;
      }

      const dayOfWeek = d.getDay();

      const windowsForDay = weeklyAvailability.filter(
        (window) => window.dayOfWeek === dayOfWeek
      );

      for (const window of windowsForDay) {
        let cursor = window.startTime;

        while (
          isBefore(
            addMinutes(cursor, durationMinutes),
            addMinutes(window.endTime, 1)
          )
        ) {
          const slotEnd = addMinutes(cursor, durationMinutes);

          const overlapsBooking = existingBookings.some(
            (booking) =>
              booking.date.toISOString().slice(0, 10) === dateStr &&
              cursor < booking.endTime &&
              slotEnd > booking.startTime
          );

          if (!overlapsBooking) {
            slots.push({
              date: dateStr,
              startTime: cursor,
              endTime: slotEnd,
              timezone: window.timezone,
            });
          }

          cursor = addMinutes(cursor, durationMinutes);
        }
      }
    }

    return slots;
  },
};
