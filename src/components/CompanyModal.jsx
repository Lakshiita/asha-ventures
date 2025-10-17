import {
  Badge,
  Box,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
  Flex,
  Heading,
  IconButton,
  Image,
  Link,
  Text,
  VStack,
} from "@chakra-ui/react";
import { ExternalLinkIcon } from "@chakra-ui/icons";
import { FaLinkedin } from "react-icons/fa";

export default function CompanyModal({ isOpen, onClose, company }) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} size="full">
      <ModalOverlay />
      <ModalContent>
        <ModalCloseButton />
        {company && (
          <VStack spacing={0} align="stretch" h="100vh" overflow="auto">
            {/* Header Section with Logo and Actions */}
            <Box p={{ base: 4, md: 8 }} borderBottomWidth="1px">
              <Flex align="center" justify="space-between" mb={4}>
                <Box>
                  <Heading size="xl" mb={2}>{company.name}</Heading>
                  <Image
                    src={company.logo}
                    alt={`${company.name} logo`}
                    h={{ base: "80px", md: "100px" }}
                    maxW={{ base: "200px", md: "300px" }}
                    objectFit="contain"
                  />
                </Box>
                <Flex gap={2}>
                  {company.website && (
                    <IconButton
                      as="a"
                      href={company.website}
                      target="_blank"
                      icon={<ExternalLinkIcon />}
                      size="lg"
                      colorScheme="brand"
                      aria-label="Website"
                    />
                  )}
                  {company.linkedin && (
                    <IconButton
                      as="a"
                      href={company.linkedin}
                      target="_blank"
                      icon={<FaLinkedin />}
                      size="lg"
                      colorScheme="linkedin"
                      aria-label="LinkedIn"
                    />
                  )}
                </Flex>
              </Flex>
              
              <Flex gap={2} mb={2}>
                <Badge colorScheme="brand" fontSize="md" p={2}>{company.sector}</Badge>
                <Badge colorScheme={company.status === "active" ? "green" : company.status === "exited" ? "red" : "yellow"} fontSize="md" p={2}>
                  {company.status.charAt(0).toUpperCase() + company.status.slice(1)}
                </Badge>
              </Flex>
              
              {company["year-of-investment"] && (
                <Text fontSize="lg" color="gray.600">
                  <b>Year of Investment:</b> {company["year-of-investment"].join(", ")}
                </Text>
              )}
            </Box>

            {/* Main Content */}
            <Box p={{ base: 4, md: 8 }} flex="1">
              <Flex gap={{ base: 6, md: 8 }} mb={8} direction={{ base: "column", lg: "row" }}>
                <Box flex={1}>
                  <Heading size="md" mb={4} color="gray.700">About</Heading>
                  <Text fontSize="lg" lineHeight={1.8}>
                    {company.description}
                  </Text>
                </Box>
                {company["detailed-image"] && (
                  <Box w={{ base: "100%", lg: "400px" }} flexShrink={0}>
                    <Image
                      src={company["detailed-image"]}
                      alt={`${company.name} detailed view`}
                      w="100%"
                      h={{ base: "300px", lg: "300px" }}
                      objectFit="cover"
                      rounded="lg"
                      shadow="lg"
                    />
                  </Box>
                )}
              </Flex>

              {company["latest-news"]?.length > 0 && (
                <Box>
                  <Heading size="md" mb={4} color="gray.700">
                    Latest News
                  </Heading>
                  <VStack spacing={4} align="stretch">
                    {company["latest-news"].map((news, i) => (
                      <Link
                        key={i}
                        href={news.url}
                        target="_blank"
                        color="blue.500"
                        fontSize="lg"
                        p={4}
                        rounded="md"
                        border="1px solid"
                        borderColor="gray.200"
                        _hover={{ bg: "gray.50", textDecoration: "none", borderColor: "blue.300" }}
                        display="block"
                      >
                        {news.title}
                      </Link>
                    ))}
                  </VStack>
                </Box>
              )}
            </Box>
          </VStack>
        )}
      </ModalContent>
    </Modal>
  );
}