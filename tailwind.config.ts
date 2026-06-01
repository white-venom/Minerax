import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        industrial: {
          // Backgrounds (light)
          bg: "#FAFAFA",
          "bg-alt": "#F3F4F6",
          "bg-card": "#FFFFFF",
          // Text (dark — matches logo)
          text: "#1A1A1A",
          "text-secondary": "#4B5563",
          "text-muted": "#5E6675",
          // Borders
          border: "#E5E7EB",
          "border-light": "#F3F4F6",
          // Accent (orange)
          orange: {
            DEFAULT: "#FF5500",
            glow: "#FF6B00",
            dark: "#CC4400",
            light: "#FFF0EB",
          },
          // Steel / neutral tones
          steel: {
            dark: "#374151",
            medium: "#6B7280",
            light: "#9CA3AF",
          },
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        display: ["var(--font-outfit)", "system-ui", "sans-serif"],
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      animation: {
        "pulse-glow": "pulseGlow 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "molten-flow": "moltenFlow 15s linear infinite",
      },
      keyframes: {
        pulseGlow: {
          "0%, 100%": { opacity: "0.3", transform: "scale(1)" },
          "50%": { opacity: "0.8", transform: "scale(1.05)" },
        },
        moltenFlow: {
          "0%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
          "100%": { backgroundPosition: "0% 50%" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
