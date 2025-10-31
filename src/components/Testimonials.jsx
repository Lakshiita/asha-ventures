import {
  Box,
  Heading,
  Text,
  Image,
  Stack,
  IconButton,
  Flex,
} from "@chakra-ui/react";
import { FaChevronLeft, FaChevronRight, FaQuoteLeft } from "react-icons/fa";
import { useState, useEffect } from "react";
import testimonials from "../data/testimonials.json";

export default function Testimonials() {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState("next"); // 👈 track direction

  const prev = () => {
    setDirection("prev");
    setIndex((i) => (i === 0 ? testimonials.length - 1 : i - 1));
  };

  const next = () => {
    setDirection("next");
    setIndex((i) => (i === testimonials.length - 1 ? 0 : i + 1));
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setDirection("next");
      setIndex((i) => (i === testimonials.length - 1 ? 0 : i + 1));
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  const testimonial = testimonials[index];

  return (
    <Box
      w="100%"
      py={{ base: 10, md: 20 }}
      px={{ base: 4, md: 10 }}
      position="relative"
      overflow="hidden"
    >
      <Heading
        textAlign="center"
        color="blue.700"
        fontFamily="'Playfair Display', serif"
        mb={{ base: 2, md: 4 }}
      >
        What Our Partners Say
      </Heading>
      <Text
        textAlign="center"
        color="gray.500"
        mb={{ base: 6, md: 8 }}
        fontSize={{ base: "sm", md: "md" }}
      >
        Stories of collaboration and growth from our portfolio companies.
      </Text>

      {/* Testimonial Content */}
      <Box
        position="relative"
        maxW="6xl"
        mx="auto"
        minH={{ base: "400px", md: "320px" }}
      >
        <Flex
          key={index} // re-render on index change
          px={{ base: 2, md: 6 }}
          direction={{ base: "column-reverse", md: "row" }}
          align="center"
          textAlign={{ base: "center", md: "left" }}
          gap={{ base: 8, md: 12 }}
          sx={{
            animation:
              direction === "next"
                ? "slideInFromRight 0.6s ease-in-out"
                : "slideInFromLeft 0.6s ease-in-out",
          }}
        >
          {/* Text Section */}
          <Stack flex="1" spacing={{ base: 4, md: 6 }} pr={{ md: 10 }}>
            <Box textAlign={{ base: "center", md: "left" }}>
              <FaQuoteLeft size="32px" color="#ED8936" />
            </Box>
            <Text
              fontSize={{ base: "sm", sm: "md", md: "lg" }}
              color="gray.700"
              px={{ base: 2, md: 0 }}
            >
              {testimonial.text}
            </Text>
            <Box>
              <Heading size={{ base: "sm", md: "md" }} color="orange.600">
                {testimonial.company}
              </Heading>
              <Text fontSize={{ base: "xs", md: "sm" }} color="gray.500">
                {testimonial.year}
              </Text>
            </Box>
          </Stack>

          {/* Image Section */}
          <Box flex="1" textAlign="center">
            <Box
              w={{ base: "160px", sm: "200px", md: "240px" }}
              h={{ base: "160px", sm: "200px", md: "240px" }}
              mx="auto"
            >
              <Image
                src={testimonial.image}
                alt={testimonial.company}
                rounded="3xl"
                objectFit="cover"
                w="100%"
                h="100%"
              />
            </Box>
          </Box>
        </Flex>

        {/* Navigation Buttons */}
        <IconButton
          aria-label="Previous"
          icon={<FaChevronLeft />}
          onClick={prev}
          position="absolute"
          top="50%"
          left="-40px"
          transform="translateY(-50%)"
          bg="whiteAlpha.700"
          color="gray.600"
          borderRadius="full"
          _hover={{ bg: "orange.100", color: "orange.500" }}
        />
        <IconButton
          aria-label="Next"
          icon={<FaChevronRight />}
          onClick={next}
          position="absolute"
          top="50%"
          right="-40px"
          transform="translateY(-50%)"
          bg="whiteAlpha.700"
          color="gray.600"
          borderRadius="full"
          _hover={{ bg: "orange.100", color: "orange.500" }}
        />
      </Box>

      {/* Slide animations */}
      <style>
        {`
          @keyframes slideInFromRight {
            from { opacity: 0; transform: translateX(80px); }
            to { opacity: 1; transform: translateX(0); }
          }

          @keyframes slideInFromLeft {
            from { opacity: 0; transform: translateX(-80px); }
            to { opacity: 1; transform: translateX(0); }
          }
        `}
      </style>
    </Box>
  );
}
