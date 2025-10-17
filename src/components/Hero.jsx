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
      bg="brand.section.hero"
      zIndex={10}
      height="100vh"
      style={{
        opacity: heroOpacity,
        y: heroY,
      }}
    >
      <Flex w="100%" h="100%" direction={{ base: "column", md: "row" }}>
        <Box w={{ base: "100%", md: "50%" }} position="relative" overflow="hidden">
          <video
            autoPlay
            loop
            muted
            playsInline
            style={{ objectFit: "cover", width: "100%", height: "100%" }}
            className="mask"
          >
            <source src="/assets/Home_Carousel/ashaventures.mp4" type="video/mp4" />
          </video>
        </Box>

        <Flex
          w={{ base: "100%", md: "50%" }}
          align="center"
          justify="center"
          px={{ base: 4, md: 16 }}
        >
          <Stack spacing={6} maxW="lg" pointerEvents="auto">
            <Heading fontWeight="600" fontSize={{ base: "1.5rem", md: "2.4rem" }}>
              Partnering With Ambitious{" "}
              <Text as="span" color="orange.500">
                Entrepreneurs
              </Text>{" "}
              Who{" "}
              <Text as="span" color="orange.500">
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
        </Flex>
      </Flex>
    </MotionBox>
  );
};

export default Hero;