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
        accf: {
          green: "#163B2E",
          "green-deep": "#0E2A20",
          "green-light": "#235B48",
          gold: "#D4A017",
          "gold-soft": "#E8C158",
          "gold-light": "#FDF3D6",
          ivory: "#F7F3E9",
          "ivory-dark": "#ECE5D5",
          charcoal: "#14110D",
          "charcoal-card": "#1E1A15",
          maroon: "#6E1F1F",
          "maroon-dark": "#501515",
          olive: "#7C8A4A",
          ink: "#1C1C1A",
          muted: "#6B6964",
          line: "rgba(247, 243, 233, 0.16)",
          "line-dark": "rgba(20, 17, 13, 0.12)",
        },
      },
      fontFamily: {
        serif: ["'Fraunces'", "Georgia", "serif"],
        sans: ["'Manrope'", "system-ui", "sans-serif"],
        mono: ["'IBM Plex Mono'", "monospace"],
      },
      animation: {
        "pulse-slow": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        float: "float 6s ease-in-out infinite",
        shimmer: "shimmer 2.5s linear infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-8px)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
      },
    },
  },
  plugins: [],
};
export default config;

