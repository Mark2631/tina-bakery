import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        plum: "var(--plum)",
        gold: "var(--gold)",
        ivory: "var(--ivory)",
        caramel: "var(--caramel)",
        "plum-deep": "var(--plum-deep)",
        ink: "var(--ink)",
      },
      fontFamily: {
        display: ["var(--font-playfair)", "Georgia", "serif"],
        sans: ["var(--font-jakarta)", "Arial", "sans-serif"],
      },
      boxShadow: {
        soft: "0 14px 40px rgba(45, 18, 53, 0.08)",
      },
    },
  },
  plugins: [],
};

export default config;
