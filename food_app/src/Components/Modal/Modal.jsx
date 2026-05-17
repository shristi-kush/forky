import React, { useContext, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import PropTypes from "prop-types";
import { Circles } from "react-loader-spinner";
import toast from "react-hot-toast";
import AppContext from "../../Context/AppContext";
import {
  formatIngredientList,
  parseIngredientList,
} from "../../utils/getWords";
import { getuuid } from "../../utils/generateUUID";
import useFileUpload from "../../hook/useFileUpload";
import {
  createRecipe,
  generateRecipeWithAI,
  getAllRecipes,
  updateRecipe,
} from "../../apis/Recipes";
import { DEFAULT_RECIPE_IMAGE } from "../../constants/defaultRecipeImage";
import "./Modal.css";

const Modal = ({ setOpen, cardToEdit, setCardToEdit }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [activeTab, setActiveTab] = useState("manual");
  const { user, setAllData, dimensions, setFilteredData } =
    useContext(AppContext);
  const { uploadFile } = useFileUpload();
  const [smallScreen, setSmallScreen] = useState(dimensions.width < 600);
  const [desc, setDesc] = useState("");
  const [title, setTitle] = useState("");
  const [file, setFile] = useState(null);
  const [imagePreview, setImagePreview] = useState("");
  const [ing, setIng] = useState("");
  const [stepsArr, setStepsArr] = useState([{ id: getuuid(), inputData: "" }]);
  const [aiPrompt, setAiPrompt] = useState("");
  const [aiCuisine, setAiCuisine] = useState("");
  const [aiDifficulty, setAiDifficulty] = useState("");
  const [aiServings, setAiServings] = useState("");
  const [aiFilled, setAiFilled] = useState(false);

  const isEdit = Boolean(cardToEdit?.id);

  useEffect(() => {
    setSmallScreen(dimensions.width < 600);
  }, [dimensions]);

  useEffect(() => {
    if (cardToEdit) {
      setTitle(cardToEdit.title || "");
      setDesc(cardToEdit.description || "");
      setIng(formatIngredientList(cardToEdit.ingredients || []));
      setStepsArr(
        cardToEdit.steps?.map((item) => ({
          id: getuuid(),
          inputData: item,
        })) || [{ id: getuuid(), inputData: "" }]
      );
      setImagePreview(cardToEdit.image || "");
      setActiveTab("manual");
    }
  }, [cardToEdit]);

  useEffect(() => {
    return () => {
      if (imagePreview && imagePreview.startsWith("blob:")) {
        URL.revokeObjectURL(imagePreview);
      }
    };
  }, [imagePreview]);

  const resetForm = () => {
    setTitle("");
    setDesc("");
    setIng("");
    setStepsArr([{ id: getuuid(), inputData: "" }]);
    setFile(null);
    setImagePreview("");
    setAiPrompt("");
    setAiCuisine("");
    setAiDifficulty("");
    setAiServings("");
    setAiFilled(false);
    setCardToEdit();
  };

  const handleClose = () => {
    setOpen(false);
    resetForm();
  };

  const handleInputChange = (e, id) => {
    e.preventDefault();
    setStepsArr((prev) =>
      prev.map((data) =>
        data.id === id ? { ...data, inputData: e.target.value } : data
      )
    );
  };

  const handleAddStep = (e) => {
    e.preventDefault();
    setStepsArr((prev) => [...prev, { id: getuuid(), inputData: "" }]);
  };

  const handleDeleteStep = (idToDelete, e) => {
    e.preventDefault();
    if (stepsArr.length === 1) {
      setStepsArr([{ id: getuuid(), inputData: "" }]);
      return;
    }
    setStepsArr((prev) => prev.filter((item) => item.id !== idToDelete));
  };

  const saveRecipe = async (imageUrl) => {
    const ingArr = parseIngredientList(ing);
    const stepArr = stepsArr.map((step) => step.inputData).filter(Boolean);
    const recData = {
      user_id: user.id,
      title,
      description: desc,
      ingredients: ingArr,
      steps: stepArr,
      image: imageUrl,
    };

    try {
      if (isEdit) {
        await updateRecipe({ id: cardToEdit.id, ...recData });
        toast.success("Recipe updated successfully");
      } else {
        await createRecipe(recData);
        toast.success("Recipe created successfully");
      }

      const data = await getAllRecipes();
      setAllData(data);
      setFilteredData(data);
      handleClose();
    } catch {
      toast.error(isEdit ? "Error updating recipe" : "Error creating recipe");
    } finally {
      setIsLoading(false);
    }
  };

  const validateForm = () => {
    const hasSteps = stepsArr.some((s) => s.inputData.trim());
    if (!title?.trim() || !desc?.trim() || !ing?.trim() || !hasSteps) {
      toast.error("Please complete title, description, ingredients, and steps");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);

    if (file) {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "food_app");
      formData.append("cloud_name", "dmpir7wfy");
      try {
        const imageUrl = await uploadFile(formData);
        await saveRecipe(imageUrl);
      } catch {
        setIsLoading(false);
      }
      return;
    }

    const imageUrl = cardToEdit?.image || imagePreview || DEFAULT_RECIPE_IMAGE;
    await saveRecipe(imageUrl);
  };

  const handleGenerateAI = async () => {
    if (!aiPrompt.trim()) {
      toast.error("Describe the recipe you want to generate");
      return;
    }

    setIsGenerating(true);
    try {
      const recipe = await generateRecipeWithAI({
        prompt: aiPrompt,
        cuisine: aiCuisine,
        difficulty: aiDifficulty,
        servings: aiServings,
      });

      setTitle(recipe.title);
      setDesc(recipe.description);
      setIng(formatIngredientList(recipe.ingredients));
      setStepsArr(
        recipe.steps.map((step) => ({
          id: getuuid(),
          inputData: step,
        }))
      );
      setAiFilled(true);
      setActiveTab("manual");
      if (!file && !imagePreview) {
        setImagePreview(DEFAULT_RECIPE_IMAGE);
      }
      toast.success("Recipe generated — review and save");
    } catch {
      // toast handled in API
    } finally {
      setIsGenerating(false);
    }
  };

  const handleImageChange = (event) => {
    const selected = event.target.files?.[0];
    if (!selected) return;
    setFile(selected);
    setImagePreview(URL.createObjectURL(selected));
    setAiFilled(false);
  };

  const busy = isLoading || isGenerating;
  const showManualForm = activeTab === "manual" || isEdit;

  return createPortal(
    <div className="recipe-modal-root">
      <div
        className="recipe-modal__backdrop"
        onClick={handleClose}
        aria-hidden="true"
      />
      <div
        className={`recipe-modal${smallScreen ? " recipe-modal--compact" : ""}`}
        role="dialog"
        aria-modal="true"
        aria-labelledby="recipe-modal-title"
        onClick={(e) => e.stopPropagation()}
      >
        <header className="recipe-modal__header">
          <div>
            <p className="recipe-modal__eyebrow">Recipe workspace</p>
            <h2 id="recipe-modal-title" className="recipe-modal__title">
              {isEdit ? "Edit recipe" : "Create recipe"}
            </h2>
            <p className="recipe-modal__subtitle">
              {isEdit
                ? "Update your recipe details and save changes."
                : "Fill in manually or generate with Qwen (Ollama), then publish."}
            </p>
          </div>
          <button
            type="button"
            className="recipe-modal__close"
            onClick={handleClose}
            aria-label="Close"
          >
            ×
          </button>
        </header>

        {!isEdit && (
          <div className="recipe-modal__tabs" role="tablist">
            <button
              type="button"
              role="tab"
              aria-selected={activeTab === "manual"}
              className={`recipe-modal__tab${activeTab === "manual" ? " recipe-modal__tab--active" : ""}`}
              onClick={() => setActiveTab("manual")}
            >
              Manual entry
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={activeTab === "ai"}
              className={`recipe-modal__tab${activeTab === "ai" ? " recipe-modal__tab--active" : ""}`}
              onClick={() => setActiveTab("ai")}
            >
              AI assistant (Qwen)
            </button>
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="recipe-modal__body">
            {busy ? (
              <div className="recipe-modal__loading">
                <Circles color="var(--pink)" width={36} height={36} />
                <span>
                  {isGenerating
                    ? "Qwen is writing your recipe…"
                    : "Saving your recipe…"}
                </span>
              </div>
            ) : (
              <>
                {!isEdit && activeTab === "ai" && (
                  <section className="recipe-modal__ai-panel">
                    <span className="recipe-modal__ai-badge">
                      Powered by Ollama
                    </span>
                    <p className="recipe-modal__ai-hint">
                      Describe what you want to cook. Qwen will draft title,
                      description, ingredients, and steps. You can edit
                      everything before saving.
                    </p>
                    <div className="recipe-modal__field recipe-modal__ai-row--single">
                      <label
                        className="recipe-modal__label"
                        htmlFor="ai-prompt"
                      >
                        Recipe idea
                      </label>
                      <textarea
                        id="ai-prompt"
                        className="recipe-modal__textarea"
                        placeholder="e.g. Creamy garlic mushroom pasta for 4, vegetarian, under 30 minutes"
                        value={aiPrompt}
                        onChange={(e) => setAiPrompt(e.target.value)}
                        rows={3}
                      />
                    </div>
                    <div className="recipe-modal__ai-row">
                      <div className="recipe-modal__field">
                        <label
                          className="recipe-modal__label"
                          htmlFor="ai-cuisine"
                        >
                          Cuisine (optional)
                        </label>
                        <input
                          id="ai-cuisine"
                          className="recipe-modal__input"
                          type="text"
                          placeholder="Italian"
                          value={aiCuisine}
                          onChange={(e) => setAiCuisine(e.target.value)}
                        />
                      </div>
                      <div className="recipe-modal__field">
                        <label
                          className="recipe-modal__label"
                          htmlFor="ai-difficulty"
                        >
                          Difficulty
                        </label>
                        <input
                          id="ai-difficulty"
                          className="recipe-modal__input"
                          type="text"
                          placeholder="Easy"
                          value={aiDifficulty}
                          onChange={(e) => setAiDifficulty(e.target.value)}
                        />
                      </div>
                      <div className="recipe-modal__field">
                        <label
                          className="recipe-modal__label"
                          htmlFor="ai-servings"
                        >
                          Servings
                        </label>
                        <input
                          id="ai-servings"
                          className="recipe-modal__input"
                          type="text"
                          placeholder="4"
                          value={aiServings}
                          onChange={(e) => setAiServings(e.target.value)}
                        />
                      </div>
                    </div>
                    <button
                      type="button"
                      className="recipe-modal__btn recipe-modal__btn--ai"
                      onClick={handleGenerateAI}
                      disabled={!aiPrompt.trim()}
                    >
                      Generate with Qwen
                    </button>
                  </section>
                )}

                {showManualForm && (
                  <>
                    <section className="recipe-modal__section">
                      <h3 className="recipe-modal__section-title">Basics</h3>
                      <div className="recipe-modal__field">
                        <label className="recipe-modal__label" htmlFor="title">
                          Title
                        </label>
                        <input
                          id="title"
                          className="recipe-modal__input"
                          type="text"
                          placeholder="Recipe title"
                          value={title}
                          onChange={(e) => setTitle(e.target.value)}
                        />
                      </div>
                      <div className="recipe-modal__field">
                        <label className="recipe-modal__label" htmlFor="desc">
                          Description
                        </label>
                        <textarea
                          id="desc"
                          className="recipe-modal__textarea"
                          placeholder="Short appetizing summary"
                          value={desc}
                          onChange={(e) => setDesc(e.target.value)}
                          rows={3}
                        />
                      </div>
                    </section>

                    <section className="recipe-modal__section">
                      <h3 className="recipe-modal__section-title">
                        Ingredients &amp; media
                      </h3>
                      <div className="recipe-modal__field">
                        <label className="recipe-modal__label" htmlFor="ing">
                          Ingredients
                        </label>
                        <textarea
                          id="ing"
                          className="recipe-modal__textarea"
                          placeholder="One ingredient per line, e.g.&#10;2 cups flour&#10;1 tsp salt&#10;2 green onions, chopped (optional)"
                          value={ing}
                          onChange={(e) => setIng(e.target.value)}
                          rows={5}
                        />
                      </div>
                      <div className="recipe-modal__field">
                        <label className="recipe-modal__label" htmlFor="image">
                          Cover image
                        </label>
                        <input
                          id="image"
                          className="recipe-modal__file"
                          type="file"
                          accept="image/*"
                          onChange={handleImageChange}
                        />
                        <p className="recipe-modal__file-hint">
                          {aiFilled && !file
                            ? "AI recipes use a default image unless you upload one."
                            : "Optional unless you want a custom cover; a default is used if empty."}
                        </p>
                        {imagePreview && (
                          <img
                            src={imagePreview}
                            alt="Recipe preview"
                            className="recipe-modal__preview-img"
                          />
                        )}
                      </div>
                    </section>

                    <section className="recipe-modal__section">
                      <h3 className="recipe-modal__section-title">Steps</h3>
                      <div className="recipe-modal__steps">
                        {stepsArr.map((stepItem, index) => (
                          <div key={stepItem.id} className="recipe-modal__step">
                            <span className="recipe-modal__step-num">
                              {index + 1}
                            </span>
                            <div className="recipe-modal__step-input-wrap">
                              <textarea
                                className="recipe-modal__textarea recipe-modal__textarea--step"
                                placeholder={`Step ${index + 1}`}
                                value={stepItem.inputData}
                                onChange={(e) =>
                                  handleInputChange(e, stepItem.id)
                                }
                                rows={2}
                              />
                              <button
                                type="button"
                                className="recipe-modal__step-remove"
                                onClick={(e) =>
                                  handleDeleteStep(stepItem.id, e)
                                }
                                aria-label={`Remove step ${index + 1}`}
                              >
                                ×
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </section>
                  </>
                )}
              </>
            )}
          </div>

          {!busy && showManualForm && (
            <footer className="recipe-modal__footer">
              <button
                type="button"
                className="recipe-modal__btn recipe-modal__btn--ghost"
                onClick={handleAddStep}
              >
                Add step
              </button>
              <div className="recipe-modal__footer-actions">
                <button
                  type="button"
                  className="recipe-modal__btn recipe-modal__btn--ghost"
                  onClick={handleClose}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="recipe-modal__btn recipe-modal__btn--primary"
                >
                  {isEdit ? "Save changes" : "Publish recipe"}
                </button>
              </div>
            </footer>
          )}
        </form>
      </div>
    </div>,
    document.body
  );
};

Modal.propTypes = {
  setOpen: PropTypes.func.isRequired,
  cardToEdit: PropTypes.object,
  setCardToEdit: PropTypes.func,
};

export default Modal;
