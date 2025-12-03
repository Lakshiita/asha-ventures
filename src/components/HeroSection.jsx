import {
  Box,
  Heading,
  Image,
  Flex,
  Stack,
  Text,
  AspectRatio,
} from "@chakra-ui/react";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

const MotionBox = motion(Box);

const images = [
  "/assets/impact_hero/Affordable_Housing.webp",
  "/assets/impact_hero/Avanti_Customers.png",
  "/assets/impact_hero/Career.jpg",
  "/assets/impact_hero/convenings.jpg",
  "/assets/impact_hero/Education.jpg",
  "/assets/impact_hero/home.jpg",
  "/assets/impact_hero/India_Education.jpg",
  "/assets/impact_hero/nurse.jpg",
  "/assets/impact_hero/pexels_aadil.jpg",
  "/assets/impact_hero/skilling_scaled.jpg",
  "/assets/impact_hero/Varthana.webp",
  "/assets/impact_hero/women.jpg",
];

export default function ImpactHero({ scrollYProgress }) {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(
      () => setCurrent((c) => (c === images.length - 1 ? 0 : c + 1)),
      4000
    );
    return () => clearInterval(interval);
  }, []);

  return (
    <MotionBox
      as="section"
      position="sticky"
      top="0"
      bg="brand.section.hero_impact"
      zIndex={10}
      height={{ base: "100dvh", md: "100vh" }}
    >
      <Flex
        w="100%"
        h="100%"
        direction={{ base: "column", md: "row" }}
        align="center"
        justify="center"
        gap={{ base: 8, md: 0 }}
      >
        {/* LEFT SIDE — IMAGE SLIDESHOW */}
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
            h={{ base: "45vh", md: "65vh" }}
            whileHover={{ scale: 1.03 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            position="relative"
          >
            <AnimatePresence mode="popLayout">
              <MotionBox
                key={current}
                w="100%"
                h="100%"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1.2 }}
              >
                <Image
                  src={images[current]}
                  alt="impact"
                  w="100%"
                  h="100%"
                  objectFit="cover"
                />
              </MotionBox>
            </AnimatePresence>
          </MotionBox>
        </Box>

        {/* RIGHT SIDE — BIG HERO TEXT */}
        <Flex
          w={{ base: "100%", md: "50%" }}
          align="center"
          justify="center"
          px={{ base: 4, md: 16 }}
        >
          <Stack spacing={8} maxW="lg">
            <Heading
              fontWeight="600"
              fontFamily="Barlow Semi Condensed, sans-serif"
              fontSize={{ base: "2rem", sm: "2.4rem", md: "3.1rem" }}
              letterSpacing="0.8px"
            >
              Impact That{" "}
              <Text as="span" color="orange.500" fontWeight="inherit">
                Transforms Lives
              </Text>{" "}
              And Strengthens{" "}
              <Text as="span" color="orange.500" fontWeight="inherit">
                Communities
              </Text>{" "}
              Across India
            </Heading>

            <Text fontSize="lg" color="textColor2">
              Stories of change from education, healthcare, livelihoods,
              housing, and more - driven by mission-led organizations.
            </Text>
          </Stack>
        </Flex>
      </Flex>
    </MotionBox>
  );
}
