/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./pages/**/*.{tsx, mdx}", "./components/**/*.tsx"],
  theme: {
    extend: {
      colors: {
        primary: {
          // https://tailwindcss.com/docs/customizing-colors
          light: "#0284c7", // sky-600
          dark: "#38bdf8", // sky-400
        },
      },
    },
  },
  darkMode: "class",
  plugins: [require("@tailwindcss/typography")],
};
