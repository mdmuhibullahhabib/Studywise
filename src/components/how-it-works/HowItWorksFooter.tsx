import Link from "next/link";
import { MessageCircle, Globe, Twitter, Linkedin } from "lucide-react";

export function HowItWorksFooter() {
  return (
    <footer className="w-full border-t border-[#E8ECE9] bg-[#FAFBF9] pt-14 pb-8 text-xs text-[#63746C]">
      <div className="mx-auto w-full max-w-[1920px] px-6 sm:px-12 lg:px-16 xl:px-24">
        
        <div className="grid grid-cols-2 gap-8 md:grid-cols-5">
          {/* Brand Info & Socials */}
          <div className="col-span-2 md:col-span-2">
            <Link href="/" className="font-serif text-xl font-bold tracking-tight text-[#0F1E17]">
              StudyWise[cite: 11]
            </Link>
            <p className="mt-3 max-w-sm text-xs leading-relaxed text-[#6E8077]">
              Connecting aspiring students with real study-abroad experiences.[cite: 11]
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

          {/* Column: Explore */}
          <div>
            <h4 className="font-semibold text-[#0F1E17]">Explore[cite: 11]</h4>
            <ul className="mt-3 space-y-2">
              <li><Link href="/mentors" className="hover:text-[#1C3E30]">Mentors[cite: 11]</Link></li>
              <li><Link href="/destinations" className="hover:text-[#1C3E30]">Destinations[cite: 11]</Link></li>
              <li><Link href="/how-it-works" className="hover:text-[#1C3E30]">How It Works[cite: 11]</Link></li>
              <li><Link href="/resources" className="hover:text-[#1C3E30]">Resources[cite: 11]</Link></li>
            </ul>
          </div>

          {/* Column: For Mentors */}
          <div>
            <h4 className="font-semibold text-[#0F1E17]">For Mentors[cite: 11]</h4>
            <ul className="mt-3 space-y-2">
              <li><Link href="/become-a-mentor" className="hover:text-[#1C3E30]">Become a Mentor[cite: 11]</Link></li>
              <li><Link href="/mentor-guidelines" className="hover:text-[#1C3E30]">Mentor Guidelines[cite: 11]</Link></li>
              <li><Link href="/mentor/dashboard" className="hover:text-[#1C3E30]">Dashboard[cite: 11]</Link></li>
            </ul>
          </div>

          {/* Column: Company */}
          <div>
            <h4 className="font-semibold text-[#0F1E17]">Company[cite: 11]</h4>
            <ul className="mt-3 space-y-2">
              <li><Link href="/about" className="hover:text-[#1C3E30]">About[cite: 11]</Link></li>
              <li><Link href="/contact" className="hover:text-[#1C3E30]">Contact[cite: 11]</Link></li>
              <li><Link href="/privacy" className="hover:text-[#1C3E30]">Privacy[cite: 11]</Link></li>
              <li><Link href="/terms" className="hover:text-[#1C3E30]">Terms[cite: 11]</Link></li>
            </ul>
          </div>
        </div>

        {/* Bottom Line */}
        <div className="mt-12 flex flex-col items-center justify-between border-t border-[#EAEFEA] pt-6 text-[11px] sm:flex-row">
          <p>© 2026 StudyWise. All rights reserved.[cite: 11]</p>
          <p className="mt-2 sm:mt-0 italic font-serif text-[#768780]">
            Real people. Real journeys. StudyWise.[cite: 11]
          </p>
        </div>

      </div>
    </footer>
  );
}