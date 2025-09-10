import {
  Badge,
  Button,
  Container,
  Grid,
  GridItem,
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
    <Container px={0}>
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
        templateColumns={{
          base: "repeat(2,1fr)",
          sm: "repeat(3,1fr)",
          md: "repeat(4,1fr)",
        }}
        gap={6}
      >
        {filtered.map((c) => (
          <GridItem
            key={c.id}
            bg="white"
            border="1px solid"
            borderColor="gray.200"
            rounded="lg"
            p={4}
            shadow="sm"
            transition="all .25s ease"
            _hover={{
              shadow: "lg",
              transform: "translateY(-4px) scale(1.02)",
            }}
            cursor="pointer"
            onClick={() => onCompanySelect(c)}
            role="button"
            aria-label={`Open ${c.name}`}
          >
            <Image
              src={c.logo}
              alt={`${c.name} logo`}
              h="60px"
              objectFit="contain"
              mx="auto"
            />
            <Stack align="center" mt={3} spacing={1}>
              <Badge colorScheme="brand">{c.sector}</Badge>
              <Text fontWeight="600" textAlign="center">
                {c.name}
              </Text>
            </Stack>
          </GridItem>
        ))}
      </Grid>
    </Container>
  );
}