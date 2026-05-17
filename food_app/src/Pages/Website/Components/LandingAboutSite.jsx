import React, { useEffect, useState, useContext } from "react";
import RecipesCard from "../../../Components/Card/RecipesCard";
import { getAllRecipes } from "../../../apis/Recipes";
import AppContext from "../../../Context/AppContext";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import "../Carousal.css";

const LandingAboutSite = () => {
  const { dimensions } = useContext(AppContext);
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    const getRecipes = async () => {
      const data = await getAllRecipes();
      if (data) {
        setRecipes(data);
      }
    };
    getRecipes();
  }, []);

  useEffect(() => {
    console.log("Recipes fetched:", recipes);
  }, [recipes]);

  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 3000, min: 1200 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 1200, min: 960 },
      items: 4,
    },
    tablet: {
      breakpoint: { max: 960, min: 680 },
      items: 3,
    },
    mobile: {
      breakpoint: { max: 680, min: 420 },
      items: 2,
    },
    smallMobile: {
      breakpoint: { max: 420, min: 0 },
      items: 1,
    },
  };

  return (
    <div
      style={{
        backgroundColor: "var(--yellow)",
        height: "100vh",
        position: "relative",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          width: "100%",
          height: dimensions.width < 700 ? "10%" : "20%",
          display: "flex",
          justifyContent: "space-between",
          alignContent: "flex-start",
        }}
      >
        <div
          className="grid-pattern"
          style={{
            width: dimensions.width < 700 ? "40%" : "25%",
            borderRadius: "0 0 20em 0",
          }}
        />
        <div
          className="grid-pattern"
          style={{
            width: dimensions.width < 700 ? "20%" : "50%",
            borderRadius: "0 0 0 20em",
          }}
        />
      </div>

      {recipes.length > 0 ? (
        <Carousel
          containerClass="carousel-container"
          responsive={responsive}
          autoPlay={true}
          swipeable={true}
          draggable={true}
          showDots={true}
          infinite={true}
          partialVisible={true}
          dotListClass="custom-dot-list-style"
        >
          {recipes.map((recipe) => (
            <div key={recipe._id} style={{ padding: "0 10px", height: "100%" }}>
              <RecipesCard
                id={recipe._id}
                title={recipe.title}
                description={recipe.description}
                image={recipe.image}
                ingredients={recipe.ingredients}
                steps={recipe.steps}
                enableEdit={false}
              />
            </div>
          ))}
        </Carousel>
      ) : (
        <p style={{ margin: "0 auto" }}>Loading recipes...</p>
      )}

      <div
        style={{
          width: "100%",
          height: dimensions.width < 700 ? "10%" : "20%",
          display: "flex",
          justifyContent: "space-between",
          alignContent: "flex-start",
        }}
      >
        <div
          className="grid-pattern"
          style={{
            width: dimensions.width < 700 ? "20%" : "50%",
            borderRadius: "0 20em 0 0",
          }}
        />
        <div
          className="grid-pattern"
          style={{
            width: dimensions.width < 700 ? "40%" : "25%",
            borderRadius: "20em 0 0 0",
          }}
        />
      </div>
    </div>
  );
};

export default LandingAboutSite;
