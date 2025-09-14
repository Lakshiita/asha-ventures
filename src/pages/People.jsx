import {
  Avatar, Box, Card, CardBody, Container, Grid, Heading, Text, HStack, VStack,
  Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalCloseButton, useDisclosure, Image, Badge, Icon, Link
} from "@chakra-ui/react";
import { FaEnvelope, FaLinkedin } from "react-icons/fa";
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Section from "../components/Section.jsx";
import peopleData from "../data/people.json";
import { chakra, shouldForwardProp } from "@chakra-ui/react";
import { isValidMotionProp, motion } from "framer-motion";
const MotionModalContent = chakra(motion.div, {
  shouldForwardProp: (prop) =>
    isValidMotionProp(prop) || shouldForwardProp(prop),
});

function FoundersGrid({ data }) {
  const navigate = useNavigate();

  const handleFounderClick = (founder) => {
    if (founder.name === "Vikram Gandhi") {
      navigate("/founders/vikram-gandhi");
    } else if (founder.name === "Pramod Bhasin") {
      navigate("/founders/pramod-bhasin");
    }
  };
  const [visibleCards, setVisibleCards] = useState(new Set());
  const cardRefs = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = parseInt(entry.target.dataset.index);
            setTimeout(() => {
              setVisibleCards(prev => new Set([...prev, index]));
            }, index * 400);
          }
        });
      },
      { threshold: 0.1 }
    );

    cardRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <Grid templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }} gap={8} justifyItems="center">
      {data.map((p, index) => (
        <Card
          key={p.name}
          ref={(el) => (cardRefs.current[index] = el)}
          data-index={index}
          bg="white"
          cursor="pointer"
          onClick={() => handleFounderClick(p)}
          transition="all 1.2s cubic-bezier(0.4, 0, 0.2, 1)"
          transform={visibleCards.has(index) ? "translateY(0)" : "translateY(-100px)"}
          opacity={visibleCards.has(index) ? 1 : 0}
          _hover={{
            transform: visibleCards.has(index) ? "translateY(-4px)" : "translateY(-100px)",
            shadow: "xl",
            "& .overlay": { opacity: 1 },
            "& .image": { transform: "scale(1.05)" }
          }}
          borderRadius="lg"
          shadow="md"
          border="1px solid"
          borderColor="gray.200"
          w="400px"
          h="450px"
        >
          <CardBody p={0} display="flex" flexDirection="column" h="full">
            <Box position="relative" overflow="hidden" borderRadius="md" h="350px" bg="gray.50">
              <Image
                src={p.img}
                alt={p.name}
                h="full"
                w="full"
                objectFit="contain"
                className="image"
                transition="transform 0.3s ease"
              />
              <Box
                className="overlay"
                position="absolute"
                top={0}
                left={0}
                right={0}
                bottom={0}
                bg="blackAlpha.300"
                opacity={0}
                transition="opacity 0.3s ease"
                mixBlendMode="multiply"
              />
            </Box>
            <VStack spacing={2} align="center" p={4} bg="white">
              <Heading size="lg" textStyle="defaultText">
                {p.name}
              </Heading>
              <Text textStyle="defaultText" fontSize="md">
                {p.role}
              </Text>
            </VStack>
          </CardBody>
        </Card>
      ))}
    </Grid>
  );
}

