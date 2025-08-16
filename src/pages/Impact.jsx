import {
  Box, Container, Grid, Heading, ListItem, Text, UnorderedList, Card, CardHeader, CardBody, Badge
} from "@chakra-ui/react";
import Section from "../components/Section.jsx";

function CardBlock({ title, children, tag }) {
  return (
    <Card bg="white" border="1px solid" borderColor="blackAlpha.100">
      <CardHeader>
        <Heading size="md">
          {title} {tag && <Badge ml={2} colorScheme="brand">{tag}</Badge>}
        </Heading>
      </CardHeader>
      <CardBody>
        {children}
      </CardBody>
    </Card>
  );
}

export default function Impact() {
  return (
    <Box>
      <Section
        title="Our Impact"
        subtitle="We pair rigorous measurement with on-the-ground empathy to deliver meaningful, verifiable outcomes."
      >
        <Container px={0}>
          <Grid templateColumns={{ base: "1fr", md: "repeat(2,1fr)" }} gap={6}>
            <CardBlock title="Our Impact Strategy">
              <Text mb={3}>
                We invest in enterprises advancing livelihoods, financial inclusion, and essential services.
              </Text>
              <UnorderedList spacing={2}>
                <ListItem>Back purpose-driven founders at early stages</ListItem>
                <ListItem>Provide catalytic and patient capital</ListItem>
                <ListItem>Offer hands-on support in scale and governance</ListItem>
              </UnorderedList>
            </CardBlock>

            <CardBlock title="Measurement Framework">
              <Text mb={3}>
                We align to industry standards and track inputs → outputs → outcomes.
              </Text>
              <UnorderedList spacing={2}>
                <ListItem>Logical framework with KPIs per sector</ListItem>
                <ListItem>Quarterly data, annual deep-dives</ListItem>
                <ListItem>Independent audits for key programs</ListItem>
              </UnorderedList>
            </CardBlock>

            <CardBlock title="SDG 2X Challenge" tag="SDG/2X">
              <Text>
                Our portfolio contributes to UN SDGs with a gender lens approach in line with the 2X Challenge,
                increasing women’s participation across leadership, employment, and customer bases.
              </Text>
            </CardBlock>

            <CardBlock title="Asha Impact Report">
              <Text>
                We publish an annual Impact Report highlighting outcomes, stories, and lessons learned.
                (Placeholder — link your latest PDF/report here.)
              </Text>
            </CardBlock>
          </Grid>
        </Container>
      </Section>
    </Box>
  );
}
