import React, { useContext, useEffect } from "react";
import PropTypes from "prop-types";
import Navbar from "../Components/Navbar/Navbar";
import Footer from "../Components/Footer/Footer";
import AppContext from "../Context/AppContext";

const Layout = ({ children }) => {
  const { isSite } = useContext(AppContext);
  useEffect(() => {
    console.log("From layout:", isSite);
  }, [isSite]);
  return (
    <div>
      <Navbar />
      <main
        className={isSite ? "layout-main layout-main--site" : "layout-main"}
      >
        {children}
      </main>
      <Footer />
    </div>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
