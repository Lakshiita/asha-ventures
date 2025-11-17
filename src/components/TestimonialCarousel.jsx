import { Box, Container, Heading, Text, IconButton, Flex, Image, Stack } from "@chakra-ui/react";
import { FaChevronLeft, FaChevronRight, FaQuoteLeft } from "react-icons/fa";
import { useState, useEffect } from "react";
import customer_testimonials from "../data/customer_testimonials.json";

export default function TestimonialCarousel() {
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
    <Container maxW="100%" py={20} bg="brand.section.testimonials_impact" minH="100vh">
      <Heading textAlign="center" color="blue.700" mb={2}>
        Experiences That Inspire Us
      </Heading>
      <Text textAlign="center" color="gray.500" mb={10} textStyle="subHeading" fontSize={{ base: "lg", md: "lg" }}>
        Real stories of transformation and impact from the communities we serve.
      </Text>
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
    </Container>
  );
}