import {
  Avatar, Box, Card, CardBody, Container, Grid, Heading, Tab, TabList, TabPanel, TabPanels, Tabs, Text, HStack
} from "@chakra-ui/react";
import Section from "../components/Section.jsx";

const people = {
  team: [
    { name: "Ananya Rao", role: "Managing Partner", bio: "Impact investor with 12+ years scaling social enterprises.", img: "https://i.pravatar.cc/150?img=47" },
    { name: "Vivek Patel", role: "Principal", bio: "Focus on agri-tech and livelihoods.", img: "https://i.pravatar.cc/150?img=12" },
  ],
  alumni: [
    { name: "Meera Shah", role: "Investment Associate (2019–2023)", bio: "Now building a healthtech startup.", img: "https://i.pravatar.cc/150?img=30" },
  ],
  supporters: [
    { name: "Asha Foundation", role: "Early Supporter", bio: "Catalytic capital for early-stage impact.", img: "https://i.pravatar.cc/150?img=65" },
  ],
};

function PeopleGrid({ data }) {
  return (
    <Grid templateColumns={{ base: "1fr", md: "repeat(3, 1fr)" }} gap={6}>
      {data.map((p) => (
        <Card key={p.name} border="1px solid" borderColor="blackAlpha.100" bg="white">
          <CardBody>
            <HStack spacing={4} align="start">
              <Avatar name={p.name} src={p.img} size="lg" />
              <Box>
                <Heading size="md">{p.name}</Heading>
                <Text fontWeight="600" color="gray.700">{p.role}</Text>
                <Text mt={2} color="gray.600">{p.bio}</Text>
              </Box>
            </HStack>
          </CardBody>
        </Card>
      ))}
    </Grid>
  );
}

export default function People() {
  return (
    <Box>
      <Section title="People" subtitle="Our Team, Alumni, and Early Supporters drive the Asha Ventures mission.">
        <Container px={0}>
          <Tabs variant="enclosed">
            <TabList>
              <Tab>Team</Tab>
              <Tab>Alumni</Tab>
              <Tab>Early Supporters</Tab>
            </TabList>
            <TabPanels bg="brand.50" border="1px solid" borderColor="blackAlpha.200" rounded="md">
              <TabPanel><PeopleGrid data={people.team} /></TabPanel>
              <TabPanel><PeopleGrid data={people.alumni} /></TabPanel>
              <TabPanel><PeopleGrid data={people.supporters} /></TabPanel>
            </TabPanels>
          </Tabs>
        </Container>
      </Section>
    </Box>
  );
}
