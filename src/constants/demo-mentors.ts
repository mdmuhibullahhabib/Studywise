import type { MentorCardData } from "@/components/mentor/mentor-card";

/**
 * DEMO / SEED DATA — for local development and design review only.
 * Replace with a real query (e.g. `MentorService.search()`) once the
 * database has approved mentors. Do not present this as real user data.
 */
export const DEMO_MENTORS: MentorCardData[] = [
  {
    id: "demo-mentor-1",
    name: "Priya Nair",
    title: "Master's in Computer Science",
    country: "Canada",
    university: "University of Toronto",
    expertise: ["Programming", "System Design", "Study Abroad Applications"],
    ratingAverage: 4.9,
    ratingCount: 128,
    sessionCount: 96,
    verified: true,
    hourlyRate: 25,
    currency: "USD"
  },
  {
    id: "demo-mentor-2",
    name: "Marcus Webb",
    title: "PhD Candidate, Physics",
    country: "United Kingdom",
    university: "Imperial College London",
    expertise: ["Physics", "Calculus", "Exam Prep"],
    ratingAverage: 4.8,
    ratingCount: 94,
    sessionCount: 71,
    verified: true,
    hourlyRate: 18,
    currency: "USD"
  },
  {
    id: "demo-mentor-3",
    name: "Sofia Ramirez",
    title: "Master's in Design",
    country: "Germany",
    university: "TU Berlin",
    expertise: ["UX Design", "Portfolio Review", "Scholarship Applications"],
    ratingAverage: 5.0,
    ratingCount: 61,
    sessionCount: 48,
    verified: true,
    hourlyRate: 22,
    currency: "USD"
  },
  {
    id: "demo-mentor-4",
    name: "David Okafor",
    title: "MBA Candidate",
    country: "Australia",
    university: "University of Melbourne",
    expertise: ["Business Strategy", "Fundraising", "Career"],
    ratingAverage: 4.7,
    ratingCount: 73,
    sessionCount: 55,
    verified: false,
    hourlyRate: 28,
    currency: "USD"
  }
];

export const CATEGORIES = [
  "Mathematics",
  "Physics",
  "Chemistry",
  "Programming",
  "English",
  "Business",
  "Design",
  "Study Abroad Applications",
  "Scholarship Applications",
  "Career"
];
