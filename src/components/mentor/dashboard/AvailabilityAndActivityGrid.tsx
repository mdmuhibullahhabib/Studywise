import Link from "next/link";
import Image from "next/image";
import { Calendar, Users, ArrowRight, Clock, MessageSquare, Plus, Check } from "lucide-react";

interface ConversationItem {
  id: string;
  updatedAt: Date | string;
  student: {
    id: string;
    name: string;
    image?: string | null;
    avatarUrl?: string | null;
    studentProfile?: {
      institution?: string | null;
      educationLevel?: string | null;
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

interface AvailabilitySlotItem {
  id: string;
  dayOfWeek: number; // 0 = Sun .. 6 = Sat
  startTime: string;
  endTime: string;
  isActive: boolean;
}

interface AvailabilityAndActivityGridProps {
  conversations: ConversationItem[];
  availabilitySlots?: AvailabilitySlotItem[];
  currentUserId: string;
}

const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

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

export function AvailabilityAndActivityGrid({
  conversations,
  availabilitySlots = [],
  currentUserId,
}: AvailabilityAndActivityGridProps) {
  const activeDaysSet = new Set(availabilitySlots.map((s) => s.dayOfWeek));

  return (
    <section className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-12">
      {/* 1. Availability Heatmap & Weekly Windows (7 Cols) */}
      <div className="flex flex-col justify-between rounded-2xl border border-[#E7ECE8] bg-white p-6 shadow-[0_2px_12px_rgba(0,0,0,0.02)] lg:col-span-7">
        <div>
          <div className="flex items-center justify-between border-b border-[#F0F3F1] pb-4">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-[#1C3E30]" />
              <h3 className="font-serif text-base font-normal text-[#0F1E17]">
                Your Weekly Availability
              </h3>
            </div>
            <Link
              href="/mentor/settings"
              className="flex items-center gap-1 text-xs font-semibold text-[#1C3E30] transition-colors hover:text-[#36887F] hover:underline"
            >
              <span>Manage Availability</span>
              <ArrowRight className="h-3 w-3" />
            </Link>
          </div>

          <div className="mt-4 flex items-center justify-between text-xs text-[#52645B]">
            <span className="font-semibold text-[#0F1E17]">Recurring Weekly Schedule</span>
            <div className="flex items-center gap-3 text-[11px]">
              <span className="flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-[#1C3E30]" /> Active Slot
              </span>
              <span className="flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-[#E3EAE6]" /> Off-Hours
              </span>
            </div>
          </div>

          {/* Days Pill Bar */}
          <div className="mt-4 grid grid-cols-7 gap-2">
            {DAYS.map((day, idx) => {
              const isActive = activeDaysSet.has(idx) || (availabilitySlots.length === 0 && (idx >= 1 && idx <= 5));
              const slot = availabilitySlots.find((s) => s.dayOfWeek === idx);

              return (
                <div
                  key={day}
                  className={`flex flex-col items-center justify-center rounded-xl border p-2.5 text-center transition-all ${
                    isActive
                      ? "border-[#C5DFD0] bg-[#F0F6F2] text-[#1C3E30]"
                      : "border-[#ECEFEF] bg-[#FAFBFB] text-[#9AA8A1]"
                  }`}
                >
                  <span className="text-[11px] font-bold uppercase">{day}</span>
                  <div className="mt-1 flex items-center justify-center">
                    {isActive ? (
                      <span className="h-1.5 w-1.5 rounded-full bg-[#1C3E30]" />
                    ) : (
                      <span className="text-[10px] text-[#A6B5AD]">-</span>
                    )}
                  </div>
                  <span className="mt-1 text-[9.5px] font-medium leading-none text-[#5B6D64]">
                    {slot ? `${slot.startTime.slice(0, 5)}` : isActive ? "9:00" : "Off"}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Time Slot Heatmap Grid */}
          <div className="mt-6 space-y-2 text-[11px]">
            {["9:00 AM", "11:00 AM", "1:00 PM", "3:00 PM", "5:00 PM", "7:00 PM"].map((time, idx) => (
              <div key={time} className="flex items-center gap-3">
                <span className="w-16 shrink-0 text-[10.5px] text-[#8C9C94]">{time}</span>
                <div className="grid flex-1 grid-cols-7 gap-2">
                  {[0, 1, 2, 3, 4, 5, 6].map((col) => {
                    const isColActive = activeDaysSet.has(col) || (availabilitySlots.length === 0 && col >= 1 && col <= 5);
                    const isAvailableTime = isColActive && (idx !== 2 && idx !== 5);

                    return (
                      <div
                        key={col}
                        className={`h-5 rounded-md transition-colors ${
                          isAvailableTime
                            ? "bg-[#36887F]/30 hover:bg-[#36887F]/50"
                            : "bg-[#F3F6F4]"
                        }`}
                      />
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Schedule Action */}
        <div className="mt-6 flex items-center justify-between rounded-xl border border-[#E4ECE7] bg-[#FAFBF9] p-3 text-[11px] text-[#556960]">
          <span>Synced with your local calendar timezone.</span>
          <Link
            href="/mentor/settings"
            className="flex items-center gap-1 font-semibold text-[#1C3E30] hover:underline"
          >
            <span>Edit Weekly Hours</span>
            <ArrowRight className="h-3 w-3" />
          </Link>
        </div>
      </div>

      {/* 2. Student Activity & Messages Feed (5 Cols) */}
      <div className="flex flex-col justify-between rounded-2xl border border-[#E7ECE8] bg-white p-6 shadow-[0_2px_12px_rgba(0,0,0,0.02)] lg:col-span-5">
        <div>
          <div className="flex items-center justify-between border-b border-[#F0F3F1] pb-4">
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4 text-[#1C3E30]" />
              <h3 className="font-serif text-base font-normal text-[#0F1E17]">
                Student Messages
              </h3>
            </div>
            <Link
              href="/mentor/messages"
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

                  const photoUrl =
                    c.student.image ||
                    c.student.avatarUrl ||
                    "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80";

                  return (
                    <Link
                      key={c.id}
                      href={`/mentor/messages/${c.id}`}
                      className="group flex items-center justify-between rounded-xl border border-transparent p-3 transition-colors hover:border-[#E5ECE7] hover:bg-[#F9FAF9]"
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        {/* Student Avatar */}
                        <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-full border border-[#DCE4E0] bg-[#F2F6F4]">
                          <Image
                            src={photoUrl}
                            alt={c.student.name}
                            fill
                            className="object-cover"
                          />
                        </div>

                        <div className="min-w-0">
                          <div className="flex items-center gap-2">
                            <p className="truncate text-xs font-semibold text-[#0F1E17] group-hover:text-[#36887F]">
                              {c.student.name}
                            </p>
                            {c.student.studentProfile?.institution && (
                              <span className="hidden truncate text-[11px] text-[#8C9C94] sm:inline">
                                · {c.student.studentProfile.institution}
                              </span>
                            )}
                          </div>
                          <p className="mt-0.5 truncate text-[12px] text-[#697A72]">
                            {lastMessage?.content || "No messages yet"}
                          </p>
                        </div>
                      </div>

                      <div className="flex shrink-0 items-center gap-2.5 pl-3">
                        <span className="text-[10.5px] text-[#8C9C94]">
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
              <div className="py-10 text-center">
                <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-full bg-[#F0F5F2] text-[#1C3E30]">
                  <MessageSquare className="h-5 w-5 text-[#36887F]" />
                </div>
                <p className="mt-3 text-xs font-medium text-[#0F1E17]">
                  No messages yet
                </p>
                <p className="mt-1 text-[11px] text-[#788880]">
                  When students reach out with questions about your university or bookings, your chats will appear here.
                </p>
                <Link
                  href="/mentor/booked"
                  className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold text-[#1C3E30] hover:underline"
                >
                  <span>Check bookings</span>
                  <ArrowRight className="h-3 w-3" />
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* Quick Response Tip */}
        <div className="mt-5 rounded-xl border border-[#E4ECE7] bg-[#FAFBF9] p-3 text-[11px] text-[#556960] flex items-center justify-between">
          <span>Fast replies increase your mentor profile visibility.</span>
          <Link href="/mentor/messages" className="font-semibold text-[#1C3E30] hover:underline shrink-0 ml-2">
            Open Inbox →
          </Link>
        </div>
      </div>
    </section>
  );
}