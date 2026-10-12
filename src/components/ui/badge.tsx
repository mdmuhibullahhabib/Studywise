import { cn } from "@/lib/utils";

type BadgeVariant = "neutral" | "success" | "warning" | "danger" | "info";

const VARIANT_CLASS: Record<BadgeVariant, string> = {
  neutral: "badge-neutral",
  success: "badge-success",
  warning: "badge-warning",
  danger: "badge-danger",
  info: "badge-info"
};

export function Badge({
  variant = "neutral",
  className,
  children
}: {
  variant?: BadgeVariant;
  className?: string;
  children: React.ReactNode;
}) {
  return <span className={cn(VARIANT_CLASS[variant], className)}>{children}</span>;
}

/** Maps a Booking.status value to the right visual treatment, in one place. */
export function BookingStatusBadge({ status }: { status: string }) {
  const variant: BadgeVariant =
    status === "CONFIRMED" || status === "COMPLETED"
      ? "success"
      : status === "PENDING"
        ? "warning"
        : status === "CANCELLED" || status === "NO_SHOW"
          ? "danger"
          : "neutral";

  return <Badge variant={variant}>{status.replace(/_/g, " ").toLowerCase()}</Badge>;
}

/** Maps a MentorApplication/verification status value consistently across admin + profile. */
export function VerificationBadge({ status }: { status: string }) {
  const variant: BadgeVariant =
    status === "APPROVED"
      ? "success"
      : status === "REJECTED"
        ? "danger"
        : status === "MORE_INFO_REQUIRED"
          ? "info"
          : "warning";

  return <Badge variant={variant}>{status.replace(/_/g, " ").toLowerCase()}</Badge>;
}
