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
      <Container as={Stack} maxW="7xl" py={10}>

        {/* UPDATED: 3-COLUMN LAYOUT */}
        <SimpleGrid
          columns={{ base: 1, md: 3 }}
          spacing={6}
          templateColumns={{ md: "1.5fr 1fr 0.8fr" }}
        >
          {/* COLUMN 1 — Logo + Newsletter */}
          <Stack spacing={6} align="flex-start">
            <Image
              src={logo}
              alt="Asha Ventures Logo"
              height="80px"
              rounded="md"
              transition="all 0.3s ease"
              _hover={{
                transform: "scale(1.05)",
                cursor: "pointer",
                filter: "brightness(1.1)",
              }}
            />

            <Text fontSize="2xl" textStyle="subHeading" color="#464646ff">
              Asha Ventures is an inclusion and sustainability focused fund
              investing in early to growth stage companies.
            </Text>

            {/* Newsletter */}
            <Stack spacing={4} w="full">
              <Text fontWeight="bold" fontSize="lg" color="#333232ff" textStyle="subHeading">
                Subscribe to our Newsletter
              </Text>

              <HStack>
                <Input
                  placeholder="Enter your email"
                  variant="filled"
                  bg="white"
                  _placeholder={{ color: "gray.500" }}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <Button colorScheme="brand" onClick={handleSubscribe}>
                  Subscribe
                </Button>
              </HStack>
            </Stack>
          </Stack>

          {/* COLUMN 2 — Signatories */}
          <Stack spacing={4} textAlign="left">
            <Text fontWeight="bold" fontSize="xl" color="#333232ff" textStyle="subHeading" >
              Global Standards We Follow
            </Text>
            <Grid templateColumns="repeat(2, 1fr)" gap={8} maxW="350px" mx="auto">
              <Box textAlign="center">
                <Image
                  src="/assets/signatory/OPIM_Logo_RGB_Signatory_1_1_a19b434476.png"
                  alt="Signatory 1"
                  h="120px"
                  objectFit="contain"
                  mx="auto"
                />
              </Box>
              <Box textAlign="center">
                <Image
                  src="/assets/signatory/Blue_Mark_Practive_verification_seal_05_22_756364e25f.png"
                  alt="Signatory 2"
                  h="120px"
                  objectFit="contain"
                  mx="auto"
                />
              </Box>
            </Grid>
          </Stack>

          {/* COLUMN 3 — Get In Touch + Contact Links */}
          <Stack spacing={8}>

            {/* Get In Touch */}
            <Stack spacing={4} position="relative" zIndex={20}>
              <Text fontWeight="bold" fontSize="xl" color="#333232ff" textStyle="subHeading">
                Get In Touch
              </Text>

              {/* Popups */}
              {showAddress && (
                <Box
                  position="absolute"
                  top="50px"
                  left="-20px"
                  bg="rgba(255, 255, 255, 0.33)"
                  backdropFilter="blur(6px)"
                  boxShadow="lg"
                  p={4}
                  rounded="md"
                  w="260px"
                  zIndex={10}
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
                  top="50px"
                  left="70px"
                  bg="rgba(255, 255, 255, 0.33)"
                  backdropFilter="blur(6px)"
                  boxShadow="lg"
                  p={4}
                  rounded="md"
                  w="220px"
                  zIndex={10}
                  animation="slideUp 0.25s ease forwards"
                >
                  <Text fontSize="sm" color="gray.700">info@ashaventures.in</Text>
                </Box>
              )}

              {showLinkedIn && (
                <Box
                  position="absolute"
                  top="50px"
                  left="150px"
                  bg="rgba(255, 255, 255, 0.33)"
                  backdropFilter="blur(6px)"
                  boxShadow="lg"
                  p={4}
                  rounded="md"
                  w="240px"
                  zIndex={10}
                  animation="slideUp 0.25s ease forwards"
                >
                  <Text fontSize="sm" color="gray.700">
                    Visit our LinkedIn Page
                  </Text>
                </Box>
              )}

              {/* Icon Row */}
              <HStack spacing={3}>
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
              <Text fontWeight="bold" fontSize="xl" color="#333232ff" textStyle="subHeading">Quick Links</Text>

              <VStack align="start" spacing={2}>
                <CLink href="/faqs" fontSize="md" _hover={{ color: "blue.800", fontSize:"lg"}} color="#333232ff" textStyle="subHeading">
                  FAQs
                </CLink>
                <CLink href="/contact" fontSize="md" _hover={{ color: "blue.800", fontSize:"lg"}} color="#333232ff" textStyle="subHeading">
                  Contact
                </CLink>
              </VStack>
            </Stack>

          </Stack>
        </SimpleGrid>

        <Divider my={6} />

        <Stack
          direction={{ base: "column", md: "row" }}
          justify="space-between"
          align="center"
        >
          <Text fontSize="md">
            © 2025 Asha Ventures. All Rights Reserved.
          </Text>

          <HStack spacing={4}>
            <CLink href="/privacy" fontSize="md">
              Privacy Policy
            </CLink>
            <CLink href="/terms" fontSize="md">
              Terms & Services
            </CLink>
          </HStack>
        </Stack>

      </Container>
    </Box>
  );
}
