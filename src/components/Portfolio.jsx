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
    <Box maxW="100%" maxH="100%" mb={16}>
      <Heading size="xl" mb={4} textStyle="defaultText">
        Portfolio
      </Heading>

      {/* Filter Buttons */}
      <HStack mb={6} spacing={2} wrap="wrap">
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
        templateColumns="repeat(5, 204px)"
        gap={0}
      >
        {filtered.map((c) => (
          <GridItem
            key={c.id}
            cursor="pointer"
            onClick={() => onCompanySelect(c)}
            w="204px"
            h="204px"
          >
            <Image
              src={c.logo}
              alt={`${c.name} logo`}
              w="204px"
              h="204px"
              objectFit="cover"
            />
          </GridItem>
        ))}
      </Grid>
    </Box>
  );
}
