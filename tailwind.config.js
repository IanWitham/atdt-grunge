module.exports = {
  darkMode: "class",
  content: ["./app/**/*.{ts,tsx,jsx,js}"],
  theme: {
    extend: {
      backgroundImage: {
        rust: "url('/_static/istockphoto-1157807104-1024x1024.jpg')",
      },
      fontFamily: {
        neon: ["Sacramento", "cursive"],
        bangers: ["Bangers", "Sans-Serif"],
        inter: ["Inter", "Sans-Serif"],
      },
      keyframes: {
        buzz: {
          "70%": { opacity: 0.9 },
        },
        march: {
          "0%": { opacity: 1.0 },
          "30%": { opacity: 1.0 },
          "50%": { opacity: 3.0 },
          "90%": { opacity: 0.0 },
        },
      },
      animation: {
        buzz: "buzz 0.1s infinite alternate ease",
        bulb: "march 1s infinite",
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
