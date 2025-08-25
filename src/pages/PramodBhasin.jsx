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
  Badge
} from "@chakra-ui/react";
import { FaLinkedinIn, FaEnvelope } from "react-icons/fa";

export default function PramodBhasin() {
  return (
    <Container maxW="7xl" py={10}>
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
              Pramod Bhasin
            </Heading>
            <HStack spacing={3}>
              <Link href="#" isExternal>
                <Icon as={FaLinkedinIn} boxSize={5} color="gray.600" _hover={{ color: "blue.500" }} />
              </Link>
              <Link href="#" isExternal>
                <Icon as={FaEnvelope} boxSize={5} color="gray.600" _hover={{ color: "blue.500" }} />
              </Link>
            </HStack>
          </HStack>

          <Box w="60px" h="3px" bg="orange.400" borderRadius="full" />

          <Text fontSize="xl" fontWeight="semibold" color="gray.800">
            Pramod Bhasin is the co-founder of Asha Ventures and a veteran business leader.
          </Text>

          {/* First Half of Detailed Information */}
          <VStack align="start" spacing={4} fontSize="lg" color="gray.700">
            <Text>
              Pramod's career spans a professional & entrepreneurial journey in Financial Services & Business Process Management across the globe. He built Genpact, a global leader in Business Process Management from the start in 1997 and was its President & CEO till 2011.
            </Text>
            <Text>
              The company was listed on NYSE in 2007 and is the leader in its industry with over 75,000 employees, operating in 17 countries. Pramod is considered the pioneer of the BPM Industry in India. Genpact, under his leadership also pioneered this industry in China, Eastern Europe and Latin America.
            </Text>
            <Text>
              Prior to Genpact, his career with GE spanned 25 years across the US, UK and Asia. He was earlier the CEO of GE Capital in India & Asia and prior to that worked with GE Capital in Stamford, CT in the Leveraged Buy Out group.
            </Text>
            <Text>
              In September 2016, Pramod along with partners acquired the businesses of GE Capital – India, now known as Clix Capital. He is the Chairman of Clix Capital, which is a broad based NBFC, focused on providing digital platforms and financial services to commercial companies and consumers across India.
            </Text>
          </VStack>
        </VStack>

        {/* Right Section - Image with remaining text below */}
        <VStack spacing={6}>
          <Image 
            src="/assets/founders/Pramod-founder.jpg"
            borderRadius="2xl" 
            boxShadow="lg" 
            maxH="400px" 
            objectFit="cover" 
          />
          
          {/* Second Half of Detailed Information */}
          <VStack align="start" spacing={4} fontSize="lg" color="gray.700">
            <Text>
              Pramod is the co-founder of Asha Ventures, Virtual Fund focused on Social Impact Investments and Advocacy. He is an active investor in different companies, from start-ups to ongoing businesses. He has also co-founded the Skills Academy that focuses on providing vocational skills training to lower income youth in villages across the country.
            </Text>
            <Text>
              Pramod serves on the Boards of DLF Ltd, SRF Ltd and NDTV. He is also on the governing Board of ICRIER, Help Age and The Shri Ram School. He has been the Chairman of Nasscom and noted "IT Man of the Year" by Dataquest.
            </Text>
          </VStack>
        </VStack>
      </Grid>
    </Container>
  );
}