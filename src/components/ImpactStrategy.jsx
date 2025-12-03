import { Box, Flex, Heading, Text, Icon, useColorModeValue } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { FaEye, FaLightbulb, FaCogs } from "react-icons/fa";

const MotionBox = motion(Box);

const items = [
  {
    label: "Intentionality",
    icon: FaEye,
    color: "orange.400",
    text: "Embedded at every stage through well-designed processes to ensure consistent focus",
  },
  {
    label: "Contribution",
    icon: FaLightbulb,
    color: "green.500",
    text: "Measurable on both investment and market creation impact goals",
  },
  {
    label: "Measurement",
    icon: FaCogs,
    color: "blue.600",
    text: "Ex ante and Ex post to create a continuous feedback loop and transparent reporting",
  },
];

export default function ImpactStrategy() {
  const bgCard = useColorModeValue("white", "gray.800");

  return (
    <Flex
      w="100%"
      direction={{ base: "column", md: "row" }}
      align="center"
      justify="center"
      py={10}
      px={4}
      gap={10}
    >
      {/* LEFT CIRCLE */}
      <Flex
        w={{ base: "180px", md: "220px" }}
        h={{ base: "180px", md: "220px" }}
        borderRadius="full"
        bg="blue.700"
        align="center"
        justify="center"
        boxShadow="xl"
      >
        <Flex
          w="80%"
          h="80%"
          borderRadius="full"
          bg="white"
          align="center"
          justify="center"
          textAlign="center"
          boxShadow="md"
        >
          <Heading fontSize={{ base: "lg", md: "2xl" }} color="blue.700">
            Impact<br />Strategy
          </Heading>
        </Flex>
      </Flex>

      {/* RIGHT ITEMS */}
      <Flex direction="column" gap={6} w={{ base: "100%", md: "60%" }}>
        {items.map((item, i) => (
          <MotionBox
            key={i}
            bg={bgCard}
            borderLeft={`6px solid var(--chakra-colors-${item.color.replace('.', '-')})`}
            p={4}
            borderRadius="lg"
            boxShadow="md"
            whileHover={{
              scale: 1.03,
              boxShadow: "0px 6px 20px rgba(0,0,0,0.15)",
            }}
            transition="0.3s"
          >
            <Flex align="center" gap={4}>
              <Icon as={item.icon} boxSize={6} color={item.color} />
              <Heading size="md" color={item.color}>
                {item.label}
              </Heading>
            </Flex>
            <Text mt={2} fontSize="sm" opacity={0.8}>
              {item.text}
            </Text>
          </MotionBox>
        ))}
      </Flex>
    </Flex>
  );
}
