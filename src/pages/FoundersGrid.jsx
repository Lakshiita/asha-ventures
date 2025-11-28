import {
  Grid,
  Box,
  Image,
  Text,
  VStack,
  Heading,
} from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function FoundersGrid({ data }) {
  const navigate = useNavigate();
  const [visibleCards, setVisibleCards] = useState(() => {
    const initialVisible = new Set();
    const cardsPerRow = window.innerWidth >= 1024 ? 4 : window.innerWidth >= 768 ? 3 : window.innerWidth >= 640 ? 2 : 1;
    for (let i = 0; i < Math.min(cardsPerRow, data.length); i++) {
      initialVisible.add(i);
    }
    return initialVisible;
  });
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
            transform={visibleCards.has(index) ? "translateY(0)" : "translateY(-100px)"}
            opacity={visibleCards.has(index) ? 1 : 0}
            cursor="pointer"
            onClick={() => {
              const slug = person.name.toLowerCase().replace(/\s+/g, '-');
              navigate(`/founders/${slug}`);
            }}
            _hover={{
              transform: "translateY(-4px)",
              boxShadow: "-12px 12px 0px 0px rgba(171, 157, 153, 0.83)",
              borderColor: "rgba(62, 50, 43, 0.45)",
            }}
            w={{
              base: "290px",
              sm: "250px",
              md: "300px",   // mid screens (tablets)
              lg: "360px",   // laptops
              xl: "400px",   // big desktop screens
            }}

            h={{
              base: "360px",
              md: "420px",
              lg: "450px",
              xl: "500px",
            }}

          >
            <Image
              src={person.img}
              alt={person.name}
              objectFit="cover"
              h={{
                base: "280px",
                md: "300px",
                lg: "360px",
                xl: "380px",
              }} 
              w="full"
              objectPosition="top"
            />
            <VStack p={{ base: 4, md: 5 }} spacing={2} align="center">
              <Heading
                size={{ base: "sm", md: "md" }}
                textAlign="center"
                color="gray.800"
                fontSize={{ base: "xl", md: "3xl" }}
                textStyle="subHeading"
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
