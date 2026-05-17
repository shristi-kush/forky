// import React from "react";
import Animation03 from "../../../assets/lotties/Animation03.json";
import React, { useContext } from "react";
import { windowData2 } from "../LandingPageData";
import AppContext from "../../../Context/AppContext";
import Interaction from "../../../lotties/Interaction";
const AboveFooter = () => {
  const { dimensions } = useContext(AppContext);
  return (
    <div
      style={{
        height: dimensions.width < 700 ? "80vh" : "100vh",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        position: "relative",
      }}
    >
      <section
        style={{
          position: "absolute",
          zIndex: "2",
          width: "100%",
          height: "100%",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-end",
        }}
      >
        <div
          style={{
            backgroundColor: "var(--pink)",
            width: dimensions.width < 700 ? "0%" : "60%",
            height: "30%",
            borderRadius: "50em 0em 50em 0em",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            position: "relative",
            background: "transparent",
            boxShadow: "220px 10px 0px var(--yellow)",
          }}
        ></div>

        <div
          style={{
            backgroundColor: "var(--yellow)",
            width: dimensions.width < 700 ? "100%" : "40%",
            height: dimensions.width < 700 ? "95%" : "100%",
            borderRadius: "10em 0em 0em 0em",
            display: "flex",
            justifyContent: "center",
            alignContent: "center",
            alignItems: "center",
          }}
        >
          {dimensions.width > 700 && (
            <div
              style={{
                width: "60%",
                height: "60%",
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gridTemplateRows: "1fr 1fr",
                gap: "1em",
              }}
            >
              {windowData2.map((item, index) => (
                <div
                  key={index}
                  style={{
                    backgroundColor: "white",
                    position: "relative",
                    borderRadius: item.radius,
                  }}
                >
                  <div
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
                      padding: "1em 2em",
                      background: "rgba(255, 255, 255, 0.6)",
                      backdropFilter: "blur(10px)",
                      borderRadius: "1.2em",
                      boxShadow: "0 10px 20px rgba(0, 0, 0, 0.14)",
                      fontSize: "12px",
                      zIndex: "10",
                    }}
                  >
                    <h3>{item.numbers}</h3>
                    <p>{item.desc}</p>
                  </div>

                  <div
                    style={{
                      height: "100%",
                      width: "100%",
                      borderRadius: item.radius,
                      overflow: "hidden",
                      position: "relative",
                    }}
                  >
                    <div
                      style={{
                        backgroundColor: "var(--pink)",
                        mixBlendMode: "darken",
                        width: "100%",
                        height: "100%",
                        position: "absolute",
                      }}
                    ></div>
                    <img
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                      }}
                      src={item.img}
                    ></img>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
      <div
        style={{
          width: dimensions.width < 700 ? "80%" : "50%",
          height: dimensions.width < 700 ? "70%" : "100%",
          paddingTop: "10em",
          paddingLeft: dimensions.width < 700 ? "4em" : "15%",
          zIndex: "20",
          fontSize: "85%",
        }}
      >
        <h1 style={{ fontSize: "2.5em", lineHeight: "1.1em" }}>
          Get recipes tips and be upto date with our free newsletter
        </h1>
        <p style={{ color: "var(--pink)", paddingTop: "1em" }}>
          Sign-up for free to get latest notification about new recipes.
        </p>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            flexDirection: dimensions.width < 700 ? "column" : "row",
            alignItems: "center",
            background: dimensions.width < 700 ? "transparent" : "white",
            borderRadius: dimensions.width < 700 ? "1em" : "3em",
            boxShadow:
              dimensions.width < 700 ? "" : "0 10px 20px rgba(0, 0, 0, 0.14)",
            width: "100%",
            height:
              dimensions.width < 480
                ? "60%"
                : dimensions.width < 700
                  ? "80%"
                  : "10%",
            color: "black",
            marginTop: "20%",
            fontSize: "30%",
          }}
        >
          <input
            style={{
              padding: "1em",
              width: "100%",
              height: "100%",
              borderRadius: "2em",
              border: "none",
              outline: "none",
              borderBottom: "1em",
              boxShadow: "none",
            }}
            placeholder="Provide you email here"
          />
          <button
            style={{
              backgroundColor: "var(--pink)",
              height: "100%",
              borderRadius: "1em",
              border: "none",
              width: "30%",
              color: "var(--bg)",
              boxShadow: "0 10px 20px rgba(247, 22, 76, 0.24)",
              cursor: "pointer",
              marginTop: dimensions.width < 700 ? "1em" : "0",
              fontSize: dimensions.width < 700 ? "small" : "medium",
            }}
          >
            Submit
          </button>
          {dimensions.width < 700 && (
            <div style={{ marginTop: "2em", height: "50%", width: "100%" }}>
              <Interaction
                animationData={Animation03}
                autoPlay={true}
                pauseFrame={100}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AboveFooter;
