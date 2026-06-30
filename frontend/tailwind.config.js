/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: [
          "Inter",
          "ui-sans-serif",
          "system-ui",
          "-apple-system",
          "sans-serif",
        ],
        mono: ["JetBrains Mono", "ui-monospace", "SFMono-Regular", "monospace"],
      },
      colors: {
        canvas: "#0B0D12",
        surface: "#11141B",
        surfaceHover: "#161A23",
        border: "#1F242E",
        muted: "#7C8392",
        accent: {
          DEFAULT: "#5B8DEF",
          dim: "#2E3F66",
        },
        success: "#3FB97E",
        warning: "#E5A23B",
        danger: "#E5564B",
        info: "#8B6BE0",
      },
      boxShadow: {
        card: "0 1px 0 0 rgba(255,255,255,0.03) inset, 0 1px 2px 0 rgba(0,0,0,0.4)",
      },
      borderRadius: {
        md2: "10px",
      },
      keyframes: {
        pulseRing: {
          "0%": { boxShadow: "0 0 0 0 rgba(91,141,239,0.45)" },
          "70%": { boxShadow: "0 0 0 8px rgba(91,141,239,0)" },
          "100%": { boxShadow: "0 0 0 0 rgba(91,141,239,0)" },
        },
        fadeSlideIn: {
          "0%": { opacity: 0, transform: "translateY(4px)" },
          "100%": { opacity: 1, transform: "translateY(0)" },
        },
      },
      animation: {
        pulseRing: "pulseRing 1.6s ease-out infinite",
        fadeSlideIn: "fadeSlideIn 0.25s ease-out",
      },
    },
  },
  plugins: [],
};
