import {
  Box, Card, CardBody, Container, Grid, Heading, Image, Stack, Tab,
  TabList, TabPanel, TabPanels, Tabs, Text, Link, Tag
} from "@chakra-ui/react";
import mediaData from "../data/media.json";
import newsletterData from "../data/newsletter.json";
import annual_reports from "../data/annual_reports.json";
import { CalendarIcon } from "@chakra-ui/icons";
import commentariesData from "../data/commentaries.json";
import { useNavigate, useSearchParams } from "react-router-dom";


export default function Knowledge() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const tabParam = searchParams.get('tab');
  const defaultTabIndex = tabParam === 'commentaries' ? 3 : 0;
  const cardStyles = {
    bg: "gray.100",
    border: "1px solid",
    borderColor: "gray.200",
    rounded: "40px",
    overflow: "hidden",
    cursor: "pointer",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    minH: "320px",
    w: { base: "100%", sm: "100%", md: "360px" },  // ❤️ Responsive
    maxW: "100%",  // stops overflow
    boxShadow: "base",
    transition: "all 0.3s ease",
    _hover: {
      transform: "translateY(-8px)",
      boxShadow: "-12px 12px 0px 0px rgba(197, 195, 195, 0.93)",
      borderColor: "rgba(195, 195, 195, 0.83)",
    },
  };


  return (
    <Box bg="#f4f4f4ff" py={12}>
      <Heading
        fontSize={{ base: "4xl", md: "6xl" }}
        color="blue.700"
        textAlign="center"
        textStyle="subHeading"
        mb={10}
      // mt={{ base: 6, md: 10 }}
      >
        Knowledge Resources
      </Heading>

      <Container mt={{ base: 8, md: 10 }} maxW="7xl" px={4}>
        <Tabs variant="soft-rounded" colorScheme="blue" align="center" defaultIndex={defaultTabIndex}>
          <TabList
            bg="#e6e7e9ff"
            p={3}
            mb={7}
            borderRadius="xl"
            w={{ base: "98%", sm: "100%", md: "660px" }}
            display="grid"
            gridTemplateColumns={{ base: "repeat(2, 1fr)", md: "repeat(4, auto)" }}
            gap={3}
            justifyContent="center"
          >
            <Tab
              _selected={{ color: "white", bg: "blue.700" }}
              fontSize={{ base: "sm", md: "xl" }}
              px={{ base: 3, md: 6 }}
            >
              Reports
            </Tab>
            <Tab
              _selected={{ color: "white", bg: "blue.700" }}
              fontSize={{ base: "sm", md: "xl" }}
              px={{ base: 3, md: 6 }}
            >
              Newsletters
            </Tab>
            <Tab
              _selected={{ color: "white", bg: "blue.700" }}
              fontSize={{ base: "sm", md: "xl" }}
              px={{ base: 3, md: 6 }}
            >
              Media
            </Tab>
            <Tab
              _selected={{ color: "white", bg: "blue.700" }}
              fontSize={{ base: "sm", md: "xl" }}
              px={{ base: 3, md: 6 }}
            >
              Commentaries
            </Tab>
          </TabList>
          <TabPanels>
            {/* 📘 ANNUAL REPORTS */}
            <TabPanel>
              <Grid
                templateColumns={{
                  base: "1fr",
                  md: "repeat(2,1fr)",
                  lg: "repeat(3,1fr)",
                }}
                gap={6}
                px={4}
              >
                {annual_reports.map((report, i) => (
                  <Link
                    key={i}
                    href={report.pdfUrl}
                    isExternal
                    _hover={{ textDecoration: "none" }}
                  >
                    <Card {...cardStyles} >
                      <Image
                        src={report.image}
                        alt={report.title}
                        w="100%"
                        h="430px"
                        objectFit="cover"
                      />
                      {/* Dark Blue Divider */}
                      <Box h="3px" bg="blue.800" w="100%" />
                      <CardBody textAlign="center" py={4}>
                        <Heading size="md" mb={2} fontWeight="bold" color="blue.700">
                          {report.title}
                        </Heading>
                        {report.summary && (
                          <Text color="gray.500" fontSize="sm" noOfLines={2}>
                            {report.summary}
                          </Text>
                        )}
                      </CardBody>
                    </Card>
                  </Link>
                ))}
              </Grid>
              <Box mb="100px" />
            </TabPanel>

            {/* 📰 NEWSLETTERS */}
            <TabPanel>
              <Stack spacing={6}>
                <Grid
                  templateColumns={{
                    base: "1fr",
                    md: "repeat(2,1fr)",
                    lg: "repeat(3,1fr)",
                  }}
                  gap={6}
                  px={4}
                >
                  {[...newsletterData]
                    .sort((a, b) => {
                      const dateA = new Date(a.date);
                      const dateB = new Date(b.date);
                      return dateB - dateA; // newest first
                    })
                    .map((item, i) => (
                      <Link
                        key={i}
                        href={item.link}
                        isExternal
                        _hover={{ textDecoration: "none" }}
                      >
                        <Card
                          {...cardStyles}
                          h="100%"
                        >
                          <Image
                            src={item.image}
                            alt={item.heading}
                            w="100%"
                            h="330px"
                            objectFit="cover"
                            borderTopRadius="md"
                          />
                          {/* Dark Blue Divider */}
                          <Box h="3px" bg="blue.800" w="100%" />
                          <CardBody
                            textAlign="center"
                            py={4}
                            display="flex"
                            flexDirection="column"
                            justifyContent="space-between"
                            flex="1"
                          >
                            <Tag size="md" variant="unstyled">
                              <Text
                                as="span"
                                color="blue.700"
                                px={4}
                                py={1}
                                borderRadius="full"
                                fontWeight="semibold"
                                fontSize="sm"
                                display="inline-block"
                                mx="auto"
                                mt={2}
                              >
                                <CalendarIcon mr={2} />
                                {item.date}
                              </Text>
                            </Tag>

                          </CardBody>
                        </Card>
                      </Link>
                    ))}
                </Grid>
              </Stack>
            </TabPanel>


            {/* 🗞 MEDIA */}
            <TabPanel>
              <Grid
                templateColumns={{
                  base: "1fr",
                  md: "repeat(2,1fr)",
                  lg: "repeat(3,1fr)",
                }}
                gap={6}
                px={4}
              >
                {[...mediaData]
                  .sort((a, b) => {
                    const dateA = new Date(a.month_and_year);
                    const dateB = new Date(b.month_and_year);
                    return dateB - dateA;
                  })
                  .map((item, i) => (
                    <Link
                      key={i}
                      href={item.link}
                      isExternal
                      _hover={{ textDecoration: "none" }}
                    >
                      <Card
                        {...cardStyles}
                      >
                        <Image
                          src={item.image}
                          alt={item.heading}
                          w="100%"
                          h="330px"
                          objectFit="cover"
                          borderTopRadius="md"
                        />
                        {/* Dark Blue Divider */}
                        <Box h="3px" bg="blue.800" w="100%" />
                        <CardBody textAlign="center" py={4}>
                          <Heading
                            size="md"
                            mb={1}
                            // fontWeight="bold"
                            color="blue.700"
                            noOfLines={4} // limits visible lines
                            minH="5.2em" // maintains height for 4 lines even if text is shorter
                          >
                            {item.heading}
                          </Heading>

                          <Text
                            fontSize="sm"
                            color="gray.500"
                            letterSpacing="wide"
                            mb={2}
                          >
                            {item.month_and_year}
                          </Text>
                        </CardBody>
                      </Card>
                    </Link>
                  ))}
              </Grid>
            </TabPanel>

            {/* 💬 COMMENTARIES */}
            <TabPanel>
              <Grid
                templateColumns={{
                  base: "1fr",
                  md: "repeat(2,1fr)",
                  lg: "repeat(3,1fr)",
                }}
                gap={6}
                px={4}
              >
                {[...commentariesData]
                  .sort((a, b) => new Date(b.date) - new Date(a.date))
                  .map((item, i) => (
                    <Card
                      key={i}
                      {...cardStyles}
                      onClick={() => navigate(`/commentary/${i}`)}
                    >
                      <Image
                        src={item.image}
                        alt={item.heading}
                        w="100%"
                        h="330px"
                        objectFit="cover"
                        borderTopRadius="md"
                      />
                      <Box h="3px" bg="blue.800" w="100%" />
                      <CardBody py={4} textAlign="center">
                        <Heading size="md" mb={4} color="blue.700" noOfLines={2}>
                          {item.heading}
                        </Heading>
                      </CardBody>
                    </Card>
                  ))}
              </Grid>
              <Box mb="100px" />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Container>
    </Box>
  );
}
