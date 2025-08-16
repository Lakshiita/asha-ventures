import { Box, Container, Heading, Text } from "@chakra-ui/react";

export default function Section({ title, subtitle, children, ...rest }) {
  return (
    <Box py={{ base: 10, md: 16 }} {...rest}>
      <Container>
        {title && (
          <Heading as="h2" size="lg" fontWeight="700" mb={2}>
            {title}
          </Heading>
        )}
        {subtitle && (
          <Text color="gray.600" mb={8} maxW="3xl">
            {subtitle}
          </Text>
        )}
        {children}
      </Container>
    </Box>
  );
}
