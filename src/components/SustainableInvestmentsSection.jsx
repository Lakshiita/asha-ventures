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

    <Container maxW="100%" py={20} minH="100vh"  bg="brand.section.sustainable_Investment" >
      <Heading
        textAlign="center"
        color="blue.700"
        fontFamily="'Barlow', sans-serif"
        mb={4}
        mt={8}
      >
        Sustainable Investments
      </Heading>
      <Text textAlign="center" color="gray.500" mb={2} maxW="900px"
        textStyle="subHeading" mx="auto"   
        fontSize={{ base: "lg", md: "lg" }} >
        Investing to Advance the UN Sustainable Development Goals
      </Text>
      <Flex align="center" justify="center" minH="420px">
        <Card
          key={currentCard}
          bg="red.50"
          border="1px solid"
          borderColor="gray.200"
          shadow="lg"
          rounded="2xl"
          overflow="hidden"
          w={{ base: "90%", sm: "85%", md: "65%" }}
          h={{ base: "320px", md: "300px" }}
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
            h="100%"
          >
            <Box
              w={{ base: "100%", md: "auto" }}
              flexShrink={0}
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              <Image
                src={card.image}
                alt="card image"
                h={{ base: "310px", md: "280px" }}
                w="auto"
                objectFit="contain"
                borderRadius="md"
              />
            </Box>
            <Flex
              flex="1"
              align="center"
              justify="flex-start"
              textAlign={{ base: "center", md: "left" }}
              px={{ base: 1, md: 2 }}
            >
              <Text
                fontSize={{ base: "lg", md: "3xl" }}
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