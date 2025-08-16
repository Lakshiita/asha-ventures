import {
  Avatar, Box, Card, CardBody, Container, Grid, Heading, Text, HStack, VStack,
  Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalCloseButton, useDisclosure, Image, Badge, Icon
} from "@chakra-ui/react";
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Section from "../components/Section.jsx";
import peopleData from "../data/people.json";



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

function AlumniGrid({ data, onPersonClick }) {
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
            }, index * 200);
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
    <Grid templateColumns={{ base: "1fr", md: "repeat(3, 1fr)", lg: "repeat(4, 1fr)" }} gap={4}>
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
          w="250px"
          h="320px"
        >
          <CardBody p={0} display="flex" flexDirection="column" h="full">
            <Box position="relative" overflow="hidden" borderRadius="md" h="240px" bg="gray.50">
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
            <VStack spacing={1} align="center" p={3} bg="white">
              <Heading size="sm" textStyle="defaultText">
                {p.name}
              </Heading>
              <Text textStyle="defaultText" fontSize="xs">
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
              <Heading size="lg" mb={6} textStyle="defaultText">Alumni</Heading>
              <AlumniGrid data={peopleData.alumni} onPersonClick={handlePersonClick} />
            </Box>
            <Box>
              <Heading size="lg" mb={6} textStyle="defaultText">Early Supporters</Heading>
              <PeopleGrid data={peopleData.supporters} onPersonClick={handlePersonClick} />
            </Box>
          </VStack>
        </Container>
      </Section>

      <Modal isOpen={isOpen} onClose={onClose} size="lg">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader textStyle="defaultText">{selectedPerson?.name}</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <HStack spacing={6} align="start">
              <Avatar name={selectedPerson?.name} src={selectedPerson?.img} size="2xl" />
              <Box>
                <Text textStyle="defaultText" fontSize="lg">{selectedPerson?.role}</Text>
                <Text mt={4} textStyle="defaultText">{selectedPerson?.bio}</Text>
              </Box>
            </HStack>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
}
