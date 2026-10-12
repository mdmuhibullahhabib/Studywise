import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8)
});

export const registerSchema = z
  .object({
    name: z.string().min(2).max(80),
    email: z.string().email(),
    password: z.string().min(8).max(72),
    confirmPassword: z.string(),
    // ADMIN is intentionally excluded — never exposed on public registration.
    role: z.enum(["STUDENT", "MENTOR"])
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"]
  });

export const forgotPasswordSchema = z.object({
  email: z.string().email()
});

export const resetPasswordSchema = z
  .object({
    token: z.string().min(1),
    password: z.string().min(8).max(72),
    confirmPassword: z.string()
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"]
  });

export type LoginInput = z.infer<typeof loginSchema>;
export type RegisterInput = z.infer<typeof registerSchema>;