function PeopleGrid({ data, onPersonClick }) {
  const [visibleCards, setVisibleCards] = useState(new Set());
  const cardRefs = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = parseInt(entry.target.dataset.index);
            setTimeout(() => {
              setVisibleCards(prev => new Set([...prev, index]));
            }, index * 300);
          }
        });
      },
      { threshold: 0.1 }
    );

    cardRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <Grid templateColumns={{ base: "1fr", md: "repeat(2, 1fr)", lg: "repeat(3, 1fr)" }} gap={6}>
      {data.map((p, index) => (
        <Card
          key={p.name}
          ref={(el) => (cardRefs.current[index] = el)}
          data-index={index}
          bg="white"
          cursor="pointer"
          onClick={() => onPersonClick(p)}
          transition="all 1.2s cubic-bezier(0.4, 0, 0.2, 1)"
          transform={visibleCards.has(index) ? "translateY(0)" : "translateY(-100px)"}
          opacity={visibleCards.has(index) ? 1 : 0}
          _hover={{
            transform: visibleCards.has(index) ? "translateY(-4px)" : "translateY(-100px)",
            shadow: "xl",
            "& .overlay": { opacity: 1 },
            "& .image": { transform: "scale(1.05)" }
          }}
          borderRadius="lg"
          shadow="md"
          border="1px solid"
          borderColor="gray.200"
          w="320px"
          h="400px"
        >
          <CardBody p={0} display="flex" flexDirection="column" h="full">
            <Box position="relative" overflow="hidden" borderRadius="md" h="300px" bg="gray.50">
              <Image
                src={p.img}
                alt={p.name}
                h="full"
                w="full"
                objectFit="contain"
                className="image"
                transition="transform 0.3s ease"
              />
              <Box
                className="overlay"
                position="absolute"
                top={0}
                left={0}
                right={0}
                bottom={0}
                bg="blackAlpha.300"
                opacity={0}
                transition="opacity 0.3s ease"
                mixBlendMode="multiply"
              />
            </Box>
            <VStack spacing={2} align="center" p={3} bg="white">
              <Heading size="md" textStyle="defaultText">
                {p.name}
              </Heading>
              <Text textStyle="defaultText" fontSize="sm">
                {p.role}
              </Text>
            </VStack>
          </CardBody>
        </Card>
      ))}
    </Grid>
  );
}


