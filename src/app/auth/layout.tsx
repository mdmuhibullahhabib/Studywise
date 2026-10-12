import Link from "next/link";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-paper-muted px-6 py-12">
      <div className="w-full max-w-sm">
        <Link href="/" className="font-display text-xl italic text-ink">
          StudyWise
        </Link>
        <div className="card mt-6 p-8">{children}</div>
      </div>
    </div>
  );
}
