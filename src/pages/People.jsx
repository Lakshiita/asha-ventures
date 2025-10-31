import {
  Avatar, Box, Card, CardBody, Container, Grid, Heading, Text, HStack, VStack,
  Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalCloseButton, useDisclosure, Image, Badge, Icon, Link, IconButton,
  Tabs, TabList, TabPanels, Tab, TabPanel
} from "@chakra-ui/react";
import { FaEnvelope, FaLinkedin } from "react-icons/fa";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Section from "../components/Section.jsx";
import peopleData from "../data/people.json";
import { chakra, shouldForwardProp } from "@chakra-ui/react";
import { isValidMotionProp, motion } from "framer-motion";
import FoundersGrid from "./FoundersGrid.jsx"; // ✅ optional external file if you split
import PeopleGrid from "./PeopleGrid.jsx";    // ✅ optional external file if you split

const MotionModalContent = chakra(motion.div, {
  shouldForwardProp: (prop) =>
    isValidMotionProp(prop) || shouldForwardProp(prop),
});

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
            <Heading
              size={{ base: "2xl", md: "3xl" }}
              mb={0}
              color="blue.700"
              fontWeight="extrabold"
              letterSpacing="wide"
              textAlign="center"
              fontFamily="'Playfair Display', serif"
            >
              Meet Our People
            </Heading>

            {/* ✅ Tabs for Founders / Team / Supporters */}
            <Tabs variant="soft-rounded" colorScheme="blue" align="center">
              <TabList
                justifyContent="center"
                mb={7}
                borderRadius="xl"
                bg="gray.100"
                p={2}
                w={{ base: "95%", sm: "100%", md: "550px" }}
                // minW={{ base: "100%", md: "70%" }}
                mx="auto"
                gap={{ base: 1, sm: 2, md: 12 }}
              >

                <Tab _selected={{ color: "white", bg: "blue.700" }} fontWeight="semibold" fontSize="lg">
                  Founders
                </Tab>
                <Tab _selected={{ color: "white", bg: "blue.700" }} fontWeight="semibold" fontSize="lg">
                  Team
                </Tab>
                <Tab _selected={{ color: "white", bg: "blue.700" }} fontWeight="semibold" fontSize="lg">
                  Early Supporters
                </Tab>
              </TabList>

              <TabPanels>
                {/* Founders */}
                <TabPanel>
                  <FoundersGrid data={peopleData.founders} />
                </TabPanel>

                {/* Team */}
                <TabPanel>
                  <PeopleGrid data={peopleData.team} onPersonClick={handlePersonClick} />
                </TabPanel>

                {/* Early Supporters */}
                <TabPanel>
                  <PeopleGrid data={peopleData.supporters} onPersonClick={handlePersonClick} />
                </TabPanel>
              </TabPanels>
            </Tabs>
          </VStack>
        </Container>
      </Section>
      <Modal isOpen={isOpen} onClose={onClose} size="10xl" isCentered>
        <ModalOverlay bg="blackAlpha.600" backdropFilter="blur(5px)" />
        <ModalContent
          as={MotionModalContent}
          bg="#e0e0e0ff"
          borderRadius="xl"
          p={{ base: 4, md: 6 }}
          maxW="85vw"
          maxH="85vh"
          w="85vw"
          h="85vh"
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
            pr={{ base: 0, md: 8 }}
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
