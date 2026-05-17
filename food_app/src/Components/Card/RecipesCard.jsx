import React, { useState, useContext } from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router";
import { wordLimiter } from "../../utils/wordLimiter";
import { deleteRecipe } from "../../apis/Recipes";
import { toast } from "react-hot-toast";
import AppContext from "../../Context/AppContext";
import { getAllRecipes } from "../../apis/Recipes";
import { Circles } from "react-loader-spinner";

const RecipesCard = ({
  id,
  title,
  description,
  ingredients,
  steps,
  image,
  enableEdit,
  setOpen,
  setCardToEdit,
}) => {
  const { isSite, user } = useContext(AppContext);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const { setAllData, setFilteredData } = useContext(AppContext);
  const [openDelete, setOpenDelete] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const handleRecipeClick = () => {
    if (isSite && !user) {
      toast.error("Sign-in to see recipe");
      return;
    }
    const ingredientsString = ingredients
      .map((item) => item.replace(/(?<!\w),/g, "|"))
      .join("|");
    const stepsString = steps
      .map((item) => item.replace(/(?<!\w),/g, "|"))
      .join("|");

    const queryString = `?id=${id}&desc=${encodeURIComponent(
      description
    )}&title=${encodeURIComponent(title)}&image=${encodeURIComponent(
      image
    )}&ingredients=${encodeURIComponent(
      ingredientsString
    )}&steps=${encodeURIComponent(stepsString)}`;

    navigate(`/details${queryString}`);
  };

  const handleDelete = async () => {
    try {
      setIsLoading(true);
      await deleteRecipe(id);
      const data = await getAllRecipes();
      setAllData(data);
      setFilteredData(data);
      toast.success("Recipe Deleted");
    } catch (error) {
      toast.error("Deletion Error");
    }
    setIsLoading(false);
  };
  const handleEdit = async () => {
    window.scrollTo({
      top: 0,
    });
    const selectedCard = {
      id: id,
      title: title,
      description: description,
      ingredients: ingredients,
      steps: steps,
      image: image,
    };
    setCardToEdit(selectedCard);
    setOpen(true);
  };

  const actionButtonStyle = {
    flex: 1,
    height: "40px",
    margin: 0,
    padding: 0,
    border: "none",
    borderTop: "0.5px solid #cfcfcf",
    fontSize: "inherit",
    fontFamily: "inherit",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
  };

  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        borderRadius: "2em",
        border: "var(--outline)",
        backgroundColor: "white",
        overflow: "hidden",
      }}
    >
      <div
        onClick={() => handleRecipeClick()}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={{
          userSelect: "none",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-start",
          alignItems: "center",
          gap: "0.5em",
          width: "100%",
          minHeight: enableEdit ? "250px" : "290px",
          wordWrap: "break-word",
          padding: "1.5em",
          fontSize: "0.8em",
          cursor: "pointer",
        }}
      >
        <div style={{ width: "100%", height: "130px", overflow: "hidden" }}>
          <img
            src={image}
            alt="Recipe"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              transition: "all 0.2s ease-in",
              transform: isHovered ? "scale(1.1)" : "scale(1)",
              borderRadius: "1em",
            }}
          />
        </div>
        <h4 style={{ margin: "1em 0", textAlign: "left", width: "100%" }}>
          {wordLimiter(title, 30)}
        </h4>
        <p style={{ fontSize: "var(--text-sm)", margin: 0, width: "100%" }}>
          {wordLimiter(description, 75)}
        </p>
      </div>
      {enableEdit ? (
        <div style={{ display: "flex", width: "100%" }}>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              openDelete ? setOpenDelete(false) : handleEdit();
            }}
            style={{
              ...actionButtonStyle,
              borderRight: "0.5px solid #cfcfcf",
              color: "green",
              backgroundColor: openDelete ? "var(--yellow)" : "white",
            }}
          >
            {openDelete ? "Cancel" : "Edit"}
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              openDelete ? handleDelete() : setOpenDelete(true);
            }}
            style={{
              ...actionButtonStyle,
              color: openDelete ? "white" : "red",
              backgroundColor: openDelete ? "var(--pink)" : "white",
            }}
          >
            {isLoading ? (
              <Circles width={20} height={20} color="var(--yellow)" />
            ) : openDelete ? (
              "Confirm"
            ) : (
              "Delete"
            )}
          </button>
        </div>
      ) : null}
    </div>
  );
};

RecipesCard.propTypes = {
  description: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  steps: PropTypes.arrayOf(PropTypes.string).isRequired,
  ingredients: PropTypes.arrayOf(PropTypes.string).isRequired,
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  enableEdit: PropTypes.bool.isRequired,
  setCardToEdit: PropTypes.func,
  setOpen: PropTypes.func,
};

export default RecipesCard;
