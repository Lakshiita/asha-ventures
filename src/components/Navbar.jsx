import {
  Box, Flex, HStack, IconButton, Text, Switch,useDisclosure, Stack, Link as CLink, Image, Button, useColorMode, useColorModeValue
} from "@chakra-ui/react";
import { Link, NavLink } from "react-router-dom";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";
import logo from '../assets/asha-ventures-logo.png';
const links = [
  { to: "/people", label: "Team" },
  { to: "/investments", label: "Investments" },
  { to: "/impact", label: "Our Impact" },
  { to: "/knowledge", label: "Knowledge Resources" },
];
import { MoonIcon, SunIcon } from "@chakra-ui/icons";


const NavLinkItem = ({ to, children }) => (
  <CLink
    as={NavLink}
    to={to}
    variant="nav"
    className={({ isActive }) => `text-[30px] text-textColor2 font-[Supreme-Medium] leading-normal text-center ${isActive ? "active" : ""}`}
  >
    {children}
  </CLink>
);

export default function Navbar() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { colorMode, toggleColorMode } = useColorMode();
  const navbarBg = useColorModeValue("brand.200", "gray.900");
  const borderColor = useColorModeValue("blackAlpha.200", "whiteAlpha.200");
  const textColor = useColorModeValue("textColor2.light", "textColor2.dark");

  return (
    <Box
      bg={navbarBg}
      borderColor={borderColor}
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
            <NavLinkItem key={l.to} to={l.to}>{l.label}</NavLinkItem>
          ))}

          {/* Theme Switch with Icons */}
          <Flex align="center" ml={4}>
            <Box position="relative" display="inline-flex" alignItems="center">
              <Switch
                isChecked={colorMode === "dark"}
                onChange={toggleColorMode}
                colorScheme="orange"
                size="lg"
              />
              {/* Sun icon (left) */}
              <SunIcon
                boxSize={3.5}
                color="yellow.400"
                position="absolute"
                left="6px"
                pointerEvents="none"
              />
              {/* Moon icon (right) */}
              <MoonIcon
                boxSize={3.5}
                color="gray.600"
                position="absolute"
                right="6px"
                pointerEvents="none"
              />
            </Box>
          </Flex>
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

            {/* Theme Switch for mobile */}
            <Flex align="center" justify="space-between" mt={3} p={2} borderRadius="md" borderWidth="1px">
              <Text fontSize="sm" fontWeight="medium">
                {colorMode === "light" ? "Light Mode" : "Dark Mode"}
              </Text>
              <Switch
                isChecked={colorMode === "dark"}
                onChange={toggleColorMode}
                colorScheme="orange"
                size="lg"
              />
            </Flex>
          </Stack>
        </Box>
      ) : null}
    </Box>
  );
}
