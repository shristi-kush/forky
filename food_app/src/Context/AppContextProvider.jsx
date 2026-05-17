import React, { useCallback, useEffect, useState } from "react";
import AppContext from "./AppContext";
import PropTypes from "prop-types";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const AppContextProvider = ({ children }) => {
  const navigate = useNavigate();
  const [isSite, setIsSite] = useState(window.location.pathname === "/site");
  const [dimensions, setDimensions] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });
  const [allData, setAllData] = useState();
  const [filteredData, setFilteredData] = useState();
  const [user, setUser] = useState();

  useEffect(() => {
    const checkSession = () => {
      const storedUser = localStorage.getItem("user");
      const sessionExpiration = localStorage.getItem("sessionExpiration");

      if (storedUser && sessionExpiration) {
        if (Date.now() < parseInt(sessionExpiration, 10)) {
          console.log("user restried");
          setUser(JSON.parse(storedUser));
        } else {
          localStorage.removeItem("user");
          localStorage.removeItem("sessionExpiration");
          toast.info("Session expired. Please log in again.");
          navigate("/login");
        }
      }
    };

    checkSession();
  }, []);

  useEffect(() => {
    const sessionExpiration = localStorage.getItem("sessionExpiration");

    if (sessionExpiration) {
      const timeRemaining = parseInt(sessionExpiration, 10) - Date.now();
      if (timeRemaining > 0) {
        const logoutTimer = setTimeout(() => {
          setUser(null);
          localStorage.removeItem("user");
          localStorage.removeItem("sessionExpiration");
          // toast.info("Session expired. Please log in again.");
          navigate("/login");
        }, timeRemaining);

        return () => clearTimeout(logoutTimer);
      }
    }
  }, [user]);

  useEffect(() => {
    setIsSite(window.location.pathname === "/site");
    console.log("checking site");
  }, [window.location.pathname]);

  const changeDimensionsHandler = useCallback(() => {
    setDimensions({
      width: window.innerWidth,
      height: window.innerHeight,
    });
  }, []);

  useEffect(() => {
    window.addEventListener("resize", changeDimensionsHandler);
    return () => {
      window.removeEventListener("resize", changeDimensionsHandler);
    };
  }, [changeDimensionsHandler]);

  return (
    <AppContext.Provider
      value={{
        isSite,
        dimensions,
        allData,
        user,
        setUser,
        setAllData,
        filteredData,
        setFilteredData,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

AppContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AppContextProvider;
