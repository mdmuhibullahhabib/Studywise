import { 
    Building2, 
    GraduationCap, 
    Globe, 
    Award, 
    FileText, 
    Briefcase, 
    Home, 
    Clock 
  } from "lucide-react";
  
  interface MentorThreeColumnDetailsProps {
    mentorName: string;
    bio?: string | null;
    teachingApproach?: string | null;
    university?: string | null;
    country?: string | null;
    studyLevel?: string | null;
    expertise: string[];
  }
  
  export function MentorThreeColumnDetails({
    mentorName,
    bio,
    teachingApproach,
    university = "University of Manchester",
    country = "United Kingdom",
    studyLevel = "MSc Data Science",
    expertise,
  }: MentorThreeColumnDetailsProps) {
    const firstName = mentorName.split(" ")[0];
  
    return (
      <section className="mt-14 grid grid-cols-1 gap-8 border-t border-[#E7ECE8] pt-12 lg:grid-cols-12">
        
        {/* 1. About Column (5 Cols) */}
        <div className="lg:col-span-5">
          <span className="text-[11px] font-bold tracking-[0.2em] text-[#788881] uppercase">
            ABOUT
          </span>
          <h2 className="mt-2 font-serif text-2xl font-normal text-[#0F1E17]">
            About {firstName}
          </h2>
  
          <div className="mt-4 space-y-3.5 text-xs leading-relaxed text-[#5F7068] sm:text-[13px]">
            <p>
              {bio ||
                `Hi, I'm ${firstName}. I'm currently pursuing my ${studyLevel} at the ${university}. I moved to the UK in 2021 and have been through the entire process — from researching universities and scholarships to settling into student life, part-time work and finding my way in a new country.`}
            </p>
            <p>
              {teachingApproach ||
                "I'm passionate about helping Bangladeshi students make informed decisions. I know how overwhelming the process can feel, and I'm here to share my real experiences — the good, the challenging and everything in between."}
            </p>
            <p>Feel free to reach out with any questions. I’ll be happy to help!</p>
          </div>
        </div>
  
        {/* 2. Experience Column (4 Cols) */}
        <div className="lg:col-span-4">
          <span className="text-[11px] font-bold tracking-[0.2em] text-[#788881] uppercase">
            EXPERIENCE
          </span>
  
          <div className="mt-4 space-y-4 text-xs">
            <div className="flex items-start gap-3">
              <Building2 className="mt-0.5 h-4 w-4 shrink-0 text-[#8C9B94]" />
              <div>
                <p className="text-[11px] text-[#7C8C85]">University</p>
                <p className="font-semibold text-[#0F1E17]">{university}</p>
              </div>
            </div>
  
            <div className="flex items-start gap-3">
              <GraduationCap className="mt-0.5 h-4 w-4 shrink-0 text-[#8C9B94]" />
              <div>
                <p className="text-[11px] text-[#7C8C85]">Degree</p>
                <p className="font-semibold text-[#0F1E17]">{studyLevel}</p>
              </div>
            </div>
  
            <div className="flex items-start gap-3">
              <Globe className="mt-0.5 h-4 w-4 shrink-0 text-[#8C9B94]" />
              <div>
                <p className="text-[11px] text-[#7C8C85]">Country</p>
                <p className="font-semibold text-[#0F1E17]">{country}</p>
              </div>
            </div>
  
            <div className="flex items-start gap-3">
              <Award className="mt-0.5 h-4 w-4 shrink-0 text-[#8C9B94]" />
              <div>
                <p className="text-[11px] text-[#7C8C85]">Scholarship</p>
                <p className="font-semibold text-[#0F1E17]">Chevening Scholarship (partial)</p>
              </div>
            </div>
  
            <div className="flex items-start gap-3">
              <FileText className="mt-0.5 h-4 w-4 shrink-0 text-[#8C9B94]" />
              <div>
                <p className="text-[11px] text-[#7C8C85]">Application experience</p>
                <p className="font-semibold text-[#0F1E17]">Common App, UCAS</p>
              </div>
            </div>
  
            <div className="flex items-start gap-3">
              <Briefcase className="mt-0.5 h-4 w-4 shrink-0 text-[#8C9B94]" />
              <div>
                <p className="text-[11px] text-[#7C8C85]">Career experience</p>
                <p className="font-semibold text-[#0F1E17]">Data Analyst (Internship)</p>
              </div>
            </div>
          </div>
        </div>
  
        {/* 3. Specialties Column (3 Cols) */}
        <div className="lg:col-span-3">
          <span className="text-[11px] font-bold tracking-[0.2em] text-[#788881] uppercase">
            SPECIALTIES
          </span>
  
          <div className="mt-4 space-y-4 text-xs">
            <div className="flex items-start gap-3">
              <GraduationCap className="mt-0.5 h-4 w-4 shrink-0 text-[#8C9B94]" />
              <div>
                <p className="font-semibold text-[#0F1E17]">University applications</p>
                <p className="text-[11px] text-[#7C8C85]">(UK, Canada, Australia)</p>
              </div>
            </div>
  
            <div className="flex items-start gap-3">
              <Award className="mt-0.5 h-4 w-4 shrink-0 text-[#8C9B94]" />
              <div>
                <p className="font-semibold text-[#0F1E17]">Scholarships</p>
                <p className="text-[11px] text-[#7C8C85]">(Chevening, university, country-specific)</p>
              </div>
            </div>
  
            <div className="flex items-start gap-3">
              <Home className="mt-0.5 h-4 w-4 shrink-0 text-[#8C9B94]" />
              <div>
                <p className="font-semibold text-[#0F1E17]">Student life</p>
                <p className="text-[11px] text-[#7C8C85]">(accommodation, culture, lifestyle)</p>
              </div>
            </div>
  
            <div className="flex items-start gap-3">
              <Home className="mt-0.5 h-4 w-4 shrink-0 text-[#8C9B94]" />
              <div>
                <p className="font-semibold text-[#0F1E17]">Accommodation</p>
                <p className="text-[11px] text-[#7C8C85]">(on/off campus, finding a home)</p>
              </div>
            </div>
  
            <div className="flex items-start gap-3">
              <Clock className="mt-0.5 h-4 w-4 shrink-0 text-[#8C9B94]" />
              <div>
                <p className="font-semibold text-[#0F1E17]">Part-time work</p>
                <p className="text-[11px] text-[#7C8C85]">(job search, CV, interview tips)</p>
              </div>
            </div>
  
            <div className="flex items-start gap-3">
              <FileText className="mt-0.5 h-4 w-4 shrink-0 text-[#8C9B94]" />
              <div>
                <p className="font-semibold text-[#0F1E17]">Visa preparation</p>
                <p className="text-[11px] text-[#7C8C85]">(documentation, interview)</p>
              </div>
            </div>
          </div>
        </div>
  
      </section>
    );
  }