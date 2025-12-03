import { Container, Heading, Text, Grid, Box } from "@chakra-ui/react";
import { FaQuestionCircle, FaChartBar, FaUsers, FaBalanceScale, FaExclamationTriangle } from "react-icons/fa";
import impact_dimensions from "../data/impact_dimensions.json";
import FlipCard from "./FlipCard";

const iconMap = {
  FaQuestionCircle,
  FaChartBar,
  FaUsers,
  FaBalanceScale,
  FaExclamationTriangle,
};

export default function FiveDimensionsSection() {
  return (
    <Box
      as="section"
      minH="100vh"                 // ✅ FULL PAGE HEIGHT
      w="100%"
      bg="brand.section.five_dimension"
      display="flex"
      flexDirection="column"
      justifyContent="center"     // ✅ center vertically
      alignItems="center"
      py={16}
    >
      <Heading textStyle="subHeading" textAlign="center" color="brand.section.caraousel_heading" mb={5}>
        The Five Dimensions of Impact
      </Heading>

      <Text textAlign="center" color="brand.section.caraousel_heading" mb={12} maxW="900px"
        textStyle="subHeading"
        fontSize={{ base: "lg", md: "lg" }} >
        We explore each outcome through five guiding questions that help us understand the depth, reach,
        and reliability of our impact.
      </Text>

      <Container maxW="1200px" px={{ base: 4, md: 8 }}>
        <Grid
          templateColumns={{
            base: "repeat(2, 1fr)",   // ✅ 2 cards per row on mobile
            sm: "repeat(2, 1fr)",
            md: "repeat(3, 1fr)",
            lg: "repeat(5, 1fr)",
          }}
          gap={{ base: 4, md: 6 }}
          justifyItems="center"
          alignItems="center"
        >

          {impact_dimensions.map((item, index) => {
            const colorPairs = [
              ["#e1f5ffff", "#cbd8e0ff"],
              ["#f5edffff", "#e6e5aeff"],
              ["#e8faf6ff", "#b0e2d9ff"],
              ["#e2fde4ff", "#accaacff"],
              ["#ffe1e0ff", "#ebc7c7ff"],
            ];
            const [bgFront, bgBack] = colorPairs[index % colorPairs.length];

            return (
              <Box key={index} w="100%" display="flex" alignItems="center" justifyContent="center">
                <FlipCard
                  title={item.title}
                  description={item.description}
                  icon={iconMap[item.icon]}
                  bgFront={bgFront}
                  bgBack={bgBack}
                />
              </Box>
            );
          })}
        </Grid>
      </Container>
    </Box>
  );
}
