"use server";

import bcrypt from "bcryptjs";
import { db } from "@/lib/db";
import { registerSchema } from "@/validations/auth";

export interface RegisterFormState {
  error?: string;
  success?: boolean;
}

export async function registerAction(
  _prevState: RegisterFormState,
  formData: FormData
): Promise<RegisterFormState> {
  const parsed = registerSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    password: formData.get("password"),
    confirmPassword: formData.get("confirmPassword"),
    // `role` is constrained to STUDENT | MENTOR by the schema itself —
    // ADMIN can never come through this path regardless of form input.
    role: formData.get("role")
  });

  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Please check your details and try again." };
  }

  const { name, email, password, role } = parsed.data;

  const existing = await db.user.findUnique({ where: { email } });
  if (existing) {
    return { error: "An account with that email already exists." };
  }

  const passwordHash = await bcrypt.hash(password, 12);

  await db.$transaction(async (tx) => {
    const user = await tx.user.create({
      data: { name, email, passwordHash, role }
    });

    if (role === "STUDENT") {
      await tx.studentProfile.create({ data: { userId: user.id } });
    } else {
      await tx.mentorProfile.create({ data: { userId: user.id } });
      await tx.mentorApplication.create({ data: { userId: user.id, status: "PENDING" } });
    }
  });

  return { success: true };
}
