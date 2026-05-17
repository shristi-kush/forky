import React, { useContext } from "react";
import PropTypes from "prop-types";
import AppContext from "../../../Context/AppContext";

const SiteCards = ({ svg, heading, desc }) => {
  const { dimensions } = useContext(AppContext);
  return (
    <div
      style={{
        display: "flex",
        flexDirection: dimensions.width < 700 ? "row" : "column",
        justifyContent: dimensions.width < 700 ? "flex-start" : "center",
        alignItems: "center",
        padding: "1em",
        background: "rgba(255, 255, 255, 0.6)",
        backdropFilter: "blur(10px)",
        borderRadius: "2em",
        width: dimensions.width < 700 ? "100%" : "200px",
        height: dimensions.width < 700 ? "90px" : "200px",
        boxShadow: "0 10px 20px rgba(0, 0, 0, 0.14)",
      }}
    >
      <div style={{ marginRight: dimensions.width < 700 ? "1em" : "" }}>
        {svg}
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: dimensions.width < 700 ? "flex-start" : "center",
        }}
      >
        <h1
          style={{
            fontSize: "1em",
          }}
        >
          {heading}
        </h1>
        <p
          style={{
            fontSize: "0.77em",
            textAlign: dimensions.width < 700 ? "left" : "center",
          }}
        >
          {desc}
        </p>
      </div>
    </div>
  );
};

SiteCards.propTypes = {
  svg: PropTypes.string.isRequired,
  heading: PropTypes.string.isRequired,
  desc: PropTypes.string.isRequired,
};

export default SiteCards;
