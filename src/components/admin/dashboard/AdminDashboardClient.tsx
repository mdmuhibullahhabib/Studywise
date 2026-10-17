"use client";

import { useState, useMemo } from "react";
import {
  AdminPaymentItem,
  AdminBookingItem,
  AdminUserItem,
  AdminApplicationItem,
  AdminReportItem,
  AdminReviewItem,
  DateRangeKey,
} from "./types";
import {
  calculateDashboardMetrics,
  generateTimeSeriesData,
} from "./analyticsUtils";
import { AdminHeader } from "./AdminHeader";
import { AdminKpiGrid } from "./AdminKpiGrid";
import { AdminFinancialChart } from "./AdminFinancialChart";
import { AdminSessionAnalytics } from "./AdminSessionAnalytics";
import { AdminUserGrowthChart } from "./AdminUserGrowthChart";
import { AdminAttentionSection } from "./AdminAttentionSection";
import { AdminRecentActivityTable } from "./AdminRecentActivityTable";

interface AdminDashboardClientProps {
  initialPayments: AdminPaymentItem[];
  initialBookings: AdminBookingItem[];
  initialUsers: AdminUserItem[];
  initialApplications: AdminApplicationItem[];
  initialReports: AdminReportItem[];
  initialReviews: AdminReviewItem[];
}

export function AdminDashboardClient({
  initialPayments,
  initialBookings,
  initialUsers,
  initialApplications,
  initialReports,
  initialReviews,
}: AdminDashboardClientProps) {
  const [selectedRange, setSelectedRange] = useState<DateRangeKey>("30d");

  // Recompute summary metrics dynamically when filter changes
  const metrics = useMemo(() => {
    return calculateDashboardMetrics(
      initialPayments,
      initialBookings,
      initialUsers,
      initialApplications,
      initialReports,
      initialReviews,
      selectedRange
    );
  }, [
    initialPayments,
    initialBookings,
    initialUsers,
    initialApplications,
    initialReports,
    initialReviews,
    selectedRange,
  ]);

  // Recompute timeseries chart points dynamically
  const timeSeriesData = useMemo(() => {
    return generateTimeSeriesData(
      initialPayments,
      initialBookings,
      initialUsers,
      selectedRange
    );
  }, [initialPayments, initialBookings, initialUsers, selectedRange]);

  // Export summary to CSV
  const handleExportCsv = () => {
    const csvRows: string[] = [];
    csvRows.push("StudyWise Platform Analytics Export");
    csvRows.push(`Generated: ${new Date().toISOString()}`);
    csvRows.push(`Timeframe: ${selectedRange}`);
    csvRows.push("");
    csvRows.push("Metric,Value,Growth");
    csvRows.push(`Gross Merchandise Volume (GMV),$${metrics.grossVolume.toFixed(2)},${metrics.grossVolumeGrowth.label}`);
    csvRows.push(`Platform Net Revenue,$${metrics.platformRevenue.toFixed(2)},${metrics.revenueGrowth.label}`);
    csvRows.push(`Mentor Payouts,$${metrics.mentorPayouts.toFixed(2)},-`);
    csvRows.push(`Completed Sessions,${metrics.completedBookingsCount},${metrics.completedBookingsGrowth.label}`);
    csvRows.push(`Total Bookings,${metrics.totalBookingsCount},-`);
    csvRows.push(`Completion Rate,${metrics.completionRate}%,-`);
    csvRows.push(`New Students,${metrics.newStudentsCount},${metrics.studentsGrowth.label}`);
    csvRows.push(`Total Students,${metrics.totalStudentsCount},-`);
    csvRows.push(`Active Mentors,${metrics.activeMentorsCount},-`);
    csvRows.push(`Total Mentors,${metrics.totalMentorsCount},${metrics.mentorsGrowth.label}`);
    csvRows.push(`Pending Applications,${metrics.pendingApplicationsCount},-`);
    csvRows.push(`Open Reports,${metrics.openReportsCount},-`);
    csvRows.push(`Average Rating,${metrics.averageRating},-`);

    const blob = new Blob([csvRows.join("\n")], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `studywise-admin-analytics-${selectedRange}-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="-m-4 md:-m-6 min-h-[calc(100vh-4rem)] bg-[#FAFBF9] px-4 py-8 text-[#192721] sm:px-8 lg:px-12">
      {/* 1. Header with Title, Live Status, Date Filter Selector, and Actions */}
      <AdminHeader
        selectedRange={selectedRange}
        onRangeChange={setSelectedRange}
        onExportCsv={handleExportCsv}
        lastUpdated={new Date()}
      />

      {/* 2. Primary KPI Cards with Growth Badges */}
      <AdminKpiGrid metrics={metrics} rangeKey={selectedRange} />

      {/* 3. Operational Queue & Alerts */}
      <AdminAttentionSection
        pendingApplicationsCount={metrics.pendingApplicationsCount}
        openReportsCount={metrics.openReportsCount}
        pendingBookingsCount={
          initialBookings.filter((b) => b.status === "PENDING").length
        }
        lowRatingsCount={
          initialReviews.filter((r) => r.rating <= 3).length
        }
      />

      {/* 4. Financial & Revenue Performance Interactive Chart */}
      <div className="mt-8">
        <AdminFinancialChart
          data={timeSeriesData}
          grossVolumeTotal={metrics.grossVolume}
          platformRevenueTotal={metrics.platformRevenue}
          mentorPayoutsTotal={metrics.mentorPayouts}
        />
      </div>

      {/* 5. Booking & Session Analytics Grid */}
      <AdminSessionAnalytics
        bookings={initialBookings}
        timeSeriesData={timeSeriesData}
        averageRating={metrics.averageRating}
      />

      {/* 6. User Acquisition & Supply Ratio Chart */}
      <AdminUserGrowthChart
        data={timeSeriesData}
        totalStudents={metrics.totalStudentsCount}
        totalMentors={metrics.totalMentorsCount}
        newStudentsCount={metrics.newStudentsCount}
        newMentorsCount={metrics.newMentorsCount}
      />

      {/* 7. Live Activity Table */}
      <AdminRecentActivityTable
        recentPayments={initialPayments}
        recentBookings={initialBookings}
      />
    </div>
  );
}

