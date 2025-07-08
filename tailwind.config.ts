import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        // New color scheme
        petrolio: {
          light: "#5CBCBC",
          DEFAULT: "#3DA9A9", // Petrolio chiaro
          dark: "#2A7A7A",
        },
        ardesia: {
          light: "#4A5A66",
          DEFAULT: "#37474F", // Grigio ardesia
          dark: "#263238",
        },
        neutro: {
          light: "#FFFFFF",
          DEFAULT: "#F7F9FA", // Grigio chiaro neutro
          dark: "#E8EAED",
        },
        menta: {
          light: "#7FE0A7",
          DEFAULT: "#60D394", // Verde menta / successo
          dark: "#4CAF50",
        },
        warning: {
          light: "#FF8A80",
          DEFAULT: "#FF6B6B", // Rosso arancio sobrio
          dark: "#F44336",
        },
        // Keep legacy colors for backward compatibility
        pine: {
          light: "#E1EEDA",
          DEFAULT: "#7A9D54",
          dark: "#557A46",
        },
        sea: {
          light: "#E7F1FD",
          DEFAULT: "#86B6F6",
          dark: "#176B87",
        },
        sand: {
          light: "#FDF5E8",
          DEFAULT: "#F5E8C7",
          dark: "#E7B10A",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "fade-in": {
          "0%": { opacity: "0", transform: "translateY(10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "fade-out": {
          "0%": { opacity: "1", transform: "translateY(0)" },
          "100%": { opacity: "0", transform: "translateY(10px)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-5px)" },
        },
        shimmer: {
          "100%": { transform: "translateX(100%)" },
        },
        "scale-in": {
          "0%": { transform: "scale(0.95)", opacity: "0" },
          "100%": { transform: "scale(1)", opacity: "1" },
        },
        "page-transition-in": {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "page-transition-out": {
          "0%": { opacity: "1", transform: "translateY(0)" },
          "100%": { opacity: "0", transform: "translateY(-20px)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "fade-in": "fade-in 0.5s ease-out",
        "fade-out": "fade-out 0.5s ease-out",
        float: "float 3s ease-in-out infinite",
        shimmer: "shimmer 2s infinite",
        "scale-in": "scale-in 0.5s cubic-bezier(0.16, 1, 0.3, 1)",
        "page-in": "page-transition-in 0.5s ease-out",
        "page-out": "page-transition-out 0.5s ease-out",
      },
      fontFamily: {
        sans: [
          "Inter",
          "system-ui",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "Roboto",
          "sans-serif",
        ],
        serif: ["Playfair Display", "Georgia", "serif"],
      },
      backgroundImage: {
        "pine-pattern":
          "url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgdmlld0JveD0iMCAwIDYwIDYwIj48cGF0aCBkPSJNMzAgMzMuNUwxNSAyNWwxNS04LjVMMTUgOGwxNSA4LjVMNDUgOGwtMTUgOC41TDQ1IDI1bC0xNSA4LjV6IiBmaWxsPSIjN0E5RDU0IiBmaWxsLW9wYWNpdHk9IjAuMDUiLz48L3N2Zz4=')",
        "wave-pattern":
          "url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI1MCIgaGVpZ2h0PSIyNSIgdmlld0JveD0iMCAwIDUwIDI1Ij48cGF0aCBkPSJNNTAgMjVDNDEuNjY3IDI1IDI1IDI1IDguMzMzIDI1QzAgMjUgMCAwIDguMzMzIDBDMjUgMCA0MS42NjcgMCA1MCAwQzUwIDguMzMzIDUwIDE2LjY2NyA1MCAyNVoiIGZpbGw9IiM4NkI2RjYiIGZpbGwtb3BhY2l0eT0iMC4wNSIvPjwvc3ZnPg==')",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
