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
import { useState } from "react";
import logo from '../assets/asha-ventures-logo.png';

export default function Footer() {
  const [email, setEmail] = useState("");
  const toast = useToast();

  const handleSubscribe = () => {
    if (!email || !email.trim()) {
      toast({
        title: "Please enter your email",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    // Here you could call your subscription API.
    toast({
      title: "Newsletter Subscribed",
      description: "Thank you for subscribing!",
      status: "success",
      duration: 4000,
      isClosable: true,
    });

    setEmail("");
  };

  return (
    <Box bg="brand.100" color="gray.800" mt={10}>
      <Container as={Stack} maxW="7xl" py={10} spacing={8}>

        {/* Main Footer Grid */}
        <SimpleGrid columns={{ base: 1, md: 4 }} spacing={10}>
          {/* Logo & Newsletter */}
          <Stack spacing={10} align="flex-start" gridColumn={{ md: "span 2" }}>
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
            <Text fontSize="2xl" fontFamily={"sans-serif"}>
              Asha Ventures is an inclusion and sustainability focused fund
              investing in early to growth stage companies.
            </Text>

            <Stack spacing={4} w="full">
              <Text fontWeight="bold" fontSize="lg">
                Subscribe to our Newsletter
              </Text>
              <HStack>
                <Input
                  placeholder="Enter your email"
                  variant="filled"
                  bg="white"
                  _placeholder={{ color: "gray.500" }}
                  transition="all 0.2s ease"
                  _hover={{ bg: "gray.50" }}
                  _focus={{
                    bg: "white",
                    transform: "scale(1.02)",
                    boxShadow: "0 0 0 2px var(--chakra-colors-brand-200)",
                  }}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  aria-label="newsletter-email"
                />
                <Button
                  colorScheme="brand"
                  transition="all 0.2s ease"
                  _hover={{
                    transform: "translateY(-2px)",
                    boxShadow: "lg",
                  }}
                  _active={{
                    transform: "translateY(0px)",
                  }}
                  onClick={handleSubscribe}
                >
                  Subscribe
                </Button>
              </HStack>
            </Stack>
          </Stack>

          {/* Signatory Section (Moved Above) */}
          <Stack spacing={4}>
            <Grid
              templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }}
              gap={8}
              maxW="4xl"
              mx="auto"
              mb={10}
            >
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
            {/* Get In Touch */}
            <Text fontWeight="bold" fontSize="xl">
              Get In Touch
            </Text>
            <Text fontSize="md">
              9th Floor, Peninsula Towers, Peninsula Corporate Park, Lower Parel
              West, Lower Parel, Mumbai, Maharashtra 400013
            </Text>
            <HStack spacing={1}>
              <IconButton
                as="a"
                href="https://g.co/kgs/pajL1fi"
                icon={<FaMapMarkerAlt />}
                aria-label="Location"
                variant="ghost"
                color="green.500"
                fontSize="xl"
                target="_blank"
                transition="all 0.2s ease"
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
                fontSize="xl"
                transition="all 0.2s ease"
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
                fontSize="xl"
                target="_blank"
                transition="all 0.2s ease"
                _hover={{
                  transform: "scale(1.2) rotate(5deg)",
                  color: "blue.700",
                  bg: "blue.50",
                }}
              />
            </HStack>
          </Stack>

          {/* Contact */}
          <Stack spacing={4}>
            <Text fontWeight="bold" fontSize="xl">
              Contact
            </Text>
            <VStack align="start" spacing={2}>
              <CLink
                href="/faqs"
                fontSize="md"
                transition="all 0.2s ease"
                _hover={{
                  color: "brand.500",
                  transform: "translateX(5px)",
                  textDecoration: "underline",
                }}
              >
                FAQs
              </CLink>
              <CLink
                href="/contact"
                fontSize="md"
                transition="all 0.2s ease"
                _hover={{
                  color: "brand.500",
                  transform: "translateX(5px)",
                  textDecoration: "underline",
                }}
              >
                Contact
              </CLink>
            </VStack>
          </Stack>
        </SimpleGrid>

        <Divider my={6} />

        {/* Bottom Bar */}
        <Stack
          direction={{ base: "column", md: "row" }}
          justify="space-between"
          align="center"
        >
          <Text fontSize="md">© 2022 Asha Ventures. All Rights Reserved.</Text>
          <HStack spacing={4}>
            <CLink
              href="/privacy"
              fontSize="md"
              transition="all 0.2s ease"
              _hover={{
                color: "brand.500",
                textDecoration: "underline",
              }}
            >
              Privacy Policy
            </CLink>
            <CLink
              href="/terms"
              fontSize="md"
              transition="all 0.2s ease"
              _hover={{
                color: "brand.500",
                textDecoration: "underline",
              }}
            >
              Terms & Services
            </CLink>
          </HStack>
        </Stack>
      </Container>
    </Box>
  );
}