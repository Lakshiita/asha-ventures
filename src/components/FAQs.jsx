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
    <Box maxW="800px" mx="auto">
      <Heading
        fontSize={{ base: "4xl", md: "6xl" }}
        color="blue.700"
        textAlign="center"
        textStyle="subHeading"
        mb={10}
      // mt={{ base: 6, md: 10 }}
      >
        FAQs
      </Heading>

      <Accordion
        allowToggle
        rounded="2xl"
        shadow="xl"
        border="1px solid"
        borderColor="gray.100"
        overflow="hidden"
        bg="white"
      >
        {faqs.map((f, idx) => (
          <AccordionItem
            key={idx}
            border="none"
            _expanded={{
              bg: "blue.50",
            }}
          >
            {({ isExpanded }) => (
              <>
                <AccordionButton
                  py={5}
                  px={6}
                  _hover={{ bg: "gray.50" }}
                  transition="0.25s all"
                  borderBottom="1px solid"
                  borderColor="gray.100"
                >
                  <Box
                    flex="1"
                    textAlign="left"
                    textStyle="subHeading"
                    fontWeight={isExpanded ? "600" : "500"}
                    fontSize={{ base: "lg", md: "xl" }}
                    color={isExpanded ? "blue.700" : "gray.700"}
                  >
                    {f.q}
                  </Box>
                  <AccordionIcon
                    fontSize="2xl"             // ⬆ bigger icons
                    color={isExpanded ? "blue.700" : "gray.500"} // ⬆ active color
                  />
                </AccordionButton>

                <AccordionPanel px={6} pb={5} bg="white">
                  <Text textStyle="subHeading" color="gray.600" lineHeight={1.7} fontSize={{ base: "sm", md: "md" }}>
                    {f.a}
                  </Text>
                </AccordionPanel>
              </>
            )}
          </AccordionItem>
        ))}
      </Accordion>
    </Box>
  );
}
