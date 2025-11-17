import { Box, Heading, Text } from "@chakra-ui/react";
import { useState } from "react";

export default function FlipCard({ title, description, bgFront, bgBack, icon: Icon }) {
  const [flipped, setFlipped] = useState(false);

  return (
    <Box
      onMouseEnter={() => setFlipped(true)}
      onMouseLeave={() => setFlipped(false)}
      w="100%"
      maxW="220px"
      h="230px"
      style={{ perspective: "1000px" }}
      cursor="pointer"
    >
      <Box
        position="relative"
        w="100%"
        h="100%"
        transition="transform 0.6s"
        style={{
          transformStyle: "preserve-3d",
          WebkitTransformStyle: "preserve-3d",
          transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)",
          WebkitTransform: flipped ? "rotateY(180deg)" : "rotateY(0deg)"
        }}
      >
        <Box
          position="absolute"
          top="0"
          left="0"
          right="0"
          bottom="0"
          bg={bgFront}
          rounded="xl"
          boxShadow="md"
          display="flex"
          flexDir="column"
          alignItems="center"
          justifyContent="center"
          zIndex={2}
          sx={{
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden"
          }}
        >
          {Icon && <Icon size="32px" color="blue.800" style={{ marginBottom: "20px" }} />}
          <Heading size="xl" textAlign="center" variant="section" color="blue.800" px={3}>
            {title}?
          </Heading>
        </Box>
        <Box
          position="absolute"
          top="0"
          left="0"
          right="0"
          bottom="0"
          bg={bgBack}
          rounded="xl"
          boxShadow="lg"
          display="flex"
          alignItems="center"
          justifyContent="center"
          p={4}
          sx={{
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
            WebkitTransform: "rotateY(180deg)"
          }}
        >
          <Text fontSize="lg" textAlign="center" variant="section" fontWeight="bold" color="gray.700" px={2}>
            {description}
          </Text>
        </Box>
      </Box>
    </Box>
  );
}