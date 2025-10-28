import { 
  Box, 
  Heading, 
  Text, 
  Image, 
  Stack, 
  IconButton, 
  Divider,
  Flex 
} from "@chakra-ui/react";
import { FaChevronLeft, FaChevronRight, FaQuoteLeft } from "react-icons/fa";
import { useState, useEffect } from "react";
import testimonials from "../data/testimonials.json";

export default function Testimonials() {
  const [index, setIndex] = useState(0);

  const prev = () => setIndex((i) => (i === 0 ? testimonials.length - 1 : i - 1));
  const next = () => setIndex((i) => (i === testimonials.length - 1 ? 0 : i + 1));

  // Auto-play every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((i) => (i === testimonials.length - 1 ? 0 : i + 1));
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const testimonial = testimonials[index];

  return (
    <Box w="100%" py={20} position="relative">
      <Heading
        textAlign="center"
        color="blue.700"
        fontFamily="'Playfair Display', serif" // Explicitly set font family
        textStyle="brandPrimary" // Applied the global text style
        mb={2}
      >
        What Our Partners Say
      </Heading>
      <Text textAlign="center" color="gray.500" mb={8}>
        Stories of collaboration and growth from our portfolio companies.
      </Text>
      {/* <Divider my={6} /> */}
      <Flex
        maxW="6xl"
        mx="auto"
        px={6}
        direction={{ base: "column", md: "row" }}
        align="center"
      >
        {/* Left: Text */}
        <Stack flex="1" spacing={6} pr={{ md: 10 }}>
          <FaQuoteLeft size="40px" color="#ED8936" />
          <Text
            fontSize="lg"
            color="gray.700"
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

        {/* Right: Image */}
        <Box flex="1" textAlign="center" mt={{ base: 8, md: 0 }}>
          <Box w="200px" h="200px" mx="auto">
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
          </Box>
        </Box>
      </Flex>

      {/* Controls */}
      <IconButton
        aria-label="Previous"
        icon={<FaChevronLeft />}
        onClick={prev}
        position="absolute"
        top="50%"
        left="20px"
        transform="translateX(-50%)"
        bg="transparent"
        color="gray.600"
        _hover={{ bg: "transparent", color: "orange.500" }}
      />
      <IconButton
        aria-label="Next"
        icon={<FaChevronRight />}
        onClick={next}
        position="absolute"
        top="50%"
        right="20px"
        transform="translateX(-50%)"
        bg="transparent"
        color="gray.600"
        _hover={{ bg: "transparent", color: "orange.500" }}
      />

      {/* Fade-in animation CSS */}
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
