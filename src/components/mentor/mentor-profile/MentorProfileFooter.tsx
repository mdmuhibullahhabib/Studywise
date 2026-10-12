import Link from "next/link";

export function MentorProfileFooter() {
  return (
    <footer className="mt-20 w-full border-t border-[#E8ECE9] bg-[#FAFBF9] pt-14 pb-8 text-xs text-[#63746C]">
      <div className="mx-auto w-full max-w-[1920px] px-6 sm:px-12 lg:px-16 xl:px-24">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-5">
          <div className="col-span-2 md:col-span-2">
            <Link href="/" className="font-serif text-xl font-bold tracking-tight text-[#0F1E17]">
              StudyWise
            </Link>
            <p className="mt-3 max-w-sm text-xs leading-relaxed text-[#6E8077]">
              Connecting aspiring students with real study-abroad experiences.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-[#0F1E17]">Explore</h4>
            <ul className="mt-3 space-y-2">
              <li><Link href="/mentors" className="hover:text-[#1C3E30]">Mentors</Link></li>
              <li><Link href="/destinations" className="hover:text-[#1C3E30]">Destinations</Link></li>
              <li><Link href="/how-it-works" className="hover:text-[#1C3E30]">How It Works</Link></li>
              <li><Link href="/resources" className="hover:text-[#1C3E30]">Resources</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-[#0F1E17]">For Mentors</h4>
            <ul className="mt-3 space-y-2">
              <li><Link href="/become-a-mentor" className="hover:text-[#1C3E30]">Become a Mentor</Link></li>
              <li><Link href="/mentor-guidelines" className="hover:text-[#1C3E30]">Mentor Guidelines</Link></li>
              <li><Link href="/mentor/dashboard" className="hover:text-[#1C3E30]">Dashboard</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-[#0F1E17]">Company</h4>
            <ul className="mt-3 space-y-2">
              <li><Link href="/about" className="hover:text-[#1C3E30]">About</Link></li>
              <li><Link href="/contact" className="hover:text-[#1C3E30]">Contact</Link></li>
              <li><Link href="/privacy" className="hover:text-[#1C3E30]">Privacy</Link></li>
              <li><Link href="/terms" className="hover:text-[#1C3E30]">Terms</Link></li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between border-t border-[#EAEFEA] pt-6 text-[11px] sm:flex-row">
          <p>© 2026 StudyWise. All rights reserved.</p>
          <p className="mt-2 sm:mt-0 italic font-serif text-[#768780]">
            Real people. Real journeys. StudyWise.
          </p>
        </div>
      </div>
    </footer>
  );
}