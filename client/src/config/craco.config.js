module.exports = {
  style: {
    postcss: {
      plugins: [
        // Use Tailwind CSS for styling
        require("tailwindcss"),
        // Autoprefixer plugin to add vendor prefixes to CSS
        require("autoprefixer"),
      ],
    },
  },
};
