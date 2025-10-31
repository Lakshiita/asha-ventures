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
import { Tooltip, IconButton } from "@chakra-ui/react";
import { CloseIcon } from "@chakra-ui/icons";

export default function Portfolio({ investments, onCompanySelect }) {
  // Extract filter options
  const sectors = useMemo(() => [...new Set(investments.map((c) => c.sector))], [investments]);
  const statuses = ["Active", "Partially Exited", "Exited"];
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
      if (selectedStatuses.length && !selectedStatuses.includes(c.status)) return false;
      if (selectedFunds.length && !c.fund.some((f) => selectedFunds.includes(f))) return false;
      if (
        selectedYears.length &&
        !c["year-of-investment"].some((y) => selectedYears.includes(Number(y)))
      )
        return false;
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
    const activeCount = selected.length;

    return (
      <Menu closeOnSelect={false}>
        <MenuButton
          as={Button}
          rightIcon={<ChevronDownIcon />}
          mr={2}
          mb={2}
          w="full"
          minW="180px"  // ✅ added fixed width baseline
          justifyContent="space-between"
          variant={activeCount > 0 ? "solid" : "outline"}
          colorScheme={activeCount > 0 ? "gray" : "gray"}
        >
          <Flex align="center" justify="space-between" w="full">
            <Text>{label}</Text>
            <Box w="20px" textAlign="right">
              {activeCount > 0 && (
                <Tag
                  size="sm"
                  borderRadius="full"
                  colorScheme="blue"
                  ml={2}
                  minW="20px"
                  textAlign="center"
                >
                  {activeCount}
                </Tag>
              )}
            </Box>
          </Flex>
        </MenuButton>


        <MenuList maxH="250px" overflowY="auto">
          {options.map((option) => {
            const isSelected = selected.includes(option);
            return (
              <MenuItem
                key={option}
                onClick={() => {
                  if (isSelected)
                    setSelected(selected.filter((s) => s !== option));
                  else
                    setSelected([...selected, option]);
                }}
                _hover={{ bg: "gray.100" }}
              >
                <Checkbox
                  isChecked={isSelected}
                  pointerEvents="none" // ✅ disables double click issue, text now clickable too
                  mr={2}
                />
                {option}
              </MenuItem>
            );
          })}

        </MenuList>
      </Menu>
    );
  }


  // ✅ The main JSX return starts here
  return (
    <Flex>
      {/* === Fixed Elegant Sidebar (below top navbar) === */}
      <Box
        as="aside"
        position="sticky"
        top="180px"
        w="230px"  // ✅ fixed width prevents resizing
        maxW="230px"
        h="fit-content"
        maxH="calc(100vh - 180px)"
        overflowY="auto"
        overflowX="hidden"
        bg="white"
        boxShadow="xl"
        border="1px solid"
        borderColor="gray.100"
        rounded="2xl"
        px={5}
        py={6}
        zIndex="10"
        display={{ base: "none", md: "block" }}
        transition="all 0.3s ease"
        _hover={{
          boxShadow: "2xl",
          transform: "translateY(-2px)",
        }}
      >


        {/* <Heading
          size="md"
          mb={4}
          textAlign="center"
          color="brand.500"
          fontWeight="bold"
          letterSpacing="wide"
        >
          Filters
        </Heading> */}

        {/* ✅ Active Filter Summary with Clear All */}
        <Flex align="center" justify="center" mb={4} gap={2}>
          <Text fontSize="sm" color="gray.700" fontWeight="medium">
            {(
              selectedSectors.length +
              selectedStatuses.length +
              selectedFunds.length +
              selectedYears.length
            ) > 0
              ? `${selectedSectors.length +
              selectedStatuses.length +
              selectedFunds.length +
              selectedYears.length
              } active filter${(
                selectedSectors.length +
                selectedStatuses.length +
                selectedFunds.length +
                selectedYears.length
              ) > 1 ? "s" : ""}`
              : "No filters applied"}
          </Text>

          {(
            selectedSectors.length +
            selectedStatuses.length +
            selectedFunds.length +
            selectedYears.length
          ) > 0 && (
              <Tooltip label="Clear all filters" placement="top" hasArrow>
                <IconButton
                  aria-label="Clear all filters"
                  icon={<CloseIcon boxSize={2.5} />}
                  size="xs"
                  variant="ghost"
                  color="gray.500"
                  _hover={{ color: "red.500", transform: "scale(1.1)" }}
                  onClick={() => {
                    setSelectedSectors([]);
                    setSelectedStatuses([]);
                    setSelectedFunds([]);
                    setSelectedYears([]);
                  }}
                />
              </Tooltip>
            )}
        </Flex>

        <VStack align="stretch" spacing={4}>
          <MultiSelectMenu label="Sectors" options={sectors} selected={selectedSectors} setSelected={setSelectedSectors} />
          <MultiSelectMenu label="Statuses" options={statuses} selected={selectedStatuses} setSelected={setSelectedStatuses} />
          <MultiSelectMenu label="Funds" options={funds} selected={selectedFunds} setSelected={setSelectedFunds} />
          <MultiSelectMenu label="Years" options={years} selected={selectedYears} setSelected={setSelectedYears} />
        </VStack>
      </Box>


      {/* === Main Portfolio Content === */}
      <Box
        flex="1"
        ml={{ base: 0, md: "200px" }}
        pt="20px" // 👈 space below navbar
        px={{ base: 4, md: 10 }}
        pb={{ base: 8, md: 16 }}
        minH="100vh"
      >
        <Heading
          size={{ base: "2xl", md: "3xl" }}
          mb={10}
          textAlign="left"
          color="blue.700"
          fontWeight="extrabold"
          letterSpacing="wide"
          fontFamily="'Playfair Display', serif"
        >
          Portfolio
        </Heading>

        {grouped.length > 0 ? (
          grouped.map(({ sector, companies }, idx) => (
            <Box key={sector} mb={20}>
              <Text
                fontSize={{ base: "lg", md: "3xl" }}
                textTransform="uppercase"
                color="brand.800"
                align="centre"
                mb={2}
              >
                {sector}
              </Text>
              <Divider mb={4} borderColor="gray.400" />
              <VStack align="stretch" spacing={6}>
                {companies.map((c) => (
                  <Box
                    key={c.id}
                    cursor="pointer"
                    py={{ base: 6, md: 8 }}
                    px={{ base: 10, md: 14 }}
                    w="100%"
                    borderRadius="2xl"
                    bg="green.50"
                    boxShadow="md"
                    _hover={{
                      bg: "brand.section.sectors",
                      color: "blue.800",
                      boxShadow: "lg",
                      transform: "scale(1.01)",
                    }}
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
                        w={{ base: "120px", md: "180px" }}
                        h={{ base: "120px", md: "180px" }}
                        objectFit="cover"
                        mr={{ base: 8, md: 14 }}
                      />
                      <Box flex="1">
                        <Text fontWeight="bold" fontSize={{ base: "md", md: "3xl" }} color="brand.800" mb={4}>
                          {c.name}
                        </Text>
                        <Text fontSize="sm" color="gray.600" mb={2} noOfLines={4}>
                          {c.shortDescription
                            ? c.shortDescription
                            : c.description?.split(" ").slice(0, 50).join(" ") +
                            (c.description?.split(" ").length > 50 ? "..." : "")}
                        </Text>
                        <Flex align="center" gap={2} mt={2}>
                          <Tag size="md" variant="unstyled">
                            <Flex align="center" gap={2}>
                              <Box
                                w="8px"
                                h="8px"
                                borderRadius="full"
                                bg={
                                  c.status === "Active"
                                    ? "green.400"
                                    : c.status === "Exited"
                                      ? "red.400"
                                      : "yellow.400"
                                }
                              />
                              <TagLabel>
                                {c.status.charAt(0).toUpperCase() + c.status.slice(1)}
                              </TagLabel>
                            </Flex>
                          </Tag>
                          <Tag size="md" variant="unstyled">
                            <CalendarIcon mr={1} />
                            <TagLabel>
                              {Array.isArray(c["year-of-investment"])
                                ? c["year-of-investment"][0]
                                : c["year-of-investment"]}
                            </TagLabel>
                          </Tag>
                        </Flex>
                      </Box>
                    </Flex>
                  </Box>
                ))}
              </VStack>
              {/* {idx < grouped.length - 1 && (
                <Divider mt={8} mb={2} borderColor="gray.300" />
              )} */}
            </Box>
          ))
        ) : (
          <Text align="center" fontSize="xl" mb={10} color="GrayText"> No companies available.</Text>
        )}
      </Box>
    </Flex>
  );
}



