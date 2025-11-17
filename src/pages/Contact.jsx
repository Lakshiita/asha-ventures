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
  useToast,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import { useState } from "react";

const MotionBox = motion(Box);

export default function Contact() {
  const bg = useColorModeValue("white", "gray.800");
  const inputBg = useColorModeValue("gray.10", "gray.50");
  const toast = useToast();

  // ---- Controlled form state ----
  const [form, setForm] = useState({
    name: "",
    email: "",
    organization: "",
    message: "",
  });
  const [submitting, setSubmitting] = useState(false);

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      toast({
        title: "Please fill the required fields.",
        status: "warning",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    setSubmitting(true);
    try {
      // Update this URL if your backend runs elsewhere
      const res = await fetch("http://localhost:5000/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          message: form.message + (form.organization ? ` (Org: ${form.organization})` : ""),
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data?.error || "Failed to send message");
      }

      toast({
        title: "Message sent!",
        description: "We’ll get back to you soon.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });

      // Clear form after success
      setForm({ name: "", email: "", organization: "", message: "" });
    } catch (err) {
      toast({
        title: "Could not send your message",
        description: err.message,
        status: "error",
        duration: 4000,
        isClosable: true,
      });
    } finally {
      setSubmitting(false);
    }
  };

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
            textStyle="subHeading"
            fontWeight="700"
            mb={3}
          >
            Get in Touch
          </Heading>

          <Text color="gray.600" 
          fontSize="lg" 
          maxW="3xl" 
          mx="auto" 
          textStyle="subHeading"
          mb={10}>
            We'd love to hear from you. Fill out the form below and our team will get back to you soon.
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
            <VStack as="form" onSubmit={handleSubmit} spacing={6} align="stretch">
              <FormControl isRequired>
                <FormLabel fontWeight="semibold" color="blue.700">
                  Your Name
                </FormLabel>
                <Input
                  name="name"
                  placeholder="Full name"
                  value={form.name}
                  onChange={onChange}
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
                  name="email"
                  type="email"
                  placeholder="you@example.com"
                  value={form.email}
                  onChange={onChange}
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
                  name="organization"
                  placeholder="Optional"
                  value={form.organization}
                  onChange={onChange}
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
                  name="message"
                  rows={5}
                  placeholder="Tell us how we can help"
                  value={form.message}
                  onChange={onChange}
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
                isLoading={submitting}
                loadingText="Sending..."
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
