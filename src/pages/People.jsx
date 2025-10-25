import {
  Avatar, Box, Card, CardBody, Container, Grid, Heading, Text, HStack, VStack,
  Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalCloseButton, useDisclosure, Image, Badge, Icon, Link, IconButton
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
            <Box position="relative" overflow="hidden" borderRadius="md" h="450px" bg="gray.50">
              <Image
                src={p.img}
                alt={p.name}
                h="full"
                w="full"
                objectFit="cover"
                className="image"
                objectPosition="top"
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
                objectFit="cover"
                className="image"
                objectPosition="top"
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
              <Heading size="xl" mb={10} textStyle="defaultText" color={"blue.700"} fontFamily="'Playfair Display', serif">Founding Partners</Heading>
              <FoundersGrid data={peopleData.founders} />
            </Box>
            <Box>
              <Heading size="xl" mb={10} textStyle="defaultText" color={"blue.700"} fontFamily="'Playfair Display', serif">Team</Heading>
              <PeopleGrid data={peopleData.team} onPersonClick={handlePersonClick} />
            </Box>
            <Box>
              <Heading size="xl" mb={10} textStyle="defaultText" color={"blue.700"} fontFamily="'Playfair Display', serif">Early Supporters</Heading>
              <PeopleGrid data={peopleData.supporters} onPersonClick={handlePersonClick} />
            </Box>
          </VStack>
        </Container>
      </Section>
      <Modal isOpen={isOpen} onClose={onClose} size="6xl" isCentered>
        <ModalOverlay bg="blackAlpha.600" backdropFilter="blur(5px)" />
        <ModalContent
          as={MotionModalContent}
          bg="#e0e0e0ff"
          borderRadius="xl"
          p={6}
          maxH="90vh"
          overflowY="auto"
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 60 }}
          transition={{ type: "spring", stiffness: 60, damping: 12 }}
        >
          <ModalCloseButton size="lg" top="1" right="1" color="gray.700" zIndex="10" />

          <Grid
            templateColumns={{ base: "1fr", md: "35% 65%" }}
            gap={4}
            w="full"
            pr={8}
            alignItems="flex-start"
          >
            {/* LEFT COLUMN - TWO WHITE CARDS */}
            <VStack spacing={4}>
              {/* Title & Role Card */}
              <Box
                bg="white"
                borderRadius="lg"
                boxShadow="md"
                p={6}
                maxW="380px"
                textAlign="left"
                w="full"
              >
                <VStack spacing={2} align="start">
                  <Heading size="xl" color="gray.800">
                    {selectedPerson?.name}
                  </Heading>
                  <Text fontSize="lg" color="gray.600">
                    {selectedPerson?.role}
                  </Text>
                </VStack>
              </Box>

              {/* Image Card */}

              <Box
                w="full"
                maxW="380px"
                mx="auto"
                borderRadius="lg"
                overflow="hidden"
                boxShadow="md"
              >
                <Image
                  src={selectedPerson?.img}
                  alt={selectedPerson?.name}
                  w="full"
                  h="350px"
                  objectFit="cover"
                  objectPosition="top"
                />
              </Box>
              {/* Social Icons Box */}
              <Box
                // bg="white"
                // borderRadius="lg"
                // boxShadow="md"
                p={0}
                w="full"
                maxW="380px"
                textAlign="start"
              >
                <HStack justify="start" spacing={4}>
                  {selectedPerson?.linkedin && (
                    <IconButton
                      as="a"
                      href={selectedPerson.linkedin}
                      icon={<FaLinkedin />}
                      aria-label="LinkedIn"
                      variant="ghost"
                      color="blue.100"
                      w="60px"
                      h="45px"
                      borderRadius="lg"
                      boxShadow="md"
                      fontSize="2xl"
                      bg="blue.800"
                      target="_blank"
                      transition="all 0.2s ease"
                      _hover={{
                        transform: "scale(1.2)",
                        color: "blue.700",
                        bg: "blue.50",
                      }}
                    />
                  )}
                  {selectedPerson?.email && (
                    <IconButton
                      as="a"
                      href={`mailto:${selectedPerson.email}`}
                      icon={<FaEnvelope />}
                      aria-label="Email"
                      variant="ghost"
                      color="blue.100"
                      bg="blue.800"
                      w="60px"
                      h="45px"
                      borderRadius="lg"
                      boxShadow="md"
                      fontSize="2xl"
                      transition="all 0.2s ease"
                      _hover={{
                        transform: "scale(1.2)",
                        color: "blue.700",
                        bg: "blue.50",
                      }}
                    />
                  )}
                </HStack>
              </Box>

            </VStack>

            {/* RIGHT WHITE CARD */}
            <Box
              bg="white"
              borderRadius="2xl"
              boxShadow="md"
              p={6}
              w="100%"
              maxH="500px"
              overflowY="auto"
              overflowX="hidden"
              pr={4}                 // ✅ space for scrollbar
              sx={{
                scrollbarWidth: "thin",
                scrollbarColor: "#c0c0c0 #f5f5f5",
                "&::-webkit-scrollbar": {
                  width: "8px",
                },
                "&::-webkit-scrollbar-thumb": {
                  backgroundColor: "#c0c0c0",
                  borderRadius: "8px",
                },
                "&::-webkit-scrollbar-track": {
                  backgroundColor: "#f5f5f5",
                  borderRadius: "8px",
                },
                "&::-webkit-scrollbar-corner": {
                  backgroundColor: "transparent",
                },
              }}
              clipPath="inset(0 round 1rem)" // ✅ ensures corner radius stays even with scroll
            >
              {selectedPerson?.heading && (
                <Text
                  fontSize="2xl"
                  fontWeight="semibold"
                  color="gray.800"
                  mb={8}
                >
                  {selectedPerson.heading}
                </Text>
              )}

              {selectedPerson?.bio &&
                selectedPerson.bio.split(/\n{2,}|\n/).map((para, idx) => (
                  <Text
                    key={idx}
                    fontSize="xl"
                    lineHeight="1.8"
                    color="gray.700"
                    mb={4}
                  >
                    {para}
                  </Text>
                ))}
            </Box>
          </Grid>
        </ModalContent>
      </Modal>

    </Box>
  );
}
