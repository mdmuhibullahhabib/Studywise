"use client";

import { useActionState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { registerAction, type RegisterFormState } from "@/features/auth/register-action";

const initialState: RegisterFormState = {};

export default function RegisterPage() {
  const router = useRouter();
  const [state, formAction, pending] = useActionState(registerAction, initialState);

  if (state.success) {
    router.push("/auth/login?registered=1");
  }

  return (
    <>
      <h1 className="text-h1">Create your account</h1>
      <p className="mt-1 text-sm text-ink-500">Join as a student or apply to mentor.</p>

      <form action={formAction} className="mt-6 space-y-4">
        <fieldset className="flex gap-3">
          <legend className="sr-only">I am a</legend>
          <label className="flex-1 cursor-pointer rounded border border-line p-3 text-center text-sm font-medium text-ink-500 transition-colors duration-150 has-[:checked]:border-sage has-[:checked]:bg-sage-soft has-[:checked]:text-sage-text">
            <input type="radio" name="role" value="STUDENT" defaultChecked className="sr-only" />
            Student
          </label>
          <label className="flex-1 cursor-pointer rounded border border-line p-3 text-center text-sm font-medium text-ink-500 transition-colors duration-150 has-[:checked]:border-sage has-[:checked]:bg-sage-soft has-[:checked]:text-sage-text">
            <input type="radio" name="role" value="MENTOR" className="sr-only" />
            Mentor
          </label>
        </fieldset>

        <div>
          <label htmlFor="name" className="field-label">
            Full name
          </label>
          <input id="name" name="name" required className="input mt-1" />
        </div>
        <div>
          <label htmlFor="email" className="field-label">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            className="input mt-1"
          />
        </div>
        <div>
          <label htmlFor="password" className="field-label">
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            required
            minLength={8}
            className="input mt-1"
          />
        </div>
        <div>
          <label htmlFor="confirmPassword" className="field-label">
            Confirm password
          </label>
          <input
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            required
            minLength={8}
            className="input mt-1"
          />
        </div>

        {state.error && (
          <p role="alert" className="error-text">
            {state.error}
          </p>
        )}

        <button type="submit" disabled={pending} className="btn-primary w-full">
          {pending ? "Creating account…" : "Create account"}
        </button>
      </form>

      <p className="mt-6 text-center text-sm text-ink-500">
        Already have an account?{" "}
        <Link href="/auth/login" className="font-medium text-sage hover:text-ink">
          Log in
        </Link>
      </p>
    </>
  );
}
