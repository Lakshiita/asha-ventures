import { Box, Container, HStack, Text, Link } from "@chakra-ui/react";

export default function Footer() {
  return (
    <Box mt={16} borderTop="1px solid" borderColor="blackAlpha.200" py={8} bg="brand.50">
      <Container>
        <HStack justify="space-between" align="center" flexDir={{ base: "column", md: "row" }} gap={3}>
          <Text fontSize="sm">© {new Date().getFullYear()} Asha Ventures. All rights reserved.</Text>
          <HStack spacing={4}>
            <Link href="#" fontSize="sm">Privacy</Link>
            <Link href="#" fontSize="sm">Terms</Link>
          </HStack>
        </HStack>
      </Container>
    </Box>
  );
}
