import { Box, useDisclosure } from "@chakra-ui/react";
import { useState } from "react";
import Portfolio from "../components/Portfolio.jsx";
import FAQs from "../components/FAQs.jsx";
import CompanyModal from "../components/CompanyModal.jsx";
import investmentsData from "../data/investments.json";
import faqs from "../data/faqs.json";

export default function Investments() {
  const [selectedCompany, setSelectedCompany] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleCompanySelect = (company) => {
    setSelectedCompany(company);
    onOpen();
  };

  return (
    <Box px={{ base: 4, md: 8 }} py={{ base: 8, md: 16 }} mx={{ base: 4, md: 16 }}>
      <Portfolio
        investments={investmentsData}
        onCompanySelect={handleCompanySelect}
      />
      <FAQs faqs={faqs} />
      <CompanyModal
        isOpen={isOpen}
        onClose={onClose}
        company={selectedCompany}
      />
    </Box>
  );
}
