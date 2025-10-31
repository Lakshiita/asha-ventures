import {
  Box, Flex, HStack, IconButton, Text, Switch,useDisclosure, Stack, Link as CLink, Image, Button, useColorMode, useColorModeValue, Menu, MenuButton, MenuList, MenuItem
} from "@chakra-ui/react";
import { Link, NavLink } from "react-router-dom";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";
import logo from '../assets/asha-ventures-logo.png';
const links = [
  { to: "/people", label: "Team" },
  { to: "/investments", label: "Investments" },
  { to: "/impact", label: "Our Impact" },
  { 
    to: "/knowledge", 
    label: "Knowledge Resources",
    dropdown: [
      { to: "/knowledge#newsletters", label: "Newsletters" },
      { to: "/knowledge#media", label: "Media" },
      { to: "/knowledge#contact", label: "Contact" }
    ]
  },
];
// import { MoonIcon, SunIcon } from "@chakra-ui/icons";


const NavLinkItem = ({ to, children, dropdown }) => {
  if (dropdown) {
    return (
      <Menu trigger="hover">
        <MenuButton
          as={CLink}
          variant="nav"
          className="text-[30px] text-textColor2 font-[Supreme-Medium] leading-normal text-center"
          _hover={{ textDecoration: "none" }}
        >
          {children}
        </MenuButton>
        <MenuList>
          {dropdown.map((item) => (
            <MenuItem key={item.to} as={Link} to={item.to}>
              {item.label}
            </MenuItem>
          ))}
        </MenuList>
      </Menu>
    );
  }
  
  return (
    <CLink
      as={NavLink}
      to={to}
      variant="nav"
      className={({ isActive }) => `text-[30px] text-textColor2 font-[Supreme-Medium] leading-normal text-center ${isActive ? "active" : ""}`}
    >
      {children}
    </CLink>
  );
};

export default function Navbar() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box
      bg="brand.200"
      borderColor="blackAlpha.200"
      position="sticky"
      top="0"
      zIndex="100"
      boxShadow="0 2px 4px rgba(0,0,0,0.1)"
    >
      <Flex
        h="86px"
        alignItems="center"
        justifyContent="space-between"
        px={{ base: 4, md: 8 }}
      >
        {/* Logo */}
        <Link to="/">
          <Image
            src={logo}
            alt="Asha Ventures Logo" height="68px" rounded="md"
          />
        </Link>

        {/* Desktop Menu */}
        <HStack spacing={1} display={{ base: "none", md: "flex" }}>
          {links.map((l) => (
            <NavLinkItem key={l.to} to={l.to} dropdown={l.dropdown}>{l.label}</NavLinkItem>
          ))}

        </HStack>

        {/* Mobile Menu Button */}
        <IconButton
          size="lg"
          icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
          aria-label="Open Menu"
          display={{ md: "none" }}
          onClick={isOpen ? onClose : onOpen}
        />
      </Flex>

      {/* Mobile Menu */}
      {isOpen ? (
        <Box pb={4} display={{ md: "none" }}>
          <Stack as="nav" spacing={2} px={4}>
            {links.map((l) => (
              <NavLinkItem key={l.to} to={l.to}>{l.label}</NavLinkItem>
            ))}
          </Stack>
        </Box>
      ) : null}
    </Box>
  );
}
