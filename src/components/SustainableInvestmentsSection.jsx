import { Container, Heading, Text, Flex, Card, Box, Image } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import impact_cards from "../data/impact_card.json";

export default function SustainableInvestmentsSection() {
  const [currentCard, setCurrentCard] = useState(0);
  const totalCards = impact_cards?.length || 0;

  const nextCard = () => {
    setCurrentCard((prev) => (prev + 1) % totalCards);
  };

  useEffect(() => {
    if (totalCards > 0) {
      const interval = setInterval(nextCard, 7000);
      return () => clearInterval(interval);
    }
  }, [totalCards]);

  if (!totalCards) {
    return <Text textAlign="center">Loading impact data...</Text>;
  }

  const card = impact_cards[currentCard];

  return (
    <Container
      maxW="100%"
      py={{ base: 10, md: 20 }}
      minH="100vh"
      bg="brand.section.sustainable_Investment"
    >
      {/* Heading */}
      <Heading
        textStyle="subHeading"
        textAlign="center"
        color="brand.section.sectors_heading"
        mb={4}
        mt={8}
        fontSize={{ base: "2xl", md: "4xl" }}
      >
        Sustainable Investments
      </Heading>

      {/* Subheading */}
      <Text
        textStyle="subHeading"
        textAlign="center"
        color="brand.section.sectors_heading"
        mb={4}
        maxW="900px"
        mx="auto"
        fontSize={{ base: "md", md: "lg" }}
      >
        Investing to Advance the UN Sustainable Development Goals
      </Text>

      {/* Card Section */}
      <Flex align="center" justify="center">
        <Card
          key={currentCard}
          bg="white"
          border="1px solid"
          borderColor="gray.200"
          rounded="2xl"
          shadow="lg"
          overflow="hidden"
          w={{ base: "92%", sm: "85%", md: "65%" }}
          mx="auto"
          my={6}
          position="relative"
          transition="all 0.4s ease"
          _hover={{ shadow: "2xl", transform: "translateY(-4px)" }}
          sx={{ animation: "fadeSlide 0.6s ease-in-out" }}
        >
          <Flex
            direction={{ base: "column", md: "row" }}
            align="center"
            justify="flex-start"
            gap={{ base: 4, md: 6 }}
            p={{ base: 4, md: 6 }}
          >
            {/* Image */}
            <Box
              w={{ base: "100%", md: "auto" }}
              display="flex"
              justifyContent="center"
            >
              <Image
                src={card.image}
                alt="card image"
                h={{ base: "250px", sm: "240px", md: "280px" }}
                w="auto"
                objectFit="contain"
                borderRadius="md"
              />
            </Box>

            {/* Text */}
            <Flex
              flex="1"
              justify="center"
              align="center"
              textAlign={{ base: "center", md: "left" }}
              px={{ base: 1, md: 2 }}
            >
              <Text
                fontSize={{ base: "2xl", sm: "lg", md: "3xl" }}
                fontFamily="Barlow Semi Condensed, sans-serif"
                color="gray.800"
                variant="section"
                lineHeight="tall"
              >
                {card.content}
              </Text>
            </Flex>
          </Flex>
        </Card>
      </Flex>
    </Container>
  );
}
