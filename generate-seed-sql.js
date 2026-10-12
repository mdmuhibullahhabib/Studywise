/**
 * generate-seed-sql.js
 *
 * Generates plain SQL INSERT statements for 3 approved mentors + 2 students,
 * using this project's own bcryptjs dependency to create a real password
 * hash (so login actually works) instead of a fabricated/unverified one.
 *
 * Usage:
 *   node generate-seed-sql.js > seed-data.sql
 *
 * Then open your Neon project's SQL Editor (or `psql $DATABASE_URL -f seed-data.sql`)
 * and run the contents of seed-data.sql.
 *
 * All accounts use the password: password123
 */
const bcrypt = require("bcryptjs");
const crypto = require("crypto");

function id() {
  return crypto.randomUUID();
}

function esc(value) {
  if (value === null || value === undefined) return "NULL";
  return `'${String(value).replace(/'/g, "''")}'`;
}

function pgTextArray(values) {
  return `ARRAY[${values.map((v) => esc(v)).join(", ")}]::text[]`;
}

async function main() {
  const passwordHash = await bcrypt.hash("password123", 12);

  const mentors = [
    {
      userId: id(),
      profileId: id(),
      name: "Priya Nair",
      email: "priya@studywise.dev",
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
      userId: id(),
      profileId: id(),
      name: "Marcus Webb",
      email: "marcus@studywise.dev",
      title: "PhD Candidate, Physics",
      country: "United Kingdom",
      university: "Imperial College London",
      studyLevel: "PhD",
      bio: "I teach physics and calculus with an emphasis on intuition, and can speak to the UK PhD application process.",
      expertise: ["Physics", "Calculus", "Exam Prep"],
      subjects: ["Physics", "Mathematics"],
      hourlyRate: 18
    },
    {
      userId: id(),
      profileId: id(),
      name: "Sofia Ramirez",
      email: "sofia@studywise.dev",
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

  const students = [
    { userId: id(), name: "Jordan Blake", email: "jordan@studywise.dev" },
    { userId: id(), name: "Casey Morgan", email: "casey@studywise.dev" }
  ];

  const lines = [];
  lines.push("BEGIN;");
  lines.push("");

  // ── Mentors: User + MentorProfile + weekly availability (Mon-Fri 9-5 UTC) ──
  for (const m of mentors) {
    lines.push(
      `INSERT INTO "User" (id, name, email, "passwordHash", role, status, "createdAt", "updatedAt") VALUES (${esc(m.userId)}, ${esc(m.name)}, ${esc(m.email)}, ${esc(passwordHash)}, 'MENTOR', 'ACTIVE', now(), now());`
    );
    lines.push(
      `INSERT INTO "MentorProfile" (id, "userId", title, country, university, "studyLevel", bio, expertise, subjects, languages, education, experience, "hourlyRate", currency, verified, "verificationStatus", "ratingAverage", "ratingCount", "isDiscoverable", "createdAt", "updatedAt") VALUES (${esc(m.profileId)}, ${esc(m.userId)}, ${esc(m.title)}, ${esc(m.country)}, ${esc(m.university)}, ${esc(m.studyLevel)}, ${esc(m.bio)}, ${pgTextArray(m.expertise)}, ${pgTextArray(m.subjects)}, ARRAY[]::text[], ARRAY[]::jsonb[], ARRAY[]::jsonb[], ${m.hourlyRate}, 'USD', true, 'APPROVED', 4.8, 12, true, now(), now());`
    );
    for (const day of [1, 2, 3, 4, 5]) {
      lines.push(
        `INSERT INTO "Availability" (id, "mentorId", "dayOfWeek", "startTime", "endTime", timezone, "isActive", "createdAt", "updatedAt") VALUES (${esc(id())}, ${esc(m.profileId)}, ${day}, '09:00', '17:00', 'UTC', true, now(), now());`
      );
    }
    lines.push("");
  }

  // ── Students: User + StudentProfile ──
  for (const s of students) {
    lines.push(
      `INSERT INTO "User" (id, name, email, "passwordHash", role, status, "createdAt", "updatedAt") VALUES (${esc(s.userId)}, ${esc(s.name)}, ${esc(s.email)}, ${esc(passwordHash)}, 'STUDENT', 'ACTIVE', now(), now());`
    );
    lines.push(
      `INSERT INTO "StudentProfile" (id, "userId", subjects, interests, "createdAt", "updatedAt") VALUES (${esc(id())}, ${esc(s.userId)}, ARRAY[]::text[], ARRAY[]::text[], now(), now());`
    );
    lines.push("");
  }

  lines.push("COMMIT;");

  console.log(lines.join("\n"));
}

main();
