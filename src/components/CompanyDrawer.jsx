import {
  Badge,
  Box,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  Grid,
  Heading,
  IconButton,
  Image,
  Link,
  Text,
  VStack,
} from "@chakra-ui/react";
import { ExternalLinkIcon } from "@chakra-ui/icons";
import { FaLinkedin } from "react-icons/fa";

export default function CompanyDrawer({ isOpen, onClose, company }) {
  return (
    <Drawer isOpen={isOpen} placement="right" onClose={onClose} size={{ base: "full", md: "lg" }}>
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader borderBottomWidth="1px">{company?.name}</DrawerHeader>
        <DrawerBody p={0}>
          {company && (
            <VStack spacing={0} align="stretch">
              {/* Header Section with Logo and Actions */}
              <Box p={{ base: 4, md: 6 }} borderBottomWidth="1px">
                <Flex align="center" justify="space-between" mb={4}>
                  <Image
                    src={company.logo}
                    alt={`${company.name} logo`}
                    h={{ base: "60px", md: "80px" }}
                    maxW={{ base: "150px", md: "200px" }}
                    objectFit="contain"
                  />
                  <Flex gap={2}>
                    {company.website && (
                      <IconButton
                        as="a"
                        href={company.website}
                        target="_blank"
                        icon={<ExternalLinkIcon />}
                        size="sm"
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
                        size="sm"
                        colorScheme="linkedin"
                        aria-label="LinkedIn"
                      />
                    )}
                  </Flex>
                </Flex>
                
                <Flex gap={2} mb={2}>
                  <Badge colorScheme="brand">{company.sector}</Badge>
                  {company.stage && <Badge>{company.stage}</Badge>}
                </Flex>
                
                {company["year-of-investment"] && (
                  <Text fontSize="sm" color="gray.600">
                    <b>Year of Investment:</b> {company["year-of-investment"].join(", ")}
                  </Text>
                )}
              </Box>

              {/* Main Content */}
              <Box p={{ base: 4, md: 6 }}>
                <Flex gap={{ base: 4, md: 6 }} mb={6} direction={{ base: "column", md: "row" }}>
                  <Box flex={1}>
                    <Text fontSize="sm" lineHeight={1.6}>
                      {company.description}
                    </Text>
                  </Box>
                  {company["detailed-image"] && (
                    <Box w={{ base: "100%", md: "250px" }} flexShrink={0}>
                      <Image
                        src={company["detailed-image"]}
                        alt={`${company.name} detailed view`}
                        w="100%"
                        h={{ base: "200px", md: "180px" }}
                        objectFit="cover"
                        rounded="lg"
                        shadow="sm"
                      />
                    </Box>
                  )}
                </Flex>

                {company["latest-news"]?.length > 0 && (
                  <Box>
                    <Heading size="sm" mb={3} color="gray.700">
                      Latest News
                    </Heading>
                    <VStack spacing={3} align="stretch">
                      {company["latest-news"].map((news, i) => (
                        <Link
                          key={i}
                          href={news.url}
                          target="_blank"
                          color="blue.500"
                          fontSize="sm"
                          p={2}
                          rounded="md"
                          _hover={{ bg: "gray.50", textDecoration: "none" }}
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
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
}