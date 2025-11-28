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
  Tag,
  TagLabel,
  Text,
  Divider,
  VStack,
  Flex,
} from "@chakra-ui/react";
import { ChevronDownIcon, CalendarIcon } from "@chakra-ui/icons";
import { useMemo, useState } from "react";
import { Tooltip, IconButton } from "@chakra-ui/react";
import { CloseIcon } from "@chakra-ui/icons";
import { motion } from "framer-motion";
const MotionMenuList = motion(MenuList);
import {
  Drawer, DrawerOverlay, DrawerContent, DrawerHeader,
  DrawerBody, DrawerCloseButton, useDisclosure
} from "@chakra-ui/react";


export default function Portfolio({ investments, onCompanySelect }) {
  // Extract filter options
  const { isOpen, onOpen, onClose } = useDisclosure();
  const sectors = useMemo(() => [...new Set(investments.map((c) => c.sector))], [investments]);
  const statuses = ["Active", "Partially Exited", "Exited"];
  const funds = ["Asha Circle", "Fund I"];
  const years = useMemo(() => {
    const yearSet = new Set();
    investments.forEach((inv) => {
      const y = inv["year-of-investment"];
      if (Array.isArray(y)) {
        y.forEach((val) => yearSet.add(Number(val)));
      } else if (y) {
        yearSet.add(Number(y));
      }
    });
    return Array.from(yearSet).sort((a, b) => b - a); // newest → oldest
  }, [investments]);



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
    const [isOpen, setIsOpen] = useState(false);
    const activeCount = selected.length;


    return (
      <Menu
        closeOnSelect={false}
        isLazy
        autoSelect={false}
        onOpen={() => setIsOpen(true)}
        onClose={() => setIsOpen(false)}
      >
        <MenuButton
          as={Button}
          rightIcon={
            isOpen ? <CloseIcon boxSize={2.5} /> : <ChevronDownIcon boxSize={5} />
          }
          mr={2}
          mb={2}
          w="full"
          minW="190px"
          justifyContent="space-between"
          variant={activeCount > 0 ? "solid" : "outline"}
          colorScheme="gray"
        >
          <Flex justify="space-between" w="full">
            <Text>{label}</Text>
            {activeCount > 0 && (
              <Tag size="sm" borderRadius="full" colorScheme="blue" ml={2}>
                {activeCount}
              </Tag>
            )}
          </Flex>
        </MenuButton>

        <MotionMenuList
          maxH="250px"
          overflowY="auto"
          bg="rgba(3, 78, 82, 0.31)"
          border="1px solid rgba(255,255,255,0.12)"
          backdropFilter="blur(6px)"
          initial={{ opacity: 0, y: -6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.18 }}
          sx={{
            "&::-webkit-scrollbar": { width: "6px" },
            "&::-webkit-scrollbar-track": {
              background: "rgba(255,255,255,0.1)",
              borderRadius: "10px",
            },
            "&::-webkit-scrollbar-thumb": {
              background: "rgba(255,255,255,0.45)",
              borderRadius: "10px",
            },
          }}
        >
          {options.map((option) => {
            const isSelected = selected.includes(option);
            return (
              <MenuItem
                key={option}
                onClick={() =>
                  isSelected
                    ? setSelected(selected.filter((s) => s !== option))
                    : setSelected([...selected, option])
                }
                bg={isSelected ? "rgba(255,255,255,0.15)" : "transparent"}
                borderRadius="md"
                _hover={{
                  bg: "rgba(255,255,255,0.25)",
                }}
                transition="all 0.2s"
              >
                <Checkbox
                  isChecked={isSelected}
                  pointerEvents="none"
                  mr={2}
                  borderColor="rgba(226, 232, 255, 0.26)"
                  _checked={{ borderColor: "rgba(27, 73, 255, 0.32)" }}
                />
                {option}
              </MenuItem>
            );
          })}
        </MotionMenuList>
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
        bg="rgba(150, 183, 255, 0.26)"
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

        {/* ✅ Active Filter Summary with Clear All */}
        <Flex align="center" justify="center" mb={4} gap={2}>
          <Text
            fontSize="sm"
            fontWeight="semibold"
            color="gray.700"
            textShadow="0 1px 2px rgba(255,255,255,0.7)"
          >

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

                  // 🔥 Remove orange background on click
                  _active={{ bg: "transparent" }}

                  // 🔥 Remove focus ring or bg
                  _focus={{ boxShadow: "none", bg: "transparent" }}

                  // Just in case
                  bg="transparent"

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

        <VStack
          align="stretch"
          spacing={4}
          divider={<Box border="0.5px solid rgba(90, 121, 236, 0.32)" />}
        >

          <MultiSelectMenu label="Sectors" options={sectors} selected={selectedSectors} setSelected={setSelectedSectors} />
          <MultiSelectMenu label="Statuses" options={statuses} selected={selectedStatuses} setSelected={setSelectedStatuses} />
          <MultiSelectMenu label="Funds" options={funds} selected={selectedFunds} setSelected={setSelectedFunds} />
          <MultiSelectMenu label="Years" options={years} selected={selectedYears} setSelected={setSelectedYears} placement="top" />
        </VStack>
      </Box>


      {/* === Main Portfolio Content === */}
      <Box
        flex="1"
        ml={{ base: 0, md: "100px" }}
        px={{ base: 4, md: 10 }}
        pb={{ base: 8, md: 16 }}
        minH="100vh"
      >
        {/* Mobile filter button */}
        <Flex display={{ base: "flex", md: "none" }} mb={4} justify="flex-end">
          <Button
            onClick={onOpen}
            colorScheme="blue"
            variant="outline"
            size="md"
            rightIcon={<ChevronDownIcon />}
          >
            Filters
          </Button>
        </Flex>

        <Heading
          fontSize={{ base: "4xl", md: "6xl" }}
          color="blue.700"
          mb={6}
          textAlign="left"
          fontWeight="extrabold"
          letterSpacing="wide"
          textStyle="subHeading"
        >
          Portfolio
        </Heading>

        {grouped.length > 0 ? (
          grouped.map(({ sector, companies }, idx) => (
            <Box key={sector} mb={20}>
              <Text
                fontSize={{ base: "lg", md: "3xl" }}
                textTransform="uppercase"
                fontFamily="Barlow Semi Condensed, sans-serif"
                color="blue.800"
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
                    py={{ base: 4, md: 8 }}
                    px={{ base: 4, sm: 6, md: 14 }}
                    w="100%"
                    borderRadius="2xl"
                    bg="brand.section.investments_cards"
                    boxShadow="md"
                    transition="all 0.2s"
                    _hover={{
                      bg: "rgba(194, 207, 255, 0.45)",
                      color: "blue.800",
                      transform: "translateY(-4px)",
                      boxShadow: "-12px 12px 0px 0px rgba(5, 52, 86, 0.34)",
                    }}
                  >
                    <Flex align="flex-start">
                      <Image
                        src={c.logo}
                        alt={`${c.name} logo`}
                        w={{ base: "80px", sm: "100px", md: "160px" }}
                        h={{ base: "80px", sm: "100px", md: "160px" }}
                        objectFit="cover"
                        mr={{ base: 4, md: 10 }}
                      />

                      <Box flex="1">
                        <Heading
                          color="blue.700"
                          mb={2}
                          fontSize={{ base: "lg", md: "2xl" }}
                          lineHeight={{ base: "1.2", md: "1.3" }}
                          noOfLines={2}
                        >
                          {c.name}
                        </Heading>

                        <Text
                          fontSize={{ base: "xs", sm: "sm" }}
                          color="gray.600"
                          mb={2}
                          noOfLines={4}
                        >
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
            </Box>
          ))
        ) : (
          <Text align="center" fontSize="xl" mb={10} color="GrayText"> No companies available.</Text>
        )}
      </Box>
      {/* MOBILE FILTER DRAWER */}
      <Drawer isOpen={isOpen} placement="bottom" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent
          borderTopRadius="2xl"
          bg="rgba(255,255,255,0.85)"
          backdropFilter="blur(10px)"
        >
          <DrawerCloseButton mt={2} />
          <DrawerHeader fontWeight="bold" textAlign="center">
            Filters
          </DrawerHeader>

          <DrawerBody>
            <VStack align="stretch" spacing={4}>
              <MultiSelectMenu
                label="Sectors"
                options={sectors}
                selected={selectedSectors}
                setSelected={setSelectedSectors}
              />
              <MultiSelectMenu
                label="Statuses"
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
                label="Years"
                options={years}
                selected={selectedYears}
                setSelected={setSelectedYears}
              />

              {/* Clear all */}
              <Button
                colorScheme="red"
                variant="ghost"
                onClick={() => {
                  setSelectedSectors([]);
                  setSelectedStatuses([]);
                  setSelectedFunds([]);
                  setSelectedYears([]);
                }}
              >
                Clear all
              </Button>

              {/* Apply & Close */}
              <Button colorScheme="blue" onClick={onClose}>
                Apply Filters
              </Button>
            </VStack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>

    </Flex>

  );
}



