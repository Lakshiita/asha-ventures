import React from "react";
import { Box, Flex, Stack, Heading, Text, Button } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { motion, useSpring, useTransform } from "framer-motion";

const MotionBox = motion(Box);

const Hero = ({ scrollYProgress }) => {
  const heroOpacityRaw = useTransform(scrollYProgress, [0, 0.25, 0.45], [1, 1, 0]);
  const heroYRaw = useTransform(scrollYProgress, [0, 0.4], ["0%", "0%"]);
  const heroOpacity = useSpring(heroOpacityRaw, { stiffness: 120, damping: 20 });
  const heroY = useSpring(heroYRaw, { stiffness: 120, damping: 26 });

  return (
    <MotionBox
      as="section"
      position="sticky"
      top="0"
      bg="brand.section.hero_impact"
      m="0"               // Remove any margin
      p="0"
      zIndex={10}
      height="100vh"
      style={{
        opacity: heroOpacity,
        y: heroY,
      }}
    >
      <Flex
        w="100%"
        h="100%"
        direction={{ base: "column", md: "row" }}
        align="center"
        justify="center"
        gap={{ base: 8, md: 0 }}
      >

        <Box
          w={{ base: "100%", md: "50%" }}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <MotionBox
            overflow="hidden"
            borderRadius="2xl"
            bg="rgba(255,255,255,0.08)"
            backdropFilter="blur(10px)"
            boxShadow="0 8px 40px rgba(0,0,0,0.3)"
            w={{ base: "90%", md: "85%" }}
            h={{ base: "55vh", md: "65vh" }}
            whileHover={{ scale: 1.03 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >

            <video
              autoPlay
              loop
              muted
              playsInline
              style={{ objectFit: "cover", width: "100%", height: "100%" }}
            >
              <source src="/assets/Home_Carousel/ashaventures.mp4" type="video/mp4" />
            </video>
          </MotionBox>
        </Box>


        <Flex
          w={{ base: "100%", md: "50%" }}
          align="center"
          justify="center"
          px={{ base: 4, md: 16 }}
        >
          <Stack spacing={8} maxW="lg" pointerEvents="auto">
            <Heading
              fontWeight="600"
              fontFamily="Barlow Semi Condensed, sans-serif"
              // fontFamily="Avenir, sans-serif"
              fontSize={{ base: "3rem", md: "3.1rem" }}
              letterSpacing="0.8px"
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
              We invest in bold ideas that shape India's future economy.
            </Text>
            <Stack direction={{ base: "column", sm: "row" }} spacing={6}>
              <Button as={Link} to="/investments" variant="outline" size="lg" colorScheme="grey">
                View Portfolio
              </Button>
            </Stack>
          </Stack>
        </Flex>
      </Flex>
    </MotionBox>
  );
};

export default Hero;