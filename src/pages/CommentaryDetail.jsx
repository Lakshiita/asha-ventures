import {
  Box,
  Heading,
  Text,
  VStack,
  Image,
  Button,
  Grid,
  Divider,
  Tag,
} from "@chakra-ui/react";
import { FaArrowLeft, FaCalendarAlt } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import commentariesData from "../data/commentaries.json";

export default function CommentaryDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const commentary = commentariesData[id];

  if (!commentary) {
    return (
      <Box textAlign="center" py={20}>
        <Heading color="red.500">Commentary not found.</Heading>
        <Button mt={6} onClick={() => navigate("/knowledge")} colorScheme="blue">
          Back to Knowledge
        </Button>
      </Box>
    );
  }

  return (
    <Box bg="gray.50" minH="100vh" py={10}>
      <Box maxW="6xl" mx="auto" px={6}>
        <Button
          leftIcon={<FaArrowLeft />}
          variant="ghost"
          colorScheme="blue"
          mb={6}
          onClick={() => navigate("/knowledge")}
        >
          Back to Commentaries
        </Button>

        {/* Top Section */}
        <VStack spacing={6} align="start">
          <Heading fontSize="4xl" fontWeight="bold" color="blue.700">
            {commentary.heading}
          </Heading>
          <Image
            src={commentary.image}
            alt={commentary.heading}
            w="100%"
            borderRadius="2xl"
            boxShadow="md"
          />
        </VStack>
        <Grid
        // templateColumns={{ base: "1fr", lg: "1fr 1fr" }}
        // gap={12}
        // alignItems="start"
        >
          {/* Left Section */}
          <VStack align="start" spacing={6}>
            <Tag 
              mt={4}
              size="lg"
              colorScheme="blue"
              borderRadius="full"
              px={4}
              py={1}
              fontWeight="semibold"
            >
              <FaCalendarAlt style={{ marginRight: "8px" }} />
              {commentary.date}
            </Tag>

            <Box w="70px" h="3px" bg="blue.400" borderRadius="full" />

            <Box fontSize="2xl" color="gray.700">
              <ReactMarkdown>{commentary.content}</ReactMarkdown>
            </Box>
          </VStack>

        </Grid>

        <Divider my={10} />

        <Text fontSize="md" color="gray.500" textAlign="center">
          © {new Date().getFullYear()} Commentary • All Rights Reserved
        </Text>
      </Box>
    </Box>
  );
}
