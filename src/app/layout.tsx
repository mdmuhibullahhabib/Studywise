import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Inter } from "next/font/google";
import { AuthSessionProvider } from "@/components/providers/session-provider";
import "./globals.css";

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["500", "600", "700", "800"],
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "StudyWise — Real guidance from students already studying abroad",
  description: "Connect with mentors who've already made the move.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${plusJakarta.variable} ${inter.variable}`}
      suppressHydrationWarning
    >
      <body className="bg-paper font-body text-ink antialiased overflow-x-hidden" suppressHydrationWarning>
        <AuthSessionProvider>
          {/* Puro screen full width thakbe, kono cut hobe na */}
          <div className="w-full min-h-screen">
            {children}
          </div>
        </AuthSessionProvider>
      </body>
    </html>
  );
}