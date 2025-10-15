import { Box, Flex, Heading, Text } from "@chakra-ui/react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef } from "react";
import ForceGraph2D from 'react-force-graph-2d';

import {
  FaHeartbeat,
  FaDollarSign,
  FaLeaf,
  FaShoppingCart,
  FaLaptopCode,
} from "react-icons/fa";

const MotionBox = motion(Box);

const sectors = [
  {
    icon: FaHeartbeat,
    title: "Healthcare",
    text: "Ensuring access to quality and low-cost healthcare for underserved populations through technology-led delivery models and innovative financing solutions"
  },
  {
    icon: FaDollarSign,
    title: "Financial Services",
    text: "Driving financial inclusion by expanding access to credit, insurance, and savings for underserved individuals and MSMEs via digital and alternative models"
  },
  {
    icon: FaLeaf,
    title: "Sustainability",
    text: "Building a resource-efficient future by enabling waste reduction, material recovery, and sustainable consumption through scalable circular innovations"
  },
  {
    icon: FaShoppingCart,
    title: "Consumer",
    text: "Enhancing everyday living for underserved populations by supporting access to affordable, high-quality, and trusted products and services across essential consumption categories."
  },
  {
    icon: FaLaptopCode,
    title: "MSME Technology",
    text: "Digitizing and formalizing India's small businesses by supporting tech platforms that enhance productivity, compliance, and access to markets and finance"
  }
];

function Sectors() {
  const containerRef = useRef(null);
  // Use viewport scroll (no target) so cards animate as user scrolls the page
  const { scrollYProgress } = useScroll();

  // Create a transform for each card with staggered offsets so later cards
  // move less and appear on top. We map scroll progress [0,1] to a Y offset
  // that starts larger for earlier cards and ends smaller.
  const overlapY = sectors.map((_, i) =>
    useTransform(scrollYProgress, [0, 1], [i * 120, i * 20])
  );

  // Graph Data
  const graphData = {
    nodes: [
      { id: "Asha Ventures", group: "root", color: "#ED8936" },
      ...sectors.map((s, i) => ({
        id: s.title,
        group: "sector",
        color: "#FBD38D"
      })),
    ],
    links: sectors.map((s) => ({
      source: "Asha Ventures",
      target: s.title
    })),
  };

  const graphRef = useRef();

  useEffect(() => {
    // Center the graph nicely
    if (graphRef.current) {
      graphRef.current.zoomToFit(400);
    }
  }, []);

  return (
    <Flex
      ref={containerRef}
      w="100%"
      h="100vh"
      px={{ base: 6, md: 12 }}
      py={16}
      align="center"
      justify="space-between"
      overflow="hidden"
    >
      {/* Left side – Overlapping Cards */}
      <Box w={{ base: "100%", md: "50%" }} position="relative">
        <Heading mb={10} fontSize="3xl" color="orange.800">
          Sectors We Cover
        </Heading>

        <Box position="relative" h="70vh">
          {sectors.map((item, index) => {
            const Icon = item.icon;
            return (
              <MotionBox
                key={index}
                position="absolute"
                top={0}
                left={0}
                right={0}
                // Later cards should appear on top of earlier ones: give higher zIndex
                style={{ y: overlapY[index], zIndex: index + 1 }}
                bg="orange.50"
                borderLeft="6px solid"
                borderColor="orange.500"
                rounded="xl"
                shadow="lg"
                p={6}
                mb={6}
                whileHover={{ scale: 1.03, y: -5 }}
              >
                <Flex align="center" gap={4}>
                  <Box as={Icon} w={10} h={10} color="orange.600" />
                  <Box>
                    <Heading size="md" mb={2} color="orange.800">
                      {item.title}
                    </Heading>
                    <Text fontSize="sm" color="gray.600">
                      {item.text}
                    </Text>
                  </Box>
                </Flex>
              </MotionBox>
            );
          })}
        </Box>
      </Box>

      {/* Right side – Interactive Tree Graph */}
      <Box
        w={{ base: "0%", md: "45%" }}
        display={{ base: "none", md: "flex" }}
        alignItems="center"
        justifyContent="center"
        position="relative"
        h="80vh"
      >
        <ForceGraph2D
          ref={graphRef}
          graphData={graphData}
          nodeAutoColorBy="group"
          linkColor={() => "#ED8936"}
          backgroundColor="white"
          nodeCanvasObject={(node, ctx, globalScale) => {
            const label = node.id;
            const fontSize = 5 / globalScale;
            ctx.fillStyle = node.color;
            ctx.beginPath();
            ctx.arc(node.x, node.y, 6, 0, 2 * Math.PI, false);
            ctx.fill();
            ctx.font = `${fontSize}px Sans-Serif`;
            ctx.fillStyle = "#333";
            ctx.fillText(label, node.x + 8, node.y + 3);
          }}
        />
      </Box>
    </Flex>
  );
}

export default Sectors;