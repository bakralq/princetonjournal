
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./pages/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        serif: ['Georgia', 'Times New Roman', 'Times', 'serif'],
        sans: ['system-ui', 'Segoe UI', 'Helvetica', 'Arial', 'sans-serif']
      }
    },
  },
  plugins: [],
};
