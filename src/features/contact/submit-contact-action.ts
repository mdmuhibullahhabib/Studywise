"use server";

import { redirect } from "next/navigation";
import { z } from "zod";
import { emailService } from "@/services/email.service";

const contactSchema = z.object({
  name: z.string().min(1).max(120),
  email: z.string().email(),
  message: z.string().min(1).max(4000)
});

export async function submitContactAction(formData: FormData) {
  const parsed = contactSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    message: formData.get("message")
  });

  if (!parsed.success) {
    redirect("/contact?error=1");
  }

  await emailService.send({
    to: "support@studywise.app",
    subject: `Contact form: ${parsed.data.name}`,
    html: `<p>From: ${parsed.data.name} (${parsed.data.email})</p><p>${parsed.data.message}</p>`
  });

  redirect("/contact?sent=1");
}
