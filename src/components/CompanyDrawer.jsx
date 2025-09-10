import {
  Badge,
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Heading,
  HStack,
  Image,
  Link,
  Stack,
  Text,
} from "@chakra-ui/react";
import { ExternalLinkIcon } from "@chakra-ui/icons";

export default function CompanyDrawer({ isOpen, onClose, company }) {
  return (
    <Drawer isOpen={isOpen} placement="right" onClose={onClose} size="md">
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader borderBottomWidth="1px">{company?.name}</DrawerHeader>
        <DrawerBody>
          {company && (
            <Stack spacing={4}>
              {company["detailed-image"] && (
                <Image
                  src={company["detailed-image"]}
                  alt={`${company.name} detailed view`}
                  w="100%"
                  h="200px"
                  objectFit="cover"
                  rounded="md"
                />
              )}
              <Image
                src={company.logo}
                alt={`${company.name} logo`}
                h="60px"
                objectFit="contain"
              />
              <HStack spacing={2}>
                <Badge colorScheme="brand">{company.sector}</Badge>
                {company.stage && <Badge>{company.stage}</Badge>}
              </HStack>
              <Text>{company.description}</Text>

              {/* Investments */}
              {company["year-of-investment"] && (
                <Text fontSize="sm" color="gray.600">
                  <b>Year of Investment:</b>{" "}
                  {company["year-of-investment"].join(", ")}
                </Text>
              )}

              {/* Website */}
              {company.website && (
                <Button
                  as="a"
                  href={company.website}
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
              {company["latest-news"]?.length > 0 && (
                <Box>
                  <Heading size="sm" mb={2}>
                    Latest News
                  </Heading>
                  <Stack spacing={2}>
                    {company["latest-news"].map((news, i) => (
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
  );
}