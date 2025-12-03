import { Box, Heading, Text } from "@chakra-ui/react";
import { useState } from "react";

export default function FlipCard({ title, description, bgFront, bgBack, icon: Icon }) {
  const [flipped, setFlipped] = useState(false);

  return (
    <Box
      onMouseEnter={() => setFlipped(true)}
      onMouseLeave={() => setFlipped(false)}
      w="100%"
      maxW={{ base: "150px", sm: "170px", md: "200px", lg: "220px" }}  // ✅ responsive
      h={{ base: "160px", sm: "180px", md: "210px", lg: "230px" }}     // ✅ responsive
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
          WebkitTransform: flipped ? "rotateY(180deg)" : "rotateY(0deg)",
        }}
      >
        {/* FRONT */}
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
            WebkitBackfaceVisibility: "hidden",
          }}
          p={{ base: 2, md: 3 }}
        >
          {Icon && (
            <Icon
              size={window.innerWidth < 480 ? "22px" : "32px"} // ✅ smaller icon mobile
              color="#1a284fff"
              style={{ marginBottom: "12px" }}
            />
          )}

          <Heading
            size={{ base: "lg", sm: "lg", md: "xl" }}    // ✅ text shrinks only on mobile
            textAlign="center"
            variant="section"
            color="blue.800"
            px={3}
          >
            {title}?
          </Heading>
        </Box>

        {/* BACK */}
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
          p={{ base: 2, sm: 3, md: 4 }}
          sx={{
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
            WebkitTransform: "rotateY(180deg)",
          }}
        >
          <Text
            fontSize={{ base: "sm", sm: "md", md: "lg" }}  // ✅ smaller text on mobile
            textAlign="center"
            variant="section"
            fontWeight="bold"
            color="gray.700"
            px={2}
          >
            {description}
          </Text>
        </Box>
      </Box>
    </Box>
  );
}
