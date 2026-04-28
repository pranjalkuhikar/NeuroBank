/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all files that contain Nativewind classes.
  content: ["./app/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        // Map the CSS variables to Tailwind colors
        primary: "rgb(var(--color-primary))",
        background: "rgb(var(--color-background))",
        text: "rgb(var(--color-text))",
      },
    },
  },
  plugins: [],
};
