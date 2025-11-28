// Navbar.jsx
import {
  Box, Flex, HStack, IconButton, Image, Link as CLink, Stack, useDisclosure, Button, Menu, MenuButton, MenuList, MenuItem
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

const NavLinkItem = ({ to, children, dropdown }) => {
  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    if (onClose) onClose();
  };
  if (dropdown) {
    return (
      <Menu trigger="hover">
        <MenuButton
          as={CLink}
          variant="nav"
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
      // fontFamily="Barlow, sans-serif"
      fontFamily="Barlow Semi Condensed, sans-serif"
      onClick={handleClick}
      fontSize="1.25rem"
      fontWeight="500"
      letterSpacing="0.5px"
      transform="scaleY(1.1)" // ✅ vertically stretches letters by 10%
      transformOrigin="center"
    >
      {children}
    </CLink>

  );
};

export default function Navbar() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  return (
    <Box
      bg="#fefbf4ff"
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
        <Link to="/" onClick={scrollToTop}>
          <Image
            src={logo}
            alt="Asha Ventures Logo" height="68px" rounded="md"
          />
        </Link>

        {/* Desktop Menu */}
        <HStack spacing={4} display={{ base: "none", md: "flex" }}>
          {links.map((l) => (
            <NavLinkItem key={l.to} to={l.to} dropdown={l.dropdown}>{l.label}</NavLinkItem>
          ))}
          <Button
            as={Link}
            to="/contact"
            bg="orange.400"
            color="white"
            _hover={{ bg: "orange.500" }}
            rounded="full"
            px={6}
          >
            Contact Us
          </Button>
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
          <Stack as="nav" spacing={3} px={4}>
            {links.map((l) => (
              <NavLinkItem key={l.to} to={l.to}>{l.label}</NavLinkItem>
            ))}
            <Button
              as={Link}
              to="/contact"
              bg="orange.400"
              color="white"
              onClose={onClose}
              _hover={{ bg: "orange.500" }}
              rounded="full"
              w="full"
            >
              Contact Us
            </Button>
          </Stack>
        </Box>
      ) : null}
    </Box>
  );
}
