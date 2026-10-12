"use client";

import { useFormStatus } from "react-dom";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "ghost" | "danger";

const VARIANT_CLASS: Record<Variant, string> = {
  primary: "btn-primary",
  secondary: "btn-secondary",
  ghost: "btn-ghost",
  danger: "btn-danger"
};

/**
 * Drop-in replacement for a plain <button type="submit"> inside a form
 * wired to a server action (e.g. `<form action={approveApplicationAction}>`).
 * Uses useFormStatus so it disables and shows a pending label automatically
 * — no client state needed in the parent.
 */
export function SubmitButton({
  children,
  pendingLabel,
  variant = "primary",
  className
}: {
  children: React.ReactNode;
  pendingLabel?: string;
  variant?: Variant;
  className?: string;
}) {
  const { pending } = useFormStatus();

  return (
    <button type="submit" disabled={pending} className={cn(VARIANT_CLASS[variant], className)}>
      {pending ? (pendingLabel ?? "Working…") : children}
    </button>
  );
}
