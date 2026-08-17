import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-jakarta)", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      colors: {
        background: "#07090e",
        foreground: "#f1f5f9",
        card: {
          DEFAULT: "#0d111a",
          foreground: "#f8fafc",
        },
        sidebar: {
          DEFAULT: "#090c14",
          foreground: "#94a3b8",
          active: "#1e293b",
          border: "rgba(255, 255, 255, 0.07)",
        },
        fintech: {
          dark: "#07090e",
          card: "#0d121c",
          subcard: "#131926",
          border: "rgba(255, 255, 255, 0.07)",
          "border-bright": "rgba(255, 255, 255, 0.14)",
          blue: "#3b82f6",
          "blue-glow": "#2563eb",
          cyan: "#38bdf8",
          purple: "#8b5cf6",
          emerald: "#10b981",
          amber: "#f59e0b",
          rose: "#f43f5e",
        },
      },
      borderRadius: {
        "2xl": "1rem",
        "3xl": "1.5rem",
        "4xl": "2rem",
      },
      boxShadow: {
        glow: "0 0 25px -5px rgba(59, 130, 246, 0.3)",
        "glow-cyan": "0 0 25px -5px rgba(56, 189, 248, 0.3)",
        "glow-purple": "0 0 25px -5px rgba(139, 92, 246, 0.25)",
        card: "0 10px 30px -10px rgba(0, 0, 0, 0.5)",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "fintech-glow": "radial-gradient(circle at 50% 0%, rgba(59, 130, 246, 0.15) 0%, transparent 70%)",
        "ai-card": "radial-gradient(circle at 80% 20%, rgba(56, 189, 248, 0.15) 0%, rgba(37, 99, 235, 0.12) 30%, rgba(13, 18, 28, 0.95) 75%)",
      },
      animation: {
        "pulse-slow": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      },
    },
  },
  plugins: [],
};
export default config;
