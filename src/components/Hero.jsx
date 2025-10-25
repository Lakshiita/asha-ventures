import React from "react";
import { Box, Flex, Stack, Heading, Text, Button } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { motion, useSpring, useTransform } from "framer-motion";

const MotionBox = motion(Box);

const Hero = ({ scrollYProgress }) => {
  const heroOpacityRaw = useTransform(scrollYProgress, [0, 0.18, 0.35], [1, 1, 0.2]);
  const heroYRaw = useTransform(scrollYProgress, [0, 0.4], ["0%", "-6%"]);
  const heroOpacity = useSpring(heroOpacityRaw, { stiffness: 120, damping: 20 });
  const heroY = useSpring(heroYRaw, { stiffness: 120, damping: 26 });

  return (
    <MotionBox
      as="section"
      position="sticky"
      top="0"
      // bg="brand.section.hero"
      bgGradient="linear(135deg, #f9b262ff  10%, #ffffffff 40%, #f8d872ff  100%)"
      m="0"               // Remove any margin
      p="0"
      zIndex={10}
      height="100vh"
      style={{
        opacity: heroOpacity,
        y: heroY,
      }}
    >
      <Flex w="100%" h="100%" direction={{ base: "column", md: "row" }}>
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
            w="90%"
            h="65%"
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
              <source src="/assets/Home_Carousel/ashaventures2.mp4" type="video/mp4" />
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
              // fontFamily="Avenir, sans-serif"
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
            <Stack direction={{ base: "column", sm: "row" }} spacing={6}>
              <Button as={Link} to="/investments" variant="outline" size="lg" colorScheme="orange">
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