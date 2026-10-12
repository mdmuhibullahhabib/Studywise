import "server-only";
import { logger } from "@/lib/logger";

export interface SendEmailInput {
  to: string;
  subject: string;
  html: string;
}

interface EmailService {
  readonly name: string;
  send(input: SendEmailInput): Promise<void>;
}

class ConsoleEmailService implements EmailService {
  readonly name = "console";
  async send(input: SendEmailInput) {
    logger.info("email.send (console provider — not actually delivered)", {
      to: input.to,
      subject: input.subject
    });
  }
}

class ResendEmailService implements EmailService {
  readonly name = "resend";
  async send(_input: SendEmailInput): Promise<void> {
    throw new Error(
      "ResendEmailService is not configured. Set EMAIL_API_KEY and implement send() against the Resend API."
    );
  }
}

function resolveEmail(): EmailService {
  switch (process.env.EMAIL_PROVIDER) {
    case "resend":
      return new ResendEmailService();
    case "console":
    default:
      return new ConsoleEmailService();
  }
}

export const emailService = resolveEmail();
