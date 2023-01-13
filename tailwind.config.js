/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./pages/**/*.{tsx, mdx}", "./components/**/*.tsx"],
  theme: {
    extend: {
      colors: {
        // https://tailwindcss.com/docs/customizing-colors
        text: {
          light: "#1c1917", // stone-900
          lightfaint: "#78716c", // stone-500
          dark: "#d6d3d1", // stone-300
          darkbold: "#fafaf9", // stone-50
          darkfaint: "#a8a29e", // stone-400
        },
        bg: {
          light: "#f5f5f4", // stone-100
          dark: "#1c1917", // stone-900
        },
        accent: {
          light: "#0284c7", // sky-600
          dark: "#38bdf8", // sky-400
        },
      },
    },
  },
  darkMode: "class",
  plugins: [require("@tailwindcss/typography")],
};
