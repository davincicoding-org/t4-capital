import type { Config } from "tailwindcss";
import containerQueries from "@tailwindcss/container-queries";

const config = {
  content: ["./src/**/*.{ts,tsx}"],
  corePlugins: {
    preflight: false,
  },
  plugins: [containerQueries],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        md: "1224px",
      },
    },
    extend: {
      colors: {
        // black: {
        //   DEFAULT: "#08202D",
        // },
        primary: {
          DEFAULT: "#CBE5F4",
          foreground: "#000",
        },
        dark: "#3c4460",
        gray: {
          69: "#696969",
          AC: "#ACACAC",
        },
      },
      fontFamily: {
        mono: "var(--font-mono)",
      },
      backgroundImage: {
        "image-gradient":
          "url(/images/noise.svg), url('/images/gradient.webp')",
        noise: "url(/images/noise.svg)",
      },
      backgroundSize: {
        layered: "750px, cover",
      },
      borderRadius: {
        lg: "0.5rem",
        md: "calc(0.5rem - 2px)",
        sm: "calc(0.5rem - 4px)",
      },
      width: {
        max: "1224px",
      },
    },
  },
} satisfies Config;

export default config;
