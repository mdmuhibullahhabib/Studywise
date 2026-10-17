export interface AdminPaymentItem {
  id: string;
  bookingId: string;
  amount: number;
  platformFee: number;
  mentorAmount: number;
  currency: string;
  status: "PENDING" | "SUCCEEDED" | "FAILED" | "REFUNDED";
  createdAt: string; // ISO string
  student: {
    id: string;
    name: string;
    email: string;
    avatarUrl?: string | null;
  };
  mentor: {
    id: string;
    name: string;
    email: string;
    avatarUrl?: string | null;
  };
}

export interface AdminBookingItem {
  id: string;
  studentId: string;
  mentorId: string;
  subject: string;
  date: string; // ISO string
  startTime: string;
  endTime: string;
  duration: number;
  price: number;
  currency: string;
  status: "PENDING" | "CONFIRMED" | "COMPLETED" | "CANCELLED" | "NO_SHOW";
  createdAt: string;
  student: {
    id: string;
    name: string;
    email: string;
  };
  mentor: {
    id: string;
    name: string;
    email: string;
  };
}

export interface AdminUserItem {
  id: string;
  name: string;
  email: string;
  role: "STUDENT" | "MENTOR" | "ADMIN";
  status: "ACTIVE" | "SUSPENDED" | "DEACTIVATED";
  createdAt: string;
}

export interface AdminApplicationItem {
  id: string;
  userId: string;
  status: "UNVERIFIED" | "PENDING" | "UNDER_REVIEW" | "APPROVED" | "REJECTED" | "MORE_INFO_REQUIRED";
  createdAt: string;
  user: {
    id: string;
    name: string;
    email: string;
  };
}

export interface AdminReportItem {
  id: string;
  status: "OPEN" | "RESOLVED" | "DISMISSED";
  createdAt: string;
}

export interface AdminReviewItem {
  id: string;
  rating: number;
  review?: string | null;
  status: "PUBLISHED" | "HIDDEN" | "REPORTED";
  createdAt: string;
  student: {
    name: string;
  };
  mentor: {
    name: string;
  };
}

export type DateRangeKey = "7d" | "30d" | "90d" | "1y" | "all";

export interface DashboardMetricsSummary {
  grossVolume: number;
  platformRevenue: number;
  mentorPayouts: number;
  completedBookingsCount: number;
  totalBookingsCount: number;
  completionRate: number;
  newStudentsCount: number;
  newMentorsCount: number;
  activeMentorsCount: number;
  totalStudentsCount: number;
  totalMentorsCount: number;
  pendingApplicationsCount: number;
  openReportsCount: number;
  averageRating: number;
  avgOrderValue: number;
  // Growth indicators vs previous equivalent period
  revenueGrowth: { percent: number; isPositive: boolean; label: string };
  grossVolumeGrowth: { percent: number; isPositive: boolean; label: string };
  completedBookingsGrowth: { percent: number; isPositive: boolean; label: string };
  studentsGrowth: { percent: number; isPositive: boolean; label: string };
  mentorsGrowth: { percent: number; isPositive: boolean; label: string };
}
