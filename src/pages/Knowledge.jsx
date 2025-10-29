import {
  Box, Button, Card, CardBody, Container, Grid, Heading, Input, Link, Stack, Tab, TabList,
  TabPanel, TabPanels, Tabs, Text, Textarea, FormControl, FormLabel, FormHelperText, Image
} from "@chakra-ui/react";
import Section from "../components/Section.jsx";
import { mediaData } from "../data/media.json";

export default function Knowledge() {
  return (
    <Box>
      <Section
        title="Knowledge Resource"
        subtitle="Browse newsletters, media mentions, and get in touch."
      >
        <Container maxW="100vw" px={0}>
          <Tabs variant="enclosed">
            <TabList>
              <Tab>Newsletters</Tab>
              <Tab>Media</Tab>
              <Tab id="contact">Contact</Tab>
            </TabList>
            <TabPanels bg="#f7f7ff" border="1px solid" borderColor="blackAlpha.200" rounded="md">
              <TabPanel>
                <Stack spacing={6}>
                  <Card bg="white" border="1px solid" borderColor="blackAlpha.100" rounded="lg">
                    <CardBody>
                      <Heading size="md" mb={2}>Subscribe</Heading>
                      <Stack direction={{ base:"column", sm:"row" }} as="form" onSubmit={(e)=>e.preventDefault()} spacing={3}>
                        <Input type="email" placeholder="you@example.com" required />
                        <Button type="submit">Subscribe</Button>
                      </Stack>
                      <Text mt={2} fontSize="sm" color="gray.600">We send occasional updates. No spam.</Text>
                    </CardBody>
                  </Card>
                  <Grid templateColumns={{ base: "1fr", md: "repeat(2,1fr)" }} gap={8} w="100vw" ml="calc(-50vw + 50%)" px={8}>
                    {[1,2,3,4,5,6].map((i)=>(
                      <Card 
                        key={i} 
                        bg="white" 
                        border="2px solid" 
                        borderColor="orange.400" 
                        rounded="xl"
                        boxShadow="md"
                        overflow="hidden"
                        transition="all 0.3s ease"
                        _hover={{
                          transform: "translateY(-4px)",
                          boxShadow: "0 8px 25px rgba(255, 165, 0, 0.3)"
                        }}
                      >
                        <Image
                          src="https://via.placeholder.com/400x300/f0f0f0/666?text=Newsletter+Image"
                          alt={`Newsletter ${i}`}
                          w="100%"
                          h="300px"
                          objectFit="cover"
                        />
                        <CardBody textAlign="center" py={6}>
                          <Heading 
                            size="md" 
                            mb={2} 
                            fontWeight="bold"
                            textDecoration="underline"
                            textDecorationColor="orange.400"
                          >
                            Asha Impact Quarterly Newsletter
                          </Heading>
                          <Text color="gray.500" fontSize="sm">
                            {i % 2 === 0 ? "December 2020" : "March 2021"}
                          </Text>
                        </CardBody>
                      </Card>
                    ))}
                  </Grid>
                </Stack>
              </TabPanel>

              <TabPanel>
                <Grid templateColumns={{ base: "1fr", md: "repeat(2,1fr)", lg: "repeat(3,1fr)" }} gap={6} w="100vw" ml="calc(-50vw + 50%)" px={8}>
                  {mediaData.map((item, i)=>(
                    <Card 
                      key={i} 
                      bg="white" 
                      border="2px solid" 
                      borderColor="orange.400" 
                      rounded="xl"
                      boxShadow="md"
                      overflow="hidden"
                      transition="all 0.3s ease"
                      _hover={{
                        transform: "translateY(-4px)",
                        boxShadow: "0 8px 25px rgba(255, 165, 0, 0.3)"
                      }}
                    >
                      <Image
                        src={item.image}
                        alt={item.heading}
                        w="100%"
                        h="250px"
                        objectFit="contain"
                      />
                      <CardBody textAlign="center" py={4}>
                        <Link href={item.link} isExternal>
                          <Heading 
                            size="md" 
                            mb={2} 
                            fontWeight="bold"
                            textDecoration="underline"
                            textDecorationColor="orange.400"
                            cursor="pointer"
                            _hover={{ color: "orange.500" }}
                          >
                            {item.heading}
                          </Heading>
                        </Link>
                        <Text color="gray.600" fontSize="sm" mb={2} px={2}>
                          {item.summary}
                        </Text>
                      </CardBody>
                    </Card>
                  ))}
                </Grid>
              </TabPanel>

              <TabPanel>
                <Box as="form" onSubmit={(e)=>e.preventDefault()}>
                  <FormControl isRequired mb={4}>
                    <FormLabel>Your Name</FormLabel>
                    <Input placeholder="Full name" />
                  </FormControl>
                  <FormControl isRequired mb={4}>
                    <FormLabel>Email</FormLabel>
                    <Input type="email" placeholder="you@example.com" />
                  </FormControl>
                  <FormControl mb={4}>
                    <FormLabel>Organization</FormLabel>
                    <Input placeholder="Optional" />
                  </FormControl>
                  <FormControl isRequired mb={4}>
                    <FormLabel>Message</FormLabel>
                    <Textarea rows={5} placeholder="Tell us how we can help" />
                    <FormHelperText>We usually respond within a couple of business days.</FormHelperText>
                  </FormControl>
                  <Button type="submit">Send</Button>
                </Box>
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Container>
      </Section>
    </Box>
  );
}
