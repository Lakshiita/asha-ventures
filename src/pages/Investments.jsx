import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Badge,
  Box,
  Button,
  Container,
  Grid,
  GridItem,
  Heading,
  Image,
  Text,
  useDisclosure,
  HStack,
  Stack,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Link,
} from "@chakra-ui/react";
import { useEffect, useMemo, useState } from "react";
import { ExternalLinkIcon } from "@chakra-ui/icons";
import Section from "../components/Section.jsx";
import investmentsData from "../data/investments.json";
import faqs from "../data/faqs.json";

export default function Investments() {
  const [selected, setSelected] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();

  // Collect unique sectors
  const sectors = useMemo(
    () => Array.from(new Set(investmentsData.map((c) => c.sector))),
    []
  );

  const [filter, setFilter] = useState("All");

  // Filtered companies
  const filtered = useMemo(() => {
    if (filter === "All") return investmentsData;
    return investmentsData.filter((c) => c.sector === filter);
  }, [filter]);

  useEffect(() => {
    if (!isOpen) setSelected(null);
  }, [isOpen]);

  return (
    <Box>
      <Section title="Portfolio">
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
                onClick={() => {
                  setSelected(c);
                  onOpen();
                }}
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

          {/* FAQs */}
          <Box mt={12}>
            <Heading size="md" mb={4}>
              FAQs
            </Heading>
            <Accordion
              allowMultiple
              bg="white"
              rounded="md"
              border="1px solid"
              borderColor="blackAlpha.100"
            >
              {faqs.map((f, idx) => (
                <AccordionItem key={idx}>
                  <h2>
                    <AccordionButton _expanded={{ bg: "brand.100" }}>
                      <Box as="span" flex="1" textAlign="left" fontWeight="600">
                        {f.q}
                      </Box>
                      <AccordionIcon />
                    </AccordionButton>
                  </h2>
                  <AccordionPanel pb={4}>{f.a}</AccordionPanel>
                </AccordionItem>
              ))}
            </Accordion>
          </Box>
        </Container>
      </Section>

      {/* Drawer for company details */}
      <Drawer isOpen={isOpen} placement="right" onClose={onClose} size="md">
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader borderBottomWidth="1px">{selected?.name}</DrawerHeader>
          <DrawerBody>
            {selected && (
              <Stack spacing={4}>
                <Image
                  src={selected.logo}
                  alt={`${selected.name} logo`}
                  h="60px"
                  objectFit="contain"
                />
                <HStack spacing={2}>
                  <Badge colorScheme="brand">{selected.sector}</Badge>
                  {selected.stage && <Badge>{selected.stage}</Badge>}
                </HStack>
                <Text>{selected.description}</Text>

                {/* Investments */}
                {selected["year-of-investment"] && (
                  <Text fontSize="sm" color="gray.600">
                    <b>Year of Investment:</b>{" "}
                    {selected["year-of-investment"].join(", ")}
                  </Text>
                )}

                {/* Website */}
                {selected.website && (
                  <Button
                    as="a"
                    href={selected.website}
                    target="_blank"
                    rel="noreferrer"
                    rightIcon={<ExternalLinkIcon />}
                    colorScheme="brand"
                    variant="solid"
                    alignSelf="start"
                  >
                    Visit Website
                  </Button>
                )}

                {/* Latest News */}
                {selected["latest-news"]?.length > 0 && (
                  <Box>
                    <Heading size="sm" mb={2}>
                      Latest News
                    </Heading>
                    <Stack spacing={2}>
                      {selected["latest-news"].map((news, i) => (
                        <Link
                          key={i}
                          href={news.url}
                          target="_blank"
                          rel="noreferrer"
                          color="blue.500"
                          fontSize="sm"
                          _hover={{ textDecoration: "underline" }}
                        >
                          {news.title}
                        </Link>
                      ))}
                    </Stack>
                  </Box>
                )}
              </Stack>
            )}
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Box>
  );
}
