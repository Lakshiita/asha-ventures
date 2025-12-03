import {
  Box,
  Heading,
  Text,
  IconButton,
  Flex,
  Image,
  Stack,
} from "@chakra-ui/react";
import { FaChevronLeft, FaChevronRight, FaQuoteLeft } from "react-icons/fa";
import { useState, useEffect } from "react";
import customer_testimonials from "../data/customer_testimonials.json";

export default function TestimonialCarousel() {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState("next");

  const prev = () => {
    setDirection("prev");
    setIndex((i) =>
      i === 0 ? customer_testimonials.length - 1 : i - 1
    );
  };

  const next = () => {
    setDirection("next");
    setIndex((i) =>
      i === customer_testimonials.length - 1 ? 0 : i + 1
    );
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setDirection("next");
      setIndex((i) =>
        i === customer_testimonials.length - 1 ? 0 : i + 1
      );
    }, 7000);

    return () => clearInterval(interval);
  }, []);

  const testimonial = customer_testimonials[index];

  return (
    <Box
      w="100%"
      py={{ base: 10, md: 20 }}
      px={{ base: 4, md: 10 }}
      position="relative"
      overflow="hidden"
    >
      {/* Heading */}
      <Heading
        textAlign="center"
        color="brand.section.testimonials_heading"
        mb={{ base: 2, md: 2 }}
      >
        Experiences That Inspire Us
      </Heading>

      <Text
        textStyle="subHeading"
        textAlign="center"
        color="brand.section.testimonials_heading"
        mb={{ base: 8, md: 8 }}
        fontSize={{ base: "lg", md: "lg" }}
      >
        Real stories of transformation and impact from the communities we serve.
      </Text>

      {/* MAIN WRAPPER */}
      <Box
        mt={10}
        position="relative"
        maxW="6xl"
        mx="auto"
        minH={{ base: "420px", md: "350px" }}
      >
        <Flex
          key={index}
          px={{ base: 4, md: 6 }}
          mt={6}
          direction={{ base: "column-reverse", md: "row" }}
          align="center"
          textAlign={{ base: "center", md: "left" }}
          gap={{ base: 2, md: 4 }}
          pointerEvents="none"
          sx={{
            animation:
              direction === "next"
                ? "slideInRight 0.6s ease-in-out"
                : "slideInLeft 0.6s ease-in-out",
          }}
        >
          {/* TEXT SECTION */}
          <Stack flex="1" spacing={{ base: 4, md: 6 }} pr={{ md: 10 }}>
            <Box textAlign={{ base: "center", md: "left" }}>
              <FaQuoteLeft size="32px" color="#ED8936" />
            </Box>

            <Text
              fontSize={{ base: "sm", sm: "md", md: "xl" }}
              color="gray.700"
            >
              {testimonial.text}
            </Text>

            <Box>
              <Heading
                size={{ base: "xl", md: "xl" }}
                color="orange.500"
              >
                {testimonial.company}
              </Heading>
            </Box>
          </Stack>

          {/* IMAGE SECTION */}
          <Box flex="1" textAlign="center">
            <Box
              w={{ base: "160px", sm: "200px", md: "260px" }}
              h={{ base: "160px", sm: "200px", md: "260px" }}
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

        {/* BUTTONS */}
        <IconButton
          aria-label="Previous"
          icon={<FaChevronLeft />}
          onClick={prev}
          position="absolute"
          top={{ base: "28%", md: "50%" }}
          left={{ base: "20px", md: "-40px" }}
          transform="translateY(-50%)"
          bg="transparent"
          color="gray.600"
          borderRadius="full"
          boxSize={{ base: "34px", md: "44px" }}
          _hover={{ bg: "transparent", color: "orange.500" }}
          zIndex={40}
        />

        <IconButton
          aria-label="Next"
          icon={<FaChevronRight />}
          onClick={next}
          position="absolute"
          top={{ base: "28%", md: "50%" }}
          right={{ base: "20px", md: "-40px" }}
          transform="translateY(-50%)"
          bg="transparent"
          color="gray.600"
          borderRadius="full"
          boxSize={{ base: "34px", md: "44px" }}
          _hover={{ bg: "transparent", color: "orange.500" }}
          zIndex={40}
        />
      </Box>

      {/* ANIMATIONS */}
      <style>
        {`
          @keyframes slideInRight {
            from { opacity: 0; transform: translateX(80px); }
            to { opacity: 1; transform: translateX(0); }
          }
          @keyframes slideInLeft {
            from { opacity: 0; transform: translateX(-80px); }
            to { opacity: 1; transform: translateX(0); }
          }
        `}
      </style>
    </Box>
  );
}
