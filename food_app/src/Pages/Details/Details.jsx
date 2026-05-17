import React, { useContext, useEffect, useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FiArrowLeft, FiClock, FiList, FiLayers } from "react-icons/fi";
import Layout from "../../Layout/Layout";
import AppContext from "../../Context/AppContext";
import { getWord } from "../../utils/getWords";
import { DEFAULT_RECIPE_IMAGE } from "../../constants/defaultRecipeImage";
import "./Details.css";

const estimateMinutes = (ingredientCount, stepCount) => {
  const mins = ingredientCount * 2 + stepCount * 3;
  if (mins < 20) return "About 20 min";
  if (mins < 60) return `About ${mins} min`;
  const hours = Math.floor(mins / 60);
  const rem = mins % 60;
  return rem ? `About ${hours}h ${rem}m` : `About ${hours}h`;
};

const Details = () => {
  const { search } = useLocation();
  const navigate = useNavigate();
  const { user } = useContext(AppContext);
  const params = new URLSearchParams(search);

  const title = params.get("title") || "";
  const desc = params.get("desc") || "";
  const image = params.get("image") || DEFAULT_RECIPE_IMAGE;

  const ingredients = useMemo(() => {
    const raw = params.get("ingredients");
    if (!raw) return [];
    return getWord(raw).filter(Boolean);
  }, [search]);

  const steps = useMemo(() => {
    const raw = params.get("steps");
    if (!raw) return [];
    return getWord(raw).filter(Boolean);
  }, [search]);

  const timeLabel = estimateMinutes(ingredients.length, steps.length);

  useEffect(() => {
    if (!user) {
      navigate("/site");
      return;
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [user, navigate]);

  useEffect(() => {
    if (user && !title) {
      navigate("/");
    }
  }, [user, title, navigate]);

  const handleBack = () => navigate("/");

  const handlePrint = () => window.print();

  return (
    <Layout>
      <article className="recipe-details">
        <button
          type="button"
          className="recipe-details__back"
          onClick={handleBack}
        >
          <FiArrowLeft aria-hidden />
          Back to recipes
        </button>

        <header className="recipe-details__hero">
          <div className="recipe-details__media">
            <img
              className="recipe-details__image"
              src={image}
              alt={title || "Recipe"}
            />
          </div>

          <div className="recipe-details__intro">
            <p className="recipe-details__eyebrow">Your recipe</p>
            <h1 className="recipe-details__title">{title}</h1>
            {desc ? (
              <p className="recipe-details__description">{desc}</p>
            ) : null}

            <div className="recipe-details__meta">
              <span className="recipe-details__chip recipe-details__chip--accent">
                <FiClock aria-hidden />
                {timeLabel}
              </span>
              <span className="recipe-details__chip">
                <FiList aria-hidden />
                {ingredients.length}{" "}
                {ingredients.length === 1 ? "ingredient" : "ingredients"}
              </span>
              <span className="recipe-details__chip">
                <FiLayers aria-hidden />
                {steps.length} {steps.length === 1 ? "step" : "steps"}
              </span>
            </div>
          </div>
        </header>

        <div className="recipe-details__body">
          <aside
            className="recipe-details__panel recipe-details__panel--sticky"
            aria-labelledby="ingredients-heading"
          >
            <h2
              id="ingredients-heading"
              className="recipe-details__panel-title"
            >
              <FiList aria-hidden />
              Ingredients
            </h2>
            {ingredients.length > 0 ? (
              <ul className="recipe-details__ingredient-list">
                {ingredients.map((item, index) => (
                  <li
                    key={`${item}-${index}`}
                    className="recipe-details__ingredient"
                  >
                    <span
                      className="recipe-details__ingredient-marker"
                      aria-hidden
                    >
                      {index + 1}
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="recipe-details__empty">No ingredients listed.</p>
            )}
          </aside>

          <section aria-labelledby="method-heading">
            <h2 id="method-heading" className="recipe-details__steps-header">
              <FiLayers aria-hidden />
              Method
            </h2>
            {steps.length > 0 ? (
              <ol className="recipe-details__steps">
                {steps.map((item, index) => (
                  <li key={`${item}-${index}`} className="recipe-details__step">
                    <span className="recipe-details__step-num" aria-hidden>
                      {index + 1}
                    </span>
                    <p className="recipe-details__step-text">{item}</p>
                  </li>
                ))}
              </ol>
            ) : (
              <p className="recipe-details__empty">No steps listed.</p>
            )}

            <div className="recipe-details__cta">
              <button
                type="button"
                className="recipe-details__cta-btn recipe-details__cta-btn--primary"
                onClick={handleBack}
              >
                Explore more recipes
              </button>
              <button
                type="button"
                className="recipe-details__cta-btn recipe-details__cta-btn--secondary"
                onClick={handlePrint}
              >
                Print recipe
              </button>
            </div>
          </section>
        </div>
      </article>
    </Layout>
  );
};

export default Details;
