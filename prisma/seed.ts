/**
 * Development seed data — clearly fictional accounts for local testing.
 * Run with: npm run db:seed
 *
 * Every account uses the password "password123" for local dev convenience.
 * Never run this against a production database.
 */
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const db = new PrismaClient();

async function main() {
  const passwordHash = await bcrypt.hash("password123", 12);

  // ── Admin ────────────────────────────────────────────────────────────
  const admin = await db.user.upsert({
    where: { email: "admin@studywise.dev" },
    update: {},
    create: {
      name: "Ava Administrator",
      email: "admin@studywise.dev",
      passwordHash,
      role: "ADMIN"
    }
  });

  // ── Mentors ──────────────────────────────────────────────────────────
  const mentorSeeds = [
    {
      email: "priya@studywise.dev",
      name: "Priya Nair",
      title: "Master's in Computer Science",
      country: "Canada",
      university: "University of Toronto",
      studyLevel: "Master's",
      bio: "I moved from Dhaka to Toronto for my Master's and now help students navigate applications, visas, and settling in.",
      expertise: ["Programming", "System Design", "Study Abroad Applications"],
      subjects: ["Programming", "Career"],
      hourlyRate: 25
    },
    {
      email: "marcus@studywise.dev",
      name: "Marcus Webb",
      title: "PhD Candidate, Physics",
      country: "United Kingdom",
      university: "Imperial College London",
      studyLevel: "PhD",
      bio: "I teach physics and calculus with an emphasis on intuition over memorization, and can speak to the UK PhD application process.",
      expertise: ["Physics", "Calculus", "Exam Prep"],
      subjects: ["Physics", "Mathematics"],
      hourlyRate: 18
    },
    {
      email: "sofia@studywise.dev",
      name: "Sofia Ramirez",
      title: "Master's in Design",
      country: "Germany",
      university: "TU Berlin",
      studyLevel: "Master's",
      bio: "Portfolio reviews, scholarship applications, and how to think like a product designer.",
      expertise: ["UX Design", "Portfolio Review", "Scholarship Applications"],
      subjects: ["Design"],
      hourlyRate: 22
    }
  ];

  const mentors = [];
  for (const seed of mentorSeeds) {
    const user = await db.user.upsert({
      where: { email: seed.email },
      update: {},
      create: { name: seed.name, email: seed.email, passwordHash, role: "MENTOR" }
    });

    const profile = await db.mentorProfile.upsert({
      where: { userId: user.id },
      update: {},
      create: {
        userId: user.id,
        title: seed.title,
        country: seed.country,
        university: seed.university,
        studyLevel: seed.studyLevel,
        bio: seed.bio,
        expertise: seed.expertise,
        subjects: seed.subjects,
        hourlyRate: seed.hourlyRate,
        verified: true,
        verificationStatus: "APPROVED",
        isDiscoverable: true,
        ratingAverage: 4.8,
        ratingCount: 12
      }
    });

    await db.mentorApplication.upsert({
      where: { userId: user.id },
      update: {},
      create: {
        userId: user.id,
        status: "APPROVED",
        reviewedAt: new Date(),
        reviewerId: admin.id
      }
    });

    // Weekly availability: weekdays 9am–5pm UTC.
    for (const dayOfWeek of [1, 2, 3, 4, 5]) {
      const existing = await db.availability.findFirst({ where: { mentorId: profile.id, dayOfWeek } });
      if (!existing) {
        await db.availability.create({
          data: { mentorId: profile.id, dayOfWeek, startTime: "09:00", endTime: "17:00", timezone: "UTC" }
        });
      }
    }

    mentors.push({ user, profile });
  }

  // ── Students ─────────────────────────────────────────────────────────
  const studentSeeds = [
    { email: "jordan@studywise.dev", name: "Jordan Blake", educationLevel: "Undergraduate", subjects: ["Programming"] },
    { email: "casey@studywise.dev", name: "Casey Morgan", educationLevel: "High School", subjects: ["Physics", "Mathematics"] }
  ];

  const students = [];
  for (const seed of studentSeeds) {
    const user = await db.user.upsert({
      where: { email: seed.email },
      update: {},
      create: { name: seed.name, email: seed.email, passwordHash, role: "STUDENT" }
    });

    await db.studentProfile.upsert({
      where: { userId: user.id },
      update: {},
      create: {
        userId: user.id,
        educationLevel: seed.educationLevel,
        subjects: seed.subjects,
        goals: "Build confidence and stay ahead of coursework."
      }
    });

    students.push(user);
  }

  // ── A sample conversation + completed booking + review ────────────────
  // const [jordan] = students;
  // const [priya] = mentors;


const jordan = students[0];
const priya = mentors[0];

if (!jordan || !priya) {
  throw new Error("Seed failed: Jordan or Priya was not created.");
}




  const conversation = await db.conversation.upsert({
    where: { studentId_mentorId: { studentId: jordan.id, mentorId: priya.user.id } },
    update: {},
    create: { studentId: jordan.id, mentorId: priya.user.id }
  });

  await db.message.createMany({
    data: [
      {
        conversationId: conversation.id,
        senderId: jordan.id,
        type: "TEXT",
        content: "Hi! I'd love some help preparing for system design interviews."
      },
      {
        conversationId: conversation.id,
        senderId: priya.user.id,
        type: "TEXT",
        content: "Happy to help — let's book a session and go through a mock interview."
      }
    ],
    skipDuplicates: true
  });

  const pastDate = new Date();
  pastDate.setDate(pastDate.getDate() - 7);

  const completedBooking = await db.booking.upsert({
    where: { mentorId_date_startTime: { mentorId: priya.user.id, date: pastDate, startTime: "10:00" } },
    update: {},
    create: {
      studentId: jordan.id,
      mentorId: priya.user.id,
      mentorProfileId: priya.profile.id,
      conversationId: conversation.id,
      subject: "System design mock interview",
      date: pastDate,
      startTime: "10:00",
      endTime: "11:00",
      timezone: "UTC",
      duration: 60,
      price: 65,
      currency: "USD",
      status: "COMPLETED"
    }
  });

  await db.review.upsert({
    where: { bookingId: completedBooking.id },
    update: {},
    create: {
      bookingId: completedBooking.id,
      studentId: jordan.id,
      mentorId: priya.user.id,
      rating: 5,
      review: "Priya gave me a clear framework for approaching system design questions. Highly recommend."
    }
  });

  console.log("Seed complete:");
  console.log(`  Admin:    admin@studywise.dev / password123`);
  console.log(`  Mentors:  ${mentorSeeds.map((m) => m.email).join(", ")} / password123`);
  console.log(`  Students: ${studentSeeds.map((s) => s.email).join(", ")} / password123`);
}

main()
  .catch((err) => {
    console.error(err);
    process.exit(1);
  })
  .finally(async () => {
    await db.$disconnect();
  });
