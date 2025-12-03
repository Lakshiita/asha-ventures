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
        color="brand.section.sectors_heading"
        textStyle="subHeading"
        mb={{ base: 2, md: 2 }}
        mt={10}
      >
        What Our Partners Say
      </Heading>
      <Text
        textAlign="center"
        color="brand.section.sectors_heading"
        mb={{ base: 8, md: 8 }} // increase this
        fontSize={{ base: "lg", md: "lg" }}
        textStyle="subHeading"
      >
        Stories of collaboration and growth from our portfolio companies.
      </Text>

      {/* Testimonial Content */}
      <Box
        mt={10}
        position="relative"
        maxW="6xl"
        mx="auto"
        minH={{ base: "400px", md: "320px" }}
      >
        <Flex
          key={index}
          px={{ base: 4, md: 6 }}
          mt={10}
          direction={{ base: "column-reverse", md: "row" }}
          align="center"
          textAlign={{ base: "center", md: "left" }}
          gap={{ base: 8, md: 12 }}
          pointerEvents="none"   // ⬅ IMPORTANT
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
              fontSize={{ base: "sm", sm: "md", md: "2xl" }}
              color="gray.700"
              px={{ base: 2, md: 0 }}
            >
              {testimonial.text}
            </Text>
            <Box>
              <Heading size={{ base: "sm", md: "lg" }} color="orange.500">
                {testimonial.company}
              </Heading>
              <Text fontSize={{ base: "xs", md: "md" }} color="gray.500" textStyle="subHeading">
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
          top={{ base: "25%", md: "50%" }}       // 👈 FIXED: lower on mobile
          left={{ base: "20px", md: "-40px" }}
          transform="translateY(-50%)"
          bg="transparent"
          color="gray.600"
          borderRadius="full"
          boxSize={{ base: "36px", md: "44px" }}
          _hover={{ bg: "transparent", color: "orange.500" }}
          zIndex={50}
        />

        <IconButton
          aria-label="Next"
          icon={<FaChevronRight />}
          onClick={next}
          position="absolute"
          top={{ base: "25%", md: "50%" }}        // 👈 FIXED: lower on mobile
          right={{ base: "20px", md: "-40px" }}
          transform="translateY(-50%)"
          bg="transparent"
          color="gray.600"
          borderRadius="full"
          boxSize={{ base: "36px", md: "44px" }}
          _hover={{ bg: "transparent", color: "orange.500" }}
          zIndex={50}
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
