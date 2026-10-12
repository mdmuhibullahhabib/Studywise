const FLAGS: Record<string, string> = {
  "United Kingdom": "🇬🇧",
  UK: "🇬🇧",
  Canada: "🇨🇦",
  Australia: "🇦🇺",
  Germany: "🇩🇪",
  "United States": "🇺🇸",
  USA: "🇺🇸",
  Malaysia: "🇲🇾",
  Japan: "🇯🇵",
  "South Korea": "🇰🇷",
  Sweden: "🇸🇪",
  Netherlands: "🇳🇱",
  Ireland: "🇮🇪",
  Singapore: "🇸🇬",
  "New Zealand": "🇳🇿",
  France: "🇫🇷"
};

export function flagFor(country?: string | null): string {
  if (!country) return "🌍";
  return FLAGS[country] ?? "🌍";
}
