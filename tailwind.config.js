/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    fontFamily: {
      poppins: ["Poppins", "sans-serif"],
      sans: [
        "Inter",
        "ProximaNova",
        "-apple-system",
        "Segoe UI",
        "Roboto",
        "Oxygen",
        "Ubuntu",
        "Cantarell",
        "Fira Sans",
        "Droid Sans",
        "Helvetica Neue",
        "Helvetica",
        "Arial",
        "sans-serif",
      ],
      monospace: ["monospace"],
      helv: ["Helvetica Bold", "Arial", "sans-serif"],
    },
    extend: {
      colors: {
        blue: {
          DEFAULT: "#1D43FF",
          900: "#FAFBFD",
        },
        text: {
          DEFAULT: "#414357",
        },
        border: {
          DEFAULT: "#CFD0D5",
        },
      },
      boxShadow: {
        custom: "0 4px 4px rgba(0,0,0,.25)",
      },
    },
  },
  plugins: [],
};
