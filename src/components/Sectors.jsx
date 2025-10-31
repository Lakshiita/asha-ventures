import { Box, SimpleGrid, Heading, Text } from "@chakra-ui/react";
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
    <Box
      h="100vh"
      py={{ base: 4, md: 10 }}
      px={{ base: 4, md: 20 }}
      overflow="hidden"
      display="flex"
      flexDirection="column"
      justifyContent="center"
    >
      <Heading
        textAlign="center"
        color="blue.700"
        fontFamily="'Playfair Display', serif"
        mb={{ base: 2, md: 4 }}
      // fontSize={{ base: "xl", md: "2xl" }}
      >
        Sectors We Cover
      </Heading>
      <Text
        textAlign="center"
        color="gray.500"
        mb={{ base: 4, md: 8 }}
        fontSize={{ base: "sm", md: "md" }}
      >
        Areas where Asha Ventures drives inclusive growth and sustainable impact.
      </Text>

      <SimpleGrid
        columns={{ base: 2, sm: 2, md: 3 }}
        spacing={{ base: 3, md: 6 }}
        justifyItems="center"
        alignItems="stretch"
      >
        {sectors.map((sector, index) => {
          const Icon = sector.icon;
          return (
            <MotionBox
              key={index}
              whileHover={{ y: -4, scale: 1.02 }}
              transition={{ duration: 0.2 }}
              bg="brand.section.signatory"
              p={{ base: 3, md: 6 }}
              rounded="2xl"
              shadow="md"
              w="100%"
              maxW={{ base: "180px", sm: "220px", md: "340px", lg: "380px", xl: "420px" }}
              textAlign="center"
              minH={{ base: "150px", md: "240px" }}
              cursor="pointer"
            >

              <Box
                as={Icon}
                color={sector.color}
                boxSize={{ base: 6, md: 10 }}
                mx="auto"
                mb={2}
              />
              <Heading
                as="h2"
                size={{ base: "xs", md: "md" }}
                mb={4}
                color="gray.800"
                fontWeight="bold"
              >
                {sector.title}
              </Heading>
              <Text color="gray.600" fontSize={{ base: "10px", md: "sm" }}>
                {sector.text}
              </Text>
            </MotionBox>
          );
        })}
      </SimpleGrid>
    </Box>
  );
}
