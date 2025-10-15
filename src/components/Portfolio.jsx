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
  Text, // ✅ Added Text
} from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { useMemo, useState } from "react";
import investments from "../data/investments.json"; // ✅ ensure this path is correct

export default function Portfolio({ onCompanySelect }) {
  // Extract filter options from data
  const sectors = useMemo(
    () => Array.from(new Set(investments.map((c) => c.sector))),
    [investments]
  );
  const statuses = ["active", "partially exited", "exited"];
  const funds = ["Fund I", "Fund II"];
  const years = useMemo(() => {
    const start = 2015;
    const end = 2025;
    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
  }, []);

  // Filter state
  const [selectedSectors, setSelectedSectors] = useState([]);
  const [selectedStatuses, setSelectedStatuses] = useState([]);
  const [selectedFunds, setSelectedFunds] = useState([]);
  const [selectedYears, setSelectedYears] = useState([]);

  // Filtering logic
  const filtered = useMemo(() => {
    return investments.filter((c) => {
      // Sectors
      if (selectedSectors.length && !selectedSectors.includes(c.sector))
        return false;
      // Statuses
      if (selectedStatuses.length) {
        const status = c.status || "Active";
        if (!selectedStatuses.includes(status.toLowerCase())) return false;
      }
      // Funds
      if (selectedFunds.length) {
        const fundArr = Array.isArray(c.fund) ? c.fund : [c.fund];
        if (!selectedFunds.some((f) => fundArr.includes(f))) return false;
      }
      // Years
      if (selectedYears.length) {
        const yearsArr = Array.isArray(c["year-of-investment"])
          ? c["year-of-investment"]
          : [c["year-of-investment"]];
        if (!yearsArr.some((y) => selectedYears.includes(y))) return false;
      }
      return true;
    });
  }, [investments, selectedSectors, selectedStatuses, selectedFunds, selectedYears]);

  // Helper for multi-select dropdown
  function MultiSelectMenu({ label, options, selected, setSelected }) {
    return (
      <Menu closeOnSelect={false}>
        <MenuButton
          as={Button}
          rightIcon={<ChevronDownIcon />}
          variant="outline"
          mr={2}
          mb={2}
          minW="150px"
        >
          {label}
        </MenuButton>
        <MenuList maxH="250px" overflowY="auto">
          {options.map((option) => (
            <MenuItem key={option}>
              <Checkbox
                isChecked={selected.includes(option)}
                onChange={() => {
                  if (selected.includes(option)) {
                    setSelected(selected.filter((s) => s !== option));
                  } else {
                    setSelected([...selected, option]);
                  }
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
    <Box maxW="100%" maxH="100%" mb={{ base: 8, md: 16 }}>
      <Heading
        size={{ base: "2xl", md: "4xl" }}
        mb={6}
        textAlign="center"
        color="brand.500"
        fontWeight="extrabold"
        letterSpacing="wide"
        textShadow="0 2px 8px rgba(191,163,106,0.15)"
      >
        Portfolio
      </Heading>

      {/* Filter Bar */}
      <Box mb={6} display="flex" flexWrap="wrap">
        <MultiSelectMenu
          label="Sectors"
          options={sectors}
          selected={selectedSectors}
          setSelected={setSelectedSectors}
        />
        <MultiSelectMenu
          label="Investment Statuses"
          options={statuses}
          selected={selectedStatuses}
          setSelected={setSelectedStatuses}
        />
        <MultiSelectMenu
          label="Funds"
          options={funds}
          selected={selectedFunds}
          setSelected={setSelectedFunds}
        />
        <MultiSelectMenu
          label="Year of Partnership"
          options={years}
          selected={selectedYears}
          setSelected={setSelectedYears}
        />
      </Box>

      {/* Active Filter Chips */}
      <Wrap mb={4} spacing={2}>
        {selectedSectors.map((s) => (
          <WrapItem key={s}>
            <Tag size="md" borderRadius="full" variant="solid" colorScheme="blue">
              <TagLabel>Sector: {s}</TagLabel>
              <TagCloseButton
                onClick={() =>
                  setSelectedSectors(selectedSectors.filter((x) => x !== s))
                }
              />
            </Tag>
          </WrapItem>
        ))}
        {selectedStatuses.map((s) => (
          <WrapItem key={s}>
            <Tag size="md" borderRadius="full" variant="solid" colorScheme="green">
              <TagLabel>Status: {s}</TagLabel>
              <TagCloseButton
                onClick={() =>
                  setSelectedStatuses(selectedStatuses.filter((x) => x !== s))
                }
              />
            </Tag>
          </WrapItem>
        ))}
        {selectedFunds.map((f) => (
          <WrapItem key={f}>
            <Tag size="md" borderRadius="full" variant="solid" colorScheme="purple">
              <TagLabel>Fund: {f}</TagLabel>
              <TagCloseButton
                onClick={() =>
                  setSelectedFunds(selectedFunds.filter((x) => x !== f))
                }
              />
            </Tag>
          </WrapItem>
        ))}
        {selectedYears.map((y) => (
          <WrapItem key={y}>
            <Tag size="md" borderRadius="full" variant="solid" colorScheme="orange">
              <TagLabel>Year: {y}</TagLabel>
              <TagCloseButton
                onClick={() =>
                  setSelectedYears(selectedYears.filter((x) => x !== y))
                }
              />
            </Tag>
          </WrapItem>
        ))}
      </Wrap>

      {/* Companies Vertical List */}
      <Box w="100%" maxW="900px" mx="auto">
        {filtered.map((c) => (
          <Box
            key={c.id}
            cursor="pointer"
            onClick={() => onCompanySelect && onCompanySelect(c)}
            display="flex"
            alignItems="center"
            p={4}
            mb={4}
            borderWidth="1px"
            borderRadius="lg"
            boxShadow="sm"
            _hover={{
              boxShadow: "md",
              borderColor: "brand.400",
              bg: "gray.50",
            }}
            transition="all 0.2s"
          >
            <Image
              src={c.logo}
              alt={`${c.name} logo`}
              w={{ base: "70px", md: "90px" }}
              h={{ base: "70px", md: "90px" }}
              objectFit="cover"
              rounded="full"
              border="2px solid"
              borderColor="gray.200"
              mr={{ base: 4, md: 8 }}
              transition="all 0.2s"
            />
            <Box flex="1">
              <Text fontWeight="bold" fontSize={{ base: "md", md: "lg" }} color="brand.800">
                {c.name}
              </Text>
              <Text fontSize="sm" color="gray.600">
                {c.sector}
              </Text>
              <Text fontSize="sm" color="gray.500" mt={1} noOfLines={2}>
                {c.shortDescription
                  ? c.shortDescription
                  : c.description?.split(" ").slice(0, 30).join(" ") +
                  (c.description?.split(" ").length > 30 ? "..." : "")}
              </Text>
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  );
}

