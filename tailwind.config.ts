import type { Config } from "tailwindcss";
const {nextui} = require("@nextui-org/react");
const {colors} = require("@nextui-org/theme");

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/utils/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  darkMode: "class",
  plugins: [
    nextui({
      themes: {
        light: {
          colors: {
            background: colors.purple[100],
            'default-100': colors.green[100],
            'default-200': colors.green[200],
            'default-300': colors.green[200],
            "content1": {
              DEFAULT: colors.green[50]
            },
            "content2": {
              DEFAULT: colors.green[600]
            },
          },
        },
      }
    })
  ],
};

export default config;