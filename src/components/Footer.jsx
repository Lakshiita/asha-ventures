import {
  Box,
  Container,
  Grid,
  SimpleGrid,
  Stack,
  Text,
  Input,
  Button,
  Link as CLink,
  VStack,
  HStack,
  Divider,
  Image,
  IconButton,
  useToast,
} from "@chakra-ui/react";
import { FaLinkedin, FaMapMarkerAlt } from "react-icons/fa";
import { SiGmail } from "react-icons/si";
import { useState, useEffect } from "react";
import logo from "../assets/asha-ventures-logo.png";

export default function Footer() {
  const [email, setEmail] = useState("");
  const toast = useToast();
  const [showAddress, setShowAddress] = useState(false);
  const [showEmail, setShowEmail] = useState(false);
  const [showLinkedIn, setShowLinkedIn] = useState(false);

  const slideUpKeyframes = `
    @keyframes slideUp {
      from {
        opacity: 0;
        transform: translateY(20px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
  `;

  useEffect(() => {
    const style = document.createElement("style");
    style.innerHTML = slideUpKeyframes;
    document.head.appendChild(style);
  }, []);

  const handleSubscribe = async () => {
    if (!email || !email.trim()) {
      toast({
        title: "Please enter your email",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    try {
      const response = await fetch("https://asha-ventures-backend.vercel.app/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, source: "popup-form" })
      });

      console.log('Server response:', { status: response.status, ok: response.ok });

      if (!response.ok) {
        throw new Error("Failed to send email");
      }

      console.log('Newsletter subscription successful for:', email);
      toast({
        title: "Newsletter Subscribed",
        description: "Thank you for subscribing!",
        status: "success",
        duration: 4000,
        isClosable: true,
      });
      setEmail("");
    } catch (error) {
      console.error('Newsletter subscription error:', error);
      toast({
        title: "Error",
        description: "Unable to send subscription email",
        status: "error",
        duration: 4000,
        isClosable: true,
      });
    }
  };

  return (
    <Box bg="brand.section.footer" color="gray.800">
      <Container as={Stack} maxW="7xl" py={{ base: 12, md: 16 }} spacing={10}>

        {/* === NEW: 2-COLUMN LAYOUT === */}
        <SimpleGrid
          columns={{ base: 1, md: 2 }}
          spacing={{ base: 10, md: 36 }}
        >
          {/* COLUMN 1 — Logo + About + Newsletter */}
          <Stack spacing={8} align="flex-start">
            <Image
              src={logo}
              alt="Asha Ventures Logo"
              height="120px"
              rounded="md"
              transition="all 0.3s ease"
              _hover={{
                transform: "scale(1.05)",
                cursor: "pointer",
                filter: "brightness(1.1)",
              }}
            />

            <Text fontSize={{ base: "lg", md: "2xl" }} color="#464646ff" textStyle="subHeading">
              Asha Ventures is an inclusion and sustainability-focused fund
              investing in early to growth stage companies.
            </Text>
            <Divider my={1} />
            {/* Newsletter */}
            <Stack spacing={4} w="full">
              <Text fontWeight="bold" fontSize={{ base: "lg", md: "2xl" }} color="#333232ff" textStyle="subHeading">
                Subscribe to our Newsletter
              </Text>

              <HStack spacing={3} flexDir={{ base: "column", sm: "row" }} w="full">
                <Input
                  placeholder="Enter your email"
                  variant="filled"
                  bg="white"
                  _placeholder={{ color: "gray.500" }}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <Button
                  colorScheme="brand"
                  w={{ base: "full", sm: "auto" }}
                  onClick={handleSubscribe}
                >
                  Subscribe
                </Button>
              </HStack>
            </Stack>
          </Stack>

          {/* COLUMN 2 — Get In Touch + Quick Links */}
          <Stack spacing={10}>
            {/* Get In Touch */}
            <Stack spacing={5} position="relative">
              <Text fontWeight="bold" fontSize={{ base: "lg", md: "2xl" }} color="#333232ff">
                Get In Touch
              </Text>

              {/* Hover Popups */}
              {showAddress && (
                <Box
                  position="absolute"
                  top="-45px"
                  left="5%"
                  transform="translateX(-50%)"
                  bg="white"
                  boxShadow="lg"
                  p={4}
                  rounded="md"
                  w="260px"
                  zIndex={20}
                  animation="slideUp 0.25s ease forwards"
                >
                  <Text fontSize="sm" color="gray.700">
                    9th Floor, Peninsula Towers, Peninsula Corporate Park,
                    Lower Parel West, Mumbai 400013
                  </Text>
                </Box>
              )}


              {showEmail && (
                <Box
                  position="absolute"
                  top="-10px"
                  left="15%"
                  transform="translateX(-50%)"
                  bg="white"
                  boxShadow="lg"
                  p={4}
                  rounded="md"
                  w="200px"
                  zIndex={20}
                  animation="slideUp 0.25s ease forwards"
                >
                  <Text fontSize="sm">info@ashaventures.in</Text>
                </Box>
              )}

              {showLinkedIn && (
                <Box
                  position="absolute"
                  top="-10px"
                  left="25%"
                  transform="translateX(-50%)"
                  bg="white"
                  boxShadow="lg"
                  p={4}
                  rounded="md"
                  w="220px"
                  zIndex={20}
                  animation="slideUp 0.25s ease forwards"
                >
                  <Text fontSize="sm">Visit our LinkedIn Page</Text>
                </Box>
              )}


              <HStack spacing={4}>
                <IconButton
                  as="a"
                  href="https://share.google/0b5clrNimWTN8w832"
                  icon={<FaMapMarkerAlt />}
                  aria-label="Location"
                  variant="ghost"
                  color="green.500"
                  fontSize="2xl"
                  target="_blank"
                  onMouseEnter={() => setShowAddress(true)}
                  onMouseLeave={() => setShowAddress(false)}
                  _hover={{
                    transform: "scale(1.2) rotate(5deg)",
                    color: "green.600",
                    bg: "green.50",
                  }}
                />
                <IconButton
                  as="a"
                  href="mailto:info@ashaventures.in"
                  icon={<SiGmail />}
                  aria-label="Email"
                  variant="ghost"
                  color="red.500"
                  fontSize="2xl"
                  onMouseEnter={() => setShowEmail(true)}
                  onMouseLeave={() => setShowEmail(false)}
                  _hover={{
                    transform: "scale(1.2) rotate(-5deg)",
                    color: "red.600",
                    bg: "red.50",
                  }}
                />
                <IconButton
                  as="a"
                  href="https://linkedin.com/company/asha-ventures"
                  icon={<FaLinkedin />}
                  aria-label="LinkedIn"
                  variant="ghost"
                  color="blue.600"
                  fontSize="2xl"
                  target="_blank"
                  onMouseEnter={() => setShowLinkedIn(true)}
                  onMouseLeave={() => setShowLinkedIn(false)}
                  _hover={{
                    transform: "scale(1.2) rotate(5deg)",
                    color: "blue.700",
                    bg: "blue.50",
                  }}
                />
              </HStack>
            </Stack>

            {/* Quick Links */}
            <Stack spacing={4}>
              <Text fontWeight="bold" fontSize={{ base: "lg", md: "2xl" }} color="#333232ff" textStyle="subHeading">
                Quick Links
              </Text>

              <VStack align="start" spacing={2}>
                <CLink href="/investments" fontSize="lg" _hover={{ color: "blue.600" }} textStyle="subHeading">
                  Investments
                </CLink>
                <CLink href="/people" fontSize="lg" _hover={{ color: "blue.600" }} textStyle="subHeading">
                  Our Team
                </CLink>
                <CLink href="/impact" fontSize="lg" _hover={{ color: "blue.600" }} textStyle="subHeading">
                  Impact
                </CLink>
                <CLink href="/faqs" fontSize="lg" _hover={{ color: "blue.600" }} textStyle="subHeading">
                  FAQs
                </CLink>
                <CLink href="/contact" fontSize="lg" _hover={{ color: "blue.600" }} textStyle="subHeading">
                  Contact
                </CLink>
              </VStack>
            </Stack>
          </Stack>
        </SimpleGrid>

        <Divider my={8} />

        <Stack
          direction={{ base: "column", md: "row" }}
          justify="space-between"
          align="center"
        >
          <Text fontSize="md">© 2025 Asha Ventures. All Rights Reserved.</Text>

          <HStack spacing={4}>
            <CLink href="/" fontSize="md" _hover={{ color: "blue.600" }} textStyle="subHeading">Privacy Policy</CLink>
            <CLink href="/" fontSize="md" _hover={{ color: "blue.600" }} textStyle="subHeading">Terms & Services</CLink>
          </HStack>
        </Stack>

      </Container>
    </Box>
  );
}
