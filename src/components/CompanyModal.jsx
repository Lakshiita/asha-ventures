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
  Divider,
} from "@chakra-ui/react";
import { FaLinkedin, FaExternalLinkAlt } from "react-icons/fa";

export default function CompanyModal({ isOpen, onClose, company }) {
  if (!company) return null;

  const statusColor =
    company.status?.toLowerCase() === "active"
      ? "green"
      : company.status?.toLowerCase() === "exited"
      ? "red"
      : "yellow";

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="full" scrollBehavior="inside">
      <ModalOverlay bg="blackAlpha.700" backdropFilter="blur(4px)" />
      <ModalContent
        bg="white"
        p={{ base: 4, md: 10 }}
        overflow="hidden"
        rounded="none"
      >
        <ModalCloseButton size="lg" top={6} right={6} color="gray.600" />

        <Flex
          direction={{ base: "column", lg: "row" }}
          align="flex-start"
          justify="space-between"
          h="100%"
          overflowY="auto"
          gap={{ base: 8, lg: 16 }}
        >
          {/* LEFT SECTION - TEXT */}
          <Box flex="1" maxW={{ base: "100%", lg: "55%" }}>
            <VStack align="flex-start" spacing={6}>
              <Heading size="2xl" color="gray.800">
                {company.name}
              </Heading>

              <Flex gap={3} wrap="wrap">
                <Badge colorScheme="blue" px={3} py={1} rounded="full" fontSize="md">
                  {company.sector}
                </Badge>
                <Badge
                  colorScheme={statusColor}
                  px={3}
                  py={1}
                  rounded="full"
                  fontSize="md"
                  textTransform="capitalize"
                >
                  {company.status}
                </Badge>
              </Flex>

              {company["year-of-investment"] && (
                <Text fontSize="lg" color="gray.600">
                  <b>Year of Investment:</b> {company["year-of-investment"].join(", ")}
                </Text>
              )}

              <Flex gap={4}>
                {company.linkedin && (
                  <IconButton
                    as="a"
                    href={company.linkedin}
                    target="_blank"
                    icon={<FaLinkedin />}
                    aria-label="LinkedIn"
                    fontSize="2xl"
                    variant="ghost"
                    color="blue.600"
                    _hover={{ transform: "scale(1.2)", bg: "blue.50" }}
                  />
                )}
                {company.website && (
                  <IconButton
                    as="a"
                    href={company.website}
                    target="_blank"
                    icon={<FaExternalLinkAlt />}
                    aria-label="Website"
                    fontSize="2xl"
                    variant="ghost"
                    color="blue.600"
                    _hover={{ transform: "scale(1.2)", bg: "blue.50" }}
                  />
                )}
              </Flex>

              <Divider borderColor="gray.200" />

              <Box>
                <Heading size="md" mb={3} color="gray.700">
                  About
                </Heading>
                <Text
                  fontSize="lg"
                  color="gray.700"
                  lineHeight="tall"
                  textAlign="justify"
                >
                  {company.description}
                </Text>
              </Box>

              {company["latest-news"]?.length > 0 && (
                <Box w="100%">
                  <Heading size="md" mb={3} color="gray.700">
                    Latest News
                  </Heading>
                  <VStack spacing={3} align="stretch">
                    {company["latest-news"].map((news, i) => (
                      <Link
                        key={i}
                        href={news.url}
                        target="_blank"
                        _hover={{ textDecoration: "none" }}
                      >
                        <Box
                          p={4}
                          border="1px solid"
                          borderColor="gray.200"
                          rounded="lg"
                          shadow="sm"
                          transition="all 0.2s"
                          _hover={{
                            shadow: "md",
                            transform: "translateY(-3px)",
                            borderColor: "blue.300",
                          }}
                        >
                          <Text fontSize="md" color="blue.600" fontWeight="semibold">
                            {news.title}
                          </Text>
                        </Box>
                      </Link>
                    ))}
                  </VStack>
                </Box>
              )}
            </VStack>
          </Box>

          {/* RIGHT SECTION - LOGO + IMAGE */}
          <Box
            flex="1"
            maxW={{ base: "100%", lg: "45%" }}
            display="flex"
            flexDir="column"
            alignItems="center"
            justifyContent="center"
            gap={6}
          >
            <Box
              bg="gray.50"
              rounded="2xl"
              p={{ base: 6, md: 10 }}
              shadow="md"
              transition="all 0.3s ease"
              _hover={{ shadow: "lg", transform: "scale(1.03)" }}
              w="100%"
              textAlign="center"
            >
              <Image
                src={company.logo}
                alt={`${company.name} logo`}
                h={{ base: "100px", md: "160px" }}
                objectFit="contain"
                mx="auto"
              />
            </Box>

            {company["detailed-image"] && (
              <Image
                src={company["detailed-image"]}
                alt={`${company.name} overview`}
                w="100%"
                h={{ base: "260px", md: "340px" }}
                objectFit="cover"
                rounded="2xl"
                shadow="lg"
              />
            )}
          </Box>
        </Flex>
      </ModalContent>
    </Modal>
  );
}
