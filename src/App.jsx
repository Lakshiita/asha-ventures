import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import Home from "./pages/Home.jsx";
import People from "./pages/People.jsx";
import Investments from "./pages/Investments.jsx";
import Impact from "./pages/Impact.jsx";
import Knowledge from "./pages/Knowledge.jsx";
import { Box } from "@chakra-ui/react";

export default function App() {
  return (
    <Box minH="100dvh" display="flex" flexDirection="column">
      <Navbar />
      <Box as="main" flex="1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/people" element={<People />} />
          <Route path="/investments" element={<Investments />} />
          <Route path="/impact" element={<Impact />} />
          <Route path="/knowledge" element={<Knowledge />} />
        </Routes>
      </Box>
      <Footer />
    </Box>
  );
}
