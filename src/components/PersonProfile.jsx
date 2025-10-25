import {
  Box,
  Heading,
  Text,
  VStack,
  HStack,
  Image,
  Icon,
  Link,
  Badge,
  Button,
  Grid,
} from "@chakra-ui/react";
import { FaLinkedinIn, FaEnvelope, FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function PersonProfile({
  name,
  role,
  linkedin,
  email,
  image,
  intro,
  leftDetails,
  rightDetails,
}) {
  const navigate = useNavigate();

  return (
    <Box bg="gray.100" minH="100vh" py={10}>
      <Box maxW="7xl" mx="auto" px={6}>
        <Button
          leftIcon={<FaArrowLeft />}
          variant="ghost"
          colorScheme="orange"
          mb={6}
          onClick={() => navigate("/people")}
        >
          Back to People
        </Button>

        <Grid
          templateColumns={{ base: "1fr", lg: "1fr 1fr" }}
          gap={12}
          alignItems="start"
        >
          {/* Left Section */}
          <VStack align="start" spacing={6}>
            <Badge colorScheme="orange" fontWeight="bold" fontSize="md">
              {role}
            </Badge>

            <HStack spacing={4}>
              <Heading fontSize="4xl" fontWeight="bold" color="gray.800">
                {name}
              </Heading>
              <HStack spacing={3}>
                {linkedin && (
                  <Link href={linkedin} isExternal>
                    <Icon
                      as={FaLinkedinIn}
                      boxSize={5}
                      color="gray.600"
                      _hover={{ color: "blue.500" }}
                    />
                  </Link>
                )}
                {email && (
                  <Link href={`mailto:${email}`} isExternal>
                    <Icon
                      as={FaEnvelope}
                      boxSize={5}
                      color="gray.600"
                      _hover={{ color: "blue.500" }}
                    />
                  </Link>
                )}
              </HStack>
            </HStack>

            <Box w="70px" h="3px" bg="orange.400" borderRadius="full" />

            {intro && (
              <Text fontSize="xl" fontWeight="semibold" color="gray.800">
                {intro}
              </Text>
            )}

            {/* Dynamic left details */}
            <VStack align="start" spacing={4} fontSize="lg" color="gray.700">
              {leftDetails.map((text, i) => (
                <Text key={i}>{text}</Text>
              ))}
            </VStack>
          </VStack>

          {/* Right Section */}
          <VStack spacing={6} align="start">
            <Image
              src={image}
              w="60%"
              mx="auto"
            //   borderRadius="2xl"
            //   shadow="lg"
            //   bg="white"
            />

            <VStack align="start" spacing={4} fontSize="lg" color="gray.700">
              {rightDetails.map((text, i) => (
                <Text key={i}>{text}</Text>
              ))}
            </VStack>
          </VStack>
        </Grid>
      </Box>
    </Box>
  );
}
