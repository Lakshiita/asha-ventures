import { Box, SimpleGrid, Heading, Text } from "@chakra-ui/react";
import { motion } from "framer-motion";
import {
  FaHeartbeat,
  FaDollarSign,
  FaLeaf,
  FaShoppingCart,
  FaLaptopCode,
  FaSeedling
} from "react-icons/fa";

const MotionBox = motion(Box);

const sectors = [
  {
    icon: FaHeartbeat,
    title: "Healthcare",
    text: "Ensuring access to quality and low-cost healthcare for underserved populations through technology-led delivery models and innovative financing solutions.",
    color: "red.500",
  },
  {
    icon: FaDollarSign,
    title: "Financial Services",
    text: "Driving financial inclusion by expanding access to credit, insurance, and savings for underserved individuals and MSMEs via digital and alternative models.",
    color: "blue.600",
  },
  {
    icon: FaLeaf,
    title: "Sustainability",
    text: "Building a resource-efficient future by enabling waste reduction, material recovery, and sustainable consumption through scalable circular innovations.",
    color: "green.600",
  },
  {
    icon: FaSeedling,
    title: "Agri Tech",
    text: "Enabling sustainable and inclusive growth across India's agricultural and allied sectors by supporting solutions that enhance farm productivity, supply chain efficiency, market access, and financial inclusion for farmers and agri-enterprises.",
    color: "green.300",
  },
  {
    icon: FaShoppingCart,
    title: "Consumer",
    text: "Enabling access to affordable, high-quality products and services for underserved populations while building sustainable value chains that create jobs and promote inclusive growth.",
    color: "orange.400",
  },
  {
    icon: FaLaptopCode,
    title: "MSME Technology",
    text: "Digitizing and formalizing India's small and manufacturing businesses by supporting tech platforms that enhance productivity, compliance, and access to markets and finance.",
    color: "purple.600",
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
        textStyle="subHeading"
        textAlign="center"
        color="brand.section.sectors_heading"
        mb={{ base: 2, md: 2 }}
        mt={6}
      >
        Sectors We Cover
      </Heading>
      <Text
        textAlign="center"
        textStyle="subHeading"
        color="brand.section.sectors_heading"
        mb={{ base: 4, md: 6 }}
        fontSize={{ base: "lg", md: "lg" }}
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
              transition={{ duration: 0.2 }}
              bg="rgba(255, 255, 255, 0.74)"
              backdropFilter="blur(10px)"
              border="1px solid rgba(193, 193, 193, 0.35)"
              p={{ base: 3, md: 6 }}
              rounded="2xl"
              shadow="lg"
              w="100%"
              maxW={{ base: "200px", sm: "220px", md: "320px", lg: "360px", xl: "400px" }}
              textAlign="center"
              minH={{ base: "150px", md: "240px" }}
              cursor="pointer"
              _hover={{
                transform: "translateY(-4px)",
                boxShadow: "-12px 12px 0px 0px rgba(99, 92, 90, 0.83)",
                borderColor: "rgba(62, 50, 43, 0.45)",
              }}
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
                size={{ base: "lg", md: "lg" }}
                mb={4}
                color="gray.800"
                fontWeight="bold"
                fontFamily="Barlow Semi Condensed, sans-serif"
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
