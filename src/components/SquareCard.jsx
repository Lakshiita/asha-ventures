import { Box, Card, Heading, Text } from "@chakra-ui/react";
import { useState } from "react";

export default function SquareCard({ title, bgColor = "white", content = "Content coming soon..." }) {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <Box
      position="relative"
      aspectRatio={1}
      w={{ base: "90%", sm: "100%" }}
      maxW={{ base: "150px", sm: "200px", md: "280px" }}
      onMouseEnter={() => setIsFlipped(true)}
      onMouseLeave={() => setIsFlipped(false)}
      style={{ perspective: "1000px" }}
      mx="auto"
    >
      <Box
        position="absolute"
        w="100%"
        h="100%"
        transition="transform 0.6s"
        style={{
          transformStyle: "preserve-3d",
          transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)"
        }}
      >
        <Card
          bg={bgColor}
          border="1px solid"
          borderColor="blackAlpha.100"
          p={6}
          borderRadius="md"
          display="flex"
          alignItems="center"
          justifyContent="center"
          h="100%"
          position="absolute"
          w="100%"
          style={{ backfaceVisibility: "hidden" }}
        >
          <Heading textStyle="subHeading"
            fontSize={{ base: "md", sm: "lg", md: "3xl" }}   // 👈 smaller on mobile
            textAlign="center"
            color={bgColor === "white" ? "black" : "white"}>
            {title}
          </Heading>
        </Card>
        <Card
          bg="#fbf2edcf"
          border="1px solid"
          borderColor="blackAlpha.100"
          p={6}
          borderRadius="md"
          display="flex"
          alignItems="center"
          justifyContent="center"
          h="100%"
          position="absolute"
          w="100%"
          style={{
            backfaceVisibility: "hidden",
            transform: "rotateY(180deg)"
          }}
        >
          <Text textStyle="subHeading" textAlign="center" color="gray.700" fontSize={{ base: "xs", sm: "lg", md: "xl" }} variant="section">
            {content}
          </Text>
        </Card>
      </Box>
    </Box>
  );
}