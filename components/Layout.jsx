import { Box } from "@chakra-ui/layout";
import React from "react";
import Footer from "./Footer";
import NavBar from "./Navbar";

const Layout = ({ children }) => {
  return (
    <Box minHeight="100vh">
      <NavBar />
      {children}
      <Footer />
    </Box>
  );
};

export default Layout;
