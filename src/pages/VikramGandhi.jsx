import { Box, Container, Heading, Text, VStack, HStack, Image, Icon, Link } from "@chakra-ui/react";
import { FaLinkedinIn, FaEnvelope } from "react-icons/fa";
import Section from "../components/Section.jsx";

export default function VikramGandhi() {
  return (
    <Box>
      <Section>
        <Box w="100%" px={4}>
          <HStack spacing={12} align="start" w="100%">
            <VStack spacing={6} align="stretch" w="35%">
              <Text textStyle="defaultText">
                Vikram Gandhi is the Founder of Asha Ventures, an impact investing platform. He is a member of the Faculty of the Harvard Business School where he teaches in both the MBA & Executive Education programs. He is a Senior Advisor to The Canada Pension Plan Investment Board.
              </Text>
              <Text textStyle="defaultText">
                Asha Ventures, a platform set up by socially-conscious individuals led by Vikram, leverages their combined capital, networks and expertise to address the critical development challenges facing India and other emerging economies through impact investing, venture philanthropy and policy advocacy.
              </Text>
              <Text textStyle="defaultText">
                Prior to his current activities, Vikram was Vice Chairman of Investment Banking and Global Head of the Financial Institutions Business for Credit Suisse, in New York and Hong Kong. He was a member of Credit Suisse's Global Investment Banking Management Committee.
              </Text>
            </VStack>

            <VStack spacing={6} align="stretch" w="35%">
              <Text textStyle="defaultText">
                Prior to Credit Suisse, Vikram worked at Morgan Stanley as Co-Head of Global FIG in New York, heading the Firm's institutional strategy area, its Global E-commerce Committee, and as Country Head and President of Morgan Stanley India.
              </Text>
              <Text textStyle="defaultText">
                Vikram is a Board Member and Chairman of the Asian Regional Committee of Grameen Foundation, a Board Member of Jana Small Finance Bank, and a member of the Investment Committee at Gawa Capital. He is a Founding Member of Harvard University's South Asia Initiative and also a Founder of Ashoka University.
              </Text>
              <Text textStyle="defaultText">
                Vikram holds an MBA from the Harvard Business School where he was designated a Baker Scholar, and a B.Com with high distinction from the University of Mumbai. He is also a qualified Chartered Accountant.
              </Text>
            </VStack>

            <VStack spacing={6} align="center" w="30%">
              <Heading size="xl" textStyle="defaultText">Founder</Heading>
              <Heading size="2xl" textStyle="defaultText">Vikram Gandhi</Heading>
              <Image 
                src="/assets/founders/Vikram-founder.jpg" 
                alt="Vikram Gandhi" 
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