import {
  AdminPaymentItem,
  AdminBookingItem,
  AdminUserItem,
  AdminApplicationItem,
  AdminReportItem,
  AdminReviewItem,
  DateRangeKey,
  DashboardMetricsSummary,
} from "./types";

export function computeGrowth(
  current: number,
  previous: number
): { percent: number; isPositive: boolean; label: string } {
  if (previous === 0) {
    if (current > 0) return { percent: 100, isPositive: true, label: "+100%" };
    return { percent: 0, isPositive: true, label: "0.0%" };
  }
  const diff = current - previous;
  const percent = Math.round((diff / previous) * 1000) / 10;
  const isPositive = percent >= 0;
  const label = `${isPositive ? "+" : ""}${percent.toFixed(1)}%`;
  return { percent, isPositive, label };
}

export function getDateRangeBounds(key: DateRangeKey, now = new Date()) {
  const currentEnd = new Date(now);
  let currentStart = new Date(now);
  let previousStart = new Date(now);
  let previousEnd = new Date(now);

  switch (key) {
    case "7d": {
      currentStart.setDate(now.getDate() - 7);
      previousEnd = new Date(currentStart);
      previousStart.setDate(currentStart.getDate() - 7);
      break;
    }
    case "30d": {
      currentStart.setDate(now.getDate() - 30);
      previousEnd = new Date(currentStart);
      previousStart.setDate(currentStart.getDate() - 30);
      break;
    }
    case "90d": {
      currentStart.setDate(now.getDate() - 90);
      previousEnd = new Date(currentStart);
      previousStart.setDate(currentStart.getDate() - 90);
      break;
    }
    case "1y": {
      currentStart.setFullYear(now.getFullYear() - 1);
      previousEnd = new Date(currentStart);
      previousStart.setFullYear(currentStart.getFullYear() - 1);
      break;
    }
    case "all":
    default: {
      currentStart = new Date(2020, 0, 1);
      previousEnd = new Date(2020, 0, 1);
      previousStart = new Date(2015, 0, 1);
      break;
    }
  }

  return { currentStart, currentEnd, previousStart, previousEnd };
}

export function calculateDashboardMetrics(
  payments: AdminPaymentItem[],
  bookings: AdminBookingItem[],
  users: AdminUserItem[],
  applications: AdminApplicationItem[],
  reports: AdminReportItem[],
  reviews: AdminReviewItem[],
  rangeKey: DateRangeKey
): DashboardMetricsSummary {
  const { currentStart, currentEnd, previousStart, previousEnd } =
    getDateRangeBounds(rangeKey);

  const isInRange = (dateStr: string, start: Date, end: Date) => {
    const d = new Date(dateStr);
    return d >= start && d <= end;
  };

  // Current period items
  const curPayments =
    rangeKey === "all"
      ? payments
      : payments.filter((p) => isInRange(p.createdAt, currentStart, currentEnd));
  const curBookings =
    rangeKey === "all"
      ? bookings
      : bookings.filter((b) => isInRange(b.createdAt, currentStart, currentEnd));
  const curUsers =
    rangeKey === "all"
      ? users
      : users.filter((u) => isInRange(u.createdAt, currentStart, currentEnd));

  // Prior period items
  const prevPayments =
    rangeKey === "all"
      ? []
      : payments.filter((p) =>
          isInRange(p.createdAt, previousStart, previousEnd)
        );
  const prevBookings =
    rangeKey === "all"
      ? []
      : bookings.filter((b) =>
          isInRange(b.createdAt, previousStart, previousEnd)
        );
  const prevUsers =
    rangeKey === "all"
      ? []
      : users.filter((u) => isInRange(u.createdAt, previousStart, previousEnd));

  // Financial aggregates
  const sumSucceeded = (arr: AdminPaymentItem[], key: "amount" | "platformFee" | "mentorAmount") =>
    arr
      .filter((p) => p.status === "SUCCEEDED")
      .reduce((acc, p) => acc + (p[key] || 0), 0);

  const grossVolume = sumSucceeded(curPayments, "amount");
  const platformRevenue = sumSucceeded(curPayments, "platformFee");
  const mentorPayouts = sumSucceeded(curPayments, "mentorAmount");

  const prevGrossVolume = sumSucceeded(prevPayments, "amount");
  const prevPlatformRevenue = sumSucceeded(prevPayments, "platformFee");

  // Booking aggregates
  const completedBookingsCount = curBookings.filter(
    (b) => b.status === "COMPLETED"
  ).length;
  const totalBookingsCount = curBookings.length;
  const completionRate =
    totalBookingsCount > 0
      ? Math.round((completedBookingsCount / totalBookingsCount) * 100)
      : 0;

  const prevCompletedBookingsCount = prevBookings.filter(
    (b) => b.status === "COMPLETED"
  ).length;

  // User aggregates
  const newStudentsCount = curUsers.filter((u) => u.role === "STUDENT").length;
  const newMentorsCount = curUsers.filter((u) => u.role === "MENTOR").length;

  const prevStudentsCount = prevUsers.filter((u) => u.role === "STUDENT").length;
  const prevMentorsCount = prevUsers.filter((u) => u.role === "MENTOR").length;

  // All-time totals for reference
  const totalStudentsCount = users.filter((u) => u.role === "STUDENT").length;
  const totalMentorsCount = users.filter((u) => u.role === "MENTOR").length;
  const activeMentorsCount = users.filter(
    (u) => u.role === "MENTOR" && u.status === "ACTIVE"
  ).length;

  // Operational items
  const pendingApplicationsCount = applications.filter((a) =>
    ["PENDING", "UNDER_REVIEW"].includes(a.status)
  ).length;
  const openReportsCount = reports.filter((r) => r.status === "OPEN").length;

  // Reviews
  const avgRating =
    reviews.length > 0
      ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
      : 5.0;

  const avgOrderValue =
    curPayments.filter((p) => p.status === "SUCCEEDED").length > 0
      ? grossVolume / curPayments.filter((p) => p.status === "SUCCEEDED").length
      : 0;

  return {
    grossVolume,
    platformRevenue,
    mentorPayouts,
    completedBookingsCount,
    totalBookingsCount,
    completionRate,
    newStudentsCount,
    newMentorsCount,
    activeMentorsCount,
    totalStudentsCount,
    totalMentorsCount,
    pendingApplicationsCount,
    openReportsCount,
    averageRating: Math.round(avgRating * 10) / 10,
    avgOrderValue: Math.round(avgOrderValue * 100) / 100,
    revenueGrowth: computeGrowth(platformRevenue, prevPlatformRevenue),
    grossVolumeGrowth: computeGrowth(grossVolume, prevGrossVolume),
    completedBookingsGrowth: computeGrowth(
      completedBookingsCount,
      prevCompletedBookingsCount
    ),
    studentsGrowth: computeGrowth(newStudentsCount, prevStudentsCount),
    mentorsGrowth: computeGrowth(newMentorsCount, prevMentorsCount),
  };
}

