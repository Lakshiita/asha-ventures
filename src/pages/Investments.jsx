import {
  Accordion, AccordionButton, AccordionIcon, AccordionItem, AccordionPanel,
  Badge, Box, Button, Container, Grid, GridItem, Heading, Image, Modal, ModalBody,
  ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text,
  useDisclosure, Tag, HStack, Stack
} from "@chakra-ui/react";
import { useEffect, useMemo, useState } from "react";
import { InfoOutlineIcon, ExternalLinkIcon } from "@chakra-ui/icons";
import Section from "../components/Section.jsx";
import investmentsData from "../data/investments.json";
import faqs from "../data/faqs.json";

export default function Investments() {
  const [selected, setSelected] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const sectors = useMemo(
    () => Array.from(new Set(investmentsData.map((c) => c.sector))),
    []
  );

  const [filter, setFilter] = useState("All");
  const filtered = useMemo(() => {
    if (filter === "All") return investmentsData;
    return investmentsData.filter((c) => c.sector === filter);
  }, [filter]);

  useEffect(() => { if (!isOpen) setSelected(null); }, [isOpen]);

  return (
    <Box>
      <Section title="Investments" subtitle="A selection of organizations we back. Click a logo to learn more.">
        <Container px={0}>
          <HStack mb={4} spacing={3} wrap="wrap">
            <Tag
              size="lg"
              cursor="pointer"
              onClick={() => setFilter("All")}
              variant={filter==="All" ? "solid" : "subtle"}
              colorScheme="brand"
            >
              All
            </Tag>
            {sectors.map((s) => (
              <Tag
                key={s}
                size="lg"
                cursor="pointer"
                onClick={() => setFilter(s)}
                variant={filter===s ? "solid" : "subtle"}
                colorScheme="brand"
              >
                {s}
              </Tag>
            ))}
          </HStack>

          <Grid templateColumns={{ base: "repeat(2,1fr)", sm: "repeat(3,1fr)", md: "repeat(4,1fr)" }} gap={6}>
            {filtered.map((c) => (
              <GridItem
                key={c.id}
                bg="white"
                border="1px solid"
                borderColor="blackAlpha.100"
                rounded="lg"
                p={4}
                _hover={{ shadow: "md", transform: "translateY(-2px)" }}
                transition="all .2s"
                cursor="pointer"
                onClick={() => { setSelected(c); onOpen(); }}
                role="button"
                aria-label={`Open ${c.name}`}
              >
                <Image src={c.logo} alt={`${c.name} logo`} h="60px" objectFit="contain" mx="auto" />
                <Stack align="center" mt={3} spacing={1}>
                  <Badge colorScheme="brand">{c.sector}</Badge>
                  <Text fontWeight="600" textAlign="center">{c.name}</Text>
                </Stack>
              </GridItem>
            ))}
          </Grid>

          {/* FAQs */}
          <Box mt={12}>
            <Heading size="md" mb={4}>
              FAQs
            </Heading>
            <Accordion allowMultiple bg="white" rounded="md" border="1px solid" borderColor="blackAlpha.100">
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

      {/* Modal for company info */}
      <Modal isOpen={isOpen} onClose={onClose} size="lg" isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            <HStack>
              <InfoOutlineIcon />
              <Text>{selected?.name}</Text>
            </HStack>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {selected && (
              <Stack spacing={4}>
                <Image src={selected.logo} alt={`${selected.name} logo`} h="60px" objectFit="contain" />
                <HStack spacing={2}>
                  <Badge colorScheme="brand">{selected.sector}</Badge>
                  {selected.stage && <Badge>{selected.stage}</Badge>}
                </HStack>
                <Text>{selected.description}</Text>
                <Text fontSize="sm" color="gray.600"><b>Focus:</b> {selected.focus}</Text>
                {selected.website && (
                  <Button
                    as="a"
                    href={selected.website}
                    target="_blank"
                    rel="noreferrer"
                    rightIcon={<ExternalLinkIcon />}
                    variant="outline"
                    alignSelf="start"
                  >
                    Visit Website
                  </Button>
                )}
              </Stack>
            )}
          </ModalBody>
          <ModalFooter>
            <Button onClick={onClose}>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
}
