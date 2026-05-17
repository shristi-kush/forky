import React, { useContext, useState, useEffect } from "react";
import { ReactComponent as Forky } from "../../assets/forky.svg";
import {
  RiTwitterXLine,
  RiFacebookCircleFill,
  RiInstagramFill,
} from "react-icons/ri";
import AppContext from "../../Context/AppContext";
const Footer = () => {
  const { dimensions, isSite } = useContext(AppContext);
  const [smallScreen, setSmallScreen] = useState(dimensions.width < 600);
  useEffect(() => {
    if (dimensions.width < 600) {
      setSmallScreen(true);
    } else {
      setSmallScreen(false);
    }
  }, [dimensions]);
  return (
    <div
      style={{
        width: "100%",
        color: "var(--pink)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "var(--yellow)",
        boxShadow: "var(--shadow)",
        padding: smallScreen ? "2em 1.5rem" : "2em 10em",
        boxSizing: "border-box",
        zIndex: "100",
        marginTop: isSite ? "" : "5em",
        gap: smallScreen ? "2em" : "30em",
        fontSize: "var(--text-sm)",
        minHeight: "40vh",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          alignItems: "flex-start",
          gap: "0.512em",
          cursor: "pointer",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "row",
            gap: "0.512em",
            cursor: "pointer",
          }}
        >
          <Forky width={30} height={30} />
          <p>Forky</p>
        </div>
        <p style={{ marginBottom: "2em" }}>Fresh home made recipes everyday</p>
        <div style={{ display: "flex", gap: "1em" }}>
          <RiTwitterXLine size={25} />
          <RiFacebookCircleFill size={25} />
          <RiInstagramFill size={25} />
        </div>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          alignItems: "flex-start",
          gap: "0.512em",
          cursor: "pointer",
        }}
      >
        <p style={{ fontSize: "var(--text-sm)" }}>need assistence?</p>
        <p style={{ marginBottom: "2em" }}>Our support team is available</p>
        <p>
          <b>+91 - 688 644 680</b>
        </p>
        <p>
          <b>contact@Forky.com</b>
        </p>
      </div>
    </div>
  );
};

export default Footer;
