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
    <Box maxW="800px" mx="auto" px={4} py={8}>
      <Heading
        mb={10}
        fontWeight="600"
        textAlign="center"
        color="blue.700"
        textStyle="subHeading"
        fontSize={{ base: "3xl", md: "5xl" }}
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
