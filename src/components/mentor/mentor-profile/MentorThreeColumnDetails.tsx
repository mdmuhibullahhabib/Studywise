import {
  Building2,
  GraduationCap,
  Globe,
  Award,
  FileText,
  Briefcase,
  Home,
  Clock,
  Sparkles,
  CheckCircle2,
} from "lucide-react";

interface MentorThreeColumnDetailsProps {
  mentorName: string;
  bio?: string | null;
  teachingApproach?: string | null;
  university?: string | null;
  country?: string | null;
  studyLevel?: string | null;
  expertise?: string[];
}

export function MentorThreeColumnDetails({
  mentorName,
  bio,
  teachingApproach,
  university = "University of Manchester",
  country = "United Kingdom",
  studyLevel = "MSc Data Science",
  expertise = [],
}: MentorThreeColumnDetailsProps) {
  const firstName = mentorName ? mentorName.split(" ")[0] : "Mentor";

  const experienceItems = [
    {
      icon: Building2,
      label: "University",
      value: university || "University of Manchester",
    },
    {
      icon: GraduationCap,
      label: "Degree Level",
      value: studyLevel || "MSc Degree",
    },
    {
      icon: Globe,
      label: "Country",
      value: country || "United Kingdom",
    },
    {
      icon: Award,
      label: "Scholarship",
      value: "Chevening & Merit Scholarships",
    },
    {
      icon: FileText,
      label: "Application Experience",
      value: "UCAS, Common App, Direct Portals",
    },
    {
      icon: Briefcase,
      label: "Career / Work",
      value: "Industry Internships & Research",
    },
  ];

  const focusTopics = [
    {
      icon: GraduationCap,
      title: "University applications",
      sub: "Shortlisting, personal statements & deadlines",
    },
    {
      icon: Award,
      title: "Scholarships & funding",
      sub: "Eligibility, essay tips & government grants",
    },
    {
      icon: Home,
      title: "Student life & housing",
      sub: "On/off-campus flats, living costs & lifestyle",
    },
    {
      icon: Clock,
      title: "Part-time work & jobs",
      sub: "Job search, CV tips & visa working limits",
    },
    {
      icon: FileText,
      title: "Visa & document prep",
      sub: "Financial proofs, interviews & requirements",
    },
  ];

  return (
    <section className="mt-14 border-t border-[#E7ECE8] pt-12 sm:mt-16 sm:pt-14">
      {/* 3 Column Grid */}
      <div className="grid grid-cols-1 gap-6 sm:gap-7 lg:grid-cols-3 xl:gap-8">
        
        {/* Card 1: About */}
        <div className="flex flex-col justify-between rounded-3xl border border-[#E7ECE8] bg-white p-6 shadow-[0_4px_24px_rgba(0,0,0,0.03)] transition-all duration-300 hover:border-[#36887F]/30 hover:shadow-[0_12px_36px_rgba(54,136,127,0.08)] sm:p-7">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-[#D5E3DB] bg-[#EBF4F0] px-3.5 py-1 text-[11px] font-bold tracking-[0.25em] text-[#36887F] uppercase">
              <span className="h-1.5 w-1.5 rounded-full bg-[#36887F]" />
              ABOUT MENTOR
            </span>

            <h3
              style={{ lineHeight: 1.25 }}
              className="mt-3.5 font-serif text-2xl font-bold tracking-tight text-[#0F1E17] sm:text-[26px]"
            >
              About {firstName}
            </h3>

            <div className="mt-5 space-y-4 text-[14px] !leading-[1.65] text-[#40544B] sm:text-[15px]">
              <p>
                {bio ||
                  `Hi, I'm ${firstName}. I'm currently studying ${studyLevel} at ${university}. Having been through the entire process firsthand, I know the questions and uncertainty you might be facing — and I'm here to help.`}
              </p>
            </div>

            {/* Mentorship Approach Callout */}
            <div className="mt-5 rounded-2xl border border-[#E2EBE5] bg-[#F4F8F5] p-4 text-[13.5px] !leading-[1.65] text-[#2F4239] sm:text-[14px]">
              <div className="flex items-center gap-2 text-[11px] font-bold tracking-wider text-[#36887F] uppercase">
                <Sparkles className="h-3.5 w-3.5" />
                <span>Mentorship Approach</span>
              </div>
              <p className="mt-2 italic text-[#394B42]">
                “{teachingApproach ||
                  "I believe in honest, practical guidance. From choosing courses to visa tips and budgeting, I share what truly works based on real experience."}”
              </p>
            </div>
          </div>

          <div className="mt-6 flex items-center gap-2 border-t border-[#F0F4F1] pt-4 text-[12.5px] font-medium text-[#5E7167]">
            <CheckCircle2 className="h-4 w-4 shrink-0 text-[#36887F]" />
            <span>Open to all questions, big or small.</span>
          </div>
        </div>

        {/* Card 2: Experience & Background */}
        <div className="flex flex-col justify-between rounded-3xl border border-[#E7ECE8] bg-white p-6 shadow-[0_4px_24px_rgba(0,0,0,0.03)] transition-all duration-300 hover:border-[#36887F]/30 hover:shadow-[0_12px_36px_rgba(54,136,127,0.08)] sm:p-7">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-[#D5E3DB] bg-[#EBF4F0] px-3.5 py-1 text-[11px] font-bold tracking-[0.25em] text-[#36887F] uppercase">
              <span className="h-1.5 w-1.5 rounded-full bg-[#36887F]" />
              ACADEMIC & CAREER
            </span>

            <h3
              style={{ lineHeight: 1.25 }}
              className="mt-3.5 font-serif text-2xl font-bold tracking-tight text-[#0F1E17] sm:text-[26px]"
            >
              Experience
            </h3>

            <div className="mt-5 space-y-3">
              {experienceItems.map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-3.5 rounded-2xl p-2 transition-colors hover:bg-[#F6FAF7]"
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#EBF4F0] text-[#36887F]">
                    <item.icon className="h-5 w-5" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <span className="text-[11px] font-bold tracking-wider text-[#7C8D85] uppercase">
                      {item.label}
                    </span>
                    <p className="truncate text-[14px] font-semibold text-[#0F1E17] sm:text-[14.5px]">
                      {item.value}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-6 flex items-center gap-2 border-t border-[#F0F4F1] pt-4 text-[12.5px] font-medium text-[#5E7167]">
            <CheckCircle2 className="h-4 w-4 shrink-0 text-[#36887F]" />
            <span>Verified student credentials & enrollment.</span>
          </div>
        </div>

        {/* Card 3: Specialties & Topics */}
        <div className="flex flex-col justify-between rounded-3xl border border-[#E7ECE8] bg-white p-6 shadow-[0_4px_24px_rgba(0,0,0,0.03)] transition-all duration-300 hover:border-[#36887F]/30 hover:shadow-[0_12px_36px_rgba(54,136,127,0.08)] sm:p-7">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-[#D5E3DB] bg-[#EBF4F0] px-3.5 py-1 text-[11px] font-bold tracking-[0.25em] text-[#36887F] uppercase">
              <span className="h-1.5 w-1.5 rounded-full bg-[#36887F]" />
              MENTORSHIP TOPICS
            </span>

            <h3
              style={{ lineHeight: 1.25 }}
              className="mt-3.5 font-serif text-2xl font-bold tracking-tight text-[#0F1E17] sm:text-[26px]"
            >
              Specialties
            </h3>

            {/* Dynamic expertise pills if available */}
            {expertise && expertise.length > 0 && (
              <div className="mt-4 flex flex-wrap gap-1.5">
                {expertise.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center gap-1 rounded-full bg-[#EBF4F0] px-3 py-1 text-[12px] font-semibold text-[#1C3E30]"
                  >
                    <CheckCircle2 className="h-3.5 w-3.5 text-[#36887F]" />
                    {tag}
                  </span>
                ))}
              </div>
            )}

            {/* Focus Topics List */}
            <div className={`space-y-3 ${expertise && expertise.length > 0 ? "mt-4" : "mt-5"}`}>
              {focusTopics.map((topic, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-3.5 rounded-2xl p-2 transition-colors hover:bg-[#F6FAF7]"
                >
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#F0F5F2] text-[#36887F]">
                    <topic.icon className="h-4 w-4" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-[13.5px] font-bold text-[#0F1E17] sm:text-[14px]">
                      {topic.title}
                    </p>
                    <p className="text-[12px] text-[#697B72]">
                      {topic.sub}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-6 rounded-2xl border border-[#EAEFEA] bg-[#FAFBF9] px-3.5 py-2.5 text-center text-[12px] font-medium text-[#556960]">
            💡 Have unique questions? Bring your custom agenda to the session.
          </div>
        </div>

      </div>
    </section>
  );
}