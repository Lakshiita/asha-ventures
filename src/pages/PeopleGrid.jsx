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
            cursor="pointer"
            onClick={() => onPersonClick(person)}
            _hover={{
                transform: "translateY(-4px)",
                boxShadow: "-12px 12px 0px 0px rgba(164, 157, 155, 0.83)",
                borderColor: "rgba(62, 50, 43, 0.45)",
              }}
            w={{ base: "280px", sm: "240px", md: "260px", lg: "300px" }}
            // maxW={{ base: "90vw", sm: "none" }}
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
                fontSize={{ base: "xl", md: "2xl" }}
                textStyle="subHeading"
                textAlign="center"
                color="gray.800"
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
