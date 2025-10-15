import {
  Box,
  Container,
  Heading,
  Text,
  VStack,
  HStack,
  Image,
  Icon,
  Link,
  Divider,
  Grid,
  Badge,
  Button
} from "@chakra-ui/react";
import { FaLinkedinIn, FaEnvelope, FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function VikramGandhi() {
  const navigate = useNavigate(); 
  return (
    <Container maxW="7xl" py={10}>
      {/* Back Button */}
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
        templateColumns={{ base: "1fr", md: "1fr 1fr" }}
        gap={8}
        alignItems="start"
      >
        {/* Left Section - Text */}
        <VStack align="start" spacing={6}>
          <Badge colorScheme="orange" fontWeight="bold" fontSize="md">
            Founder
          </Badge>

          <HStack spacing={4} align="center">
            <Heading fontSize="4xl" fontWeight="bold">
              Vikram Gandhi
            </Heading>
            <HStack spacing={3}>
              <Link href="https://www.linkedin.com/in/vikramgandhi" isExternal>
                <Icon as={FaLinkedinIn} boxSize={5} color="gray.600" _hover={{ color: "blue.500" }} />
              </Link>
              <Link href="mailto:vikram@example.com" isExternal>
                <Icon as={FaEnvelope} boxSize={5} color="gray.600" _hover={{ color: "blue.500" }} />
              </Link>
            </HStack>
          </HStack>

          <Box w="60px" h="3px" bg="orange.400" borderRadius="full" />

          <Text fontSize="xl" fontWeight="semibold" color="gray.800">
            Vikram Gandhi is the Founder of Asha Ventures, an impact investing platform.
          </Text>

          {/* First Half of Detailed Information */}
          <VStack align="start" spacing={4} fontSize="lg" color="gray.700">
            <Text>
              He is a member of the Faculty of the Harvard Business School where he teaches in both the MBA & Executive Education programs. He is also a Senior Advisor to The Canada Pension Plan Investment Board (www.cppib.com).
            </Text>
            <Text>
              Asha Ventures (www.ashaventures.in), set up by socially-conscious individuals led by Vikram, leverages capital, networks and expertise to address critical development challenges in India and other emerging economies through impact investing, venture philanthropy and policy advocacy.
            </Text>
            <Text>
              Currently based in India, Asha Ventures provides equity and grant capital to social enterprises while also engaging with government, business and civil society on key policy issues.
            </Text>
            <Text>
              Prior to his current activities, Vikram was Vice Chairman of Investment Banking and Global Head of the Financial Institutions Business for Credit Suisse, in New York and Hong Kong.
            </Text>
            <Text>
              At Credit Suisse, he was a member of the Global Investment Banking Management Committee and the Fixed Income Operating Committee. Prior to that, Vikram worked at Morgan Stanley where he was Co-Head of Global FIG in New York, and earlier, Country Head and President of Morgan Stanley India.
            </Text>

          </VStack>
        </VStack>

        {/* Right Section - Image with remaining text below */}
        <VStack spacing={6}>
          <Image
            src="/assets/founders/Vikram-founder.jpg"
            borderRadius="2xl"
            boxShadow="lg"
            maxH="400px"
            objectFit="cover"
          />

          {/* Second Half of Detailed Information */}
          <VStack align="start" spacing={4} fontSize="lg" color="gray.700">
            <Text>
              Over his 23-year career in investment banking, Vikram advised Boards and CEOs globally on strategic direction, mergers, acquisitions, and capital raising initiatives.
            </Text>
            <Text>
              Beyond finance, Vikram has been actively involved in developmental activities. He is a Board Member and Chairman of the Asian Regional Committee of Grameen Foundation, a Board Member of Jana Small Finance Bank, and part of the Investment Committee at Gawa Capital.
            </Text>
            <Text>
              Vikram is a Founding Member of Harvard University's South Asia Initiative and a Founder of Ashoka University, India’s first liberal arts college.
            </Text>
            <Text>
              He holds an MBA from Harvard Business School (Baker Scholar), a B.Com from the University of Mumbai with high distinction, and is a qualified Chartered Accountant.
            </Text>
          </VStack>
        </VStack>
      </Grid>
    </Container>
  );
}
