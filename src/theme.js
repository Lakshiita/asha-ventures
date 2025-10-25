// theme.js
import { extendTheme } from "@chakra-ui/react";
import { mode } from "@chakra-ui/theme-tools";

const colors = {
  brand: {
    10: "#ffffffff",
    50: "#fdd49eff",
    51: "#face83ff",
    52: "rgba(255, 184, 92, 1)",
    53: "#ffb951ff",
    54: "#f8a048ff",
    55: "#fa8d1fff",
    100: "#f1e8d9",
    200: "#fffcf6ff",
    300: "#d8c49a",
    400: "#c9af7a",
    500: "#ad4b00de", // primary beige
    600: "#a58957",
    700: "#8b7047",
    800: "#6f5838",
    900: "#391003ff",
    section: {
      hero: "#ffffffff",
      sectors: "#d3e8ffff",
      carousel: "#ffd1fdff",
      testimonials: "#d6ffd6ff",
      signatory: "#ffffffff",
    },
  },

  textColor2: {
    light: "#242a34ff",
    dark: "#e2e8f0"
  },
};

const fonts = {
  heading: `'Poppins', 'Supreme-Medium', 'Inter', sans-serif`,
  body: `'Inter', 'Poppins', 'Supreme-Medium', sans-serif`,
  supreme: `'Supreme-Medium', 'Poppins', sans-serif`,
};

const components = {
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

const textStyles = {
  defaultText: {
    color: mode("textColor2.light", "textColor2.dark"),
    fontFamily: "supreme",
    lineHeight: "normal",
    textAlign: "center",
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
