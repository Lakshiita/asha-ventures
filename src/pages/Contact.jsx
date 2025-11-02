import {
  Box, Button, Container, FormControl, FormLabel, Input, Textarea, FormHelperText, Heading
} from "@chakra-ui/react";
import Section from "../components/Section.jsx";

export default function Contact() {
  return (
    <Box>
      <Section
        title="Get in Touch"
        subtitle="We’d love to hear from you. Fill out the form below and our team will get back to you soon."
      >
        <Container maxW="600px" bg="white" p={8} rounded="lg" boxShadow="lg">
          <Box as="form" onSubmit={(e) => e.preventDefault()}>
            <FormControl isRequired mb={4}>
              <FormLabel>Your Name</FormLabel>
              <Input placeholder="Full name" />
            </FormControl>
            <FormControl isRequired mb={4}>
              <FormLabel>Email</FormLabel>
              <Input type="email" placeholder="you@example.com" />
            </FormControl>
            <FormControl mb={4}>
              <FormLabel>Organization</FormLabel>
              <Input placeholder="Optional" />
            </FormControl>
            <FormControl isRequired mb={4}>
              <FormLabel>Message</FormLabel>
              <Textarea rows={5} placeholder="Tell us how we can help" />
              <FormHelperText>We usually respond within a couple of business days.</FormHelperText>
            </FormControl>
            <Button type="submit" colorScheme="orange" w="full" mt={4}>
              Send Message
            </Button>
          </Box>
        </Container>
      </Section>
    </Box>
  );
}
