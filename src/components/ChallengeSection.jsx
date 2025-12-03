import { Container, Heading, Text, Grid } from "@chakra-ui/react";
import squareCards from "../data/squareCards.json";
import SquareCard from "./SquareCard";

export default function ChallengeSection() {
  return (
    <Container maxW="100%" py={10} minH="100vh" bg="brand.section.two_x">
      <Heading textAlign="center" mb={4} mt={10} color="blue.700">
        <Text as="span" color="red.500">2X</Text>{" "}
        <Text as="span" color="green.500">Challenge</Text> <br />
        Financing for Women
      </Heading>
      <Text textAlign="center" mb={16} color="gray.500" textStyle="subHeading" fontSize={{ base: "lg", md: "lg" }}>
        Empowering women through strategic financing across key areas
      </Text>
      <Container maxW="1200px" px={{ base: 4, md: 8 }} >
        <Grid

          templateColumns={{
            base: "repeat(2, 1fr)",   // 👈 2 cards per row on mobile
            sm: "repeat(2, 1fr)",
            md: "repeat(3, 1fr)",
            lg: "repeat(4, 1fr)",
          }}

          gap={{ base: 4, md: 6 }}
          justifyItems="center"
        >
          {squareCards.map((card, index) => (
            <SquareCard
              key={index}
              title={card.title}
              bgColor={card.bgColor}
              content={card.content}
            />
          ))}
        </Grid>
      </Container>
    </Container>
  );
}