module.exports = {
  darkMode: "class",
  content: ["./app/**/*.{ts,tsx,jsx,js}"],
  theme: {
    extend: {
      screens: {
        // todo: implement a layout for smaller than biggish-mobile (i.e. smallish mobile)
        "biggish-mobile": { min: "300px" },
        "mobile-landscape": {
          raw: "(max-height: 700px) and (orientation: landscape)",
        },
        landscape: {
          raw: "(orientation: landscape)",
        },
      },
      backgroundImage: {
        sky: "url('/_static/bluesky.jpg')",
        redwall: "url('/_static/redwall.jpg')",
      },
      fontFamily: {
        neon: ["Sacramento", "cursive"],
        bangers: ["Bangers", "Sans-Serif"],
        inter: ["Inter", "Sans-Serif"],
        spacemono: ["Space Mono", "monospace"],
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
  plugins: [require("@tailwindcss/typography"), require("@tailwindcss/forms")],
};
