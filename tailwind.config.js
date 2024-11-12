/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        montserrat: ["Montserrat", "sans-serif"],
      },
      colors: {
        "neutral-white": "#FDFDFD",
        primary: {
          DEFAULT: "#FEAF00",
          accent: "#F8D442",
        },
        secondary: {
          DEFAULT: "#FE0000",
        },
        card: {
          background: "#E5E5E5 ",
        },
        gray: {
          DEFAULT: "#6C6C6C",
          placeholder: "#CDCDCD",
          border: "#E5E5E5",
        },
      },
    },
  },
  plugins: [],
};
