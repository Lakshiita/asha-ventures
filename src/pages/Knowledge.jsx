import {
  Box, Button, Card, CardBody, Container, Grid, Heading, Input, Link, Stack, Tab, TabList,
  TabPanel, TabPanels, Tabs, Text, Textarea, FormControl, FormLabel, FormHelperText
} from "@chakra-ui/react";
import Section from "../components/Section.jsx";

export default function Knowledge() {
  return (
    <Box>
      <Section
        title="Knowledge Resource"
        subtitle="Browse blogs, newsletters, media mentions, and get in touch."
      >
        <Container px={0}>
          <Tabs variant="enclosed">
            <TabList>
              <Tab>Blog</Tab>
              <Tab>Newsletters</Tab>
              <Tab>Media</Tab>
              <Tab id="contact">Contact</Tab>
            </TabList>
            <TabPanels bg="brand.50" border="1px solid" borderColor="blackAlpha.200" rounded="md">
              <TabPanel>
                <Grid templateColumns={{ base: "1fr", md: "repeat(3,1fr)" }} gap={6}>
                  {[1,2,3].map((i)=>(
                    <Card key={i} bg="white" border="1px solid" borderColor="blackAlpha.100">
                      <CardBody>
                        <Heading size="md" mb={2}>How we evaluate early-stage impact ({i})</Heading>
                        <Text color="gray.600" mb={3}>A short piece on our diligence approach and frameworks.</Text>
                        <Link href="#" color="brand.700">Read more →</Link>
                      </CardBody>
                    </Card>
                  ))}
                </Grid>
              </TabPanel>

              <TabPanel>
                <Stack spacing={4}>
                  <Card bg="white" border="1px solid" borderColor="blackAlpha.100">
                    <CardBody>
                      <Heading size="md" mb={2}>Subscribe</Heading>
                      <Stack direction={{ base:"column", sm:"row" }} as="form" onSubmit={(e)=>e.preventDefault()} spacing={3}>
                        <Input type="email" placeholder="you@example.com" required />
                        <Button type="submit">Subscribe</Button>
                      </Stack>
                      <Text mt={2} fontSize="sm" color="gray.600">We send occasional updates. No spam.</Text>
                    </CardBody>
                  </Card>
                  <Grid templateColumns={{ base: "1fr", md: "repeat(2,1fr)" }} gap={6}>
                    {[1,2,3,4].map((i)=>(
                      <Card key={i} bg="white" border="1px solid" borderColor="blackAlpha.100">
                        <CardBody>
                          <Heading size="sm" mb={1}>Newsletter #{i}</Heading>
                          <Text color="gray.600">Quarterly portfolio updates and insights.</Text>
                          <Link href="#" mt={2} display="inline-block" color="brand.700">Open →</Link>
                        </CardBody>
                      </Card>
                    ))}
                  </Grid>
                </Stack>
              </TabPanel>

              <TabPanel>
                <Grid templateColumns={{ base: "1fr", md: "repeat(3,1fr)" }} gap={6}>
                  {[1,2,3].map((i)=>(
                    <Card key={i} bg="white" border="1px solid" borderColor="blackAlpha.100">
                      <CardBody>
                        <Heading size="sm" mb={1}>Media mention #{i}</Heading>
                        <Text color="gray.600">Featured in Industry Daily on impact investing.</Text>
                        <Link href="#" mt={2} display="inline-block" color="brand.700">View →</Link>
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