export interface TimeSeriesPoint {
  label: string;
  dateKey: string;
  grossVolume: number;
  platformFee: number;
  mentorPayout: number;
  completedSessions: number;
  newStudents: number;
  newMentors: number;
}

export function generateTimeSeriesData(
  payments: AdminPaymentItem[],
  bookings: AdminBookingItem[],
  users: AdminUserItem[],
  rangeKey: DateRangeKey,
  now = new Date()
): TimeSeriesPoint[] {
  const { currentStart, currentEnd } = getDateRangeBounds(rangeKey, now);

  const points: TimeSeriesPoint[] = [];

  if (rangeKey === "7d") {
    // 7 daily points
    for (let i = 6; i >= 0; i--) {
      const d = new Date(now);
      d.setDate(now.getDate() - i);
      const dayStart = new Date(d.getFullYear(), d.getMonth(), d.getDate(), 0, 0, 0);
      const dayEnd = new Date(d.getFullYear(), d.getMonth(), d.getDate(), 23, 59, 59);

      const dayPayments = payments.filter((p) => {
        const pd = new Date(p.createdAt);
        return pd >= dayStart && pd <= dayEnd && p.status === "SUCCEEDED";
      });

      const dayBookings = bookings.filter((b) => {
        const bd = new Date(b.createdAt);
        return bd >= dayStart && bd <= dayEnd && b.status === "COMPLETED";
      });

      const dayStudents = users.filter((u) => {
        const ud = new Date(u.createdAt);
        return ud >= dayStart && ud <= dayEnd && u.role === "STUDENT";
      });

      const dayMentors = users.filter((u) => {
        const ud = new Date(u.createdAt);
        return ud >= dayStart && ud <= dayEnd && u.role === "MENTOR";
      });

      const label = d.toLocaleDateString("en-US", { weekday: "short" });
      const dateKey = d.toLocaleDateString("en-US", { month: "short", day: "numeric" });

      points.push({
        label,
        dateKey,
        grossVolume: dayPayments.reduce((acc, p) => acc + p.amount, 0),
        platformFee: dayPayments.reduce((acc, p) => acc + p.platformFee, 0),
        mentorPayout: dayPayments.reduce((acc, p) => acc + p.mentorAmount, 0),
        completedSessions: dayBookings.length,
        newStudents: dayStudents.length,
        newMentors: dayMentors.length,
      });
    }
  } else if (rangeKey === "30d") {
    // 6 buckets of 5 days each
    for (let i = 5; i >= 0; i--) {
      const bEnd = new Date(now);
      bEnd.setDate(now.getDate() - i * 5);
      const bStart = new Date(bEnd);
      bStart.setDate(bEnd.getDate() - 5);

      const bucketPayments = payments.filter((p) => {
        const pd = new Date(p.createdAt);
        return pd >= bStart && pd <= bEnd && p.status === "SUCCEEDED";
      });

      const bucketBookings = bookings.filter((b) => {
        const bd = new Date(b.createdAt);
        return bd >= bStart && bd <= bEnd && b.status === "COMPLETED";
      });

      const bucketStudents = users.filter((u) => {
        const ud = new Date(u.createdAt);
        return ud >= bStart && ud <= bEnd && u.role === "STUDENT";
      });

      const bucketMentors = users.filter((u) => {
        const ud = new Date(u.createdAt);
        return ud >= bStart && ud <= bEnd && u.role === "MENTOR";
      });

      const label = bEnd.toLocaleDateString("en-US", { month: "short", day: "numeric" });

      points.push({
        label,
        dateKey: label,
        grossVolume: bucketPayments.reduce((acc, p) => acc + p.amount, 0),
        platformFee: bucketPayments.reduce((acc, p) => acc + p.platformFee, 0),
        mentorPayout: bucketPayments.reduce((acc, p) => acc + p.mentorAmount, 0),
        completedSessions: bucketBookings.length,
        newStudents: bucketStudents.length,
        newMentors: bucketMentors.length,
      });
    }
  } else if (rangeKey === "90d") {
    // 6 buckets of 15 days
    for (let i = 5; i >= 0; i--) {
      const bEnd = new Date(now);
      bEnd.setDate(now.getDate() - i * 15);
      const bStart = new Date(bEnd);
      bStart.setDate(bEnd.getDate() - 15);

      const bucketPayments = payments.filter((p) => {
        const pd = new Date(p.createdAt);
        return pd >= bStart && pd <= bEnd && p.status === "SUCCEEDED";
      });

      const bucketBookings = bookings.filter((b) => {
        const bd = new Date(b.createdAt);
        return bd >= bStart && bd <= bEnd && b.status === "COMPLETED";
      });

      const bucketStudents = users.filter((u) => {
        const ud = new Date(u.createdAt);
        return ud >= bStart && ud <= bEnd && u.role === "STUDENT";
      });

      const bucketMentors = users.filter((u) => {
        const ud = new Date(u.createdAt);
        return ud >= bStart && ud <= bEnd && u.role === "MENTOR";
      });

      const label = bEnd.toLocaleDateString("en-US", { month: "short", day: "numeric" });

      points.push({
        label,
        dateKey: label,
        grossVolume: bucketPayments.reduce((acc, p) => acc + p.amount, 0),
        platformFee: bucketPayments.reduce((acc, p) => acc + p.platformFee, 0),
        mentorPayout: bucketPayments.reduce((acc, p) => acc + p.mentorAmount, 0),
        completedSessions: bucketBookings.length,
        newStudents: bucketStudents.length,
        newMentors: bucketMentors.length,
      });
    }
  } else {
    // 1y or all: 12 monthly points
    for (let i = 11; i >= 0; i--) {
      const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
      const monthStart = new Date(d.getFullYear(), d.getMonth(), 1);
      const monthEnd = new Date(d.getFullYear(), d.getMonth() + 1, 0, 23, 59, 59);

      const mPayments = payments.filter((p) => {
        const pd = new Date(p.createdAt);
        return pd >= monthStart && pd <= monthEnd && p.status === "SUCCEEDED";
      });

      const mBookings = bookings.filter((b) => {
        const bd = new Date(b.createdAt);
        return bd >= monthStart && bd <= monthEnd && b.status === "COMPLETED";
      });

      const mStudents = users.filter((u) => {
        const ud = new Date(u.createdAt);
        return ud >= monthStart && ud <= monthEnd && u.role === "STUDENT";
      });

      const mMentors = users.filter((u) => {
        const ud = new Date(u.createdAt);
        return ud >= monthStart && ud <= monthEnd && u.role === "MENTOR";
      });

      const label = d.toLocaleDateString("en-US", { month: "short" });
      const dateKey = d.toLocaleDateString("en-US", { month: "long", year: "numeric" });

      points.push({
        label,
        dateKey,
        grossVolume: mPayments.reduce((acc, p) => acc + p.amount, 0),
        platformFee: mPayments.reduce((acc, p) => acc + p.platformFee, 0),
        mentorPayout: mPayments.reduce((acc, p) => acc + p.mentorAmount, 0),
        completedSessions: mBookings.length,
        newStudents: mStudents.length,
        newMentors: mMentors.length,
      });
    }
  }

  return points;
}

