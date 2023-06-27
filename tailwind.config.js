/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    fontFamily: {
      poppins: ['Poppins', 'sans-serif'],
      sans: ["Inter", "ProximaNova", "-apple-system", "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", "Helvetica", "Arial", "sans-serif"],
      monospace: ["monospace"],
      helv: ['Helvetica Bold', 'Arial', 'sans-serif'],
    },
  },
  plugins: [],
}