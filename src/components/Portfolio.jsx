import {
  Box,
  Heading,
  Image,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Checkbox,
  Button,
  Wrap,
  WrapItem,
  Tag,
  TagLabel,
  TagCloseButton,
  Text,
  Divider,
  VStack,
  Flex,
} from "@chakra-ui/react";
import { ChevronDownIcon, CalendarIcon } from "@chakra-ui/icons";
import { useMemo, useState } from "react";

export default function Portfolio({ investments, onCompanySelect }) {
  // Extract filter options
  const sectors = useMemo(() => [...new Set(investments.map((c) => c.sector))], [investments]);
  const statuses = ["active", "partially exited", "exited"];
  const funds = ["Fund I", "Fund II"];
  const years = useMemo(() => Array.from({ length: 11 }, (_, i) => 2015 + i), []);

  // Filter states
  const [selectedSectors, setSelectedSectors] = useState([]);
  const [selectedStatuses, setSelectedStatuses] = useState([]);
  const [selectedFunds, setSelectedFunds] = useState([]);
  const [selectedYears, setSelectedYears] = useState([]);
  const [selectedCompany, setSelectedCompany] = useState(null); // for drawer

  // Filtering logic
  const filtered = useMemo(() => {
    return investments.filter((c) => {
      if (selectedSectors.length && !selectedSectors.includes(c.sector)) return false;
      if (selectedStatuses.length && !selectedStatuses.includes(c.status.toLowerCase())) return false;
      if (selectedFunds.length && !c.fund.some((f) => selectedFunds.includes(f))) return false;
      if (selectedYears.length && !c["year-of-investment"].some((y) => selectedYears.includes(y))) return false;
      return true;
    });
  }, [investments, selectedSectors, selectedStatuses, selectedFunds, selectedYears]);

  // Group companies by sector
  const grouped = useMemo(() => {
    const map = {};
    filtered.forEach((c) => {
      const sector = c.sector || "Other";
      if (!map[sector]) map[sector] = [];
      map[sector].push(c);
    });
    return Object.keys(map)
      .sort((a, b) => a.localeCompare(b))
      .map((sector) => ({ sector, companies: map[sector] }));
  }, [filtered]);

  // MultiSelect Menu Component
  function MultiSelectMenu({ label, options, selected, setSelected }) {
    return (
      <Menu closeOnSelect={false}>
        <MenuButton as={Button} rightIcon={<ChevronDownIcon />} variant="outline" mr={2} mb={2} minW="150px">
          {label}
        </MenuButton>
        <MenuList maxH="250px" overflowY="auto">
          {options.map((option) => (
            <MenuItem key={option}>
              <Checkbox
                isChecked={selected.includes(option)}
                onChange={() => {
                  if (selected.includes(option)) setSelected(selected.filter((s) => s !== option));
                  else setSelected([...selected, option]);
                }}
                mr={2}
              >
                {option}
              </Checkbox>
            </MenuItem>
          ))}
        </MenuList>
      </Menu>
    );
  }

  return (
    <Box maxW="2000px" mx="auto" px={{ base: 2, md: 4 }} mb={{ base: 8, md: 16 }}>
      <Heading
        size={{ base: "2xl", md: "4xl" }}
        mb={6}
        textAlign="center"
        color="brand.500"
        fontWeight="extrabold"
        letterSpacing="wide"
      >
        Portfolio
      </Heading>

      <Flex direction={{ base: "column", md: "row" }} align="flex-start" w="100%">
        {/* Filters */}
        <VStack align="stretch" spacing={4} minW={{ base: "100%", md: "220px" }} mr={{ md: 16 }} mb={{ base: 6, md: 0 }} position={{ base: "static", md: "sticky" }} top={{ base: 0, md: "calc(100vh - 100vh + 10px)" }} alignSelf="flex-start" pt={{ base: 0, md: 32 }}>
          <MultiSelectMenu label="Sectors" options={sectors} selected={selectedSectors} setSelected={setSelectedSectors} />
          <MultiSelectMenu label="Statuses" options={statuses} selected={selectedStatuses} setSelected={setSelectedStatuses} />
          <MultiSelectMenu label="Funds" options={funds} selected={selectedFunds} setSelected={setSelectedFunds} />
          <MultiSelectMenu label="Years" options={years} selected={selectedYears} setSelected={setSelectedYears} />
        </VStack>

        {/* Companies */}
        <Box flex="1" maxW="1700px">
          {grouped.map(({ sector, companies }, idx) => (
            <Box key={sector} mb={10}>
              <Text fontWeight="bold" fontSize={{ base: "lg", md: "2xl" }} textTransform="uppercase" mb={4} color="gray.700">
                {sector}
              </Text>
              <VStack align="stretch" spacing={6}>
                {companies.map((c) => (
                  <Box
                    key={c.id}
                    cursor="pointer"
                    position="relative"
                    py={{ base: 6, md: 8 }}
                    px={{ base: 10, md: 14 }}
                    minH={{ base: "160px", md: "180px" }}
                    w="100%"
                    borderRadius="2xl"
                    boxShadow="none"
                    bg="transparent"
                    _hover={{ boxShadow: "2xl", borderColor: "brand.400", bg: "white", borderRadius: "2xl" }}
                    transition="all 0.2s"
                    onClick={() => {
                      setSelectedCompany(c);
                      if (onCompanySelect) onCompanySelect(c);
                    }}
                  >
                    <Flex align="flex-start">
                      <Image
                        src={c.logo}
                        alt={`${c.name} logo`}
                        w={{ base: "170px", md: "220px" }}
                        h={{ base: "170px", md: "220px" }}
                        objectFit="cover"
                        border="3px solid"
                        borderColor="gray.200"
                        mr={{ base: 8, md: 14 }}
                      />
                      <Box flex="1" pt={0} position="relative">
                        <Divider
                          position="absolute"
                          top={0}
                          left={0}
                          w="100%"
                          borderColor="brand.400"
                          borderWidth="2px"
                          borderRadius="2xl"
                        />
                        <Box pt={2}>
                          <Text fontWeight="bold" fontSize={{ base: "md", md: "xl" }} color="brand.800" mt={0}>
                            {c.name}
                          </Text>
                          <Text fontSize="sm" color="gray.600" mb={1}>
                            {c.sector}
                          </Text>
                          <Text fontSize="sm" color="gray.500" mb={2} noOfLines={4}>
                            {c.shortDescription
                              ? c.shortDescription
                              : c.description?.split(" ").slice(0, 60).join(" ") +
                                (c.description?.split(" ").length > 60 ? "..." : "")}
                          </Text>
                          <Flex align="center" gap={2} mt={2}>
                            <Tag size="md" colorScheme={c.status === "active" ? "green" : c.status === "exited" ? "red" : "yellow"}>
                              <TagLabel>{c.status.charAt(0).toUpperCase() + c.status.slice(1)}</TagLabel>
                            </Tag>
                            <Tag size="md" colorScheme="blue">
                              <CalendarIcon mr={1} />
                              <TagLabel>{Array.isArray(c["year-of-investment"]) ? c["year-of-investment"][0] : c["year-of-investment"]}</TagLabel>
                            </Tag>
                          </Flex>
                        </Box>
                      </Box>
                    </Flex>
                  </Box>
                ))}
              </VStack>
              {idx < grouped.length - 1 && <Divider mt={8} mb={2} borderColor="gray.300" />}
            </Box>
          ))}
        </Box>
      </Flex>
    </Box>
  );
}
