import { requireRole } from "@/lib/permissions";
import { db } from "@/lib/db";
import { AdminDashboardClient } from "@/components/admin/dashboard/AdminDashboardClient";
import {
  AdminPaymentItem,
  AdminBookingItem,
  AdminUserItem,
  AdminApplicationItem,
  AdminReportItem,
  AdminReviewItem,
} from "@/components/admin/dashboard/types";

export const metadata = { title: "Admin Analytics & Platform Overview | StudyWise" };

export default async function AdminDashboardPage() {
  await requireRole("ADMIN");

  // Fetch all core datasets concurrently
  const [
    paymentsRaw,
    bookingsRaw,
    usersRaw,
    applicationsRaw,
    reportsRaw,
    reviewsRaw,
  ] = await Promise.all([
    db.payment.findMany({
      include: {
        student: { select: { id: true, name: true, email: true, avatarUrl: true } },
        mentor: { select: { id: true, name: true, email: true, avatarUrl: true } },
      },
      orderBy: { createdAt: "desc" },
    }),
    db.booking.findMany({
      include: {
        student: { select: { id: true, name: true, email: true } },
        mentor: { select: { id: true, name: true, email: true } },
      },
      orderBy: { createdAt: "desc" },
    }),
    db.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        status: true,
        createdAt: true,
      },
      orderBy: { createdAt: "desc" },
    }),
    db.mentorApplication.findMany({
      include: {
        user: { select: { id: true, name: true, email: true } },
      },
      orderBy: { createdAt: "desc" },
    }),
    db.report.findMany({
      orderBy: { createdAt: "desc" },
    }),
    db.review.findMany({
      include: {
        student: { select: { name: true } },
        mentor: { select: { name: true } },
      },
      orderBy: { createdAt: "desc" },
    }),
  ]);

  // Safely serialize Decimals and Dates for client component hydration
  const initialPayments: AdminPaymentItem[] = paymentsRaw.map((p) => ({
    id: p.id,
    bookingId: p.bookingId,
    amount: Number(p.amount),
    platformFee: Number(p.platformFee),
    mentorAmount: Number(p.mentorAmount),
    currency: p.currency,
    status: p.status,
    createdAt: p.createdAt.toISOString(),
    student: {
      id: p.student.id,
      name: p.student.name,
      email: p.student.email,
      avatarUrl: p.student.avatarUrl,
    },
    mentor: {
      id: p.mentor.id,
      name: p.mentor.name,
      email: p.mentor.email,
      avatarUrl: p.mentor.avatarUrl,
    },
  }));

  const initialBookings: AdminBookingItem[] = bookingsRaw.map((b) => ({
    id: b.id,
    studentId: b.studentId,
    mentorId: b.mentorId,
    subject: b.subject,
    date: b.date.toISOString(),
    startTime: b.startTime,
    endTime: b.endTime,
    duration: b.duration,
    price: Number(b.price),
    currency: b.currency,
    status: b.status,
    createdAt: b.createdAt.toISOString(),
    student: {
      id: b.student.id,
      name: b.student.name,
      email: b.student.email,
    },
    mentor: {
      id: b.mentor.id,
      name: b.mentor.name,
      email: b.mentor.email,
    },
  }));

  const initialUsers: AdminUserItem[] = usersRaw.map((u) => ({
    id: u.id,
    name: u.name,
    email: u.email,
    role: u.role,
    status: u.status,
    createdAt: u.createdAt.toISOString(),
  }));

  const initialApplications: AdminApplicationItem[] = applicationsRaw.map((a) => ({
    id: a.id,
    userId: a.userId,
    status: a.status,
    createdAt: a.createdAt.toISOString(),
    user: {
      id: a.user.id,
      name: a.user.name,
      email: a.user.email,
    },
  }));

  const initialReports: AdminReportItem[] = reportsRaw.map((r) => ({
    id: r.id,
    status: r.status,
    createdAt: r.createdAt.toISOString(),
  }));

  const initialReviews: AdminReviewItem[] = reviewsRaw.map((rev) => ({
    id: rev.id,
    rating: rev.rating,
    review: rev.review,
    status: rev.status,
    createdAt: rev.createdAt.toISOString(),
    student: {
      name: rev.student.name,
    },
    mentor: {
      name: rev.mentor.name,
    },
  }));

  return (
    <AdminDashboardClient
      initialPayments={initialPayments}
      initialBookings={initialBookings}
      initialUsers={initialUsers}
      initialApplications={initialApplications}
      initialReports={initialReports}
      initialReviews={initialReviews}
    />
  );
}
