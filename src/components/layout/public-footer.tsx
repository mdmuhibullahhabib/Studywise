import Link from "next/link";
import { MessageCircle, Globe, Twitter, Linkedin } from "lucide-react";

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
    <footer className="w-full border-t border-[#E8ECE9] bg-[#FAFBF9] pt-14 pb-8 text-xs text-[#63746C]">
      <div className="mx-auto w-10/12 px-6 sm:px-12 lg:px-16 xl:px-24">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-5">
          {/* Brand Info & Social Icons */}
          <div className="col-span-2 md:col-span-2">
            <Link
              href="/"
              className="font-serif text-xl font-bold tracking-tight text-[#0F1E17]"
            >
              StudyWise
            </Link>
            <p className="mt-3 max-w-sm text-xs leading-relaxed text-[#6E8077]">
              Connecting aspiring students with real study-abroad experiences.[cite: 5, 6, 8]
            </p>

            {/* Social Icons matching mockup */}
            <div className="mt-5 flex items-center gap-3 text-[#7B8C84]">
              <a
                href="#"
                aria-label="Community"
                className="flex h-7 w-7 items-center justify-center rounded-full border border-[#DCE4DF] bg-white transition-colors hover:border-[#1C3E30] hover:text-[#1C3E30]"
              >
                <MessageCircle className="h-3.5 w-3.5" />
              </a>
              <a
                href="#"
                aria-label="Global"
                className="flex h-7 w-7 items-center justify-center rounded-full border border-[#DCE4DF] bg-white transition-colors hover:border-[#1C3E30] hover:text-[#1C3E30]"
              >
                <Globe className="h-3.5 w-3.5" />
              </a>
              <a
                href="#"
                aria-label="Twitter/X"
                className="flex h-7 w-7 items-center justify-center rounded-full border border-[#DCE4DF] bg-white transition-colors hover:border-[#1C3E30] hover:text-[#1C3E30]"
              >
                <Twitter className="h-3.5 w-3.5" />
              </a>
              <a
                href="#"
                aria-label="LinkedIn"
                className="flex h-7 w-7 items-center justify-center rounded-full border border-[#DCE4DF] bg-white transition-colors hover:border-[#1C3E30] hover:text-[#1C3E30]"
              >
                <Linkedin className="h-3.5 w-3.5" />
              </a>
            </div>
          </div>

          {/* Dynamic Link Columns */}
          {FOOTER_COLUMNS.map((column) => (
            <div key={column.title}>
              <h4 className="font-semibold text-[#0F1E17]">{column.title}</h4>
              <ul className="mt-3 space-y-2">
                {column.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-[#63746C] transition-colors hover:text-[#1C3E30]"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Copyright & Brand Motto */}
        <div className="mt-12 flex flex-col items-center justify-between border-t border-[#EAEFEA] pt-6 text-[11px] sm:flex-row">
          <p>© {new Date().getFullYear()} StudyWise. All rights reserved.[cite: 3, 6, 8]</p>
          <p className="mt-2 font-serif italic text-[#768780] sm:mt-0">
            Real people. Real journeys. StudyWise.[cite: 5, 6, 8]
          </p>
        </div>
      </div>
    </footer>
  );
}