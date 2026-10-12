import { requireRole } from "@/lib/permissions";
import { PaymentService } from "@/services/payment.service";
import { MeetingService } from "@/services/meeting.service";
import { storageService } from "@/services/storage.service";
import { emailService } from "@/services/email.service";

export const metadata = { title: "Platform settings" };

export default async function AdminSettingsPage() {
  await requireRole("ADMIN");

  const rows = [
    { label: "Meeting provider", value: MeetingService.provider.name },
    { label: "Payment provider", value: `${PaymentService.provider.name} (${PaymentService.paymentsEnabled ? "enabled" : "disabled"})` },
    { label: "Storage provider", value: storageService.name },
    { label: "Email provider", value: emailService.name },
    { label: "Platform fee", value: `${process.env.PLATFORM_FEE_PERCENT ?? "15"}%` }
  ];

  return (
    <div className="max-w-lg">
      <h1 className="text-h1">Platform settings</h1>
      <p className="mt-1 text-sm text-ink-500">
        Provider configuration is read from environment variables (see .env.example). Changing
        providers requires updating the deployment environment, not this page.
      </p>

      <dl className="card mt-6 divide-y divide-line">
        {rows.map((row) => (
          <div key={row.label} className="flex items-center justify-between px-5 py-3">
            <dt className="text-sm text-ink-500">{row.label}</dt>
            <dd className="text-sm font-medium text-ink">{row.value}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
