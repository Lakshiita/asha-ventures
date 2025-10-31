import {
  Grid,
  Box,
  Image,
  Text,
  VStack,
  Heading,
} from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";

export default function PeopleGrid({ data, onPersonClick }) {
  const [visibleCards, setVisibleCards] = useState(new Set());
  const cardRefs = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = parseInt(entry.target.dataset.index);
            setTimeout(() => {
              setVisibleCards((prev) => new Set([...prev, index]));
            }, index * 100);
          }
        });
      },
      { threshold: 0.2 }
    );

    cardRefs.current.forEach((ref) => ref && observer.observe(ref));
    return () => observer.disconnect();
  }, []);

  return (
    <Box w="full" px={{ base: 2, md: 8 }}>
      <Grid
        templateColumns={{
          base: "1fr",
          sm: "repeat(2, 1fr)",
          md: "repeat(3, 1fr)",
          lg: "repeat(4, 1fr)"
        }}
        gap={{ base: 4, md: 8 }}
        justifyItems="center"
      >
        {data.map((person, index) => (
          <Box
            key={index}
            ref={(el) => (cardRefs.current[index] = el)}
            data-index={index}
            bg="white"
            borderRadius="xl"
            boxShadow="md"
            overflow="hidden"
            transition="all 1.2s cubic-bezier(0.4, 0, 0.2, 1)"
            transform={visibleCards.has(index) ? "translateY(0)" : "translateY(-100px)"}
            opacity={visibleCards.has(index) ? 1 : 0}
            cursor="pointer"
            onClick={() => onPersonClick(person)}
            _hover={{
              transform: visibleCards.has(index) ? "translateY(-6px)" : "translateY(-100px)",
              boxShadow: "xl",
            }}
            w={{ base: "280px", sm: "240px", md: "260px", lg: "280px" }}
            maxW={{ base: "90vw", sm: "none" }}
            h="auto"
          >
            <Image
              src={person.img}
              alt={person.name}
              objectFit="cover"
              h={{ base: "280px", md: "300px" }}
              w="full"
              objectPosition="top"
            />
            <VStack p={{ base: 4, md: 5 }} spacing={2} align="center">
              <Heading
                as="h3"
                size={{ base: "sm", md: "md" }}
                textAlign="center"
                color="gray.800"
                fontFamily="'Playfair Display', serif"
              >
                {person.name}
              </Heading>
              <Text fontSize={{ base: "sm", md: "md" }} color="gray.600" textAlign="center">
                {person.role}
              </Text>
            </VStack>
          </Box>
        ))}
      </Grid>
    </Box>
  );
}
