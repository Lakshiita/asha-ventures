import {
  Box,
  Button,
  Container,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  FormHelperText,
  Heading,
  Text,
  VStack,
  useColorModeValue,
} from "@chakra-ui/react";
import { motion } from "framer-motion";

const MotionBox = motion(Box);

export default function Contact() {
  const bg = useColorModeValue("white", "gray.800");
  const inputBg = useColorModeValue("gray.10", "gray.50");

  return (
    <Box bgGradient="linear(to-b, white, blue.100)" py={{ base: 10, md: 16 }}>
      <Container maxW="800px" textAlign="center">
        {/* 🌟 Animated Heading */}
        <MotionBox
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Heading
            as="h2"
            fontSize={{ base: "4xl", md: "6xl" }}
            color="blue.700"
            fontFamily="'Playfair Display', serif"
            fontWeight="700"
            mb={3}
          >
            Get in Touch
          </Heading>

          <Text color="gray.600" fontSize="lg" maxW="3xl" mx="auto" mb={10}>
            We’d love to hear from you. Fill out the form below and our team will get back to you soon.
          </Text>
        </MotionBox>

        {/* 🧡 Form Container */}
        <MotionBox
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          <Box
            bg={bg}
            p={{ base: 6, md: 10 }}
            rounded="2xl"
            boxShadow="xl"
            border="1px solid"
            borderColor="gray.100"
          >
            <VStack as="form" onSubmit={(e) => e.preventDefault()} spacing={6} align="stretch">
              <FormControl isRequired>
                <FormLabel fontWeight="semibold" color="blue.700">
                  Your Name
                </FormLabel>
                <Input
                  placeholder="Full name"
                  bg={inputBg}
                  border="1px solid"
                  borderColor="gray.200"
                  _focus={{
                    borderColor: "orange.400",
                    boxShadow: "0 0 0 1px orange.300",
                  }}
                  rounded="md"
                  size="lg"
                />
              </FormControl>

              <FormControl isRequired>
                <FormLabel fontWeight="semibold" color="blue.700">
                  Email
                </FormLabel>
                <Input
                  type="email"
                  placeholder="you@example.com"
                  bg={inputBg}
                  border="1px solid"
                  borderColor="gray.200"
                  _focus={{
                    borderColor: "orange.400",
                    boxShadow: "0 0 0 1px orange.300",
                  }}
                  rounded="md"
                  size="lg"
                />
              </FormControl>

              <FormControl>
                <FormLabel fontWeight="semibold" color="blue.700">
                  Organization
                </FormLabel>
                <Input
                  placeholder="Optional"
                  bg={inputBg}
                  border="1px solid"
                  borderColor="gray.200"
                  _focus={{
                    borderColor: "orange.400",
                    boxShadow: "0 0 0 1px orange.300",
                  }}
                  rounded="md"
                  size="lg"
                />
              </FormControl>

              <FormControl isRequired>
                <FormLabel fontWeight="semibold" color="blue.700">
                  Message
                </FormLabel>
                <Textarea
                  rows={5}
                  placeholder="Tell us how we can help"
                  bg={inputBg}
                  border="1px solid"
                  borderColor="gray.200"
                  _focus={{
                    borderColor: "orange.400",
                    boxShadow: "0 0 0 1px orange.300",
                  }}
                  rounded="md"
                  size="lg"
                />
                <FormHelperText color="gray.500">
                  We usually respond within a couple of business days.
                </FormHelperText>
              </FormControl>

              <Button
                type="submit"
                bgGradient="linear(to-r, orange.400, orange.500)"
                color="white"
                _hover={{
                  bgGradient: "linear(to-r, orange.500, orange.600)",
                  transform: "scale(1.03)",
                }}
                transition="all 0.2s ease-in-out"
                w="full"
                size="lg"
                rounded="full"
                fontWeight="semibold"
                letterSpacing="wide"
              >
                Send Message
              </Button>
            </VStack>
          </Box>
        </MotionBox>
      </Container>
    </Box>
  );
}
