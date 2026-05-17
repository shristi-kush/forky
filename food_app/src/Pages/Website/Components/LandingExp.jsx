// import React, { useState, useEffect } from "react";
import React, { useContext } from "react";
import Animation01 from "../../../assets/lotties/Animation01.json";
import Interaction from "../../../lotties/Interaction";
import chef from "../../../assets/chef.png";
import { hacks } from "../LandingPageData";
import AppContext from "../../../Context/AppContext";

const LandingExp = () => {
  const { dimensions } = useContext(AppContext);
  return (
    <div
      style={{
        height: "100vh",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-end",
        position: "relative",
        alignItems: dimensions.width < 700 ? "flex-start" : "flex-end",
      }}
    >
      <section
        style={{
          position: "absolute",
          zIndex: "10",
          width: "100%",
          height: "100%",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
        }}
      >
        <div
          style={{
            backgroundColor: "var(--pink)",
            width: dimensions.width < 700 ? "100%" : "40%",
            height:
              dimensions.width < 700 && dimensions.width > 500
                ? "70%"
                : dimensions.width < 500
                  ? "68%"
                  : "100%",
            borderRadius: "0 10em 10em 0",
            display: "flex",
            justifyContent: "center",
            alignItems: dimensions.width < 700 ? "flex-end" : "center",
          }}
        >
          {dimensions.width > 700 &&
            hacks.map((item, index) => (
              <div
                key={index}
                style={{
                  position: "absolute",
                  top: item.top || "",
                  right: item.right || "",
                  bottom: item.bottom || "",
                  left: item.left || "",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  padding: item.padding,
                  background: "rgba(255, 255, 255, 0.6)",
                  backdropFilter: "blur(10px)",
                  borderRadius: item.radius,
                  boxShadow: "0 10px 20px rgba(0, 0, 0, 0.14)",
                  width: item.width || "",
                  height: item.height || "",
                  textAlign: item.textAlign || "",
                }}
              >
                {item.heading && <h3>{item.heading}</h3>}
                <p
                  style={{
                    fontSize: item.descFontSize ? item.descFontSize : "",
                  }}
                >
                  {item.desc}
                </p>
              </div>
            ))}
          <div
            style={{
              height: dimensions.width < 700 ? "50%" : "80%",
              width: "70%",
              borderRadius: "3em 10em 10em 10em",
              overflow: "hidden",
              marginBottom: dimensions.width ? "4em" : "",
            }}
          >
            <img
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
              src={chef}
            ></img>
          </div>
        </div>
        <div
          style={{
            backgroundColor: "var(--yellow)",
            width: dimensions.width < 700 ? "40%" : "25%",
            height: dimensions.width < 700 ? "20%" : "45%",
            borderRadius: "0em 0em 20em 20em",
            position: dimensions.width < 700 ? "absolute" : "",
            left: "20%",
          }}
        >
          <Interaction
            animationData={Animation01}
            style={{ height: "80%", width: "80%" }}
          />
        </div>
        <div
          style={{
            backgroundColor: "var(--pink)",
            width: dimensions.width < 700 ? "0" : "15%",
            height: "50%",
            borderRadius: "50em 0 0 50em",
            position: "relative",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {dimensions.width > 700 && (
            <div
              style={{
                position: "absolute",
                left: "-40%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                padding: "1em 2em",
                background: "rgba(255, 255, 255, 0.6)",
                backdropFilter: "blur(10px)",
                borderRadius: "1.2em",
                boxShadow: "0 10px 20px rgba(0, 0, 0, 0.14)",
                fontSize: "12px",
                width: "70%",
                height: "30%",
              }}
            >
              <p>Learn from diverse set of recipes 😎</p>
            </div>
          )}
        </div>
      </section>
      <div
        style={{
          width: dimensions.width < 700 ? "90%" : "50%",
          height: dimensions.width < 700 ? "70%" : "100%",
          paddingBottom: dimensions.width < 700 ? "1em" : "10em",
          paddingRight: dimensions.width < 700 ? "4em" : "10em",
          paddingLeft: dimensions.width < 700 ? "15%" : "",
          zIndex: "1",
          fontSize: "85%",
          display: "flex",
          flexDirection: "column",
          alignContent: dimensions.width < 700 ? "flex-start" : "flex-end",
          justifyContent: "flex-end",
          marginTop: dimensions.width < 700 ? "2em" : "",
        }}
      >
        <h1
          style={{
            fontSize: dimensions.width < 500 ? "1.8em" : "2.5em",
            lineHeight: "1.1em",
          }}
        >
          Learn cooking hacks to cook easily and faster
        </h1>
        <p style={{ color: "var(--pink)", paddingTop: "1em" }}>
          Cooking tips from top and experienced chefs will help you to
          efficiently save your time and use cooking utensils
        </p>
      </div>
    </div>
  );
};

export default LandingExp;
