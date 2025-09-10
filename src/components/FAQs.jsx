import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Heading,
} from "@chakra-ui/react";

export default function FAQs({ faqs }) {
  return (
    <Box>
      <Heading size="md" mb={4}>
        FAQs
      </Heading>
      <Accordion
        allowMultiple
        bg="white"
        rounded="md"
        border="1px solid"
        borderColor="blackAlpha.100"
      >
        {faqs.map((f, idx) => (
          <AccordionItem key={idx}>
            <h2>
              <AccordionButton _expanded={{ bg: "brand.100" }}>
                <Box as="span" flex="1" textAlign="left" fontWeight="600">
                  {f.q}
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4}>{f.a}</AccordionPanel>
          </AccordionItem>
        ))}
      </Accordion>
    </Box>
  );
}
