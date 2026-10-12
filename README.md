# StudyWise

A student-to-mentor education platform: discover a mentor, message them, book a
session, meet, get the recording back in your conversation, and review the mentor.

Built with Next.js (App Router) + TypeScript + Tailwind CSS + PostgreSQL + Prisma +
NextAuth/Auth.js.

## Status

This is a working architecture with real database-backed logic throughout
(auth, booking/availability, messaging, meetings, recordings, payments,
notifications, reviews, earnings, and a full admin console). It has **not**
been `npm install`ed, built, or type-checked in the environment it was
written in (no network access there) — do that first before relying on it.

External integrations (video, payments, file storage, email) are built as
clean provider abstractions with a working zero-credential default for each
(WebRTC stub / no-payment / local storage / console email) and an
honestly-unimplemented adapter for a real provider (Zoom / Stripe / S3 /
Resend) that throws a clear "not configured" error rather than faking one.

## Getting started

```bash
npm install
cp .env.example .env        # fill in DATABASE_URL and AUTH_SECRET at minimum
npx prisma migrate dev --name init
npm run db:seed
npm run dev
```

Then open http://localhost:3000.

### Seed accounts

All seeded accounts use the password `password123`:

- Admin: `admin@studywise.dev`
- Mentors: `priya@studywise.dev`, `marcus@studywise.dev`, `sofia@studywise.dev`
- Students: `jordan@studywise.dev`, `casey@studywise.dev`

## Project structure

```
src/
├── app/            # Next.js App Router routes: (public), auth, student, mentor, admin, api
├── components/      # Reusable UI, grouped by domain
├── features/        # Server actions and feature-specific business logic
├── services/         # Provider-agnostic services (meeting, payment, storage, email, notification)
├── providers/        # Concrete provider adapters behind each service
├── lib/              # db client, auth config, permissions, logger, utils
├── validations/       # Zod schemas
├── constants/          # Demo/seed constants for design preview
└── middleware.ts        # Edge-level route protection (backed by server-side checks too)
prisma/
├── schema.prisma    # Full data model
└── seed.ts          # Dev seed data
```

## Known limitations

See the implementation report shared in the conversation this project came
from for the full list — notably: no build has been verified, no
password-reset flow, no ad-hoc "start meeting" outside a booking, and no
private mentor notes on students yet.