export default function People() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedPerson, setSelectedPerson] = useState(null);

  const handlePersonClick = (person) => {
    setSelectedPerson(person);
    onOpen();
  };

  return (
    <Box>
      <Section>
        <Container maxW="container.xl" centerContent>
          <VStack spacing={12} align="stretch">
            <Box>
              <Heading size="lg" mb={6} textStyle="defaultText">Founding Partners</Heading>
              <FoundersGrid data={peopleData.founders} />
            </Box>
            <Box>
              <Heading size="lg" mb={6} textStyle="defaultText">Team</Heading>
              <PeopleGrid data={peopleData.team} onPersonClick={handlePersonClick} />
            </Box>
            <Box>
              <Heading size="lg" mb={6} textStyle="defaultText">Early Supporters</Heading>
              <PeopleGrid data={peopleData.supporters} onPersonClick={handlePersonClick} />
            </Box>
          </VStack>
        </Container>
      </Section>
      <Modal isOpen={isOpen} onClose={onClose} size="full">
        <ModalOverlay bg="blackAlpha.700" backdropFilter="blur(4px)" />
        <ModalContent
          as={MotionModalContent}
          p={0}
          m={0}
          borderRadius={0}
          maxW="100vw"
          maxH="100vh"
          overflow="hidden"
          initial={{ opacity: 0, scale: 0.5, y: 80 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.5, y: 80 }}
          transition={{
            type: "spring",
            stiffness: 40,   // lower stiffness = slower spring
            damping: 10,     // slightly softer stop
            mass: 1.2        // heavier feel (slower start)
          }}
        >
          {/* Close button (top-right) */}
          <ModalCloseButton
            size="xl"
            top="5"
            right="8"
            color="white"
            zIndex="20"
            _hover={{ color: "brand.800" }}
          />

          {/* Two-row layout: top header (maroon) + bottom content (white) */}
          <Grid templateRows={{ base: "auto 1fr", md: "40vh 1fr" }} h="100vh">
            {/* TOP: maroon header */}
            <Box
              bg="brand.500" /* adjust to your brand maroon */
              px={{ base: 6, md: 20 }}
              position="relative"
              overflow="visible" /* allow the image to overflow into the white section */
            >
              <Grid
                templateColumns={{ base: "1fr", md: "40% 60%" }}
                alignItems="center"
                h="100%"
              >
                {/* Left column - image centered and overlapping down */}
                <Box
                  display="flex"
                  flexDirection="column"
                  alignItems="center"
                  justifyContent="center"
                  position="relative"
                  overflow="visible"
                  py={{ base: 8, md: 0 }}
                >
                  <Box position="relative" display="inline-block">
                    <Image
                      src={selectedPerson?.img}
                      alt={selectedPerson?.name}
                      boxSize={{ base: "220px", md: "420px" }}
                      objectFit="cover"
                      borderRadius="md"
                      boxShadow="lg"
                      zIndex={2}
                      transform={{ base: "translateY(0)", md: "translateY(37%)" }}
                    />

                    {/* Transparent overlay bar with icons */}
                    {(selectedPerson?.email || selectedPerson?.linkedin) && (
                      <Box
                        position="absolute"
                        bottom="0"
                        left="0"
                        right="0"
                        bg="blackAlpha.500"
                        py={2}
                        display="flex"
                        justifyContent="center"
                        gap={6}
                        borderBottomRadius="md"
                      >
                        {selectedPerson?.email && (
                          <Link href={`mailto:${selectedPerson.email}`} isExternal>
                            <Icon
                              as={FaEnvelope}
                              color="white"
                              boxSize={7}
                              _hover={{ color: "brand.500" }}
                            />
                          </Link>
                        )}
                        {selectedPerson?.linkedin && (
                          <Link href={selectedPerson.linkedin} isExternal>
                            <Icon
                              as={FaLinkedin}
                              color="white"
                              boxSize={7}
                              _hover={{ color: "blue.300" }}
                            />
                          </Link>
                        )}
                      </Box>
                    )}
                  </Box>
                </Box>

                {/* Right column inside header: name + designation */}
                <Box color="white" pl={{ base: 0, md: 8 }}>
                  <Heading
                    as="h2"
                    fontSize={{ base: "2xl", md: "5xl" }}
                    mb={2}
                    lineHeight={1}
                  >
                    {selectedPerson?.name}
                  </Heading>
                  <Text fontSize={{ base: "md", md: "xl" }} opacity={0.9}>
                    {selectedPerson?.role}
                  </Text>
                </Box>
              </Grid>
            </Box>

            {/* BOTTOM: white scrollable content */}
            <Box bg="white" overflowY="auto" p={{ base: 6, md: 12 }}>
              {/* Keep columns aligned with header: left for icons/spacing, right for text */}
              <Grid
                templateColumns={{ base: "1fr", md: "40% 60%" }}
                gap={8}
                alignItems="start"
              >
                {/* Left column: social icons (appear below the image because image overlaps down) */}
                <Box display="flex" flexDirection="column" alignItems="center">
                  <HStack spacing={6} mt={{ base: 4, md: 8 }}>
                    {selectedPerson?.email && (
                      <Link href={`mailto:${selectedPerson.email}`} isExternal>
                        <Icon as={FaEnvelope} boxSize={6} _hover={{ color: "blue.500" }} />
                      </Link>
                    )}
                    {selectedPerson?.linkedin && (
                      <Link href={selectedPerson.linkedin} isExternal>
                        <Icon as={FaLinkedin} boxSize={6} _hover={{ color: "blue.500" }} />
                      </Link>
                    )}
                  </HStack>
                </Box>

                {/* Right column: heading + scrollable bio */}
                <Box>
                  {selectedPerson?.heading && (
                    <Text fontSize="lg" fontWeight="semibold" mb={4}>
                      {selectedPerson.heading}
                    </Text>
                  )}
                  <Text fontSize="md" lineHeight="1.7" color="gray.700">
                    {selectedPerson?.bio}
                  </Text>
                </Box>
              </Grid>
            </Box>
          </Grid>
        </ModalContent>
      </Modal>


    </Box>
  );
}
