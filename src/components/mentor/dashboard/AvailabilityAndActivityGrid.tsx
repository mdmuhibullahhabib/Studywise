import Link from "next/link";
import { Calendar, Users, ArrowRight } from "lucide-react";

export function AvailabilityAndActivityGrid() {
  return (
    <section className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-12">
      {/* Availability Heatmap (7 Cols) */}
      <div className="rounded-2xl border border-[#E7ECE8] bg-white p-6 shadow-[0_2px_12px_rgba(0,0,0,0.02)] lg:col-span-7">
        <div className="flex items-center justify-between border-b border-[#F0F3F1] pb-4">
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-[#1C3E30]" />
            <h3 className="font-serif text-base font-normal text-[#0F1E17]">
              Your Availability
            </h3>
          </div>
          <Link
            href="/mentor/settings"
            className="flex items-center gap-1 text-xs font-medium text-[#1C3E30] hover:underline"
          >
            <span>Manage Availability</span>
            <ArrowRight className="h-3 w-3" />
          </Link>
        </div>

        <div className="mt-4 flex items-center justify-between text-xs text-[#52645B]">
          <span className="font-semibold text-[#0F1E17]">Current Week Schedule</span>
          <div className="flex items-center gap-3 text-[11px]">
            <span className="flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-[#1C3E30]" /> Available
            </span>
            <span className="flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-[#E3EAE6]" /> Unavailable
            </span>
          </div>
        </div>

        {/* Heatmap Visual Grid */}
        <div className="mt-5 space-y-2 text-[11px]">
          {["9:00 AM", "11:00 AM", "1:00 PM", "3:00 PM", "5:00 PM", "7:00 PM"].map((time, idx) => (
            <div key={time} className="flex items-center gap-3">
              <span className="w-14 text-[#8C9C94]">{time}</span>
              <div className="grid flex-1 grid-cols-7 gap-2">
                {[0, 1, 2, 3, 4, 5, 6].map((col) => {
                  const isAvailable = (idx + col) % 3 === 0;
                  return (
                    <div
                      key={col}
                      className={`h-5 rounded-md transition-colors ${
                        isAvailable ? "bg-[#B4CEC2]" : "bg-[#F3F6F4]"
                      }`}
                    />
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Student Activity Messages (5 Cols) */}
      <div className="rounded-2xl border border-[#E7ECE8] bg-white p-6 shadow-[0_2px_12px_rgba(0,0,0,0.02)] lg:col-span-5">
        <div className="flex items-center justify-between border-b border-[#F0F3F1] pb-4">
          <div className="flex items-center gap-2">
            <Users className="h-4 w-4 text-[#1C3E30]" />
            <h3 className="font-serif text-base font-normal text-[#0F1E17]">
              Student Activity
            </h3>
          </div>
          <Link
            href="/mentor/messages"
            className="flex items-center gap-1 text-xs font-medium text-[#1C3E30] hover:underline"
          >
            <span>View all</span>
            <ArrowRight className="h-3 w-3" />
          </Link>
        </div>

        <div className="mt-4 space-y-4">
          {[
            {
              name: "Rahim Ahmed",
              msg: "Thanks for the detailed explanation! 🙏",
              time: "2h ago",
              unread: true,
            },
            {
              name: "Tasnia Rahman",
              msg: "Can you please share some resources for IELTS?",
              time: "5h ago",
              unread: true,
            },
            {
              name: "Fahim Hasan",
              msg: "That was really helpful. Thank you!",
              time: "1d ago",
              unread: false,
            },
            {
              name: "Nusrat Jahan",
              msg: "I have a few more questions about the application...",
              time: "1d ago",
              unread: false,
            },
          ].map((act, i) => (
            <div key={i} className="flex items-center justify-between text-xs">
              <div className="flex items-center gap-3">
                <div className="h-8 w-8 rounded-full bg-[#EAF0EC] border border-[#DEE6E1] flex items-center justify-center font-medium text-[#1C3E30]">
                  {act.name.charAt(0)}
                </div>
                <div>
                  <p className="font-semibold text-[#0F1E17]">{act.name}</p>
                  <p className="text-[11px] text-[#697A72] line-clamp-1 max-w-[200px]">
                    {act.msg}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] text-[#8C9C94]">{act.time}</span>
                {act.unread && <span className="h-1.5 w-1.5 rounded-full bg-[#1C3E30]" />}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}