import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: "#162E34",
          700: "#22434B",
          500: "#4A6870",
          300: "#92A6AA",
          100: "#E2EAEB",
        },
        paper: {
          DEFAULT: "#FAF9F5",
          muted: "#F3F1EA",
        },
        gold: {
          DEFAULT: "#B8862E",
          soft: "#F1E4C7",
          text: "#8C6420",
        },
        sage: {
          DEFAULT: "#36887F",
          soft: "#DEEEEC",
          text: "#1F5B54",
        },
        sky: {
          DEFAULT: "#2A5C7D",
          soft: "#DCE9F0",
          text: "#1E4459",
        },
        danger: {
          DEFAULT: "#B3413A",
          soft: "#F5E1DF",
        },
        line: "#E6E3D9",
      },
      fontFamily: {
        // font-serif লিখলেও এখন Plus Jakarta Sans পাবে
        serif: ["var(--font-display)", "sans-serif"],
        display: ["var(--font-display)", "sans-serif"],
        body: ["var(--font-body)", "sans-serif"],
      },
      fontSize: {
        hero: ["3.25rem", { lineHeight: "1.08", letterSpacing: "-0.02em", fontWeight: "700" }],
        "hero-sm": ["2.5rem", { lineHeight: "1.1", letterSpacing: "-0.015em", fontWeight: "700" }],
        h1: ["3.5rem", { lineHeight: "1.1", letterSpacing: "-0.02em", fontWeight: "700" }],
        h2: ["2.625rem", { lineHeight: "1.15", letterSpacing: "-0.015em", fontWeight: "700" }],
        h3: ["2rem", { lineHeight: "1.2", letterSpacing: "-0.01em", fontWeight: "700" }],
        h4: ["1.5rem", { lineHeight: "1.25", letterSpacing: "-0.01em", fontWeight: "700" }],
        h5: ["1.25rem", { lineHeight: "1.3", fontWeight: "600" }],
        h6: ["1rem", { lineHeight: "1.35", fontWeight: "600" }],
        p1: ["1.25rem", { lineHeight: "1.6", fontWeight: "400" }],
        p2: ["1.125rem", { lineHeight: "1.6", fontWeight: "400" }],
        p3: ["1rem", { lineHeight: "1.6", fontWeight: "400" }],
        p4: ["0.875rem", { lineHeight: "1.5", fontWeight: "400" }],
        p5: ["0.75rem", { lineHeight: "1.4", fontWeight: "400" }],
        label: ["0.75rem", { lineHeight: "1.3", letterSpacing: "0.06em", fontWeight: "600" }],
        meta: ["0.8125rem", { lineHeight: "1.4", fontWeight: "500" }],
      },
      borderRadius: {
        sm: "6px",
        DEFAULT: "8px",
        md: "10px",
        lg: "12px",
      },
      boxShadow: {
        card: "0 1px 2px 0 rgba(20,27,46,0.04), 0 1px 1px 0 rgba(20,27,46,0.03)",
        raised: "0 8px 24px -12px rgba(20,27,46,0.16)",
      },
      maxWidth: {
        content: "1180px",
      },
    },
  },
  plugins: [],
};

export default config;