// src/pages/HomeCarousel.jsx
import {
  Box,
  Heading,
  Image,
  IconButton,
  Flex,
  Text
} from "@chakra-ui/react";
import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import slides from "../data/slides.json";

const MotionBox = motion(Box);

export default function HomeCarousel() {
  const [current, setCurrent] = useState(0);

  const prevSlideCallback = useCallback(() => {
    setCurrent((c) => (c === 0 ? slides.length - 1 : c - 1));
  }, []);

  const nextSlideCallback = useCallback(() => {
    setCurrent((c) => (c === slides.length - 1 ? 0 : c + 1));
  }, []);

  // Auto slide every 4 seconds
  useEffect(() => {
    const interval = setInterval(nextSlideCallback, 4000);
    return () => clearInterval(interval);
  }, [nextSlideCallback]);

  return (
    <Flex w="100%" direction="column" align="center" py={8}>
      {/* Heading Section */}
      <Box textAlign="center" mb={6}>
        <Heading fontSize="4xl" color="blue.700" fontWeight="bold" fontFamily={"times new roman"}>
          Our Reach and Impact
        </Heading>
        <Text textAlign="center" color="gray.500" mb={8}>
          Real stories of measurable progress.
        </Text>
      </Box>

      {/* Carousel Container */}
      <Box
        w={"80%"} // Reduced width
        h={"500px"} // Reduced height
        position="relative"
        overflow="hidden"
        borderRadius="16px" // Adjusted border radius for smaller size
        boxShadow="lg" // Slightly reduced shadow intensity
      >
        <AnimatePresence mode="popLayout">
          <MotionBox
            key={current}
            position="absolute"
            top="0"
            left="0"
            w="100%"
            h="100%"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
          >
            <Image
              src={slides[current].image}
              alt={`slide-${current}`}
              objectFit="cover"
              w="100%"
              h="100%"
            />

            {/* Gradient overlay */}
            <Box
              position="absolute"
              top="0"
              left="0"
              w="100%"
              h="100%"
              bgGradient="linear(to-t, blackAlpha.700 20%, transparent 80%)"
            />

            {/* Text Section - bottom left */}
            <Box
              position="absolute"
              bottom="10"
              left="10"
              color="white"
              textAlign="left"
              maxW={["90%", "60%", "50%"]}
            >
              <Heading fontSize={["2xl", "3xl", "4xl"]} fontWeight="bold" mb={2}>
                {slides[current].heading}
              </Heading>
              <Heading fontSize={["md", "lg", "xl"]} fontWeight="medium">
                {slides[current].text}
              </Heading>
            </Box>
          </MotionBox>
        </AnimatePresence>

        {/* Navigation buttons */}
        <IconButton
          aria-label="Previous Slide"
          icon={<FaChevronLeft />}
          position="absolute"
          top="50%"
          left="6"
          transform="translateY(-50%)"
          onClick={prevSlideCallback}
          bg="whiteAlpha.300"
          _hover={{ bg: "whiteAlpha.500" }}
          rounded="full"
          fontSize="2xl"
          zIndex={10}
        />
        <IconButton
          aria-label="Next Slide"
          icon={<FaChevronRight />}
          position="absolute"
          top="50%"
          right="6"
          transform="translateY(-50%)"
          onClick={nextSlideCallback}
          bg="whiteAlpha.300"
          _hover={{ bg: "whiteAlpha.500" }}
          rounded="full"
          fontSize="2xl"
          zIndex={10}
        />
      </Box>
    </Flex>
  );
}