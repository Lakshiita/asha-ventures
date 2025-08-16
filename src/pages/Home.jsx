import {
  Box, Button, Container, Grid, GridItem, Heading, Image, Text, Stack
} from "@chakra-ui/react";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <Box>
      {/* Hero */}
      <Box py={{ base: 10, md: 20 }}>
        <Container>
          <Grid templateColumns={{ base: "1fr", md: "1.1fr 0.9fr" }} gap={8} alignItems="center">
            <GridItem>
              <Stack spacing={6}>
                <Heading as="h1" size="2xl" lineHeight="1.15">
                  Backing builders creating lasting social change.
                </Heading>
                <Text fontSize="lg" color="gray.700" maxW="2xl">
                  “The best way to find yourself is to lose yourself in the service of others.”
                  <br />— Mahatma Gandhi
                </Text>
                <Stack direction={{ base: "column", sm: "row" }} spacing={3}>
                  <Button as={Link} to="/investments" size="lg">View Portfolio</Button>
                  <Button as={Link} to="/impact" variant="outline" size="lg">Our Impact</Button>
                </Stack>
              </Stack>
            </GridItem>
            <GridItem>
              <Image
                src="https://images.unsplash.com/photo-1580745430931-07f8fba2c7f7?q=80&w=1200"
                alt="Social worker in the field"
                rounded="2xl"
                shadow="lg"
                objectFit="cover"
              />
            </GridItem>
          </Grid>
        </Container>
      </Box>

      {/* Highlights */}
      <Box bg="brand.100">
        <Container py={12}>
          <Grid templateColumns={{ base: "1fr", md: "repeat(3,1fr)" }} gap={6}>
            {[
              { n: "25+", t: "Portfolio Organizations" },
              { n: "5M+", t: "Lives Touched" },
              { n: "12", t: "States Reached" },
            ].map((stat) => (
              <Box key={stat.t} p={6} bg="white" rounded="xl" shadow="sm" border="1px solid" borderColor="blackAlpha.100">
                <Heading size="xl">{stat.n}</Heading>
                <Text mt={2} color="gray.600">{stat.t}</Text>
              </Box>
            ))}
          </Grid>
        </Container>
      </Box>
    </Box>
  );
}
