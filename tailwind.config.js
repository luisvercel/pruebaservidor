const { heroui } = require("@heroui/react");


/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        montserrat_black: ["Montserrat-black"],
        montserrat_blackitalic: ["Montserrat-blackitalic"],
        montserrat_bold: ["Montserrat-bold"],
        montserrat_bolditalic: ["Montserrat-bolditalic"],
        montserrat_extrabold: ["Montserrat-extrabold"],
        montserrat_extrabolditalic: ["Montserrat-extrabolditalic"],
        montserrat_extralight: ["Montserrat-extralight"],
        montserrat_extralightitalic: ["Montserrat-extralightitalic"],
        montserrat_italic: ["Montserrat-italic"],
        montserrat_light: ["Montserrat-light"],
        montserrat_lightitalic: ["Montserrat-lightitalic"],
        montserrat_medium: ["Montserrat-medium"],
        montserrat_mediumitalic: ["Montserrat-mediumitalic"],
        montserrat_regular: ["Montserrat-regular"],
        montserrat_semibold: ["Montserrat-semibold"],
        montserrat_semibolditalic: ["Montserrat-semibolditalic"],
        montserrat_thin: ["Montserrat-thin"],
        montserrat_thinitalic: ["Montserrat-thinitalic"],
      },
      backgroundImage: {
        "home-mobile": "url('/imagenes/background_phone.png')",
        "home-tablet": "url('/imagenes/background_tablet.png')",
        "home-desktop": "url('/imagenes/background_desktop.png')",
      },
    },
  },
  darkMode: "class",
  plugins: [
    heroui({
      themes: {
        light: {
          colors: {
            primary: {
              50: "#34cacc",
              100: "#40a6a6",
              200: "#369394",
              300: "#2c8183",
              400: "#247073",
              500: "#1c6064",
              600: "#165056",
              700: "#104248",
              800: "#0a363c",
              900: "#062a30",
              DEFAULT: "#2A3235",
              foreground: "#F5F5F5",
              border: "#f39200",
              
            },            
              secondary: {
              DEFAULT: "#34cacc", //default checkboxes light
              foreground: "#0f172a",
            },

            titles: "#2A3235",
            navbarcolor: "#c4ecb1",
            focus: "#f39200",
          },
        },

        dark: {
          colors: {
            secondary: {
              50: "#535251",
              100: "#464646",
              200: "#404040",
              300: "#333333",
              400: "#232323",
              500: "#1e1e1e",
              600: "#0c0c0c",
              700: "#080B08",
              foreground: "#2b2b2b",
              DEFAULT: "#34cacc", //default checkboxes dark
              border: "#f39200",
            },
          },
        }   
      },
    }),
  ],
};
