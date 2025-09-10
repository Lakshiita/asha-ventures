import {
  Badge,
  Box,
  Button,
  Grid,
  GridItem,
  Heading,
  HStack,
  Image,
  Stack,
  Text,
} from "@chakra-ui/react";
import { useMemo, useState } from "react";

export default function Portfolio({ investments, onCompanySelect }) {
  const sectors = useMemo(
    () => Array.from(new Set(investments.map((c) => c.sector))),
    [investments]
  );

  const [filter, setFilter] = useState("All");

  const filtered = useMemo(() => {
    if (filter === "All") return investments;
    return investments.filter((c) => c.sector === filter);
  }, [filter, investments]);

  return (
    <Box maxW="100%" maxH="100%" mb={{ base: 8, md: 16 }}>
      <Heading size={{ base: "lg", md: "xl" }} mb={4} textStyle="defaultText">
        Portfolio
      </Heading>

      {/* Filter Buttons */}
      <HStack mb={6} spacing={{ base: 1, md: 2 }} wrap="wrap">
        <Button
          size="sm"
          variant={filter === "All" ? "solid" : "outline"}
          colorScheme="brand"
          rounded="full"
          onClick={() => setFilter("All")}
        >
          All
        </Button>
        {sectors.map((s) => (
          <Button
            key={s}
            size="sm"
            variant={filter === s ? "solid" : "outline"}
            colorScheme="brand"
            rounded="full"
            onClick={() => setFilter(s)}
          >
            {s}
          </Button>
        ))}
      </HStack>

      {/* Companies Grid */}
      <Grid
        templateColumns={{ base: "repeat(2, 1fr)", md: "repeat(auto-fit, minmax(204px, 1fr))" }}
        gap={{ base: 2, md: 0 }}
        w="100%"
      >
        {filtered.map((c) => (
          <GridItem
            key={c.id}
            cursor="pointer"
            onClick={() => onCompanySelect(c)}
            w={{ base: "100%", md: "204px" }}
            h={{ base: "150px", md: "204px" }}
          >
            <Image
              src={c.logo}
              alt={`${c.name} logo`}
              w="100%"
              h="100%"
              objectFit="cover"
              rounded={{ base: "md", md: "none" }}
            />
          </GridItem>
        ))}
      </Grid>
    </Box>
  );
}
