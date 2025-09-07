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
  Flex,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { useState, useEffect, useCallback, useRef } from "react";
import { FaChevronLeft, FaChevronRight, FaHeartbeat, FaDollarSign, FaLeaf, FaShoppingCart, FaLaptopCode } from "react-icons/fa";
import "../styles/VideoMask.css";
import slides from "../data/slides.json";
import Testimonials from "../components/Testimonials";



export default function Home() {

  const [current, setCurrent] = useState(0);
  const [isHeadingVisible, setIsHeadingVisible] = useState(false);
  const [visibleCards, setVisibleCards] = useState([]);
  const sectorsRef = useRef(null);

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

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsHeadingVisible(true);
          // Animate cards one by one with delay
          [0, 1, 2, 3, 4].forEach((index) => {
            setTimeout(() => {
              setVisibleCards(prev => [...prev, index]);
            }, index * 200);
          });
        }
      },
      { threshold: 0.3 }
    );

    if (sectorsRef.current) {
      observer.observe(sectorsRef.current);
    }

    return () => observer.disconnect();
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
          {/* Video Section - Left Half */}
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

          {/* Quote Section - Right Half */}
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


        </Box>
      </Box>

      {/* Sectors Section */}
      <Box w="100%" px={8} py={16} ref={sectorsRef}>
        <Heading 
          textAlign="left" 
          mb={12} 
          fontSize="5xl" 
          color="orange.800"
          transform={isHeadingVisible ? "translateX(0)" : "translateX(-100px)"}
          opacity={isHeadingVisible ? 1 : 0}
          transition="all 0.8s ease-out"
        >
          Sectors we cover
        </Heading>
        <Grid templateColumns="repeat(5, 1fr)" gap={4}>
          <Box 
            bg="orange.400" 
            p={4} 
            rounded="xl"
            transform={visibleCards.includes(0) ? "translateY(0)" : "translateY(50px)"}
            opacity={visibleCards.includes(0) ? 1 : 0}
            transition="all 0.6s ease-out"
          >
            <Flex align="center" mb={3}>
              <Box as={FaHeartbeat} color="white" size="20px" mr={2} />
              <Heading size="sm" color="white">
                Healthcare
              </Heading>
            </Flex>
            <Text color="white" fontSize="sm">
              Ensuring access to quality and low-cost healthcare for underserved populations through technology-led delivery models and innovative financing solutions
            </Text>
          </Box>
          
          <Box 
            bg="orange.500" 
            p={4} 
            rounded="xl"
            transform={visibleCards.includes(1) ? "translateY(0)" : "translateY(50px)"}
            opacity={visibleCards.includes(1) ? 1 : 0}
            transition="all 0.6s ease-out"
          >
            <Flex align="center" mb={3}>
              <Box as={FaDollarSign} color="white" size="20px" mr={2} />
              <Heading size="sm" color="white">
                Financial Services
              </Heading>
            </Flex>
            <Text color="white" fontSize="sm">
              Driving financial inclusion by expanding access to credit, insurance, and savings for underserved individuals and MSMEs via digital and alternative models
            </Text>
          </Box>
          
          <Box 
            bg="orange.600" 
            p={4} 
            rounded="xl"
            transform={visibleCards.includes(2) ? "translateY(0)" : "translateY(50px)"}
            opacity={visibleCards.includes(2) ? 1 : 0}
            transition="all 0.6s ease-out"
          >
            <Flex align="center" mb={3}>
              <Box as={FaLeaf} color="white" size="20px" mr={2} />
              <Heading size="sm" color="white">
                Sustainability
              </Heading>
            </Flex>
            <Text color="white" fontSize="sm">
              Building a resource-efficient future by enabling waste reduction, material recovery, and sustainable consumption through scalable circular innovations
            </Text>
          </Box>
          
          <Box 
            bg="orange.700" 
            p={4} 
            rounded="xl"
            transform={visibleCards.includes(3) ? "translateY(0)" : "translateY(50px)"}
            opacity={visibleCards.includes(3) ? 1 : 0}
            transition="all 0.6s ease-out"
          >
            <Flex align="center" mb={3}>
              <Box as={FaShoppingCart} color="white" size="20px" mr={2} />
              <Heading size="sm" color="white">
                Consumer
              </Heading>
            </Flex>
            <Text color="white" fontSize="sm">
              Enhancing everyday living for underserved populations by supporting access to affordable, high-quality, and trusted products and services across essential consumption categories.
            </Text>
          </Box>
          
          <Box 
            bg="orange.800" 
            p={4} 
            rounded="xl"
            transform={visibleCards.includes(4) ? "translateY(0)" : "translateY(50px)"}
            opacity={visibleCards.includes(4) ? 1 : 0}
            transition="all 0.6s ease-out"
          >
            <Flex align="center" mb={3}>
              <Box as={FaLaptopCode} color="white" size="20px" mr={2} />
              <Heading size="sm" color="white">
                MSME Technology
              </Heading>
            </Flex>
            <Text color="white" fontSize="sm">
              Digitizing and formalizing India's small businesses by supporting tech platforms that enhance productivity, compliance, and access to markets and finance
            </Text>
          </Box>
        </Grid>
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

      
      <Testimonials />
      {/* Signatory of Section */}
      <Box w="100%" px={8} py={16} bg="gray.50">
        {/* <Heading 
          textAlign="left" 
          mb={12} 
          fontSize="3xl" 
          color="orange.800"
        >
          Signatory of
        </Heading> */}
        <Grid templateColumns="repeat(3, 1fr)" gap={8} maxW="4xl" mx="auto">
          <Box textAlign="left">
            <Image
              src="/assets/signatory/PRI-Sig-Web-V1.png"
              alt="Signatory 1"
              h="120px"
              objectFit="contain"
              mx="auto"
            />
          </Box>
          <Box textAlign="center">
            <Image
              src="/assets/signatory/Blue_Mark_Practive_verification_seal_05_22_756364e25f.png"
              alt="Signatory 2"
              h="120px"
              objectFit="contain"
              mx="auto"
            />
          </Box>
          <Box textAlign="center">
            <Image
              src="/assets/signatory/OPIM_Logo_RGB_Signatory_1_1_a19b434476.png"
              alt="Signatory 3"
              h="120px"
              objectFit="contain"
              mx="auto"
            />
          </Box>
        </Grid>
      </Box>
    </Box>
  
    

  );
}