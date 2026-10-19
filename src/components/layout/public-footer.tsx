import Link from "next/link";
import { ArrowUpRight, MessageCircle } from "lucide-react";

const FOOTER_COLUMNS = [
  {
    title: "Explore",
    links: [
      { href: "/mentors", label: "Mentors" },
      { href: "/destinations", label: "Destinations" },
      { href: "/how-it-works", label: "How It Works" },
      { href: "/resources", label: "Resources" },
    ],
  },
  {
    title: "For Mentors",
    links: [
      { href: "/become-a-mentor", label: "Become a Mentor" },
      { href: "/mentor-guidelines", label: "Mentor Guidelines" },
      { href: "/mentor/dashboard", label: "Dashboard" },
    ],
  },
  {
    title: "Company",
    links: [
      { href: "/about", label: "About" },
      { href: "/contact", label: "Contact" },
      { href: "/privacy", label: "Privacy" },
      { href: "/terms", label: "Terms" },
    ],
  },
];

export function PublicFooter() {
  return (
    <footer className="w-full border-t border-[#E8ECE9] bg-[#F6F8F6] text-[#52645B]">
      <div className="mx-auto max-w-7xl px-6 py-12 sm:px-10 sm:py-14 lg:px-12">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-[1.5fr_repeat(3,minmax(0,1fr))] lg:gap-12">
          <div>
            <Link
              href="/"
              className="inline-flex rounded-sm font-serif text-3xl font-bold tracking-tight text-[#0F1E17] transition-colors hover:text-[#1C3E30]"
            >
              StudyWise
            </Link>
            <p className="mt-4 max-w-sm text-base leading-relaxed text-[#52645B]">
              Connecting aspiring students with real study-abroad experiences.
            </p>
            <Link
              href="/contact"
              className="mt-6 inline-flex min-h-11 items-center gap-2 rounded-full border border-[#D5E0D9] bg-white px-4 text-sm font-semibold text-[#1C3E30] transition-colors hover:border-[#1C3E30] hover:bg-[#EDF3EF]"
            >
              <MessageCircle aria-hidden="true" className="h-4 w-4" />
              Get in touch
              <ArrowUpRight aria-hidden="true" className="h-4 w-4" />
            </Link>
          </div>

          {FOOTER_COLUMNS.map((column) => (
            <div key={column.title}>
              <h2 className="text-sm font-bold uppercase tracking-[0.12em] text-[#0F1E17]">
                {column.title}
              </h2>
              <ul className="mt-4 space-y-1">
                {column.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="inline-flex min-h-11 items-center text-base text-[#52645B] transition-colors hover:text-[#1C3E30] hover:underline hover:underline-offset-4"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-10 flex flex-col gap-3 border-t border-[#DCE4DF] pt-6 text-sm sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-[#52645B]">
            © {new Date().getFullYear()} StudyWise. All rights reserved.
          </p>
          <p className="text-sm font-medium text-[#52645B]">
            Real people. Real journeys. StudyWise.
          </p>
        </div>
      </div>

      <> heelo bay</>
    </footer>
  );
}