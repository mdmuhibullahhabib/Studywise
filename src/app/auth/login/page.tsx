// "use client";

// import { useState } from "react";
// import { useRouter, useSearchParams } from "next/navigation";
// import Link from "next/link";
// import { signIn } from "next-auth/react";

// export default function LoginPage() {
//   const router = useRouter();
//   const searchParams = useSearchParams();
//   const callbackUrl = searchParams.get("callbackUrl") ?? "/";

//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState<string | null>(null);
//   const [submitting, setSubmitting] = useState(false);

//   async function handleSubmit(e: React.FormEvent) {
//     e.preventDefault();
//     setSubmitting(true);
//     setError(null);

//     const result = await signIn("credentials", { email, password, redirect: false });

//     if (result?.error) {
//       setError("That email and password don't match an account.");
//       setSubmitting(false);
//       return;
//     }

//     router.push(callbackUrl);
//     router.refresh();
//   }

//   return (
//     <>
//       <h1 className="text-h1">Log in</h1>
//       <p className="mt-1 text-sm text-ink-500">Welcome back.</p>

//       <form onSubmit={handleSubmit} className="mt-6 space-y-4">
//         <div>
//           <label htmlFor="email" className="field-label">
//             Email
//           </label>
//           <input
//             id="email"
//             type="email"
//             required
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             className="input mt-1"
//           />
//         </div>
//         <div>
//           <div className="flex items-center justify-between">
//             <label htmlFor="password" className="field-label">
//               Password
//             </label>
//             <Link href="/auth/forgot-password" className="text-xs text-sage hover:text-ink">
//               Forgot?
//             </Link>
//           </div>
//           <input
//             id="password"
//             type="password"
//             required
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             className="input mt-1"
//           />
//         </div>

//         {error && (
//           <p role="alert" className="error-text">
//             {error}
//           </p>
//         )}

//         <button type="submit" disabled={submitting} className="btn-primary w-full">
//           {submitting ? "Logging in…" : "Log in"}
//         </button>
//       </form>

//       <p className="mt-6 text-center text-sm text-ink-500">
//         New to StudyWise?{" "}
//         <Link href="/auth/register" className="font-medium text-sage hover:text-ink">
//           Create an account
//         </Link>
//       </p>
//     </>
//   );
// }



import { Suspense } from "react";
import LoginClient from "./LoginClient";

export default function LoginPage() {
  return (
    <Suspense
      fallback={
        <div className="text-sm text-ink-500">
          Loading login...
        </div>
      }
    >
      <LoginClient />
    </Suspense>
  );
}
