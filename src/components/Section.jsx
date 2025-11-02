import { Box, Container, Heading, Text } from "@chakra-ui/react";

export default function Section({ title, subtitle, children, titleAlign = "center", ...rest }) {
  return (
    <Box py={{ base: 10, md: 16 }} {...rest}>
      <Container>
        {title && (
          <Heading as="h2" size="3xl" fontWeight="700" textAlign={titleAlign}
            color="blue.700"
            fontFamily="'Playfair Display', serif"
            mb={{ base: 2, md: 4 }}>
            {title}
          </Heading>
        )}
        {subtitle && (
          <Text color="gray.600" mb={8} maxW="3xl" textAlign={titleAlign}>
            {subtitle}
          </Text>
        )}
        {children}
      </Container>
    </Box>
  );
}
