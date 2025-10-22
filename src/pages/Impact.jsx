import {
  Box, Container, Heading, Text, Card, CardHeader, CardBody, Badge, IconButton, Flex, Image, Button, Grid, Stack, Divider
} from "@chakra-ui/react";
import { ChevronRightIcon, ChevronLeftIcon } from "@chakra-ui/icons";
import { FaChevronLeft, FaChevronRight, FaQuoteLeft } from "react-icons/fa";
import { useState, useEffect } from "react";
import Section from "../components/Section.jsx";

function CardBlock({ title, children, image, tag }) {
  return (
    <Card 
      bg="white" 
      border="1px solid" 
      borderColor="blackAlpha.100" 
      minH="300px" 
      w="60vw" 
      mx="auto" 
      px={16} 
      py={12} 
      borderRadius="0"
      _hover={{ bg: "blue.50" }}
      transition="background-color 0.2s"
    >
      <Flex align="flex-start" gap={10}>
        <Image
          src={image}
          alt={title}
          w="200px"
          h="200px"
          objectFit="cover"
          borderRadius="md"
        />
        <Box flex="1">
          <CardHeader p={0} mb={6}>
            <Heading size="xl">
              {title} {tag && <Badge ml={2} colorScheme="brand">{tag}</Badge>}
            </Heading>
          </CardHeader>
          <CardBody p={0}>
            <Text fontSize="xl">
              {children}
            </Text>
          </CardBody>
        </Box>
      </Flex>
    </Card>
  );
}

function ReportCard({ title, image, pdfUrl, summary }) {
  return (
    <Card bg="white" border="1px solid" borderColor="blackAlpha.100" p={12} borderRadius="0" minH="300px">
      <Flex align="flex-start" gap={10}>
        <Image
          src={image}
          alt={title}
          w="250px"
          h="250px"
          objectFit="contain"
          borderRadius="md"
          flexShrink={0}
        />
        <Box flex="1">
          <Heading size="lg" mb={6}>{title}</Heading>
          <Text mb={8} color="gray.600" fontSize="lg">{summary}</Text>
          <Button colorScheme="brand" size="lg" onClick={() => window.open(pdfUrl, '_blank')}>
            Download PDF
          </Button>
        </Box>
      </Flex>
    </Card>
  );
}

