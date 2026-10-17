import Link from "next/link";
import Image from "next/image";
import {
  MessageSquare,
  ArrowRight,
  GraduationCap,
  Compass,
  CheckCircle2,
  FileText,
  Plane,
  ChevronRight,
} from "lucide-react";

interface ConversationItem {
  id: string;
  updatedAt: Date | string;
  mentor: {
    id: string;
    name: string;
    avatarUrl?: string | null;
    mentorProfile?: {
      university?: string | null;
      title?: string | null;
    } | null;
  };
  messages: {
    id: string;
    content: string | null;
    createdAt: Date | string;
    readAt?: Date | string | null;
    senderId?: string;
  }[];
}

interface StudentActivityAndChecklistGridProps {
  conversations: ConversationItem[];
  currentUserId: string;
}

function formatRelativeTime(date: Date | string) {
  const d = new Date(date);
  const now = new Date();
  const diffMs = Math.max(0, now.getTime() - d.getTime());
  const diffMin = Math.floor(diffMs / (1000 * 60));
  const diffHours = Math.floor(diffMin / 60);
  const diffDays = Math.floor(diffHours / 24);

  if (diffMin < 1) return "Just now";
  if (diffMin < 60) return `${diffMin}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  if (diffDays < 7) return `${diffDays}d ago`;
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

export function StudentActivityAndChecklistGrid({
  conversations,
  currentUserId,
}: StudentActivityAndChecklistGridProps) {
  const ROADMAP_STEPS = [
    {
      step: "01",
      title: "Discover Universities & Programs",
      desc: "Research country requirements, fees, and career prospects.",
      icon: Compass,
      status: "done",
    },
    {
      step: "02",
      title: "1-on-1 Alumni Mentorship",
      desc: "Speak with students who have already been admitted.",
      icon: GraduationCap,
      status: "current",
    },
    {
      step: "03",
      title: "SOP & Document Review",
      desc: "Polish your personal statement and recommendation letters.",
      icon: FileText,
      status: "upcoming",
    },
    {
      step: "04",
      title: "Visa, Funding & Relocation",
      desc: "Get guidance on visa interviews, housing, and arrival.",
      icon: Plane,
      status: "upcoming",
    },
  ];

  return (
    <section className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-12">
      {/* 1. Recent Messages Feed (7 Cols) */}
      <div className="flex flex-col justify-between rounded-2xl border border-[#E7ECE8] bg-white p-6 shadow-[0_2px_12px_rgba(0,0,0,0.02)] lg:col-span-7">
        <div>
          <div className="flex items-center justify-between border-b border-[#F0F3F1] pb-4">
            <div className="flex items-center gap-2">
              <MessageSquare className="h-4 w-4 text-[#1C3E30]" />
              <h3 className="font-serif text-base font-normal text-[#0F1E17]">
                Recent Messages
              </h3>
            </div>
            <Link
              href="/student/messages"
              className="flex items-center gap-1 text-xs font-semibold text-[#1C3E30] transition-colors hover:text-[#36887F] hover:underline"
            >
              <span>View all messages</span>
              <ArrowRight className="h-3 w-3" />
            </Link>
          </div>

          <div className="mt-4">
            {conversations.length > 0 ? (
              <div className="space-y-3">
                {conversations.map((c) => {
                  const lastMessage = c.messages[0];
                  const isUnread =
                    lastMessage &&
                    lastMessage.senderId !== currentUserId &&
                    !lastMessage.readAt;

                  return (
                    <Link
                      key={c.id}
                      href={`/student/messages/${c.id}`}
                      className="group flex items-center justify-between rounded-xl border border-transparent p-3 transition-colors hover:border-[#E5ECE7] hover:bg-[#F9FAF9]"
                    >
                      <div className="flex items-center gap-3.5 min-w-0">
                        {/* Avatar */}
                        <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-full border border-[#DCE4E0] bg-[#F2F6F4]">
                          <Image
                            src={
                              c.mentor.avatarUrl ||
                              "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80"
                            }
                            alt={c.mentor.name}
                            fill
                            className="object-cover"
                          />
                        </div>

                        <div className="min-w-0">
                          <div className="flex items-center gap-2">
                            <p className="truncate text-xs font-semibold text-[#0F1E17] group-hover:text-[#36887F]">
                              {c.mentor.name}
                            </p>
                            {c.mentor.mentorProfile?.university && (
                              <span className="hidden truncate text-[11px] text-[#8C9C94] sm:inline">
                                · {c.mentor.mentorProfile.university}
                              </span>
                            )}
                          </div>
                          <p className="mt-0.5 truncate text-[12px] text-[#697A72]">
                            {lastMessage?.content || "No messages yet"}
                          </p>
                        </div>
                      </div>

                      <div className="flex shrink-0 items-center gap-2.5 pl-3">
                        <span className="text-[11px] text-[#8C9C94]">
                          {lastMessage
                            ? formatRelativeTime(lastMessage.createdAt)
                            : formatRelativeTime(c.updatedAt)}
                        </span>
                        {isUnread && (
                          <span className="h-2 w-2 rounded-full bg-[#1C3E30]" />
                        )}
                      </div>
                    </Link>
                  );
                })}
              </div>
            ) : (
              /* Empty message state */
              <div className="py-10 text-center">
                <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-full bg-[#F0F5F2] text-[#1C3E30]">
                  <MessageSquare className="h-5 w-5 text-[#36887F]" />
                </div>
                <p className="mt-3 text-xs font-medium text-[#0F1E17]">
                  No messages yet
                </p>
                <p className="mt-1 text-[11px] text-[#788880]">
                  Direct message any mentor to ask quick questions about universities, courses, or requirements.
                </p>
                <Link
                  href="/mentors"
                  className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold text-[#1C3E30] hover:underline"
                >
                  <span>Explore mentors</span>
                  <ArrowRight className="h-3 w-3" />
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* Bottom Quick Help Tip */}
        <div className="mt-5 rounded-xl border border-[#E4ECE7] bg-[#FAFBF9] p-3 text-[11px] text-[#556960] flex items-center justify-between">
          <span>Tip: Mentors usually reply within 24 hours on weekdays.</span>
          <Link href="/mentors" className="font-semibold text-[#1C3E30] hover:underline shrink-0 ml-2">
            Find Mentors →
          </Link>
        </div>
      </div>

      {/* 2. Study-Abroad Roadmap & Quick Actions (5 Cols) */}
      <div className="flex flex-col justify-between rounded-2xl border border-[#E7ECE8] bg-white p-6 shadow-[0_2px_12px_rgba(0,0,0,0.02)] lg:col-span-5">
        <div>
          <div className="flex items-center justify-between border-b border-[#F0F3F1] pb-4">
            <div className="flex items-center gap-2">
              <Compass className="h-4 w-4 text-[#1C3E30]" />
              <h3 className="font-serif text-base font-normal text-[#0F1E17]">
                Study-Abroad Roadmap
              </h3>
            </div>
            <span className="rounded-full bg-[#EBF4F0] px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-[#1C3E30]">
              In Progress
            </span>
          </div>

          <div className="mt-4 space-y-3.5">
            {ROADMAP_STEPS.map((step) => {
              const isDone = step.status === "done";
              const isCurrent = step.status === "current";

              return (
                <div
                  key={step.step}
                  className={`flex items-start gap-3 rounded-xl p-2.5 transition-colors ${
                    isCurrent
                      ? "border border-[#D9E6DF] bg-[#F4F8F5]"
                      : "bg-white"
                  }`}
                >
                  <div
                    className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-lg text-xs font-semibold ${
                      isDone
                        ? "bg-[#1C3E30] text-white"
                        : isCurrent
                        ? "bg-[#36887F] text-white"
                        : "border border-[#DCE3DF] bg-[#F9FAF9] text-[#7A8A82]"
                    }`}
                  >
                    {isDone ? (
                      <CheckCircle2 className="h-4 w-4" />
                    ) : (
                      <span>{step.step}</span>
                    )}
                  </div>

                  <div className="min-w-0 flex-1">
                    <p
                      className={`text-xs font-semibold ${
                        isCurrent ? "text-[#0F1E17]" : "text-[#2A3F35]"
                      }`}
                    >
                      {step.title}
                    </p>
                    <p className="mt-0.5 text-[11px] leading-relaxed text-[#687971]">
                      {step.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Quick Shortcut Buttons */}
        <div className="mt-6 border-t border-[#F0F3F1] pt-4">
          <p className="text-[11px] font-semibold uppercase tracking-wider text-[#7A8A82]">
            Quick Actions
          </p>
          <div className="mt-2.5 flex flex-wrap gap-2 text-xs">
            <Link
              href="/mentors"
              className="inline-flex items-center gap-1 rounded-full border border-[#DCE4E0] bg-[#FAFBF9] px-3 py-1.5 text-[11.5px] font-medium text-[#20332B] transition-colors hover:border-[#1C3E30] hover:bg-white"
            >
              <span>Explore Top Mentors</span>
              <ChevronRight className="h-3 w-3 text-[#36887F]" />
            </Link>
            <Link
              href="/student/booked"
              className="inline-flex items-center gap-1 rounded-full border border-[#DCE4E0] bg-[#FAFBF9] px-3 py-1.5 text-[11.5px] font-medium text-[#20332B] transition-colors hover:border-[#1C3E30] hover:bg-white"
            >
              <span>Manage Sessions</span>
              <ChevronRight className="h-3 w-3 text-[#36887F]" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
