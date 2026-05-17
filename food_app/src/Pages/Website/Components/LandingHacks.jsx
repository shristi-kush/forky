import React, { useContext } from "react";
import Animation02 from "../../../assets/lotties/Animation02.json";
import Interaction from "../../../lotties/Interaction";
import { windowData } from "../LandingPageData";
import AppContext from "../../../Context/AppContext";

const LandingHacks = () => {
  const { dimensions } = useContext(AppContext);
  return (
    <div
      style={{
        height: "100vh",
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
            width: dimensions.width < 700 ? "0" : "15%",
            height: "50%",
            borderRadius: "0em 50em 50em 0em",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            position: "relative",
          }}
        >
          <div
            style={{
              position: "absolute",
              right: "-40%",
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
            <p>Create and Share your recepies 🌏</p>
          </div>
        </div>
        <div
          style={{
            backgroundColor: "var(--yellow)",
            width: dimensions.width < 700 ? "40%" : "25%",
            height: dimensions.width < 700 ? "20%" : "45%",
            borderRadius: "20em 20em 0em 0em",
            position: dimensions.width < 700 ? "absolute" : "",
            left: "40%",
            zIndex: "40",
          }}
        >
          <Interaction
            animationData={Animation02}
            style={{
              height: "80%",
              width: "80%",
            }}
          />
        </div>
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
            borderRadius: "10em 0em 0em 10em",
            display: "flex",
            justifyContent: "center",
            alignContent: "center",
            alignItems: dimensions.width < 700 ? "flex-start" : "center",
          }}
        >
          <div
            style={{
              marginTop:
                dimensions.width < 700 && dimensions.width > 500
                  ? "10%"
                  : dimensions.width < 500
                    ? "25%"
                    : "0em",
              width:
                dimensions.width < 700 && dimensions.width > 500
                  ? "45%"
                  : "60%",
              height: dimensions.width < 700 ? "40%" : "60%",
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gridTemplateRows: "1fr 1fr",
              gap: "1em",
            }}
          >
            {windowData.map((item, index) => (
              <div
                key={index}
                style={{
                  backgroundColor: "white",
                  position: "relative",
                  borderRadius: item.radius,
                }}
              >
                {dimensions.width > 700 && (
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
                      fontSize: dimensions.width < 700 ? "9px" : "12px",
                    }}
                  >
                    <h3>{item.numbers}</h3>
                    <p>{item.desc}</p>
                  </div>
                )}

                <div
                  style={{
                    height: "100%",
                    width: "100%",
                    borderRadius: item.radius,
                    overflow: "hidden",
                  }}
                >
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
        </div>
      </section>
      <div
        style={{
          width: dimensions.width < 700 ? "80%" : "50%",
          height: dimensions.width < 700 ? "70%" : "100%",
          paddingTop: dimensions.width < 700 ? "1em" : "10em",
          paddingLeft: dimensions.width < 700 ? "4em" : "10%",
          zIndex: dimensions.width < 700 ? "20" : "0",
        }}
      >
        <h1
          style={{
            fontSize: dimensions.width < 500 ? "1.8em" : "2.5em",
            lineHeight: "1.1em",
          }}
        >
          Best recipes from around the world
        </h1>
        <p
          style={{
            color: "var(--pink)",
            paddingTop: "1em",
          }}
        >
          The recipes are written from the place the food comes from to maintain
          the authenticity of the food
        </p>
      </div>
    </div>
  );
};

export default LandingHacks;
