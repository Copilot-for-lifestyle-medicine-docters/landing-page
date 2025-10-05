import type { Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./content/**/*.{md,mdx}",
    "./lib/**/*.{ts,tsx}"
  ],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: "1.5rem",
        lg: "2rem",
        xl: "3rem"
      },
      screens: {
        "2xl": "1320px"
      }
    },
    extend: {
      colors: {
        background: "var(--bg)",
        foreground: "var(--fg)",
        accent: "var(--accent)"
      },
      fontFamily: {
        sans: ["var(--font-open-sans)", ...fontFamily.sans]
      },
      borderRadius: {
        xl: "1.5rem"
      },
      boxShadow: {
        glass: "0 1px 0 0 rgba(255,255,255,0.15) inset, 0 10px 30px -10px rgba(0,0,0,0.4)",
        glow: "0 0 0 1px rgba(229,189,132,0.4)"
      },
      keyframes: {
        "fade-in": {
          from: { opacity: "0", transform: "translateY(16px)" },
          to: { opacity: "1", transform: "translateY(0)" }
        }
      },
      animation: {
        "fade-in": "fade-in 0.25s ease-out both"
      }
    }
  },
  plugins: [
    require("tailwindcss-animate"),
    function ({ addUtilities }: { addUtilities: (utils: Record<string, any>) => void }) {
      addUtilities({
        ".glass": {
          backdropFilter: "blur(16px)",
          backgroundColor: "rgba(255,255,255,0.06)",
          border: "1px solid rgba(255,255,255,0.1)",
          boxShadow:
            "0 1px 0 0 rgba(255,255,255,0.15) inset, 0 10px 30px -10px rgba(0,0,0,0.4)",
          borderRadius: "1.5rem"
        },
        ".hairline": {
          border: "1px solid rgba(255,255,255,0.1)",
          borderRadius: "1.5rem"
        }
      });
    }
  ]
};

export default config;
