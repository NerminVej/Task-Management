/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: "jit",
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      colors: {
        primary: "#008080",
        secondary: "#FF7F50",
        accent: "#32CD32"
      }
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require("daisyui"),
  ],
};
