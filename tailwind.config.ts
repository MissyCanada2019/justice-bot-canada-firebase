import type { Config } from "tailwindcss";

export default {
  darkMode: "class",
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        canada: {
          red: "#d32d2d",
          redDark: "#a31111",
          white: "#ffffff",
          ink: "#0f0f10",
          beige: "#f6f1e9"
        }
      },
      boxShadow: {
        card: "0 10px 25px rgba(0,0,0,.12)"
      },
      borderRadius: {
        xl2: "1.25rem"
      }
    },
    fontFamily: {
      sans: ["Inter", "system-ui", "Segoe UI", "Roboto", "sans-serif"]
    }
  },
  plugins: [require('tailwindcss-animate')]
} satisfies Config;
