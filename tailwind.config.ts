import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Dark base — warm navy, not cold black
        background: "#0B1121",
        surface: "#111B30",
        "surface-light": "#182440",
        border: "#1E3050",

        // Primary — sunset & gold tones
        "sunset-gold": "#F5A623",
        "horizon-amber": "#FBBF24",
        "warm-coral": "#FB923C",

        // Secondary — ocean & sky
        "ocean-blue": "#38BDF8",
        "deep-ocean": "#0EA5E9",
        "lagoon-teal": "#2DD4BF",

        // Neutral — warm whites & grays
        "sand-white": "#F5F0E8",
        "drift-gray": "#94A3B8",
        "muted-slate": "#64748B",

        // Accents
        "palm-green": "#34D399",
        "coral-pink": "#FB7185",
        "danger-red": "#EF4444",
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        heading: ["Space Grotesk", "Inter", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
      },
      boxShadow: {
        glow: "0 0 20px rgba(245, 166, 35, 0.15)",
        "glow-strong": "0 0 40px rgba(245, 166, 35, 0.25)",
        "glow-ocean": "0 0 30px rgba(56, 189, 248, 0.15)",
        "glow-warm": "0 4px 30px rgba(251, 146, 60, 0.1)",
      },
      backgroundImage: {
        "gradient-sunset":
          "linear-gradient(135deg, #F5A623 0%, #FB923C 50%, #FB7185 100%)",
        "gradient-ocean":
          "linear-gradient(135deg, #0EA5E9 0%, #38BDF8 50%, #2DD4BF 100%)",
        "gradient-horizon":
          "linear-gradient(135deg, #F5A623 0%, #38BDF8 100%)",
        "gradient-dusk":
          "linear-gradient(to bottom, #1a1040 0%, #0B1121 50%, #0B1121 100%)",
      },
    },
  },
  plugins: [],
};

export default config;
