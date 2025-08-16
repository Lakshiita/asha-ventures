import {
  Box,
  Container,
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
} from "@chakra-ui/react";
import { FaLinkedin, FaMapMarkerAlt } from "react-icons/fa";
import { SiGmail } from "react-icons/si";
import logo from '../assets/asha-ventures-logo.png';

export default function Footer() {
  return (
    <Box bg="brand.100" color="gray.800" mt={10}>
      <Container as={Stack} maxW="7xl" py={10}>
        <SimpleGrid columns={{ base: 1, md: 5 }} spacing={10}>
          
          {/* About & Newsletter Section */}
          <Stack spacing={6} align="flex-start" gridColumn={{ md: "span 2" }}>
            <Image
              src={logo}
              alt="Asha Ventures Logo"
              height="80px"
              rounded="md"
            />
            <Text fontSize="sm">
              Asha Ventures is an inclusion and sustainability focused fund investing in early to growth stage companies.
            </Text>
            
            <Stack spacing={4} w="full">
              <Text fontWeight="bold" fontSize="lg">Subscribe to our Newsletter</Text>
              <HStack>
                <Input
                  placeholder="Enter your email"
                  variant="filled"
                  bg="white"
                  _placeholder={{ color: "gray.500" }}
                />
                <Button colorScheme="brand">Subscribe</Button>
              </HStack>
            </Stack>
          </Stack>

          {/* Contact */}
          <Stack spacing={2}>
            <Text fontWeight="bold" fontSize="lg">Get In Touch</Text>
            <Text fontSize="sm">
              9th Floor, Peninsula Towers, Peninsula Corporate Park, Lower Parel West, 
              Lower Parel, Mumbai, Maharashtra 400013
            </Text>
            <HStack spacing={1}>
              {/* Location */}
              <IconButton
                as="a"
                href="https://g.co/kgs/pajL1fi"
                icon={<FaMapMarkerAlt />}
                aria-label="Location"
                variant="ghost"
                color="green.500"
                fontSize="xl"
                target="_blank"
              />
              {/* Gmail */}
              <IconButton
                as="a"
                href="mailto:info@ashaventures.in"
                icon={<SiGmail />}
                aria-label="Email"
                variant="ghost"
                color="red.500"
                fontSize="xl"
              />
              {/* LinkedIn */}
              <IconButton
                as="a"
                href="https://linkedin.com/company/asha-ventures"
                icon={<FaLinkedin />}
                aria-label="LinkedIn"
                variant="ghost"
                color="blue.600"
                fontSize="xl"
                target="_blank"
              />
            </HStack>
          </Stack>

          {/* Quicklinks */}
          <Stack spacing={2}>
            <Text fontWeight="bold" fontSize="lg">Quicklinks</Text>
            <VStack align="start" spacing={0.5}>
              <CLink href="/investments">Our Investments</CLink>
              <CLink href="/impact">Our Impact</CLink>
              <CLink href="/newsletters">Newsletters</CLink>
              <CLink href="/blog">Blog</CLink>
              <CLink href="/media">Media</CLink>
            </VStack>
          </Stack>

          {/* Support */}
          <Stack spacing={2}>
            <Text fontWeight="bold" fontSize="lg">Support</Text>
            <VStack align="start" spacing={0.5}>
              <CLink href="/support">Support</CLink>
              <CLink href="/faqs">FAQs</CLink>
              <CLink href="/contact">Contact</CLink>
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
          <Text fontSize="sm">© 2022 Asha Ventures. All Rights Reserved.</Text>
          <HStack spacing={4}>
            <CLink href="/privacy">Privacy Policy</CLink>
            <CLink href="/terms">Terms & Services</CLink>
          </HStack>
        </Stack>
      </Container>
    </Box>
  );
}
