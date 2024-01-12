import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    fontSize: {
      xs: ["10px", "12px"],
      sm: ["12px", "14px"],
      md: ["14px", "19px"],
      lg: ["18px", "20px"],
    },
    extend: {
      colors: {
        primary: "#313131",
        secondary: "#d7d0af",
        silver: "#757575",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      boxShadow: {
        "3xl": "0px 5px 10px rgba(0,0,0,0.1)",
      },
    },
  },
  plugins: [],
};
export default config;
