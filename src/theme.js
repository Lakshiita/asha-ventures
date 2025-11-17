// theme.js
import { extendTheme } from "@chakra-ui/react";
import { mode } from "@chakra-ui/theme-tools";
import SustainableInvestmentsSection from "./components/SustainableInvestmentsSection";

const colors = {
  brand: {
    10: "#ffffffff",
    50: "#fdd49eff",
    51: "#face83ff",
    52: "rgba(255, 184, 92, 1)",
    53: "#ffb951ff",
    54: "#f8a048ff",
    55: "#fa8d1fff",
    100: "#ef9700ff",
    200: "#fffcf6ff",
    300: "#d8c49a",
    400: "#c9af7a",
    500: "#ad4b00de", // primary beige
    600: "#a58957",
    700: "#8b7047",
    800: "#6f5838",
    900: "#391003ff",
    950: "#383838ff",
    section: {
      // hero: "rgb(254 248 229)",
      // // sectors: "#f7d4a3ff",
      // sectors: "rgba(244, 218, 186, 1)",   
      // carousel: "rgba(225, 192, 153, 1)",
      // testimonials: "rgba(209, 171, 124, 1)",
      // signatory: "#ffffffff",
      // footer: "#ffeee0ff",
      // sectors_cards: "rgba(255, 246, 233, 1)",
      // sectors_heading: "rgba(97, 32, 0, 1)",
      hero: "#f4f4f4ff",
      sectors: "#beb4b2ff",
      carousel: "#697184",
      testimonials: "#d8d0d0",
      signatory: "#ffffffff",
      footer: "#e9e7e7ff",
      sectors_cards: "rgba(255, 249, 240, 1)",
      sectors_heading: "#2a2a2a",
      caraousel_heading: "#f1f2f5ff",
      investments_cards: "#dce6ffa5",
      hero_impact: "#e5dbdbff",
      two_x: "#efefefff",
      sustainable_Investment: "#e1d7ceff",
      five_dimension: "#7f8695ff",
      testimonials_impact: "#ffead8ff"
    },
  },

  textColor2: {
    light: "#242a34ff",
    dark: "#e2e8f0"
  },
};

const textStyles = {
  h1: {
    fontFamily: "heading", // uses fonts.heading
    fontSize: { base: "3xl", md: "5xl" },
    fontWeight: "700",
  },
  h2: {
    fontFamily: "heading",
    fontSize: { base: "2xl", md: "3xl" },
    fontWeight: "600",
  },
  h3: {
    fontFamily: "heading",
    fontSize: { base: "xl", md: "2xl" },
    fontWeight: "600",
  },
  subHeading: {
    fontFamily: "heading",  // already “Source Sans 3”
    fontSize: { base: "xl", md: "5xl" },
    fontWeight: "600",
    color: "brand.950",
  },
};


const Button = {
  baseStyle: {
    rounded: "xl",
    fontWeight: 600,
    transition: "all 0.25s ease",
  },
  variants: {
    solid: {
      bg: "brand.500",
      color: "white",
      _hover: {
        bg: "brand.700",
      },
    },
    soft: {
      bg: "brand.200",
      color: "brand.800",
      _hover: {
        bg: "brand.300",
      },
    },
    ghost: {
      color: "brand.600",
      _hover: { bg: "brand.200" },
    },
  },
};


const fonts = {
  heading: `"Source Sans 3", sans-serif`,  // ⬅️ Default heading font everywhere
  body: `'Inter', 'Poppins', sans-serif`,
  sourceSans: `"Source Sans 3", sans-serif`,
};


const components = {
  Heading: {
    variants: {
      // Big page titles
      page: {
        fontSize: { base: "4xl", md: "6xl" },
        color: "blue.700",
        textAlign: "center",
        fontFamily: "'Playfair Display', serif",
        letterSpacing: "wide",
        mt: { base: 6, md: 10 },
        mb: 4,
      },
      // Smaller section titles
      section: {
        as: "h2",
        size: "lg",
        mb: 4,
        fontWeight: "bold",
        fontFamily: "'Barlow Semi Condensed', sans-serif",
      },
    },
  },
  MenuButton: { // ✅ style for menu buttons
    baseStyle: {
      fontFamily: "Barlow, sans-serif",
      fontWeight: 500,
      fontSize: "lg", // increases size slightly
    },
  },
  MenuItem: { // optional: match dropdown items
    baseStyle: {
      fontFamily: "Barlow, sans-serif",
      fontSize: "md",
    },
  },

  Button: {
    baseStyle: { rounded: "xl" },
    defaultProps: { colorScheme: "brand" },
  },
  Link: {
    baseStyle: {
      px: 3,
      py: 2,
      rounded: "md",
      fontWeight: 500,
      _hover: { textDecoration: "none", bg: "brand.55" },
    },
    variants: {
      nav: {
        fontWeight: 500,
        _hover: { bg: "brand.200", color: "brand.55" },
        "&.active": {
          fontWeight: 700,
          color: "brand.55",
        },
      },
    },
  },
  Switch: {
    baseStyle: (props) => ({
      track: {
        bg: props.colorMode === "dark" ? "orange.900" : "orange.300",
        _checked: {
          bg: "orange.54",
        },
      },
      thumb: {
        bg: "white",
        _checked: {
          bg: "orange.54",
        },
      },
    }),
    defaultProps: {
      colorScheme: "orange",
    },
  },
};


const styles = {
  global: (props) => ({
    "html, body, #root": { height: "100%" },
    body: {
      bg: mode("brand.10", "gray.900")(props),
      color: mode("gray.800", "gray.100")(props),
      fontFamily: fonts.body,
    },
  }),
};

const config = {
  initialColorMode: "light",
  useSystemColorMode: true,
};

export default extendTheme({ colors, fonts, components, styles, textStyles, config });
