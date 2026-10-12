import "server-only";
import { db } from "@/lib/db";

export interface TimeSlot {
  date: string; // "YYYY-MM-DD"
  startTime: string; // "HH:mm", in `timezone`
  endTime: string;
  timezone: string; // the mentor's declared timezone for this window — always persist bookings with this, not the viewer's browser timezone
}

function addMinutes(hhmm: string, minutes: number): string {
  const [h, m] = hhmm.split(":").map(Number);
  const total = h * 60 + m + minutes;
  const hh = Math.floor(total / 60) % 24;
  const mm = total % 60;
  return `${String(hh).padStart(2, "0")}:${String(mm).padStart(2, "0")}`;
}

function isBefore(a: string, b: string) {
  return a < b; // "HH:mm" strings compare lexicographically
}

export const AvailabilityService = {
  /**
   * Returns bookable slots of `durationMinutes` for a mentor between
   * `fromDate` and `toDate` (inclusive), after removing:
   *  - dates with a blocking AvailabilityException
   *  - times that overlap an existing non-cancelled Booking
   */
  async getAvailableSlots(
    mentorProfileId: string,
    fromDate: Date,
    toDate: Date,
    durationMinutes: number
  ): Promise<TimeSlot[]> {
    const mentorProfile = await db.mentorProfile.findUniqueOrThrow({
      where: { id: mentorProfileId },
      select: { userId: true }
    });

    const [weeklyAvailability, exceptions, existingBookings] = await Promise.all([
      db.availability.findMany({ where: { mentorId: mentorProfileId, isActive: true } }),
      db.availabilityException.findMany({
        where: { mentorId: mentorProfileId, date: { gte: fromDate, lte: toDate } }
      }),
      db.booking.findMany({
        where: {
          mentorId: mentorProfile.userId,
          status: { in: ["PENDING", "CONFIRMED"] },
          date: { gte: fromDate, lte: toDate }
        },
        select: { date: true, startTime: true, endTime: true }
      })
    ]);

    const blockedDates = new Set(
      exceptions.filter((e) => e.isBlocked).map((e) => e.date.toISOString().slice(0, 10))
    );

    const slots: TimeSlot[] = [];

    for (let d = new Date(fromDate); d <= toDate; d.setDate(d.getDate() + 1)) {
      const dateStr = d.toISOString().slice(0, 10);
      if (blockedDates.has(dateStr)) continue;

      const dayOfWeek = d.getDay();
      const windowsForDay = weeklyAvailability.filter((w) => w.dayOfWeek === dayOfWeek);

      for (const window of windowsForDay) {
        let cursor = window.startTime;
        while (isBefore(addMinutes(cursor, durationMinutes), addMinutes(window.endTime, 1))) {
          const slotEnd = addMinutes(cursor, durationMinutes);

          const overlapsBooking = existingBookings.some(
            (b) =>
              b.date.toISOString().slice(0, 10) === dateStr &&
              cursor < b.endTime &&
              slotEnd > b.startTime
          );

          if (!overlapsBooking) {
            slots.push({ date: dateStr, startTime: cursor, endTime: slotEnd, timezone: window.timezone });
          }

          cursor = addMinutes(cursor, durationMinutes);
        }
      }
    }

    return slots;
  }
};
