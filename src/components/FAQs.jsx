import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Heading,
  Text,
} from "@chakra-ui/react";

export default function FAQs({ faqs }) {
  return (
    <Box>
      <Heading size="xl" mb={4} textStyle="defaultText">
        FAQs
      </Heading>
      <Accordion
        allowToggle
        bg="white"
        rounded="xl"
        shadow="lg"
        border="none"
        overflow="hidden"
      >
        {faqs.map((f, idx) => (
          <AccordionItem
            key={idx}
            border="none"
            borderBottom={idx < faqs.length - 1 ? "1px solid" : "none"}
            borderColor="gray.100"
          >
            <AccordionButton
              py={6}
              px={8}
              _hover={{ bg: "gray.50" }}
              _expanded={{ bg: "brand.50", borderColor: "brand.200" }}
              transition="all 0.2s"
            >
              <Box
                as="span"
                flex="1"
                textAlign="left"
                fontWeight="400"
                fontSize="lg"
                color="gray.700"
              >
                {f.q}
              </Box>
              <AccordionIcon color="brand.500" fontSize="xl" />
            </AccordionButton>
            <AccordionPanel px={8} pb={6} pt={2}>
              <Text color="gray.600" lineHeight={1.7} fontSize="md">
                {f.a}
              </Text>
            </AccordionPanel>
          </AccordionItem>
        ))}
      </Accordion>
    </Box>
  );
}
