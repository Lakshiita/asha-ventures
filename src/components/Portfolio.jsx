import {
  Box,
  Grid,
  GridItem,
  Heading,
  HStack,
  Image,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { useMemo, useState } from "react";
import CompanyDrawer from "./CompanyDrawer";

export default function Portfolio({ investments, onCompanySelect }) {
  const sectors = useMemo(
    () => Array.from(new Set(investments.map((c) => c.sector))),
    [investments]
  );

  const [filter, setFilter] = useState("All");
  const [selectedCompany, setSelectedCompany] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleCompanyClick = (company) => {
    setSelectedCompany(company);
    onOpen();
  };

  const filtered = useMemo(() => {
    if (filter === "All") return investments;
    return investments.filter((c) => c.sector === filter);
  }, [filter, investments]);

  return (
    <Box maxW="100%" maxH="100%" mb={{ base: 8, md: 16 }}>
      <Heading size={{ base: "lg", md: "xl" }} mb={4} textStyle="defaultText">
        Portfolio
      </Heading>

      {/* Minimalist Filter with Animated Underlines */}
      <Box mb={8} display="flex" justifyContent="center">
        <HStack spacing={8}>
          <Box
            cursor="pointer"
            onClick={() => setFilter("All")}
            position="relative"
            pb={2}
          >
            <Text
              fontSize="md"
              fontWeight={filter === "All" ? "600" : "400"}
              color={filter === "All" ? "brand.800" : "gray.600"}
              transition="all 0.2s"
              _hover={{ color: "brand.700" }}
            >
              All
            </Text>
            {filter === "All" && (
              <Box
                position="absolute"
                bottom={0}
                left={0}
                right={0}
                h="2px"
                bg="brand.500"
                rounded="full"
              />
            )}
          </Box>
          {sectors.map((s) => (
            <Box
              key={s}
              cursor="pointer"
              onClick={() => setFilter(s)}
              position="relative"
              pb={2}
            >
              <Text
                fontSize="md"
                fontWeight={filter === s ? "600" : "400"}
                color={filter === s ? "brand.800" : "gray.600"}
                transition="all 0.2s"
                _hover={{ color: "brand.700" }}
              >
                {s}
              </Text>
              {filter === s && (
                <Box
                  position="absolute"
                  bottom={0}
                  left={0}
                  right={0}
                  h="2px"
                  bg="brand.500"
                  rounded="full"
                />
              )}
            </Box>
          ))}
        </HStack>
      </Box>

      {/* Companies Grid */}
      <Grid
        templateColumns={{ base: "repeat(3, 1fr)", md: "repeat(auto-fill, minmax(120px, 1fr))" }}
        gap={{ base: 3, md: 4 }}
        w="100%"
        justifyItems="center"
        maxW="1400px"
        mx="auto"
      >
        {filtered.map((c) => (
          <GridItem
            key={c.id}
            cursor="pointer"
            onClick={() => handleCompanyClick(c)}
            w={{ base: "100px", md: "120px" }}
            h={{ base: "100px", md: "120px" }}
            transition="all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
            _hover={{
              transform: "scale(1.2) translateY(-8px)",
              filter: "drop-shadow(0 20px 25px rgba(0, 0, 0, 0.15))"
            }}
          >
            <Image
              src={c.logo}
              alt={`${c.name} logo`}
              w="100%"
              h="100%"
              objectFit="cover"
              rounded="full"
              border="3px solid"
              borderColor="gray.200"
              _hover={{
                borderColor: "brand.400",
                boxShadow: "0 0 0 4px rgba(191, 163, 106, 0.2)"
              }}
              transition="all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
            />
          </GridItem>
        ))}
      </Grid>

      {/* Company Details Drawer */}
      <CompanyDrawer
        isOpen={isOpen}
        onClose={onClose}
        company={selectedCompany}
      />
    </Box>
  );
}
