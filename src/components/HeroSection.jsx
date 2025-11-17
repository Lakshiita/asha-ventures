import {
  Box,
  Heading,
  Image,
  Flex
} from "@chakra-ui/react";
import { motion, AnimatePresence, useTransform, useSpring } from "framer-motion";
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

export default function HeroSection({ scrollYProgress }) {
  const [current, setCurrent] = useState(0);

  // --- SAME ANIMATION LOGIC AS HOME HERO ---
  const heroOpacityRaw = useTransform(scrollYProgress, [0, 0.25, 0.45], [1, 1, 0]);
  const heroYRaw = useTransform(scrollYProgress, [0, 0.4], ["0%", "0%"]);

  const heroOpacity = useSpring(heroOpacityRaw, { stiffness: 120, damping: 20 });
  const heroY = useSpring(heroYRaw, { stiffness: 120, damping: 26 });

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((c) => (c === images.length - 1 ? 0 : c + 1));
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <Flex w="100%" direction="column" align="center" py={8}>
      {/* Title */}
      <Box textAlign="center" mb={6}>
        <Heading
          fontSize={{ base: "4xl", md: "6xl" }}
          fontWeight="bold"
          textStyle="subHeading"
          color="blue.700"
        >
          Our Impact
        </Heading>
      </Box>

      {/* Slideshow */}
      <Box
        w={["90%", "80%", "70%"]}
        h={["240px", "340px", "430px"]}
        position="relative"
        overflow="hidden"
        borderRadius="16px"
        boxShadow="lg"
      >
        <AnimatePresence mode="popLayout">
          <MotionBox
            key={current}
            position="absolute"
            top={0}
            left={0}
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
              objectPosition="top"
            />

            <Box
              position="absolute"
              w="100%"
              h="100%"
              top={0}
              left={0}
              bgGradient="linear(to-t, rgba(0,0,0,0.5), rgba(0,0,0,0.15))"
            />

            <Box
              position="absolute"
              bottom="10"
              left="50%"
              transform="translateX(-50%)"
              textAlign="center"
              color="white"
              zIndex={2}
            >
              <Heading fontSize={["2xl", "3xl"]} fontWeight="600">
                Impact that transforms lives
              </Heading>
              <Heading fontSize={["md", "lg"]} fontWeight="medium" mt={2} opacity={0.9}>
                Stories of change from communities across India
              </Heading>
            </Box>
          </MotionBox>
        </AnimatePresence>
      </Box></Flex>
  );
}
