import { Box, Heading, Text, VStack, Image, Button, Grid, Divider, Tag } from "@chakra-ui/react";
import { FaArrowLeft, FaCalendarAlt } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import ReactMarkdown from "react-markdown";
import commentariesData from "../data/commentaries.json";

export default function CommentaryDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const commentary = commentariesData[id];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

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
          textStyle="subHeading"
          leftIcon={<FaArrowLeft />}
          variant="ghost"
          colorScheme="blue"
          mb={6}
          onClick={() => navigate("/knowledge?tab=commentaries")}
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
        <Grid>
          <VStack align="start" spacing={10}>
            <Box mb={4} />

            <Box color="gray.700">
              <ReactMarkdown
                components={{
                  h1: ({ node, ...props }) => (
                    <Heading as="h1" fontSize="4xl" mt={8} mb={4} color="blue.800" {...props} />
                  ),
                  h2: ({ node, ...props }) => (
                    <Heading as="h2" fontSize="2xl" mt={8} mb={4} color="blue.700" {...props} />
                  ),
                  h3: ({ node, ...props }) => (
                    <Heading as="h3" fontSize="xl" mt={6} mb={3} {...props} />
                  ),
                  p: ({ node, ...props }) => (
                    <Text fontSize="xl" lineHeight="1.8" mb={6} textStyle="subHeading" fontWeight="390" {...props} />
                  ),
                  strong: ({ node, ...props }) => (
                    <Text as="strong" fontSize="xl" fontWeight="700" color="gray.800" {...props} />
                  ),
                  ul: ({ node, ...props }) => (
                    <Box as="ul" pl={6} mb={6} {...props} />
                  ),

                  ol: ({ node, ...props }) => (
                    <Box as="ol" pl={6} mb={6} {...props} />
                  ),

                  li: ({ node, ...props }) => (
                    <Box as="li" fontSize="lg" mb={2} {...props} />
                  ),
                }}
              >
                {commentary.content}
              </ReactMarkdown>
            </Box>
          </VStack>
        </Grid>
        <Box mb={10} />
      </Box>
    </Box>
  );
}
