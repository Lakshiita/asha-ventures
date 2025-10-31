// src/pages/Home.jsx
import {
  Box,
} from "@chakra-ui/react";
import { useState, useEffect, useRef } from "react";
import "../styles/VideoMask.css";
import Home_Carousel from "../components/HomeCarousel";
import Testimonials from "../components/Testimonials";
import Sectors from "../components/Sectors";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import Hero from "../components/Hero";

const MotionBox = motion(Box);

export default function Home() {
  // Outer scroll container reference (the thing we read progress from)
  const containerRef = useRef(null);

  // global progress 0..1 for the entire scrollable container
  const { scrollYProgress } = useScroll();

  // ----------------
  // SECTORS (slides up over hero)
  // ----------------
  // We map container progress to a translate value that takes sectors from fully below
  // (100%) to 0 (aligned) and then slightly negative to tuck over the hero while hero fades.
  // tweak the input range to move overlap timing.
  const sectorsYRaw = useTransform(scrollYProgress, [0.05, 0.25, 0.45], ["100%", "0%", "-12%"]);
  const sectorsOpacityRaw = useTransform(scrollYProgress, [0.12, 0.28], [0, 1]);

  // refs used for other UI (optional)
  const refSectors = useRef(null);

  // subtle smooth scrolling for direct jumps (optional)
  useEffect(() => {
    document.documentElement.style.scrollBehavior = "smooth";
    return () => {
      document.documentElement.style.scrollBehavior = "";
    };
  }, []);

  // small intersection-driven card reveal for sectors (kept from your original)
  const [isHeadingVisible, setIsHeadingVisible] = useState(false);
  const [visibleCards, setVisibleCards] = useState([]);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsHeadingVisible(true);
          // animate cards in sequence
          [0, 1, 2, 3, 4].forEach((i) => {
            setTimeout(() => setVisibleCards((p) => (p.includes(i) ? p : [...p, i])), i * 150);
          });
        }
      },
      { threshold: 0.25, root: containerRef.current }
    );
    if (refSectors.current) observer.observe(refSectors.current);
    return () => observer.disconnect();
  }, []);

  // Debugging logs for scroll progress and sectors animations
  useEffect(() => {
    const unsubscribe = scrollYProgress.onChange((value) => {
      console.log("scrollYProgress:", value);
    });
    return () => unsubscribe();
  }, [scrollYProgress]);

  useEffect(() => {
    const unsubscribeOpacity = sectorsOpacityRaw.onChange((value) => {
      console.log("sectorsOpacityRaw:", value);
    });
    const unsubscribeY = sectorsYRaw.onChange((value) => {
      console.log("sectorsYRaw:", value);
    });
    return () => {
      unsubscribeOpacity();
      unsubscribeY();
    };
  }, [sectorsOpacityRaw, sectorsYRaw]);
  const numberOfSections = 4;
  return (

    // Outer scroll container: full viewport, internal scroll. We drive all scroll progress from here.
    <Box
      ref={containerRef}
      position="relative"
      width="100%"
      sx={{
        "&::-webkit-scrollbar": { display: "none" },
      }}
    >
      {/* Spacer to create scroll height */}
      {/* <Box position="absolute" top="0" left="0" right="0" height={`${numberOfSections * 100}vh`}
      /> */}
      {/* HERO - sticky at top. pointerEvents none so underlying sections can be interactive when overlapped */}
      <Hero scrollYProgress={scrollYProgress} />

      {/* SECTORS / CAROUSEL STACK: We put sectors on top so they can slide up and overlap hero */}
      <MotionBox
        as="section"
        position="sticky"
        bg="brand.section.sectors"
        top="0"
        zIndex={30}
        height="100vh"
        style={{
          opacity: 1,
          y: useSpring(useTransform(scrollYProgress, [0.1, 0.25, 0.4], ["100%", "0%", "-15%"]
          )),
        }}

      >
        <Sectors />
      </MotionBox>
      {/* CAROUSEL (placed below sectors in DOM so it appears after) */}
      <MotionBox
        as="section"
        position="sticky"
        bg="brand.section.carousel"
        top="0"
        zIndex={30}
        height="100vh"
        style={{
          opacity: 1,
          y: useSpring(useTransform(scrollYProgress, [0.1, 0.25, 0.4], ["100%", "0%", "-15%"]
          )),
        }}

      >
        <Home_Carousel />
      </MotionBox>

      {/* TESTIMONIALS */}
      <MotionBox
        as="section"
        position="sticky"
        bg="brand.section.testimonials"
        top="0"
        zIndex={30}
        height="100vh"
        style={{
          opacity: 1,
          y: useSpring(useTransform(scrollYProgress, [0.6, 0.78, 1], ["100%", "0%", "0%"])),
        }}
      >
        <Testimonials />
      </MotionBox>
      {/* <Box height="50vh" /> */}
      {/* Spacer at bottom to push footer into view */}
      {/* <Box height="50vh" bg="transparent" /> */}
    </Box>
  );
}