function TestimonialCarousel() {
  const [index, setIndex] = useState(0);
  
  const testimonials = [
    {
      text: "My mother suffers from Diabetes and Blood Pressure. Every month I used to spend more than INR 5,000 on medicines alone. I have tried buying generic medicines before as well, but the supply with the local chemist is erratic. They also try to sell medicines of companies that I have not even heard of. Ever since I have discovered Truemeds I have been ordering medicines through the app. Each month I am able to save more than INR 2,000. They do a doctor consultation before changing your medicine and that is very reassuring. The medicines that they sell are of high quality companies and you are confident that you are getting the best products at best prices.",
      company: "Truemeds",
      year: "",
      image: "/assets/customer_testimonials/truemeds-768x530.png"
    },
    {
      text: "I heard about Adda247 from a friend who was a student of Career Power. When I wanted to prepare for IBPS I was clear that I'll enroll with Adda247 to help in my preparation. For a student it is important that there is a guided journey, there is a lot of free content on Youtube but you get lost there. At Adda, you get packaged content for the exam you are preparing and that is very important. I have been able to clear the banking entrance exam because of the Adda247 team and I am very grateful to them.",
      company: "Adda247",
      year: "",
      image: "/assets/customer_testimonials/adda7_voice.png"
    },
    {
      text: "Before Gramophone came to our village I would spend 4 hours reaching the nearest input shop, and then depend on the local retailer to suggest products when pests infested my farm. Further, many times seeds purchased from local retailers have turned out to be fake. Now when I have a problem, I get immediate advice from the Gramophone team and I get the right agri-input at my doorstep. I saved Rs. 4,000 last season because Gramophone told me to use a combination of three pesticides, compared to the local retailer who would always give me five different products. I also sleep better knowing all the products I buy from Gramophone are genuine and of high quality.",
      company: "Gramophone",
      year: "",
      image: "/assets/customer_testimonials/indian-farmer-working-in-green-chickpea-garden.jpg"
    },
    {
      text: "Translated from Gujarati – waste pickers have no say in the informal sector. We are at the mercy of the kabadiwallas (informal aggregator). They weigh our waste arbitrarily, pay us arbitrarily and then make us run after them to get the payment. Since Nepra has started collecting from our area, the status of a waste picker has changed. They show us exactly what the waste of our collection is on a digital scale, they come on time every day so I know when to be here, and I get immediate payment directly in my bank account. I also get more money for the same amount of waste, compared to the kabadiwalla I used to sell to before.",
      company: "Nepra",
      year: "",
      image: "/assets/customer_testimonials/istockphoto-1226515779-612x612-1.jpg"
    }
  ];

  const prev = () => setIndex((i) => (i === 0 ? testimonials.length - 1 : i - 1));
  const next = () => setIndex((i) => (i === testimonials.length - 1 ? 0 : i + 1));

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((i) => (i === testimonials.length - 1 ? 0 : i + 1));
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const testimonial = testimonials[index];

  return (
    <Box w="100%" py={20}>
      <Heading
        textAlign="center"
        color="blue.700"
        fontFamily="'Playfair Display', serif"
        mb={2}
      >
        Experiences That Inspire Us
      </Heading>
      <Text textAlign="center" color="gray.500" mb={8}>
        Real stories of transformation and impact from the communities we serve.
      </Text>
      <Divider my={6} />
      <Box position="relative" minH="400px">
        <Flex
          maxW="6xl"
          mx="auto"
          px={6}
          direction={{ base: "column", md: "row" }}
          align="center"
          minH="400px"
        >
          <Stack flex="1" spacing={6} pr={{ md: 4 }}>
            <FaQuoteLeft size="40px" color="#ED8936" />
            <Text
              fontSize="lg"
              color="gray.700"
              textAlign="justify"
              key={index}
              sx={{ animation: "fadeIn 0.6s ease-in-out" }}
            >
              {testimonial.text}
            </Text>
            <Box>
              <Heading size="md" color="orange.600">
                {testimonial.company}
              </Heading>
              <Text fontSize="sm" color="gray.500">
                {testimonial.year}
              </Text>
            </Box>
          </Stack>

          <Box flex="1" textAlign="center" mt={{ base: 8, md: 0 }}>
            <Box w="300px" h="300px" mx="auto">
              {testimonial.image ? (
                <Image
                  src={testimonial.image}
                  alt={testimonial.company}
                  rounded="xl"
                  objectFit="cover"
                  w="100%"
                  h="100%"
                  key={index}
                  sx={{ animation: "fadeIn 0.6s ease-in-out" }}
                />
              ) : (
                <Box
                  w="100%"
                  h="100%"
                  bg="gray.100"
                  rounded="xl"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  color="gray.500"
                  fontSize="sm"
                >
                  Image Coming Soon
                </Box>
              )}
            </Box>
          </Box>
        </Flex>

        <IconButton
          aria-label="Previous"
          icon={<FaChevronLeft />}
          onClick={prev}
          position="absolute"
          top="200px"
          left="20px"
          bg="transparent"
          color="gray.600"
          _hover={{ bg: "transparent", color: "orange.500" }}
        />
        <IconButton
          aria-label="Next"
          icon={<FaChevronRight />}
          onClick={next}
          position="absolute"
          top="200px"
          right="20px"
          bg="transparent"
          color="gray.600"
          _hover={{ bg: "transparent", color: "orange.500" }}
        />
      </Box>

      <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0; transform: translateX(20px); }
            to { opacity: 1; transform: translateX(0); }
          }
        `}
      </style>
    </Box>
  );
}

function SquareCard({ title, bgColor = "white", content = "Content coming soon..." }) {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <Box
      position="relative"
      aspectRatio={1}
      minH="200px"
      onMouseEnter={() => setIsFlipped(true)}
      onMouseLeave={() => setIsFlipped(false)}
      style={{ perspective: "1000px" }}
    >
      <Box
        position="absolute"
        w="100%"
        h="100%"
        transition="transform 0.6s"
        style={{
          transformStyle: "preserve-3d",
          transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)"
        }}
      >
        {/* Front Side */}
        <Card
          bg={bgColor}
          border="1px solid"
          borderColor="blackAlpha.100"
          p={8}
          borderRadius="md"
          display="flex"
          alignItems="center"
          justifyContent="center"
          h="100%"
          position="absolute"
          w="100%"
          style={{ backfaceVisibility: "hidden" }}
        >
          <Heading size="md" textAlign="center" color={bgColor === "white" ? "black" : "white"}>
            {title}
          </Heading>
        </Card>
        
        {/* Back Side */}
        <Card
          bg="white"
          border="1px solid"
          borderColor="blackAlpha.100"
          p={6}
          borderRadius="md"
          display="flex"
          alignItems="center"
          justifyContent="center"
          h="100%"
          position="absolute"
          w="100%"
          style={{
            backfaceVisibility: "hidden",
            transform: "rotateY(180deg)"
          }}
        >
          <Text textAlign="center" color="black" fontSize="sm">
            {content}
          </Text>
        </Card>
      </Box>
    </Box>
  );
}

export default function Impact() {
  const [currentCard, setCurrentCard] = useState(0);
  
  const cards = [
    { title: "1. No Poverty", content: "We invest to improve access to basic services, natural resources and appropriate new technology and financial services.", image: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80" },
    { title: "2. Zero Hunger", content: "We invest to ensure sustainable food production and improve access to input, knowledge, market and financial resources to increase the production and income of smallholder farmers of India.", image: "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80" },
    { title: "3. Good Health and Well-Being", content: "We invest to increase the reach of essential health-care services and access to safe and affordable critical medicines & vaccines.", image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80" },
    { title: "4. Quality Education", content: "We invest to ensure equal access to affordable and quality education, relevant skills and improve education outcomes.", image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80" },
    { title: "5. Gender Equality", content: "We invest to empower women with technology and provide them with equal access to job opportunities at all levels.", image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80" },
    { title: "6. Affordable and Clean Energy", content: "We invest to increase the share and efficiency of renewable energy in India's overall energy mix.", image: "https://images.unsplash.com/photo-1466611653911-95081537e5b7?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80" },
    { title: "7. Decent Work and Economic Growth", content: "We invest to ensure safe and respectable work for all women and men and increase the formalization and growth of India's MSMEs.", image: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80" },
    { title: "8. Industry, Innovation and Infrastructure", content: "We invest to promote sustainable industrialization and infrastructure development which has the potential to lift people out of poverty without putting additional stress on people and the environment.", image: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80" },
    { title: "9. Reduced Inequality", content: "We invest to accelerate economic and social growth for India's emerging middle class.", image: "https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80" },
    { title: "10. Sustainable Cities and Communities", content: "We invest to provide adequate and affordable housing to India's masses and improve the quality of air and water.", image: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80" },
    { title: "11. Responsible Consumption and Production", content: "We invest to promote sustainable resource utilization and minimize the amount and adverse impact of waste on humans and the environment.", image: "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80" },
    { title: "12. Climate Action", content: "We invest to measure and mitigate the impact of climate change.", image: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80" },
    { title: "13. Life Below Water", content: "We invest to minimize the impact of several types of pollution and contamination on marine life.", image: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80" }
  ];

  const nextCard = () => {
    setCurrentCard((prev) => (prev + 1) % cards.length);
  };

  const prevCard = () => {
    setCurrentCard((prev) => (prev - 1 + cards.length) % cards.length);
  };

  return (
    <Box>
      <Section
        title="Our Impact"
        subtitle="We pair rigorous measurement with on-the-ground empathy to deliver meaningful, verifiable outcomes."
      >
        <Container maxW="1200px" mx="auto" px={8}>
          <Flex align="center" gap={4} justify="center" minH="400px">
            <IconButton
              icon={<ChevronLeftIcon />}
              onClick={prevCard}
              colorScheme="brand"
              size="lg"
              aria-label="Previous card"
              alignSelf="center"
            />
            <Box>
              <CardBlock title={cards[currentCard].title} image={cards[currentCard].image}>
                <Text>{cards[currentCard].content}</Text>
              </CardBlock>
            </Box>
            <IconButton
              icon={<ChevronRightIcon />}
              onClick={nextCard}
              colorScheme="brand"
              size="lg"
              aria-label="Next card"
              alignSelf="center"
            />
          </Flex>
        </Container>
      </Section>
      
      <Section
        title={<><Text>2X Challenge</Text><Text>Financing for Women</Text></>}
        subtitle="Empowering women through strategic financing across key areas."
      >
        <Grid templateColumns="repeat(4, 1fr)" gap={6} w="100vw" ml="calc(-50vw + 50%)" px={6}>
          <SquareCard title="Entrepreneurship" bgColor="blue.500" content="Eliminating bias by investing in women entrepreneurs." />
          <SquareCard title="Leadership" bgColor="green.500" content="Fostering women leaders across levels." />
          <SquareCard title="Employment" bgColor="teal.500" content="Increasing representation of women in the workforce of investee companies." />
          <SquareCard title="Consumption" bgColor="orange.500" content="Backing products and services disproportionally benefiting women and contributing to their agency and wellness" />
        </Grid>
      </Section>
      
      <Section
        title="Annual Reports"
        subtitle="Access our comprehensive annual reports and impact assessments."
      >
        <Grid templateColumns="1fr" gap={0} w="100vw" ml="calc(-50vw + 50%)">
          <ReportCard
            title="Annual Report 2022"
            summary="Comprehensive overview of our impact and achievements in 2022."
            image="/assets/annual reports images/annual-Report_2022.jpg"
            pdfUrl="/assets/annual reports pdf/Asha-Impact-Report_2022.pdf"
          />
          <ReportCard
            title="Annual Report 2019"
            summary="Detailed analysis of our initiatives and outcomes in 2019."
            image="/assets/annual reports images/annual report 2019.png"
            pdfUrl="/assets/annual reports pdf/Asha-Impact-Annual-Impact-Report-2019.pdf"
          />
          <ReportCard
            title="Annual Report 2018"
            summary="Key milestones and impact metrics from our 2018 activities."
            image="/assets/annual reports images/annual report 2018.jpg"
            pdfUrl="/assets/annual reports pdf/Asha-Impact-Annual-Impact-Report-2018.pdf"
          />
        </Grid>
      </Section>
      
      <TestimonialCarousel />
    </Box>
  );
}