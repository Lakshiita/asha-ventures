import { Box, Container, Heading, Text, VStack, HStack, Image, Icon, Link } from "@chakra-ui/react";
import { FaLinkedinIn, FaEnvelope } from "react-icons/fa";
import Section from "../components/Section.jsx";

export default function PramodBhasin() {
  return (
    <Box>
      <Section>
        <Box w="100%" px={4}>
          <HStack spacing={12} align="start" w="100%">
            <VStack spacing={6} align="stretch" w="35%">
              <Text textStyle="defaultText">
                Pramod's career spans a professional & entrepreneurial journey in Financial Services & Business Process Management across the globe. He built Genpact, a global leader in Business Process Management from the start in 1997 and was its President & CEO till 2011.
              </Text>
              <Text textStyle="defaultText">
                The company was listed on NYSE in 2007 and is the leader in its industry with over 75,000 employees, operating in 17 countries. Pramod is considered the pioneer of the BPM Industry in India. Genpact, under his leadership also pioneered this industry in China, Eastern Europe and Latin America.
              </Text>
              <Text textStyle="defaultText">
                Prior to Genpact, his career with GE spanned 25 years across the US, UK and Asia. He was earlier the CEO of GE Capital in India & Asia and prior to that worked with GE Capital in Stamford, CT in the Leveraged Buy Out group.
              </Text>
            </VStack>

            <VStack spacing={6} align="stretch" w="35%">
              <Text textStyle="defaultText">
                In September 2016, Pramod along with partners acquired the businesses of GE Capital – India, now known as Clix Capital. He is the Chairman of Clix Capital, which is a broad based NBFC, focused on providing digital platforms and financial services to commercial companies and consumers across India.
              </Text>
              <Text textStyle="defaultText">
                Pramod is the co-founder of Asha Ventures, Virtual Fund focused on Social Impact Investments and Advocacy. He is an active investor in different companies, from start-ups to ongoing businesses. He has also co-founded the Skills Academy that focuses on providing vocational skills training to lower income youth in villages across the country.
              </Text>
              <Text textStyle="defaultText">
                Pramod serves on the Boards of DLF Ltd, SRF Ltd and NDTV. He is also on the governing Board of ICRIER, Help Age and The Shri Ram School. He has been the Chairman of Nasscom and noted "IT Man of the Year" by Dataquest.
              </Text>
            </VStack>

            <VStack spacing={6} align="center" w="30%">
              <Heading size="xl" textStyle="defaultText">Founder</Heading>
              <Heading size="2xl" textStyle="defaultText">Pramod Bhasin</Heading>
              <Image 
                src="/assets/founders/Pramod-founder.jpg" 
                alt="Pramod Bhasin" 
                w="full" 
                h="400px" 
                objectFit="cover" 
                borderRadius="lg"
              />
              <HStack spacing={4}>
                <Link href="#" isExternal>
                  <Icon as={FaLinkedinIn} boxSize={6} color="textColor2" />
                </Link>
                <Link href="#" isExternal>
                  <Icon as={FaEnvelope} boxSize={6} color="textColor2" />
                </Link>
              </HStack>
            </VStack>
          </HStack>
        </Box>
      </Section>
    </Box>
  );
}