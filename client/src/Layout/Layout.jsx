import React from "react";
import Routing from "../routes/Routing";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Layout = () => {
  return (
    <>
      <Navbar />
      <Routing />
      <Footer />
    </>
  );
};

export default Layout;
