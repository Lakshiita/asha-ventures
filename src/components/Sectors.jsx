import { Box, Flex, Heading, Text, SimpleGrid } from "@chakra-ui/react";
import { motion } from "framer-motion";
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
    text: "Ensuring access to quality and low-cost healthcare for underserved populations through technology-led delivery models and innovative financing solutions.",
    color: "red.400",
  },
  {
    icon: FaDollarSign,
    title: "Financial Services",
    text: "Driving financial inclusion by expanding access to credit, insurance, and savings for underserved individuals and MSMEs via digital and alternative models.",
    color: "blue.500",
  },
  {
    icon: FaLeaf,
    title: "Sustainability",
    text: "Building a resource-efficient future by enabling waste reduction, material recovery, and sustainable consumption through scalable circular innovations.",
    color: "green.500",
  },
  {
    icon: FaShoppingCart,
    title: "Consumer",
    text: "Enhancing everyday living for underserved populations by supporting access to affordable, high-quality, and trusted products and services.",
    color: "orange.400",
  },
  {
    icon: FaLaptopCode,
    title: "MSME Technology",
    text: "Digitizing and formalizing India's small businesses by supporting tech platforms that enhance productivity, compliance, and access to markets and finance.",
    color: "purple.500",
  },
];

export default function Sectors() {
  return (
    <Box py={10} px={{ base: 6, md: 20 }}>
      <Heading
        textAlign="center"
        color="blue.700"
        fontFamily="'Playfair Display', serif" // Explicitly set font family
        textStyle="brandPrimary" // Applied the global text style
        mb={2}
      >
        Sectors We Cover
      </Heading>
      <Text textAlign="center" color="gray.500" mb={8}>
        Areas where Asha Ventures drives inclusive growth and sustainable impact.
      </Text>

      <SimpleGrid
        columns={{ base: 1, md: 2, lg: 3 }}
        spacing={8}
        justifyItems="center"
      >
        {sectors.map((sector, index) => {
          const Icon = sector.icon;
          return (
            <MotionBox
              key={index}
              whileHover={{ y: -6, scale: 1.03 }}
              transition={{ duration: 0.3 }}
              bg="brand.section.signatory"
              // bg="white"
              p={6}
              rounded="2xl"
              shadow="md"
              maxW="xs"
              textAlign="center"
            >
              <Box
                as={Icon}
                color={sector.color}
                boxSize={10}
                mx="auto"
                mb={4}
              />
              <Heading
                as="h3"
                size="md"
                mb={3}
                color="gray.800"
                fontWeight="bold"
              >
                {sector.title}
              </Heading>
              <Text color="gray.600" fontSize="sm">
                {sector.text}
              </Text>
            </MotionBox>
          );
        })}
      </SimpleGrid>
    </Box>
  );
}