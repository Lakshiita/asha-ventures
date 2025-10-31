import { Box } from "@chakra-ui/react";
import FAQs from "../components/FAQs.jsx";
import faqs from "../data/faqs.json";
export default function FAQsPage() {
  return (
    <Box px={{ base: 4, md: 8 }} py={{ base: 8, md: 16 }} mx={{ base: 4, md: 16 }}>
      <FAQs faqs={faqs} />
    </Box>
  );
}
