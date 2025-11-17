// src/pages/Impact.jsx
import { Box } from "@chakra-ui/react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useRef } from "react";

import HeroSection from "../components/HeroSection";
import ChallengeSection from "../components/ChallengeSection";
import SustainableInvestmentsSection from "../components/SustainableInvestmentsSection";
import FiveDimensionsSection from "../components/FiveDimensionsSection";
import TestimonialCarousel from "../components/TestimonialCarousel";

const MotionBox = motion(Box);

export default function Impact() {
  const containerRef = useRef(null);

  // Global scroll progress for entire page
  const { scrollYProgress } = useScroll();

  // ---- SECTION TRANSFORMS (same pattern for each section)
  const challengeY = useSpring(
    useTransform(scrollYProgress, [0.05, 0.25, 0.45], ["100%", "0%", "-10%"])
  );

  const sustainableY = useSpring(
    useTransform(scrollYProgress, [0.25, 0.45, 0.65], ["100%", "0%", "-10%"])
  );

  const dimensionsY = useSpring(
    useTransform(scrollYProgress, [0.45, 0.65, 0.85], ["100%", "0%", "-10%"])
  );

  const testimonialsY = useSpring(
    useTransform(scrollYProgress, [0.65, 0.85, 1], ["100%", "0%", "-10%"])
  );

  return (
    <Box
      ref={containerRef}
      position="relative"
      width="100%"
      sx={{ "&::-webkit-scrollbar": { display: "none" } }}
    >
      {/* HERO (static like your Home Hero) */}
      <MotionBox
        as="section"
        position="sticky"
        top="0"
        height="100vh"
        bg="brand.section.hero_impact"
        zIndex={10}
      >
        <HeroSection scrollYProgress={scrollYProgress}/>
      </MotionBox>


      {/* CHALLENGE SECTION */}
      <MotionBox
        as="section"
        position="sticky"
        top="0"
        height="100vh"
        zIndex={30}
        bg="white"
        style={{ y: challengeY }}
      >
        <ChallengeSection />
      </MotionBox>

      {/* SUSTAINABLE INVESTMENTS */}
      <MotionBox
        as="section"
        position="sticky"
        top="0"
        height="100vh"
        zIndex={30}
        bg="gray.50"
        style={{ y: sustainableY }}
      >
        <SustainableInvestmentsSection />
      </MotionBox>

      {/* FIVE DIMENSIONS */}
      <MotionBox
        as="section"
        position="sticky"
        top="0"
        height="100vh"
        zIndex={30}
        bg="gray.100"
        style={{ y: dimensionsY }}
      >
        <FiveDimensionsSection />
      </MotionBox>

      {/* TESTIMONIALS (can be sticky or normal — your choice) */}
      <MotionBox
        as="section"
        position="sticky"
        top="0"
        height="100vh"
        zIndex={30}
        bg="white"
        style={{ y: testimonialsY }}
      >
        <TestimonialCarousel />
      </MotionBox>
    </Box>
  );
}
