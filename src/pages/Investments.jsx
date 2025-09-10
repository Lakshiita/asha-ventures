import { Box, useDisclosure } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import Section from "../components/Section.jsx";
import Portfolio from "../components/Portfolio.jsx";
import FAQs from "../components/FAQs.jsx";
import CompanyDrawer from "../components/CompanyDrawer.jsx";
import investmentsData from "../data/investments.json";
import faqs from "../data/faqs.json";

export default function Investments() {
  const [selected, setSelected] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleCompanySelect = (company) => {
    setSelected(company);
    onOpen();
  };

  useEffect(() => {
    if (!isOpen) setSelected(null);
  }, [isOpen]);

  return (
    <Box>
      <Section title="Portfolio">
        <Portfolio
          investments={investmentsData}
          onCompanySelect={handleCompanySelect}
        />
        <FAQs faqs={faqs} />
      </Section>

      <CompanyDrawer
        isOpen={isOpen}
        onClose={onClose}
        company={selected}
      />
    </Box>
  );
}
