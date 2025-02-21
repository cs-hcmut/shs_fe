const plugin = require("tailwindcss/plugin");

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{html,js,jsx,ts,tsx}", // Add your source folder's paths here for Tailwind to purge unused styles
    "./public/index.html",
  ],
  theme: {
    extend: {
      colors: {
        "primary-blue": "#3B5FAD", // Custom primary blue color
        "primary-blue-unhover": "#5A77D6", // Custom unhovered blue color
        "gray-text": "#6E7B8A", // Custom gray text color
        "alert-red": "#E74C3C", // Custom alert red color
        //? Header
        darkHeader: "#1d1d22",
        lightHeader: "#fbfbff",

        //? Main interface
        // lightBg: '#ffffff',
        // lightColor900: '#fefefe',
        // lightColor700: '#e9e9e8',
        // lightColor500: '#d6d6d5',
        lightBg: "#ffffff", // White
        lightColor900: "#f0f0f5", // Very light grey
        lightColor700: "#d9d9e0", // Light grey
        lightColor500: "#b3b3cc", // Medium light grey
        lightColor300: "#8080a3", // Medium grey

        darkBg: "#0e0e12",
        darkColor900: "#1d1d22",
        darkColor700: "#2c2c32",
        darkColor500: "#59595f",
        darkColor300: "#a7a7ab",

        //? Text
        lightText: "#EEEEEE",
        darkText: "#010101",
        haretaColor: "#5A77D6",
        primaryColor: "#3B5FAD",
        textVintage: "#FFFBF5",
        vintageColor: "#A27B5C",

        //? Store sidebar
        barLightBg: "#f0f0f5",
        barDarkBg: "#1d1d22",
        sidebarItemLight: "#fbfbff",
        sidebarItemDark: "#2c2c32",

        //? States and badges
        successGreen: "#4bb543",
        brownColor: "#B77729",
        orangeColor: "#ff6a00",
        sunYellow: "#ffc107",
        alertRed: "#ff0f0f",

        //? Products
        productDarkBg: "#1d1d22",
        productLightBg: "#f0f0f5",
        tagColor: "#ff3333",
        favouriteRed: "#ff2800",
        whiteColor: "#ffffff",

        //? Buttons
        unhoveringBg: "#5A77D6",
        hoveringBg: "#3B5FAD",

        primaryBlue: "#00B4D8",
      },
      spacing: {
        128: "32rem", // Adding custom spacing (e.g., for width or height)
        144: "36rem", // Another custom spacing
      },
      fontSize: {
        xxs: "0.625rem", // Custom font size for very small text
        xxl: "2rem", // Custom extra-large font size
      },
      borderRadius: {
        "4xl": "2rem", // Custom border radius for large elements
      },
      boxShadow: {
        primary: "0 4px 6px rgba(0, 0, 0, 0.1)", // Custom box shadow for cards or containers
      },
      screens: {
        mobileSmall: "320px",
        mobileLarge: "425px",
        tabletSmall: "640px",
        tablet: "768px",
        tabletLarge: "962px",
        desktop: "1024px",
        desktopLarge: "1440px",
      },
    },
  },
  darkMode: "class",
  plugins: [
    plugin(function ({ addComponents, theme }) {
      addComponents({
        ".container": {
          maxWidth: theme("columns.10xl"),
          marginLeft: "auto",
          marginRight: "auto",
          paddingLeft: theme("spacing.4"),
          paddingRight: theme("spacing.4"),
        },
        ".header--dark": {
          backgroundColor: "#000",
        },
        ".header-container--light": {
          backgroundColor: "#eee",
        },
        ".main-session--dark": {
          backgroundColor: "#1e1e1e",
        },
      });
    }),
  ],
};
