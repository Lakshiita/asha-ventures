import {
  Box,
  Button,
  Container,
  Grid,
  GridItem,
  Heading,
  Image,
  Text,
  Stack,
  AspectRatio,
  IconButton,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { useState, useEffect, useCallback } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import "../styles/VideoMask.css";
import slides from "../data/slides.json";



export default function Home() {

  const [current, setCurrent] = useState(0);

  const prevSlideCallback = useCallback(() =>
    setCurrent((c) => (c === 0 ? slides.length - 1 : c - 1)), []);
  const nextSlideCallback = useCallback(() =>
    setCurrent((c) => (c === slides.length - 1 ? 0 : c + 1)), []);

  // Auto-play carousel
  useEffect(() => {
    const interval = setInterval(nextSlideCallback, 4000);
    return () => clearInterval(interval);
  }, [nextSlideCallback]);

  useEffect(() => {
    document.documentElement.style.scrollBehavior = 'smooth';
    return () => {
      document.documentElement.style.scrollBehavior = '';
    };
  }, []);

  return (
    <Box 
      sx={{
        scrollSnapType: 'y mandatory',
        '& > *': {
          scrollSnapAlign: 'start'
        }
      }}
    >
      {/* Hero */}
      <Box w="100%" h="100vh">
        <Box 
          w="100%" 
          h="100%" 
          display="flex" 
          flexDirection={{ base: "column", md: "row" }}
        >
          {/* Quote Section - Left Half */}
          <Box 
            w={{ base: "100%", md: "50%" }} 
            h={{ base: "50%", md: "100%" }}
            display="flex"
            alignItems="center"
            justifyContent="center"
            px={{ base: 4, md: 16 }}
            py={{ base: 8, md: 0 }}
          >
            <Stack spacing={6} maxW="lg">
              <Heading
                fontWeight="600"
                fontFamily="Avenir, sans-serif"
                fontSize={{ base: "1.5rem", md: "2.4rem" }}
                letterSpacing={0.5}
              >
                Partnering With Ambitious{" "}
                <Text as="span" color="orange.500" fontWeight="inherit">
                  Entrepreneurs
                </Text>{" "}
                Who Leverage Technology To{" "}
                <Text as="span" color="orange.500" fontWeight="inherit">
                  Build Businesses
                </Text>{" "}
                For India's Emerging Middle Class
              </Heading>


              <Text fontSize="lg" color="textColor2">
                We invest in bold ideas that shape India’s future economy.
              </Text>
              <Stack direction={{ base: "column", sm: "row" }} spacing={3}>
                <Button as={Link} to="/investments" size="lg">
                  View Portfolio
                </Button>
                <Button as={Link} to="/impact" variant="outline" size="lg">
                  Our Impact
                </Button>
              </Stack>
            </Stack>
          </Box>

          {/* Video Section - Right Half */}
          <Box 
            w={{ base: "100%", md: "50%" }} 
            h={{ base: "50%", md: "100%" }}
            position="relative"
            overflow="hidden"
            borderRadius={{ base: "20px", md: "0" }}
            mx={{ base: 4, md: 0 }}
          >
            <Box
              as="video"
              autoPlay
              loop
              muted
              playsInline
              objectFit="cover"
              w="100%"
              h="100%"
              className="mask"
            >
              <source src="/assets/Home_Carousel/ashaventures.mp4" type="video/mp4" />
            </Box>
          </Box>
        </Box>
      </Box>

      {/* Fullscreen Carousel */}
      <Box 
        position="relative" 
        h="calc(100vh - 4rem)" 
        overflow="hidden"
        mt={16}
      >
        <Image
          src={slides[current].image}
          alt={`slide-${current}`}
          objectFit="cover"
          w="100%"
          h="100%"
          key={current}
          opacity={0}
          animation="slideIn 0.6s ease-out forwards"
          sx={{
            '@keyframes slideIn': {
              '0%': {
                opacity: 0,
                transform: 'translateX(50px)'
              },
              '100%': {
                opacity: 1,
                transform: 'translateX(0)'
              }
            }
          }}
        />

        {/* Dark overlay for text */}
        <Box
          position="absolute"
          top="0"
          left="0"
          w="100%"
          h="100%"
          bg="blackAlpha.600"
          display="flex"
          alignItems="center"
          justifyContent="center"
          textAlign="center"
          px={6}
        >
          <Heading 
            color="white" 
            size="2xl" 
            maxW="3xl"
            key={`text-${current}`}
            opacity={0}
            animation="slideIn 0.5s ease-out 0.4s forwards"
          >
            {slides[current].text}
          </Heading>
        </Box>

        {/* Controls */}
        <IconButton
          aria-label="Previous Slide"
          icon={<FaChevronLeft />}
          position="absolute"
          top="50%"
          left="20px"
          transform="translateY(-50%)"
          onClick={prevSlideCallback}
          bg="transparent"
          _hover={{ bg: "whiteAlpha.300" }}
          rounded="full"
          fontSize="2xl"
        />
        <IconButton
          aria-label="Next Slide"
          icon={<FaChevronRight />}
          position="absolute"
          top="50%"
          right="20px"
          transform="translateY(-50%)"
          onClick={nextSlideCallback}
          bg="transparent"
          _hover={{ bg: "whiteAlpha.300" }}
          rounded="full"
          fontSize="2xl"
        />
      </Box>
    </Box>
  );
}