import React from "react";
import { useNavigate } from "react-router-dom";
import heroImage from "../../../assets/hero.png";
import "./LandingHero.css";

const LandingHeader = () => {
  const navigate = useNavigate();

  return (
    <section className="landing-hero" aria-label="Welcome to Forky">
      <div className="landing-hero__text">
        <h1 className="landing-hero__title">
          Create Your Best Cooking Recipes
          <span className="landing-hero__accent">Here!</span>
        </h1>
        <button
          type="button"
          className="landing-hero__cta"
          onClick={() => navigate("/login")}
        >
          Explore Recipes
        </button>
      </div>

      <img
        className="landing-hero__image"
        src={heroImage}
        alt="Chef presenting fresh ingredients and cooking utensils"
        decoding="async"
      />
    </section>
  );
};

export default LandingHeader;
