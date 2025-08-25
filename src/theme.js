// theme.js
import { extendTheme } from "@chakra-ui/react";

const colors = {
  brand: {
    50:  "#f9f6f1",
    100: "#f1e8d9",
    200: "#e6d7bb",
    300: "#d8c49a",
    400: "#c9af7a",
    500: "#bfa36a", // primary beige
    600: "#a58957",
    700: "#8b7047",
    800: "#6f5838",
    900: "#391003ff",
  },
  textColor2: "#4A5568", // Add your specific textColor2 value here
};

const fonts = {
  heading: `'Playfair Display', serif`,
  body: `'Inter', sans-serif`,  
  supreme: `'Supreme-Medium', sans-serif`,
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
      _hover: { textDecoration: "none", bg: "brand.100" },
    },
    variants: {
      nav: {
        fontWeight: 500,
        _hover: { bg: "brand.200", color: "brand.800" },
        "&.active": {
          fontWeight: 700,
          bg: "brand.300",
          color: "brand.900",
        },
      },
    },
  },
};

const textStyles = {
  defaultText: {
    color: "textColor2",
    fontFamily: "supreme",
    lineHeight: "normal",
    textAlign: "center",
  },
};

const styles = {
  global: {
    "html, body, #root": { height: "100%" },
    body: { bg: "brand.50", color: "gray.800" },
  },
};

export default extendTheme({ colors, fonts, components, styles, textStyles });
