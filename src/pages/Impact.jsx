import {
  Box, Container, Heading, Text, Card, IconButton, Flex, Image, Button, Grid, Stack, Divider
} from "@chakra-ui/react";
import { FaChevronLeft, FaChevronRight, FaQuoteLeft } from "react-icons/fa";
import { useState, useEffect } from "react";
import impact_cards from "../data/impact_card.json";
import customer_testimonials from "../data/customer_testimonials.json";
import squareCards from "../data/squareCards.json";
import impact_dimensions from "../data/impact_dimensions.json";

function TestimonialCarousel() {
  const [index, setIndex] = useState(0);

  const prev = () => setIndex((i) => (i === 0 ? customer_testimonials.length - 1 : i - 1));
  const next = () => setIndex((i) => (i === customer_testimonials.length - 1 ? 0 : i + 1));

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((i) => (i === customer_testimonials.length - 1 ? 0 : i + 1));
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const testimonial = customer_testimonials[index];

  return (
    <Box w="100%" py={20}>
      <Heading
        textAlign="center"
        color="blue.700"
        fontFamily="'Playfair Display', serif"
        mb={2}
      >
        Experiences That Inspire Us
      </Heading>
      <Text textAlign="center" color="gray.500" mb={8}>
        Real stories of transformation and impact from the communities we serve.
      </Text>
      <Divider my={6} />
      <Box position="relative" minH="400px">
        <Flex
          maxW="6xl"
          mx="auto"
          px={6}
          direction={{ base: "column", md: "row" }}
          align="center"
          minH="400px"
        >
          <Stack flex="1" spacing={6} pr={{ md: 4 }}>
            <FaQuoteLeft size="40px" color="#ED8936" />
            <Text
              fontSize="lg"
              color="gray.700"
              textAlign="justify"
              key={index}
              sx={{ animation: "fadeIn 0.6s ease-in-out" }}
            >
              {testimonial.text}
            </Text>
            <Box>
              <Heading size="md" color="orange.600">
                {testimonial.company}
              </Heading>
              <Text fontSize="sm" color="gray.500">
                {testimonial.year}
              </Text>
            </Box>
          </Stack>

          <Box flex="1" textAlign="center" mt={{ base: 8, md: 0 }}>
            <Box w="400px" h="350px" mx="auto">
              {testimonial.image ? (
                <Image
                  src={testimonial.image}
                  alt={testimonial.company}
                  rounded="xl"
                  objectFit="cover"
                  w="100%"
                  h="100%"
                  key={index}
                  sx={{ animation: "fadeIn 0.6s ease-in-out" }}
                />
              ) : (
                <Box
                  w="100%"
                  h="100%"
                  bg="gray.100"
                  rounded="xl"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  color="gray.500"
                  fontSize="sm"
                >
                  Image Coming Soon
                </Box>
              )}
            </Box>
          </Box>
        </Flex>

        <IconButton
          aria-label="Previous"
          icon={<FaChevronLeft />}
          onClick={prev}
          position="absolute"
          top="200px"
          left="20px"
          bg="transparent"
          color="gray.600"
          _hover={{ bg: "transparent", color: "orange.500" }}
        />
        <IconButton
          aria-label="Next"
          icon={<FaChevronRight />}
          onClick={next}
          position="absolute"
          top="200px"
          right="20px"
          bg="transparent"
          color="gray.600"
          _hover={{ bg: "transparent", color: "orange.500" }}
        />
      </Box>

      <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0; transform: translateX(20px); }
            to { opacity: 1; transform: translateX(0); }
          }
        `}
      </style>
    </Box>
  );
}

// ✅ SquareCard - make sure it stays centered and scales well
function SquareCard({ title, bgColor = "white", content = "Content coming soon..." }) {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <Box
      position="relative"
      aspectRatio={1}
      w={{ base: "85%", sm: "80%", md: "90%" }}
      maxW="250px"
      onMouseEnter={() => setIsFlipped(true)}
      onMouseLeave={() => setIsFlipped(false)}
      style={{ perspective: "1000px" }}
      mx="auto"
    >
      <Box
        position="absolute"
        w="100%"
        h="100%"
        transition="transform 0.6s"
        style={{
          transformStyle: "preserve-3d",
          transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)"
        }}
      >
        <Card
          bg={bgColor}
          border="1px solid"
          borderColor="blackAlpha.100"
          p={6}
          borderRadius="md"
          display="flex"
          alignItems="center"
          justifyContent="center"
          h="100%"
          position="absolute"
          w="100%"
          style={{ backfaceVisibility: "hidden" }}
        >
          <Heading size="md" textAlign="center" color={bgColor === "white" ? "black" : "white"}>
            {title}
          </Heading>
        </Card>

        <Card
          bg="white"
          border="1px solid"
          borderColor="blackAlpha.100"
          p={6}
          borderRadius="md"
          display="flex"
          alignItems="center"
          justifyContent="center"
          h="100%"
          position="absolute"
          w="100%"
          style={{
            backfaceVisibility: "hidden",
            transform: "rotateY(180deg)"
          }}
        >
          <Text textAlign="center" color="black" fontSize="md">
            {content}
          </Text>
        </Card>
      </Box>
    </Box>
  );
}

// Replace existing FlipCard with this version
function FlipCard({ title, description, bgFront, bgBack }) {
  const [flipped, setFlipped] = useState(false);

  return (
    <Box
      onMouseEnter={() => setFlipped(true)}
      onMouseLeave={() => setFlipped(false)}
      w="100%"
      maxW="220px"                 // ensure predictable width inside the grid
      h="230px"
      style={{ perspective: "1000px" }}
      cursor="pointer"
    >
      {/* wrapper that performs the flip */}
      <Box
        position="relative"
        w="100%"
        h="100%"
        transition="transform 0.6s"
        style={{
          transformStyle: "preserve-3d",
          WebkitTransformStyle: "preserve-3d",
          transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)",
          WebkitTransform: flipped ? "rotateY(180deg)" : "rotateY(0deg)"
        }}
      >
        {/* Front Face */}
        <Box
          position="absolute"
          top="0"
          left="0"
          right="0"
          bottom="0"
          bg={bgFront}
          rounded="xl"
          boxShadow="md"
          display="flex"
          alignItems="center"
          justifyContent="center"
          zIndex={2}
          sx={{
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
            transform: "rotateY(0deg)",
            WebkitTransform: "rotateY(0deg)"
          }}
        >
          <Heading
            size="md"
            textAlign="center"
            fontFamily="'Playfair Display', serif"
            color="blue.800"
            px={3}
          >
            {title}
          </Heading>
        </Box>

        {/* Back Face */}
        <Box
          position="absolute"
          top="0"
          left="0"
          right="0"
          bottom="0"
          bg={bgBack}
          rounded="xl"
          boxShadow="lg"
          display="flex"
          alignItems="center"
          justifyContent="center"
          p={4}
          sx={{
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
            WebkitTransform: "rotateY(180deg)"
          }}
        >
          <Text fontSize="sm" textAlign="center" fontWeight="medium" color="gray.800" px={2}>
            {description}
          </Text>
        </Box>
      </Box>
    </Box>
  );
}


export default function Impact() {
  const [currentCard, setCurrentCard] = useState(0);

  const totalCards = impact_cards?.length || 0;

  const nextCard = () => {
    setCurrentCard((prev) => (prev + 1) % totalCards);
  };

  const prevCard = () => {
    setCurrentCard((prev) => (prev - 1 + totalCards) % totalCards);
  };

  // ✅ Auto slide every 7 seconds
  useEffect(() => {
    if (totalCards > 0) {
      const interval = setInterval(nextCard, 7000);
      return () => clearInterval(interval);
    }
  }, [totalCards]);

  // ✅ Prevent rendering until data is available
  if (!totalCards) {
    return <Text textAlign="center">Loading impact data...</Text>;
  }

  const card = impact_cards[currentCard];

  return (
    <Box>
      <Box height="20px" />
      <Heading
        fontSize={{ base: "4xl", md: "6xl" }}
        color="blue.700"
        textAlign="center"
        fontFamily="'Playfair Display', serif"
        letterSpacing="wide"
        mt={{ base: 6, md: 10 }}
        mb={4}
      >
        Our Impact
      </Heading>

      <Text textAlign="center" color="gray.500" mb={12}>
        We pair rigorous measurement with on-the-ground empathy to deliver meaningful, verifiable outcomes
      </Text>

      {/* // ✅ Grid for Square Cards — responsive and centered */}
      <Heading
        textAlign="center"
        color="blue.700"
        fontFamily="'Playfair Display', serif"
        mb={2}
      >
        2x Challenge <br /> Financing for Women
      </Heading>

      <Text textAlign="center" color="gray.500" mb={12}>
        Empowering women through strategic financing across key areas
      </Text>

      <Container maxW="1200px" px={{ base: 4, md: 8 }}>
        <Grid
          templateColumns={{
            base: "repeat(1, 1fr)",
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

      <Divider my={20} />
      <Container maxW="100%" mx="auto" px={2}>
        <Heading
          textAlign="center"
          color="blue.700"
          // fontFamily="'Playfair Display', serif"
          // fontFamily="'Barlow Semi Condensed', sans-serif"
          fontFamily="'Barlow', sans-serif"
          // fontFamily="'Poppins', sans-serif"
          // fontFamily="'Montserrat', sans-serif"
          // fontFamily="'Raleway', sans-serif"

          mb={2}>
          Driving Global Impact Through Sustainable Investments
        </Heading>
        <Flex align="center" justify="center" minH="420px">

          <Card
            key={currentCard} // ✅ re-trigger animation when card changes
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
                  fontSize={{ base: "md", md: "3xl" }}
                  color="gray.800"
                  fontFamily="'Poppins', 'Inter', sans-serif"
                  fontWeight="light"
                  lineHeight="tall"
                >
                  {card.content}
                </Text>
              </Flex>
            </Flex>
          </Card>

        </Flex>
      </Container>

      {/* ✅ Five Dimensions of Impact Section */}
      <Divider my={20} />

      <Heading
        textAlign="center"
        color="blue.700"
        fontFamily="'Playfair Display', serif"
        mb={2}
      >
        The Five Dimensions of Impact
      </Heading>

      <Text textAlign="center" color="gray.500" mb={12}>
        We explore each outcome through five guiding questions that help us understand the depth, reach, and reliability of our impact.
      </Text>

      {/* When rendering cards inside the Grid — ensure each grid cell centers the card */}
      <Container maxW="1200px" px={{ base: 4, md: 8 }}>
        <Grid
          templateColumns={{
            base: "repeat(1, 1fr)",
            sm: "repeat(2, 1fr)",
            md: "repeat(3, 1fr)",
            lg: "repeat(5, 1fr)",
          }}
          gap={{ base: 4, md: 6 }}
          justifyItems="center"
          alignItems="center"
        >
          {impact_dimensions.map((item, index) => {
            const colorPairs = [
              ["#e1f5ffff", "#abdaf5ff"], // blue
              ["#f5edffff", "#D6BCFA"], // purple
              ["#fffee0ff", "#f1f387ff"], // indigo
              ["#f3fff4ff", "#86de86ff"],  // lavender
              ["#e8faf6ff", "#aaf7eaff"], // cyan/teal
            ];
            const [bgFront, bgBack] = colorPairs[index % colorPairs.length];

            // wrap FlipCard in a container so Grid spacing and alignment are stable
            return (
              <Box key={index} w="100%" display="flex" alignItems="center" justifyContent="center">
                <FlipCard
                  title={item.title}
                  description={item.description}
                  bgFront={bgFront}
                  bgBack={bgBack}
                />
              </Box>
            );
          })}
        </Grid>
      </Container>



    
      <TestimonialCarousel />
      <style>
        {`
          @keyframes fadeSlide {
            from {
              opacity: 0;
              transform: translateX(60px); /* slide in from right */
            }
            to {
              opacity: 1;
              transform: translateX(0);
            }
          }
        `}
      </style>
    </Box>
  );
}